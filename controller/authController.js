const withTransactions = require('../middleware/mongooseTransaction');
const model = require('../model/index');
const createTokenUser = require('../utils/tokenUser');
const { tokenResponse } = require('../utils/jwt');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const signUp = withTransactions(async (req, res, session) => {
  const { email, ...rest } = req.body;
  try {
    const user = await model.User.findOne({ email });
    if (user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User already exists' });

    const isFirstAccount = (await model.User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const userDocument = await model.User({
      ...rest,
      email,
      role,
    });
    await userDocument.save({ session });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'You have successfully created an account' });
  } catch (error) {
    return res.status(StatusCodes.CREATED).json({ message: error.message });
  }
});

const signIn = withTransactions(async (req, res, session) => {
  const { email, password } = req.body;
  const user = await model.User.findOne({ email });

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please provide email and password' });
  }

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'User do not exist!!' });
  }

  if (!(await user.comparePasswords(password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid password, try again!!!' });
  }

  const tokenUser = createTokenUser(user);
  let refreshToken = '';

  const existingToken = await model.Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    refreshToken = existingToken.refreshToken;

    let tokens = tokenResponse({ user: tokenUser, refreshToken });
    res
      .status(StatusCodes.OK)
      .json({
        user: tokenUser,
        message: 'you have successfully signed in',
        tokens,
      });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req?.headers['user-agent'];
  const ip = req?.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  const tokenDoc = await model.Token(userToken);
  await tokenDoc.save({ session });

  const tokens = tokenResponse({ user: tokenUser, refreshToken });
  res
    .status(StatusCodes.OK)
    .json({
      user: tokenUser,
      message: 'you have successfully signed in',
      tokens,
    });
});

const logOut = withTransactions(async (req, res, session) => {
  await model.Token.findOneAndDelete({ user: req.user.userId }, { session });
  res.status(StatusCodes.OK).json({ message: 'user logged out successfully' });
});

module.exports = {
  signUp,
  signIn,
  logOut,
};
