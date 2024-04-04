const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const isValidToken = (token, secret) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token verification failed' });
  }
};

module.exports = {
  isValidToken,
};
