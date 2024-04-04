const express = require('express');
const router = express.Router();
const { checkPermission } = require('../utils/permission');
const authenticate = require('../utils/auth.js');
const authControllers = require('../controller/authController.js');

router.route('/:userId').post(authenticate).get(authenticate);
router.route('/:id');

module.exports = router;
