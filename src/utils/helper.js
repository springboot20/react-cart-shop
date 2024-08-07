const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const { ApiResponse } = require('./apiResponse');

const getFileLocalPath = (filename) => `${__dirname}/images/${filename}`;

/**
 *
 * @param {import('express').Request} req
 * @param {string} filename
 * @returns {string}
 */
const getStaticFilePath = (req, filename) => `${req.protocol}://${req.get('host')}/${filename}`;

/**
 *
 * @param {string} localPath
 */
const removeLocalFilePath = (localPath) => {
  fs.unlink(localPath, (error) => {
    if (error)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Error occur while trying to remove file`
      );
    else return new ApiResponse(StatusCodes.OK, `Removed file:${localPath}`);
  });
};

/**
 *
 * @param {{page: number; limit: number; customLabels: mongoose.CustomLabels;}} options
 * @returns {mongoose.PaginateOptions}
 */
 const getMongoosePaginationOptions = ({
  page = 1,
  limit = 10,
  customLabels,
}) => {
  return {
    page: Math.max(page, 1),
    limit: Math.max(limit, 1),
    pagination: true,
    customLabels: {
      pagingCounter: "serialNumberStartFrom",
      ...customLabels,
    },
  };
};


module.exports = {
  getStaticFilePath,
  getFileLocalPath,
  removeLocalFilePath,
  getMongoosePaginationOptions,
};
