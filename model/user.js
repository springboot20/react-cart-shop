const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, "first name is required"]
    }, lastName: {
        type: String,
        require: [true, "last name is required"]
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
    }, streetAddress: {
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