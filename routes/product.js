const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByType, getProduct } = require('../controller/productController.js');
const { checkPermission } = require('../utils/permission');
const authentication = require('../utils/auth.js');

/**
 * AUTHENTICATED USER ROUTES
 */

router.route('/').get(authentication, getAllProducts);
router.route('/:id').get(authentication, getProduct);
router.route('/type').get(authentication, getProductsByType);

/**
 * ADMIN ROUTES
 */

router.route('/').post([authentication, checkPermission('admin')], createProduct);
router.route('/:id').patch([authentication, checkPermission('admin')], updateProduct);
router.route('/:id').delete([authentication, checkPermission('admin')], deleteProduct);

module.exports = router;
