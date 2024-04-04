const CustomErrors = require('../../utils/customErrors');
const { asyncHandler } = require('../../utils/asyncHandler');
const { StatusCodes } = require('http-status-codes');
const { isValidToken } = require('../../utils/jwt');
const { UserModel } = require('../../model/index');

/**
 * @description a middleware that give access to some specific routes
 */

const verifyJWT = asyncHandler(
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new CustomErrors.UnAuthorized(StatusCodes.UNAUTHORIZED, 'token verification invalid');
    }

    try {
      const decodeToken = isValidToken(token, process.env.JWT_ACCESS_SECRET);

      let userPayload = await UserModel.findById(decodeToken._id).select(
        '-password -emailVerificationToken -emailVerificationExpiry -forgotPasswordExpiry -forgotPasswordToken'
      );

      if (!userPayload) {
        throw new CustomErrors.UnAuthenticated(StatusCodes.UNAUTHORIZED, 'Invalid token provided');
      }

      req.user = userPayload;
    } catch (error) {
      next(error);
      throw new CustomErrors.UnAuthorized(StatusCodes.UNAUTHORIZED, 'verifyJWT Invalid');
    }
  }
);

/**
 *
 * @param  {string[]} roles
 * @returns
 */
const checkPermission = (...roles) => {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomErrors.UnAuthorized(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized to access this route'
      );
    } else {
      next();
    }
  };
};

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  console.log(requestUser.role);

  throw new CustomErrors.UnAuthorized(
    StatusCodes.UNAUTHORIZED,
    'Not authorized to access this route'
  );
};

module.exports = { checkPermission, checkPermissions, verifyJWT };
