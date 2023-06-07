const { Schema, model } = require("mongoose")

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


module.exports = Order