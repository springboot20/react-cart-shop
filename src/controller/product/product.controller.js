/** @format */

const model = require('../../model/index');
const { asyncHandler } = require('../../utils/asyncHandler');
const cloudinary = require('../../middleware/cloudinaryConfig');
const { StatusCodes } = require('http-status-codes');
const { ApiResponse } = require('../../utils/apiResponse');
const CustomApiErrors = require('../../utils/customErrors');
const {
  getStaticFilePath,
  getFileLocalPath,
  getMongoosePaginationOptions,
} = require('../../utils/helper');

const max_subImages = 3;

const createProduct = asyncHandler(async (req, res) => {
  const owner = req.user._id;

  const { name, category, price, description, stock } = req.body;

  const productCategory = await model.CategoryModel.findById(category);

  if (!productCategory) {
    throw new CustomApiErrors.NotFound(StatusCodes.NOT_FOUND, 'Product category not found');
  }

  // Check if user has uploaded a main image
  if (!req.files?.mainImage || !req.files?.mainImage.length) {
    throw new ApiError(400, 'Main image is required');
  }
  const mainImgLocalPath = getFileLocalPath(req.file.mainImage[0]?.filename);
  const mainImgUrl = getStaticFilePath(req, req.file.mainImage[0]?.filename);

  if (!req.files?.subImage || !req.files?.subImages.length) {
    throw new ApiError(400, 'Sub images is required');
  }

  const subImages =
    req.files.subImages && req.files.subImages.length
      ? req.files.subImages.map((image) => {
          const imageUrl = getStaticFilePath(req, image.filename);
          const imageLocalPath = getFileLocalPath(image.filename);

          return {
            url: imageUrl,
            localPath: imageLocalPath,
          };
        })
      : [];

  const createdProduct = await model.ProductModel.create({
    owner,
    name,
    price,
    description,
    category,
    stock,
    mainImage: {
      url: mainImgUrl,
      localPath: mainImgLocalPath,
    },
    subImages,
  });

  return new ApiResponse(StatusCodes.CREATED, 'Product created successfully', {
    product: createdProduct,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const productAggregate = await model.ProductModel.aggregate([{ $match: {} }]);

  const products = await model.ProductModel.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      limit,
      page,
      customLabels: {
        totalDocs: 'totalProducts',
        docs: 'products',
      },
    })
  );

  return new ApiResponse(StatusCodes.OK, 'Products fetched successfully', products);
});

const getProductsByCategory = asyncHandler(async (req, res) => {});

const updateProduct = asyncHandler(async (req, res) => {});

const deleteProduct = asyncHandler(async (req, res) => {});

const getProduct = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
