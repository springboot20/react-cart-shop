const { StatusCodes } = require('http-status-codes');

function asyncHandler(fn) {
  return async function (req, res, next) {
    try {
      let nextCalled = false;
      let result = await fn(req, res, (params) => {
        nextCalled = true;
        next(params);
      });

      if (!res.headersSent && !nextCalled) {
        res.status(StatusCodes.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {asyncHandler};
