const express = require('express')
const router = express.Router()

const { createProduct, getProduct } = require("../controller/product.js")

router.get('/', (req, res, next) => {
    res.send("Hello world from products page")
})

router.post('/createproduct', createProduct)
router.get('/getproduct', getProduct)

module.exports = router