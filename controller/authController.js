const customErrors = require('../middleware/customErrors');
const withTransactions = require('../middleware/mongooseTransaction');
const model = require('../model/index');
const bcrypt = require('bcryptjs');
const createTokenUser = require('../utils/tokenUser');
const { tokenResponse } = require('../utils/jwt');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

async function comparePasswords(enteredPassword, docPassword) {
  return await bcrypt.compare(enteredPassword, docPassword);
}

const signUp = withTransactions(async (req, res, session) => {
  const { email, ...rest } = req.body;
  try {
    const user = await model.User.findOne({ email });
    if (user) throw new customErrors.BadRequest('User already exists');

    const isFirstAccount = (await model.User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const userDocument = await model.User({
      ...rest,
      email,
      role,
    });
    await userDocument.save({ session });
    res.status(StatusCodes.CREATED).json({ message: 'You have successfully created an account' });
  } catch (error) {
    console.log(error);
  }
});

const signIn = withTransactions(async (req, res, session) => {
  const { email, password } = req.body;
  const user = await model.User.findOne({ email });

  if (!email || !password) throw new customErrors.BadRequest('Please provide email and password');

  if (!user) throw new customErrors.UnAuthenticated('User do not exist!!');

  if (!(await comparePasswords(password, user.password))) throw new customErrors.UnAuthenticated('Invalid password, try again!!');

  const tokenUser = createTokenUser(user);
  let refreshToken = '';

  const existingToken = await model.Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new customErrors.UnAuthenticated('Invalid credentials');
    }

    refreshToken = existingToken.refreshToken;

    tokenResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req?.headers['user-agent'];
  const ip = req?.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  const tokenDoc = await model.Token(userToken);
  await tokenDoc.save({ session });

  tokenResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ tokenUser });
});

const logOut = withTransactions(async (req, res, session) => {
  await model.RefreshToken.deleteOne({ user: req.user.userId }, { session });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date().now(),
  });

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date().now(),
  });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

module.exports = {
  signUp,
  signIn,
  logOut,
};
