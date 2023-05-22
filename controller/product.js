const { errorHandler, HTTPError, withTransactions } = require("../error")
const model = require("../model/index.js")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    const productDocs = await model.Product(...res.body)
    await productDocs.save({ session })

    return {
        productDocs
    }
}))

const getProduct = errorHandler(withTransactions(async (req, res, session) => {
    
}))

module.exports = {
    createProduct,
    getProduct
}