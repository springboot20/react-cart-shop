const { errorHandler, HTTPError, withTransactions } = require("../error")

const createProduct = errorHandler(withTransactions(async (req, res, session) => {
    
}))

module.exports = {
    createProduct
}