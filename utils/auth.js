/** @format */

const { isValidToken } = require('../utils/jwt.js');
const model = require('../model/index');
const { tokenResponse } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');

const authenticate = async (req, res, next) => {
  let authHeader = req.headers?.authorization;
  let refreshHeader = req.headers['x-refresh'];

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' });
  }

  if (!refreshHeader || !refreshHeader.startsWith('Bearer')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' });
  }

  let accessToken = authHeader.split(' ')[1];
  let refreshToken = refreshHeader.split(' ')[1];

  try {
    if (accessToken) {
      const payload = isValidToken(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isValidToken(refreshToken);

    const existingToken = await model.Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    console.log(existingToken);
    if (!existingToken || !existingToken?.isValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Authentication Invalid' });
    }

    tokenResponse({
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' });
  }
};

module.exports = authenticate;
