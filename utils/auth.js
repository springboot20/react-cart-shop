/** @format */

const { HTTPError } = require('../error/index.js');
const jwt = require('jsonwebtoken');

/**
 * @params
 */

const verifyToken = (req, res, next) => {
  const accessToken = req.headers?.authorization.split(' ')[1];

  if (!accessToken) {
    throw new HTTPError(401, 'Unauthorized: access token missing');
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, userId) => {
    if (error) return next(new HTTPError(403, 'Token is not valid'));
    req.user = userId;

    console.log(req.user);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    next();
  });
};

const auth = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new HTTPError(403, 'You are not authorized!'));
    }
  });
};

const isAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(new HTTPError(403, 'You are not authorized!'));
    }
  });
};

module.exports = { auth, isAdmin };
