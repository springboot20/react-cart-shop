/** @format */

const mongoose = require('mongoose');

class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = message;
    this.statusCode = statusCode;
  }
}

function errorHandler(fn) {
  return async function (req, res, next) {
    try {
      let nextCalled = false;
      let result = await fn(req, res, (params) => {
        nextCalled = true;
        next(params);
      });

      if (!res.headersSent && !nextCalled) {
        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const handleErrors = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

function withTransactions(fn) {
  return async function (req, res, next) {
    let result;
    await mongoose.connection.transaction(async (session) => {
      result = await fn(req, res, session);
      return result;
    });
    return result;
  };
}

module.exports = {
  HTTPError,
  withTransactions,
  errorHandler,
  notFound,
  handleErrors,
};
