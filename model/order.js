const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    first_name: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        first_name: {
            type: String,
            required: [true, "first_name is required"]
        },
        last_name: {
            type: String,
            required: [true, "last_name is required"]
        },
        username: {
            type: String,
            required: [true, "username is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true
        },
        address_one: {
            type: String,
            required: [true, "address is required"]
        },
        address_two: {
            type: String
        },
        orderAt: {
            type: Date,
            default: Date.now()
        },
        orderBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user is required"]
        }
    }
}, { timestamps: true })

const OrderModel = model("order", orderSchema)
module.exports = OrderModel