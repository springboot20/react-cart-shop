/** @format */

const withTransactions = require('../../middleware/mongooseTransaction.js');
const model = require('../../model/index.js');
const cloudinary = require('../../middleware/cloudinaryConfig.js');
const { StatusCodes } = require('http-status-codes');
const { checkPermissions } = require('../../utils/permission.js');

const createProduct = withTransactions(async (req, res, session) => {
  req.body.user = req.user.userId;
  try {
    const imageSrc = await cloudinary.uploader.upload(req.body.imageSrc, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const productDocs = await model.Product({
      ...req.body,
      imageSrc: imageSrc.secure_url,
    });
    const savedProduct = await productDocs.save({ session });

    res.status(StatusCodes.CREATED).json(savedProduct);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
});

const getAllProducts = async (req, res) => {
  try {
    const products = await model.Product.find({});
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res, next) => {
  const categories = req.query.categories.split(',');

  const productDoc = await Promise.all(
    categories.map((type) => {
      return model.Product.find({
        category: type,
      });
    })
  );
  res.status(StatusCodes.OK).json(productDoc);
};

const updateProduct = withTransactions(async (req, res, session) => {
  const { id: productId } = req.params;

  const productDoc = await model.Product.findByIdAndUpdate(productId, req.body, { new: true });

  await productDoc.save({ session });
  res.status(StatusCodes.CREATED).json(productDoc);
});

const deleteProduct = async (req, res, next) => {
  const productDoc = await model.Product.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json(productDoc);
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  const productDoc = await model.Product.findById(productId);
  res.status(StatusCodes.OK).json(productDoc);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
