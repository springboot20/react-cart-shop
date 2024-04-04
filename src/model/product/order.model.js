/** @format */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const {
  AvailableOrderStatusEnums,
  OrderStatuses,
  PaymentMethods,
  AvailablePaymentMethods,
} = require('../constants');

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
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
    orderStatus: {
      type: String,
      enum: AvailableOrderStatusEnums,
      default: OrderStatuses.PENDING,
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: AvailablePaymentMethods,
      default: PaymentMethods.UNKNOWN,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    discountedOrderPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;
