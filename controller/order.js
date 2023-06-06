const { errorHandler, withTransactions } = require("../error")
const model = require("../model/index.js")


const getOrders = errorHandler(async (req, res, next) => {
    const orderDoc = await model.Order.find({ chekBy: req.userId }).sort("orderAt")

    return orderDoc
})

const getOrder = errorHandler(async (req, res, next) => {
    const { userId, params: { id: orderId } } = req

    const orderDoc = await model.Order.findOne({ _id: orderId, orderBy: userId })

    return orderDoc
})

const makeOrder = errorHandler(withTransactions(async (req, res, session) => {
    req.body.orderBy = req.userId

    const orderDoc = new model.Order({ ...req.body, id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds() })

    await orderDoc.save({ session })

    return orderDoc
}))

const updateOrder = errorHandler(withTransactions(async (req, res, session) => {
    const { userId, params: { id: orderId } } = req

    const orderDoc = await model.Order.findOneAndUpdate({
        _id: orderId,
        orderBy: userId
    }, req.body, { new: true })

    await orderDoc.save({ session })

    return orderDoc
}))

const deleteOrder = errorHandler(async (req, res, next) => {
    const { params: { id: orderId } } = req

    const orderDoc = await model.Order.findOneAndDelete({ _id: orderId })
    return orderDoc
})



module.exports = {
    makeOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    addToCart
}