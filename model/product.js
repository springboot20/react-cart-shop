/** @format */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    priceTag: {
      type: Number,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    productType: {
      type: String,
      enum: ['trouser', 'shirt', 'watch', 'laptop', 'sun glass', 'snickers', 'underwear'],
      default: 'shirt',
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);
module.exports = Product;
