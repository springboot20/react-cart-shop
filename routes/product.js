const express = require('express')
const router = express.Router()

const { createProduct } = require("../controller/product.js")

router.route('/create-product').post(createProduct())

module.exports = router