const { body } = require('express-validator');
const { AvailableRoles } = require('../../../constants');

const userRegisterValidation = () => {
  return [
    body('username').trim().notEmpty().withMessage('Username is required').toLowerCase(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email must be an email')
      .toLowerCase(),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 3 })
      .withMessage('Password should be a minimum of 3 '),
    body('role').optional().trim().isIn(AvailableRoles).withMessage('Invalid user role'),
  ];
};

const userLoginValidation = () => {
  return [
    body('username').optional(),
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ];
};

const userForgotPasswordValidation = () => {
  return [body('email').isEmail().withMessage('Email is invalid')];
};

const userResetPasswordValidation = () => {
  return [body('password').trim().notEmpty().withMessage('Password is require')];
};

const userAssignRoleValidation = () => {
  return [body('role').trim().optional().isIn(AvailableRoles).withMessage('Invalid user role')];
};

const userChangeCurrentPasswordValidation = () => {
  return [
    body('existingPassword').notEmpty().withMessage('Existing password is require'),
    body('newPassword').notEmpty().withMessage('New password is require'),
  ];
};

const userProfileUpdateValidation = () => {
  return [
    body('username').trim().notEmpty().withMessage('Username is required').toLowerCase(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email must be an email')
      .toLowerCase(),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 3 })
      .withMessage('Password should be a minimum of 3 '),
    body('role').optional().trim().isIn(AvailableRoles).withMessage('Invalid user role'),
  ];
}

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userForgotPasswordValidation,
  userResetPasswordValidation,
  userAssignRoleValidation,
  userChangeCurrentPasswordValidation,
  userProfileUpdateValidation,
};
