const { errorHandler, withTransactions } = require("../error")
const model = require("../model/index.js")


const getOrders = errorHandler(async (req, res, next) => {
    const orderDoc = await model.Order
        .find()
        .sort("checkOutAt")
        .populate("cartItems")
        .exec()

    return orderDoc
})

const getOrder = errorHandler(async (req, res, next) => {
    const { userId, params: { id: orderId } } = req
    req.body.checkBy = userId

    const orderDoc = await model.Order.findOne({ _id: orderId }).populate("cartItems").exec()

    return orderDoc
})

const makeOrder = errorHandler(withTransactions(async (req, res, session) => {
    req.body.checkBy = req.userId

    const orderDoc = new model.Order({ ...req.body, id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds() })

    await orderDoc.save({ session })

    // Find the cart items associated with the current user
    const cartDoc = await model.CartItem.find({ addedBy: req.userId });

    // Associate the cart items with the order
    orderDoc.cartItems = cartDoc.map(cart => cart._id);

    // Remove the cart items from the database after associating them with the order
    await model.CartItem.deleteMany({ addedBy: req.userId });


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
    deleteOrder
}