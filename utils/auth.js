/** @format */

const customErrors = require('../middleware/customErrors.js');
const { isValidToken, tokenResponse } = require('../utils/jwt.js');
const model = require('../model/index');

const authentication = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
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

    if (!existingToken || !existingToken?.isValid) {
      throw new customErrors.UnAuthenticated('Authentication invalid');
    }

    tokenResponse({ res, user: payload.user, refreshToken: existingToken?.refreshToken });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new customErrors.UnAuthenticated('Authentication invalid');
  }
};

module.exports = authentication;
