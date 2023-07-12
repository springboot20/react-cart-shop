/** @format */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');

// ENDPOINT ROUTES
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');

// ERROR HANDLER
const handleError = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// DATABASE CONNECTION
const dataBaseConnection = require('./connections/connection');

dataBaseConnection();
const app = express();

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies(process.env.JWT_SECRET));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/cart', cartRouter);

app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
