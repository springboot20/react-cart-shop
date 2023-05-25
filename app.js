require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const { auth } = require("./utils/auth")

const app = express()

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
    user: process.env.USER,
    pass: process.env.PASS
}).then(() => {
    console.log("MongoDb database connected successfully....")
})

mongoose.connection.on("connect", () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`)
    })
    console.log("Mongodb connected ....")
})

process.on("SIGINT", () => {
    mongoose.connection.once("disconnect", () => {
        console.log("Mongodb disconnected..... ")
        process.exit(0)
    })
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', auth, productRouter)

app.get('/', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.send("Hello world from home page");
})

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
    next(err);
});

