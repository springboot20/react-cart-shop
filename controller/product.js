/** @format */

const { errorHandler, withTransactions, HTTPError } = require('../error');
const model = require('../model/index.js');

const createProduct = errorHandler(
  withTransactions(async (req, res, session) => {
    const {
      params: { id: cartId },
    } = req;

    const productDocs = new model.Product({ ...req.body });
    const savedProduct = await productDocs.save({ session });
    await model.CartItem.findByIdAndUpdate(cartId, { $push: { products: productDocs._id } });

    return savedProduct;
  })
);

const getAllProducts = errorHandler(async (req, res, next) => {
  const products = await model.Product.find().sort('createdAt');
  return products;
});

const getProductsByType = errorHandler(async (req, res, next) => {
  const productsType = req.query.productsType.split(',');

  const productDoc = await Promise.all(
    productsType.map((type) => {
      return model.Product.find({
        productType: type,
      });
    })
  );

  return productDoc;
});

const updateProduct = errorHandler(
  withTransactions(async (req, res, session) => {
    const {
      params: { id: productId },
    } = req;

    const productDoc = await model.Product.findOneAndUpdate({ _id: productId }, req.body, { new: true });

    await productDoc.save({ session });
    return productDoc;
  })
);

const deleteProduct = errorHandler(async (req, res, next) => {
  const {
    params: { id: cartId },
  } = req;

  const productDoc = await model.Product.findByIdAndDelete(req.params.id);
  try {
    await model.Cart.findByIdAndUpdate(cartId, { $pull: { products: req.params.id } });
  } catch (error) {
    throw new HTTPError(409, error.message);
  }
  return productDoc;
});

const getProduct = errorHandler(async (req, res, next) => {
  const {
    params: { id: productId },
  } = req;

  const productDoc = await model.Product.findById(productId);
  return productDoc;
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
  updateProduct,
  deleteProduct,
};
