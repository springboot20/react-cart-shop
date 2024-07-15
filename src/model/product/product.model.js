/** @format */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    mainImg: {
      type: {
        url: String,
        localPath: String,
      },
    },
    subImages: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      default: 'Category',
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel = model('Product', ProductSchema);
module.exports = { ProductModel };
