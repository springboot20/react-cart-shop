const express = require('express');
const router = express.Router();
const userControllers = require('../controller/userController.js');
const { checkPermission } = require('../utils/permission');
const authControllers = require('../controller/authController.js');
const authenticate = require('../utils/auth.js');

/**
 * PUBLIC ROUTES
 */

router.route('/auth/logout').post(authenticate, authControllers.logOut);
router.route('/auth/signin').post(authControllers.signIn);
router.route('/auth/signup').post(authControllers.signUp);

/**
 * AUTH ROUTES
 */

router
  .route('/')
  .get(authenticate, checkPermission('admin'), userControllers.getAllUsers);
router.route('/stats').get(authenticate, userControllers.userStats);
router.route('/:id').get(authenticate, userControllers.getSingleUser);
router
  .route('/count')
  .get(authenticate, checkPermission('admin'), userControllers.usersCount);

/**
 * USER ROUTES
 */

router.route('/current-user').get(authenticate, userControllers.currentUser);
router.route('/:id').patch(authenticate, userControllers.updateUser);

module.exports = router;
