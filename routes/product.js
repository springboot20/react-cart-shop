const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getProductsByType } = require("../controller/product.js")

router.post('/create-product', createProduct)
router.get('/', getAllProducts)
router.get("/:type", getProductsByType)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getProduct)

module.exports = router