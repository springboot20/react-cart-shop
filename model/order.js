const { Schema, model } = require("mongoose")

const cartSchema = new Schema({
    id: {
        type: String
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    product: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        min: 1
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    addedAt: {
        type: Date,
        default: Date.now()
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
})

const orderSchema = new Schema({
    id: {
        type: String
    },
    checkBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        city: {
            type: String,
            require: true
        }, state: {
            type: String,
            require: true
        }, zipCode: {
            type: Number,
            require: true
        }
    },
    cartItems: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
    status: {
        type: String,
        enums: ["declined", "pending", "completed"],
        default: "pending"
    },
    checkOutAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Order = model("Order", orderSchema)
const CartItem = model("CartItem", cartSchema)

module.exports = {
    Order,
    CartItem
}