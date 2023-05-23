const { errorHandler, HTTPError, withTransactions } = require("../error")
const model = require("../model/index.js")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    req.body.createdBy = req.userId

    const productDocs = new model.Product({ ...req.body })
    await productDocs.save({ session })

    return {
        productDocs
    }
}))

const getAllProducts = errorHandler(withTransactions(async (req, res, session) => {
    console.log(req.userId)
    const products = await model.Product.find({ createdBy: req.userId }).sort("createdAt")

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

const updateProduct = errorHandler(withTransactions(async (req, res, session) => {
    const { userId, params: { productId } } = req

    const productDoc = await model.Product.findOneAndUpdate(
        {
            _id: productId,
            createdBy: userId
        },
        ...req.body,
        { new: true }
    )

    return {
        productDoc
    }
}))

const deleteProduct = errorHandler(withTransactions(async (req, res, session) => {
    const { params: { productId } } = req

    const productDoc = await model.Product.findOneAndDelete({
        _id: productId,
    })

    return {
        productDoc
    }
}))

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}