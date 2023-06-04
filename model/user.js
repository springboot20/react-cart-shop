const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    first_name: {
        type: String,
        require: [true, "first_name is required"]
    }, last_name: {
        type: String,
        require: [true, "last_name is required"]
    }, email: {
        type: String,
        require: [true, "email is required"],
        unique: true
    }, password: {
        type: String,
        require: [true, "password is required"]
    }, profilePhoto: {
        filename: String,
        path: String,
        originalname: String
    }, street_address: {
        type: String,
        require: [true, "address is required"]
    }, city: {
        type: String,
        require: [true,]
    }, createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const User = model("user", userSchema)
module.exports = User