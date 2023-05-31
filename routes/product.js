const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByType, getProduct } = require("../controller/product.js")

router.post('/', createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.get("/:type", getProductsByType)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router