/** @format */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const { HTTPError } = require('./error');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
    user: process.env.USER,
    pass: process.env.PASS,
  })
  .then(() => {
    console.log('MongoDb database connected successfully....');
  });

mongoose.connection.on('connect', () => {
  console.log('Mongodb connected ....');
});

process.on('SIGINT', () => {
  mongoose.connection.once('disconnect', () => {
    console.log('Mongodb disconnected..... ');
    process.exit(0);
  });
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/cart', cartRouter);

app.get('/', (req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  res.send('welcome to home route');
  next();
});

app.use((req, res, next) => {
  const err = new HTTPError(404, 'Not found');
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
