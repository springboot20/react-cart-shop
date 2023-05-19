const { errorHandler, HTTPError, withTransactions } = require("../error")
const model = require("../model/index.js")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    try {
        const productDocs = await model.Product(...res.body)
        await productDocs.save({ session })

        return {
            productDocs
        }
    } catch (error) {
        if (error) {
            throw new HTTPError()
        }
    }
}))

const getProduct = errorHandler(withTransactions(async (req, res, session) => {
    res.send("hello world from here")
}))

module.exports = {
    createProduct,
    getProduct
}