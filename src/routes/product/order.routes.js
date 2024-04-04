const router = require('express').Router();
const { makeOrder, getOrders, updateOrder, getCurrentUserOrder, getOrder } = require('../controller/orderController');
const {checkPermission} = require('../utils/permission');
const authentication = require('../utils/auth.js');

router.route('/:userId').get(authentication, getOrder);

/**
 * ADMIN ROUTES
 */
router.route('/').get([authentication, checkPermission('admin')], getOrders);
router.route('/').post([authentication, checkPermission('admin')], makeOrder);
router.route('/:id').patch([authentication, checkPermission('admin')], updateOrder);
router.route('/:id').get(authentication, getCurrentUserOrder);

module.exports = router;
