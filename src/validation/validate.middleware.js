const { validationResult } = require('express-validator');
const CustomErrors = require('../utils/customErrors');
const { StatusCodes } = require('http-status-codes');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validate = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  } else {
    let extractedError = [];
    validationErrors.array().map((error) => extractedError.push({ [error.path]: error.msg }));

    throw new CustomErrors.UnprocessableEntity(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'Received data is not valid',
      extractedError
    );
  }
};

module.exports = { validate };
