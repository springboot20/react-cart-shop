const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    id: {
        type: String,
    },
    imageUrl: {
        type: String,
        require: [true, "Image url is required"]
    },
    priceTag: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: [true, "Description is required"]
    },
    type: {
        type: String,
        enum: ["trouser", "shirt", "watch", "laptop", "sun glass", "snickers", "underwear"],
        default: "shirt",
        required: true
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