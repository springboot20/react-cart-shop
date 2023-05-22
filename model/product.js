const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    priceTag: {
        type: Number,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: true })

const Product = model("product", productSchema)
module.exports = Product 