const { Schema, model } = require("mongoose")

const countrySchema = new Schema({
    name: String,
    code: String
})

const Country = model("countries", countrySchema)
module.exports = Country