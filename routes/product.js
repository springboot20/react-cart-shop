const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../controller/product.js")

router.get('/', (req, res, next) => {
    res.send("Hello world from products page")
})

router.post('/create-product', createProduct)
router.get('/all-products', getAllProducts)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getProduct)

module.exports = router