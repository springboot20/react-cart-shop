const { errorHandler, withTransactions } = require("../error")
const model = require("../model/index.js")


const getOrders = errorHandler(async (req, res, next) => {
    const orderDoc = await model.Order.find({ orderBy: req.userId }).sort("orderAt")

    return orderDoc
})

const makeOrder = errorHandler(withTransactions(async (req, res, session) => {
    req.body.orderBy = req.userId

    const orderDoc = new model.Order({ ...req.body, id: new Dte().toString(2) + new Date().getUTCMilliseconds() })

    await orderDoc.save({ session })

    return orderDoc
}))

module.exports = {
    makeOrder,
    getOrders
}