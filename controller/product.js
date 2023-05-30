const { errorHandler, withTransactions } = require("../error")
const model = require("../model/index.js")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    req.body.createdBy = req.userId

    const productDocs = new model.Product({ ...req.body, id: new Dte().toString(2) + new Date().getUTCMilliseconds() })
    await productDocs.save({ session })

    return productDocs
}))

const getAllProducts = errorHandler(async (req, res, next) => {
    const products = await model.Product.find({ createdBy: req.userId }).sort("createdAt")

    return products
})

const getProduct = errorHandler(async (req, res, next) => {
    const { userId, params: { id: productId } } = req

    console.log(userId, productId)

    const productDoc = await model.Product.findOne({
        _id: productId,
        createdBy: userId
    })
    console.log(productDoc)

    return productDoc
})

const getProductsByType = errorHandler(async (req, res, next) => {
    const { userId, params: { type: productType } } = req

    const productDoc = await model.Product.find({
        productType: productType,
        createdBy: userId
    })

    return productDoc
})

const updateProduct = errorHandler(withTransactions(async (req, res, session) => {
    const { userId, params: { id: productId } } = req

    const productDoc = await model.Product.findOneAndUpdate({
        _id: productId,
        createdBy: userId
    }, req.body, { new: true })

    await productDoc.save({ session })
    return productDoc

}))

const deleteProduct = errorHandler(async (req, res, next) => {
    const { params: { id: productId } } = req

    const productDoc = await model.Product.findOneAndDelete({
        _id: productId,
    })

    return productDoc
})

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getProductsByType,
    updateProduct,
    deleteProduct
}