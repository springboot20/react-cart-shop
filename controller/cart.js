const { errorHandler, withTransactions } = require("../error")
const model = require("../model/index.js")


const addToCart = errorHandler(withTransactions(async (req, res, session) => {
    const { price, product, quantity } = req.body

    const cartDoc = new model.CartItem({
        price,
        product,
        quantity
    })

    await cartDoc.save({ session })

    return cartDoc
}))

const getAllCart = errorHandler(async (req, res, next) => {
    const { userId } = req

    const cartDoc = await model.CartItem.find({
        addedBy: userId
    })

    return cartDoc
})

const updateCartItem = errorHandler(withTransactions(async (req, res, next) => {
    const { userId, params: { id: itemId } } = req

    const cartDoc = await model.CartItem.findOneAndUpdate({
        _id: itemId,
        addedBy: userId,
    }, req.body, { new: true })

    await cartDoc.save({ session })

    return cartDoc
}))

const deleteCartItem = errorHandler(async (req, res, next) => {
    const { params: { id: itemId } } = req

    const cartDoc = await model.CartItem.findOneAndDelete({ _id: itemId })
    return cartDoc
})

module.exports = {
    addToCart,
    getAllCart,
    updateCartItem,
    deleteCartItem
}