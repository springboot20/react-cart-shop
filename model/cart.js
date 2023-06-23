/** @format */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
      min: 1,
    },
    price: {
      type: Number,
      require: true,
    },
    products: [String],
  },
  { timestamps: true }
);

const CartItem = model('CartItem', cartSchema);
module.exports = CartItem;
