/** @format */

const { errorHandler, withTransactions } = require('../error');
const model = require('../model/index.js');

const addToCart = errorHandler(
  withTransactions(async (req, res, session) => {
    req.body.userId = req.user.userId;

    const {
      params: { id: orderId },
    } = req;
    const cartDoc = new model.CartItem({ ...req.body, id: new Date().getTime().toString(32) + new Date().getUTCMilliseconds() });
    const savedCart = await cartDoc.save({ session });
    await model.Order.findByIdAndUpdate(orderId, { $push: { orderId: cartDoc._id } });

    return savedCart;
  })
);

const getAllCart = errorHandler(async (req, res, next) => {
  const cartDoc = await model.CartItem.find().exec();

  return cartDoc;
});

const updateCartItem = errorHandler(
  withTransactions(async (req, res, next) => {
    const {
      params: { id: itemId },
    } = req;

    const cartDoc = await model.CartItem.findOneAndUpdate({ _id: itemId }, { $set: req.body }, { new: true });
    await cartDoc.save({ session });

    return cartDoc;
  })
);

const deleteCartItem = errorHandler(async (req, res, next) => {
  const {
    params: { id: itemId },
  } = req;

  const cartDoc = await model.CartItem.findOneAndDelete({ _id: itemId });
  return cartDoc;
});

const cartCount = errorHandler(async (req, res, next) => {
  const cartDoc = await model.CartItem.countDocuments();

  return cartDoc;
});

module.exports = {
  addToCart,
  getAllCart,
  updateCartItem,
  deleteCartItem,
  cartCount,
};
