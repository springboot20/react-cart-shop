const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    imageUrl: {
        type: String,
        require: [true, "Image url is required"]
    },
    priceTag: {
        type: Number,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: [true, "Description is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "User is required"]
    }
}, { timestamps: true })

const Product = model("product", productSchema)
module.exports = Product 