/** @format */

const withTransactions = require('../middleware/mongooseTransaction');
const model = require('../model/index.js');

const createProduct = withTransactions(async (req, res, session) => {
  const productDocs = new model.Product(req.body);
  const savedProduct = await productDocs.save({ session });
  return savedProduct;
});

const getAllProducts = async (req, res, next) => {
  const products = await model.Product.find().sort('createdAt');
  return products;
};

const getProductsByType = async (req, res, next) => {
  const productsType = req.query.productsType.split(',');

  const productDoc = await Promise.all(
    productsType.map((type) => {
      return model.Product.find({
        productType: type,
      });
    })
  );

  return productDoc;
};

const updateProduct = withTransactions(async (req, res, session) => {
  const {
    params: { id: productId },
  } = req;

  const productDoc = await model.Product.findByIdAndUpdate(productId, req.body, { new: true });

  await productDoc.save({ session });
  return productDoc;
});

const deleteProduct = async (req, res, next) => {
  const productDoc = await model.Product.findByIdAndDelete(req.params.id);
  return productDoc;
};

const getProduct = async (req, res, next) => {
  const {
    params: { id: productId },
  } = req;

  const productDoc = await model.Product.findById(productId);
  return productDoc;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
  updateProduct,
  deleteProduct,
};
