/** @format */

const withTransactions = require('../middleware/mongooseTransaction');
const model = require('../model/index.js');

const addToCart = withTransactions(async (req, res, session) => {
  req.body.userId = req.user.userId;

  const cartDoc = new model.CartItem(req.body);
  const savedCart = await cartDoc.save({ session });

  return savedCart;
});

const getAllCart = async (req, res, next) => {
  const cartDoc = await model.CartItem.find().exec();

  return cartDoc;
};

const updateCartItem = withTransactions(async (req, res, next) => {
  const {
    params: { id: itemId },
  } = req;

  const cartDoc = await model.CartItem.findOneAndUpdate({ _id: itemId }, { $set: req.body }, { new: true });
  await cartDoc.save({ session });

  return cartDoc;
});

const deleteCartItem = async (req, res, next) => {

};

const cartCount = async (req, res, next) => {
  const cartDoc = await model.CartItem.countDocuments();

  return cartDoc;
};

module.exports = {
  addToCart,
  getAllCart,
  updateCartItem,
  deleteCartItem,
  cartCount,
};
