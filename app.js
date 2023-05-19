require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const productRouter = require("./routes/product.js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extented: false }))
app.use('api/product', productRouter)

app.get('/', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.send("Hello world from home page");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})
