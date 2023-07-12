const jwt = require('jsonwebtoken');
const customErrors = require('../middleware/customErrors');

const createToken = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const isValidToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new customErrors.BadRequest('Token verification failed');
  }
};

const tokenResponse = ({ res, user, refresh }) => {
  const day = 24 * 60 * 60 * 1000;
  const longerDay = 30 * 24 * 60 * 60 * 1000;

  const accessToken = createToken({ payload: { user } });

  const refreshToken = createToken({ payload: { user, refresh } });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + day),
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + longerDay),
  });
};

module.exports = {
  tokenResponse,
  isValidToken,
  createToken,
};
