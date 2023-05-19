const mongoose = require("mongoose")
const { Schema, model } = mongoose

const productSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    price: {
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
    }
})

const Product = model("product", productSchema)
module.exports =  Product 