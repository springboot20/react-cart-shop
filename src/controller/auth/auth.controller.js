const crypto = require('crypto');
const CustomErrors = require('../../utils/customErrors');
const { UserModel } = require('../../model/index');
const { asyncHandler } = require('../../utils/asyncHandler');
const { ApiResponse } = require('../../utils/apiResponse');
const { StatusCodes } = require('http-status-codes');
const { RoleEnums } = require('../../constants');
const mongoose = require('mongoose');
const { sendMail } = require('../../service/email.service');

/**
 *
 * @param {string} userId
 * @returns {accessToken: string, refreshToken: string}
 *
 * A function which generate tokens i.e {accessToken and refreshToken} from the pre-defined function in the mongoose model
 */

const generateTokens = async (userId) => {
  try {
    // find user with the id generated for a user when they create an account
    const user = await UserModel.findById(userId);

    // check if the user is not found in the database
    if (!user)
      throw new CustomErrors.NotFound(StatusCodes.NOT_FOUND, 'user does not exist in the database');

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const signUp = asyncHandler(
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async (req, res) => {
    const { username, email, password, role } = req.body;

    const existedUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existedUser)
      throw new CustomErrors.BadRequest(StatusCodes.CONFLICT, 'user already exists in database');

    const user = await UserModel.create({
      username,
      email,
      password,
      role: role ?? RoleEnums.USER,
    });

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryTokens();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    const verifyLink = `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${user._id}/${unHashedToken}`;

    await sendMail(
      user?.email,
      'Email verification',
      { username: user?.username, verificationLink: verifyLink },
      'email-verification'
    );

    const createdInUser = await UserModel.findById(user._id).select(
      '-password -emailVerificationToken -emailVerificationExpiry -refreshToken'
    );
    if (!createdInUser) {
      throw new CustomErrors.InternalServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal server error'
      );
    }

    return new ApiResponse(StatusCodes.OK, 'You have successfully created an account', {
      user: createdInUser,
    });
  }
);

const signIn = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (!email && !password) {
      throw new CustomErrors.BadRequest(
        StatusCodes.BAD_REQUEST,
        'Please provide email and password'
      );
    }

    if (!user) {
      throw new CustomErrors.NotFound(
        StatusCodes.UNAUTHORIZED,
        `No user found with this email: ${email} or username: ${username}`
      );
    }

    if (!(await user.comparePasswords(password))) {
      throw new CustomErrors.UnAuthorized(
        StatusCodes.UNAUTHORIZED,
        'Invalid password, try again!!!'
      );
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    user.refreshToken = refreshToken;

    const loggedInUser = await UserModel.findById(user._id).select(
      '-password -emailVerificationToken -emailVerificationExpiry -forgotPasswordExpiry -forgotPasswordToken'
    );

    if (!loggedInUser) {
      throw new CustomErrors.InternalServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal server error'
      );
    }

    await user.save({ validateBeforeSave: false });

    return new ApiResponse(StatusCodes.OK, 'user logged successfully', {
      user: loggedInUser,
      token: { accessToken },
    });
  }
);

const logOut = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true }
    );
    return new ApiResponse(StatusCodes.OK, 'user logged out');
  }
);

const verifyEmail = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    const { verificationToken, userId } = req.params;

    console.log(verificationToken);

    if (!verificationToken)
      throw new CustomErrors.BadRequest(
        StatusCodes.BAD_REQUEST,
        'Verification token is not provided'
      );

    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    console.log(hashedToken);

    const user = await UserModel.findOne({
      _id: new mongoose.Types.ObjectId(userId),
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      throw new CustomErrors.UnAuthorized(489, 'Token is invalid or expired');
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    user.isEmailVerified = true;

    await user.save({ validateBeforeSave: false });

    return new ApiResponse(StatusCodes.OK, 'Email verified', { isEmailVerified: true });
  }
);

const resendEmailVerification = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      throw new CustomErrors.NotFound(StatusCodes.NOT_FOUND, 'User does not exists', []);
    }

    if (user.isEmailVerified) {
      throw new CustomErrors.Conflict(
        StatusCodes.CONFLICT,
        'User email has already been verified',
        []
      );
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryTokens();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    const verifyLink = `${req.protocol}://${req.get('host')}/api/v1/verify-email/${unHashedToken}`;

    await sendMail(
      user?.email,
      'Email verification',
      { username: user?.username, verificationLink: verifyLink },
      'email-verification'
    );

    await user.save({ validateBeforeSave: false });

    return new ApiResponse(StatusCodes.OK, 'Email verification resend');
  }
);

const forgotPassword = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new CustomErrors.NotFound(StatusCodes.NOT_FOUND, 'User does not exists', []);
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryTokens();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;

    const resetLink = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${unHashedToken}`;

    await sendMail(
      user.email,
      'Password reset',
      { resetLink, username: user.username },
      'reset-password'
    );

    return new ApiResponse(StatusCodes.OK, 'Password reset link sent successfully');
  }
);

const resetPassword = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
      throw new CustomErrors.BadRequest(
        StatusCodes.BAD_REQUEST,
        'Verification token is not provided'
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await UserModel.findOne({
      _id: req.user._id,
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: {
        $gte: Date.now(),
      },
    });

    if (!user) {
      throw new CustomErrors.NotFound(StatusCodes.NOT_FOUND, 'User does not exists', []);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          password: newPassword,
          forgotPasswordToken: undefined,
          forgotPasswordExpiry: undefined,
        },
      },
      { new: true }
    );

    return new ApiResponse(StatusCodes.OK, 'Password reset link sent successfully', {
      user: updatedUser,
    });
  }
);

const assignRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await UserModel.findById(new mongoose.Types.Objectid(userId));

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }
  user.role = role;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, 'Role changed for the user'));
});

module.exports = {
  signUp,
  signIn,
  logOut,
  verifyEmail,
  resendEmailVerification,
  forgotPassword,
  resetPassword,
  assignRole,
};
