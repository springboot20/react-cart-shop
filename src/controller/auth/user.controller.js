const { UserModel } = require('../../model/index');
const { StatusCodes } = require('http-status-codes');
const { asyncHandler } = require('../../utils/asyncHandler');
const { ApiResponse } = require('../../utils/apiResponse');
const { getStaticFilePath, getFileLocalPath } = require('../../utils/helper');
const CustomErrors = require('../../utils/customErrors');
const mongoose = require('mongoose');

const getCurrentUser = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, 'current user fetched successfully', { user: req.user });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await UserModel.find({}).select(
    '-password -forgotPasswordToken -forgotPasswordExpiry -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  return new ApiResponse(StatusCodes.OK, 'users fetched successfully', { users });
});

const uploadAvatar = asyncHandler(
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async (req, res) => {
    if (!req.file?.filename)
      throw new CustomErrors.BadRequest(StatusCodes.BAD_REQUEST, 'No file uploaded', []);

    const url = getStaticFilePath(req, req.file.filename);
    const localPath = getFileLocalPath(req.file.filename);

    const userAvatarUpdate = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: {
            url,
            localPath,
          },
        },
      },
      { new: true }
    ).select('-password -refreshToken -emailVerificationToken -emailVerificationExpiry');

    await userAvatar.save({ validateBeforeSave: false, session });

    return new ApiResponse(StatusCodes.OK, 'avatar updated successfully', {
      user: userAvatarUpdate,
    });
  }
);

const updateCurrentUser = asyncHandler(
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Unable to find user');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      {
        $set: {
          username,
          email,
          password,
        },
      },
      { new: true }
    );

    await updatedUser.save({ validateBeforeSave: false });

    return new ApiResponse(StatusCodes.OK, 'User updated successfully', { user: updatedUser });
  }
);

module.exports = { getCurrentUser, getAllUser, uploadAvatar, updateCurrentUser };
