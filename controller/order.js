/** @format */

const { errorHandler, withTransactions } = require('../error');
const model = require('../model/index.js');

const getOrders = errorHandler(async (req, res, next) => {
  const orderDoc = await model.Order.find().exec();

  return orderDoc;
});

const getOrder = errorHandler(async (req, res, next) => {
  const {
    params: { id: orderId },
  } = req;
  req.body.checkBy = req.user.userId;

  const orderDoc = await model.Order.findOne({ _id: orderId }).populate('cartItems').exec();

  return orderDoc;
});

const makeOrder = errorHandler(
  withTransactions(async (req, res, session) => {
    const {
      params: { id: cartId },
    } = req;
    req.body.checkBy = req.user.userId;

    const orderDoc = new model.Order({ ...req.body, id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds() });
    const saveOrder = await orderDoc.save({ session });
    await model.CartItem.findByIdAndUpdate(cartId, { $push: { cartId: orderDoc._id } });

    return saveOrder;
  })
);

const updateOrder = errorHandler(
  withTransactions(async (req, res, session) => {
    const {
      params: { id: orderId },
    } = req;

    const orderDoc = await model.Order.findOneAndUpdate({ _id: orderId }, { $set: req.body }, { new: true });
    await orderDoc.save({ session });

    return orderDoc;
  })
);

const deleteOrder = errorHandler(async (req, res, next) => {
  const {
    params: { id: orderId },
  } = req;

  const orderDoc = await model.Order.findOneAndDelete({ _id: orderId });
  return orderDoc;
});

module.exports = {
  makeOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
