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
    }, zipCode: {
        type: Number,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = model("User", userSchema)
module.exports = User