const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const createToken = ({ payload, expiresIn }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const isValidToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token verification failed' });
  }
};

const tokenResponse = ({ user, refresh }) => {
  const day = 24 * 60 * 60 * 1000;
  const longerDay = 24 * 60 * 60 * 1000;
  const accessToken = createToken({ payload: { user }, expiresIn: `${day}ms` });
  const refreshToken = createToken({ payload: { user, refresh }, expiresIn: `${longerDay}ms` });

  return { accessToken, refreshToken };
};

module.exports = {
  tokenResponse,                            
  isValidToken,
  createToken,
};
