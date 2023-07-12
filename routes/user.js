const express = require('express');
const router = express.Router();
const userControllers = require('../controller/userController.js');
const { checkPermission } = require('../utils/permission');
const authentication = require('../utils/auth.js');
const authControllers = require('../controller/authController.js');

/**
 * PUBLIC ROUTES
 */

router.route('/auth/logout').post(authControllers.logOut);
router.route('/auth/signIn').post(authControllers.signIn);
router.route('/auth/signUp').post(authControllers.signUp);

/**
 * AUTH ROUTES
 */

router.route('/').get([checkPermission('admin'), authentication], userControllers.getAllUsers);
router.route('/:id').get(authentication, userControllers.getSingleUser);
router.route('/count').get([checkPermission('admin'), authentication], userControllers.usersCount);

/**
 * USER ROUTES
 */

router.route('/current-user').get(authentication, userControllers.currentUser);
router.route('/:id').patch(authentication, userControllers.updateUser);

module.exports = router;
