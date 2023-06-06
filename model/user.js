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
    }, state: {
        type: String,
        require: true
    }, country: {
        type: String,
        require: true
    }, streetAddress: {
        type: String,
        require: true
    }, city: {
        type: String,
        require: true
    }, createdAt: {
        type: Date,
        default: Date.now()
    }, zipCode: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const User = model("User", userSchema)
module.exports = User