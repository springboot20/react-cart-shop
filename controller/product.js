const { errorHandler, HTTPError, withTransactions } = require("../error")
const model = require("../model/index.js")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    const productDocs = new model.Product({ ...req.body })
    await productDocs.save({ session })

    return {
        productDocs
    }
}))

const getProducts = errorHandler(withTransactions(async (req, res, session) => {
    console.log(req.userId)
    const products = await model.Product.find({ createdBy: req.userId })

    return {
        products
    }
}))

const getProduct = errorHandler(withTransactions(async (req, res, session) => {
    const { userId, params: { productId } } = req

    const productDoc = await model.Product.findOne({
        _id: productId,
        createdBy: userId
    })

    return {
        productDoc
    }
}))

module.exports = {
    createProduct,
    getProducts,
    getProduct
}