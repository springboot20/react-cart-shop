const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    id: {
        type: String
    }, userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }, firstName: {
        type: String,
        required: [true, "first_name is required"]
    }, lastName: {
        type: String,
        required: [true, "last_name is required"]
    }, email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    }, address: {
        type: String,
        required: [true, "address is required"]
    }, city: {
        type: String,
        required: [true, "city is required"]
    }, state: {
        type: String,
        require: [true, "state is required"]
    }, zipCode: {
        type: Number,
        require: [true, "zip code is required"],
        maxLength: 8
    }, orderAt: {
        type: Date,
        default: Date.now()
    }, orderBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"]
    }
}, { timestamps: true })

const Order = model("order", orderSchema)
module.exports = Order