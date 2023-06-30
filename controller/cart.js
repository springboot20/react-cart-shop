/** @format */

const { errorHandler, withTransactions } = require('../error');
const model = require('../model/index.js');

const addToCart = errorHandler(
  withTransactions(async (req, res, session) => {
    req.body.userId = req.user.userId;

    const cartDoc = new model.CartItem(req.body);
    const savedCart = await cartDoc.save({ session });

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
    params: { id: productId },
  } = req;

  const cartDoc = await model.CartItem.findByIdAndDelete(req.params.id);
  try {
    await model.Product.findByIdAndUpdate(productId, { $pull: { cartItems: req.params.id } });
  } catch (error) {
    throw new HTTPError(409, error.message);
  }
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
