/** @format */

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SingleOrderItemSchema = new Schema({
	name: { type: String, required: true },
	imageSrc: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	productId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product',
		required: true,
	},
});

const orderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		tax: {
			type: Number,
			required: true,
		},
		shippingFee: {
			type: Number,
			required: true,
		},
		subtotal: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
			default: 'pending',
		},
		orderItems: [SingleOrderItemSchema],
	},
	{ timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;
