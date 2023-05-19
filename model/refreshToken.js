const mongoose = require("mongoose")
const { Schema, model } = mongoose

const refreshSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const RefreshToken = model("refresh", refreshSchema)
module.exports = RefreshToken