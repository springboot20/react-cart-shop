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

const CartItem = model("CartItem", cartSchema)
module.exports = CartItem