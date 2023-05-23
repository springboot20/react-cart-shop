const express = require('express')
const router = express.Router()

const { createProduct, getProducts, getProduct } = require("../controller/product.js")

router.get('/', (req, res, next) => {
    res.send("Hello world from products page")
})

router.post('/createproduct', createProduct)
router.get('/all-products', getProducts)
router.get('/:id', getProduct)

module.exports = router