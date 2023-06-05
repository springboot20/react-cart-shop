const { Schema, model } = require("mongoose")

const cartSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const orderSchema = new Schema({
    id: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cartItems: [cartSchema],
    address: {
        city: {
            type: String,
            required: true
        }, state: {
            type: String,
            require: true
        }, zipCode: {
            type: Number,
            require: true
        }
    },
    status: {
        type: String,
        enums: ["declined", "pending", "completed"],
        default: "pending"
    },
    orderAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Order = model("order", orderSchema)
const CartItem = model("cartItem", cartSchema)
module.exports = {
    Order,
    CartItem
}