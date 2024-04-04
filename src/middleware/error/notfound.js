const CustomApiErrors = require('../../utils/customErrors');
const { StatusCodes } = require('http-status-codes');

const notfound = (err, req, res, next) => {
  next(new CustomApiErrors.NotFound(StatusCodes.NOT_FOUND, err.message || 'Not found'));
};
module.exports = notfound;
