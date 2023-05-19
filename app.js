require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const productRouter = require("./routes/product.js")

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/v1/products', productRouter)

app.get('/', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.send("Hello world from home page");
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})
