/** @format */

const withTransactions = require('../../middleware/mongooseTransaction.js');
const model = require('../../model/index.js');
const { StatusCodes } = require('http-status-codes');
const { checkPermissions } = require('../../utils/permission.js');

const getOrders = async (req, res, next) => {
  const order = await model.Order.find({});
  res.status(StatusCodes.OK).json({ order, count: orderDoc.length });
};

const getOrder = async (req, res) => {
  const {
    params: { id: orderId },
  } = req;

  const orderDoc = await model.Order.findById(orderId);
  if (!orderDoc)
    res.status(StatusCodes.NOT_FOUND).json({ message: `No order with id : ${orderId}` });

  res.status(StatusCodes.OK).json(orderDoc);
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await model.Order.find({ userId: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const makeOrder = withTransactions(async (req, res, session) => {
  const { items: orderItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'No cart items provided' });
  }
  if (!tax || !shippingFee) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Please provide tax and shipping fee' });
  }

  let cartItems = [];
  let subtotal = 0;

  for (const item of orderItems) {
    const dbProduct = await model.Product.findOne({ _id: item.product });
    if (!dbProduct) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `No product with id : ${item.product}` });
    }

    const { name, price, imageSrc, _id } = dbProduct;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      imageSrc,
      productId: _id,
    };
    // add item to order
    orderItems = [...cartItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.quantity * price;
  }

  const total = tax + shippingFee + subtotal;

  const orderDoc = await model.Order({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    userId: req.user.userId,
  });
  await orderDoc.save({ session });

  res.status(StatusCodes.OK).json(orderDoc);
});

const updateOrder = withTransactions(async (req, res, session) => {
  const { id: orderId } = req.params;
  const order = await model.Order.findOne({ _id: orderId });

  if (!order)
    res.status(StatusCodes.NOT_FOUND).json({ message: `No order with id:${orderId} found` });

  order.status = 'paid';
  await order.save({ session });
  checkPermissions(req.user, order.user);

  res.status(StatusCodes.OK).json(order);
});

const getCurrentUserOrder = async (req, res) => {
  const order = await model.Order.findOne({ user: req.user.userId });
  res.status(StatusCodes.OK).json(order);
};

module.exports = {
  makeOrder,
  getOrders,
  getOrder,
  updateOrder,
  getCurrentUserOrder,
  getCurrentUserOrders,
};
