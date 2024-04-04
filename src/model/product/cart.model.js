const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: {
      type: [
        {
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1,
          },
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const CartModel = model('Cart', CartSchema);
module.exports = { CartModel };
