const express = require('express');
const router = express.Router();
const { checkPermission, verifyJWT } = require('../../middleware/auth/auth.middleware.js');
const { upload } = require('../../middleware/upload/multer.middleware.js');
const authControllers = require('../../controller/auth/auth.controller.js');
const userControllers = require('../../controller/auth/user.controller.js');
const { validate } = require('../../validation/validate.middleware.js');
const {
  userRegisterValidation,
  userProfileUpdateValidation,
  userLoginValidation,
  userAssignRoleValidation,
  userForgotPasswordValidation,
  userResetPasswordValidation,
} = require('../../validation/app/auth/user.validators.js');
const { mongoPathVariableValidation } = require('../../validation/mongo/mongoId.validators');

/**
 * PUBLIC ROUTES
 */

router.route('/auth/signup').post(userRegisterValidation(), validate, authControllers.signUp);

router.route('/auth/signin').post(userLoginValidation(), validate, authControllers.signIn);

router
  .route('/verify-email/:userId/:verificationToken')
  .get(mongoPathVariableValidation('userId'), validate, authControllers.verifyEmail);

router
  .route('/forgot-password')
  .post(userForgotPasswordValidation(), validate, authControllers.forgotPassword);

router
  .route('/reset-password/:resetToken')
  .patch(validate, userResetPasswordValidation(), authControllers.resetPassword);

/**
 * AUTH ROUTES
 */

router.route('/').get(verifyJWT, checkPermission(['admin']), userControllers.getAllUser);

router
  .route('/role/:userId')
  .get(
    verifyJWT,
    mongoPathVariableValidation('userId'),
    userAssignRoleValidation(),
    validate,
    checkPermission(['admin']),
    authControllers.assignRole
  );

router.route('/current-user').get(verifyJWT, userControllers.getCurrentUser);

router.route('/auth/logout').post(verifyJWT, authControllers.logOut);

router.route('/avatar').patch(verifyJWT, upload.single('avatar'), userControllers.uploadAvatar);

router
  .route('/:userId')
  .patch(
    verifyJWT,
    mongoPathVariableValidation('userId'),
    userProfileUpdateValidation(),
    validate,
    userControllers.updateCurrentUser
  );

module.exports = router;
