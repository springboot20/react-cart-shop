const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    }, lastName: {
        type: String,
        require: true
    }, email: {
        type: String,
        require: true,
        unique: true
    }, password: {
        type: String,
        require: true
    }, profilePhoto: {
        filename: String,
        path: String,
        originalname: String
    }, streetAddress: {
        type: String,
        require: true
    }, city: {
        type: String,
        require: true
    }, createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const User = model("user", userSchema)
module.exports = User