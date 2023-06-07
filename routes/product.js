const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByType, getProduct } = require("../controller/product.js")
const { isAdmin } = require('../utils/auth.js')

router.post('/', isAdmin, createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.get("/:type", getProductsByType)
router.patch('/:id', isAdmin, updateProduct)
router.delete('/:id', isAdmin, deleteProduct)

module.exports = router