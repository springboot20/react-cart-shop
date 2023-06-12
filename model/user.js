const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    id: {
        type: String
    }, firstName: {
        type: String,
        require: true,
        default: null
    }, lastName: {
        type: String,
        require: true,
        default: null
    }, email: {
        type: String,
        require: true,
        default: null,
        unique: true
    }, password: {
        type: String,
        require: true,
        default: null
    }, state: {
        type: String,
        require: true,
        default: null
    }, country: {
        type: String,
        require: true,
        default: null
    }, streetAddress: {
        type: String,
        require: true,
        default: null
    }, city: {
        type: String,
        require: true,
        default: null
    }, zipCode: {
        type: Number,
        require: true,
        default: null
    }, isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = model("User", userSchema)
module.exports = User