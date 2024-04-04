const express = require('express');
const router = express.Router();
const productController = require('../controller/productController.js');
const { checkPermission } = require('../utils/permission');
const authentication = require('../utils/auth.js');

/**
 * AUTHENTICATED USER ROUTES
 */

router.route('/').get(authentication, productController.getAllProducts);
router.route('/:id').get(authentication, productController.getProduct);
router.route('/categories?=').get(authentication, productController.getProductsByCategory);

/**
 * ADMIN ROUTES
 */

router.route('/').post([authentication, checkPermission('admin')], productController.createProduct);
router.route('/:id').patch([authentication, checkPermission('admin')], productController.updateProduct);
router.route('/:id').delete([authentication, checkPermission('admin')], productController.deleteProduct);

module.exports = router;
