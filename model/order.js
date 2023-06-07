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
        require: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
    ratings: {
        type: Number,
        min: 0,
        max: 5
    }
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
    cartItems: [String],
    status: {
        type: String,
        enums: ["declined", "pending", "completed"],
        default: "pending"
    }
}, { timestamps: true })

const Order = model("Order", orderSchema)
const CartItem = model("CartItem", cartSchema)

module.exports = {
    Order,
    CartItem
}