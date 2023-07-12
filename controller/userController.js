/** @format */

const customErrors = require('../middleware/customErrors');
const model = require('../model/index');
const withTransactions = require('../middleware/mongooseTransaction');
const bcrypt = require('bcryptjs');
const { checkPermissions } = require('../utils/permission');
const { StatusCodes } = require('http-status-codes');

async function hashPassword(enteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(enteredPassword, salt);
}

const updateUser = withTransactions(async (req, res, session) => {
  const { id } = req.params;

  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  try {
    const user = await model.User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    await user.save({ session });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

const currentUser = async (req, res, next) => {
  const user = await model.User.findById(req.user.userId);
  if (!user) {
    throw new customErrors.NotFound(' User not found');
  }

  res.status(StatusCodes.OK).json(userDoc);
};

const usersCount = async (req, res, next) => {
  const userDoc = await model.User.countDocuments({});
  res.status(StatusCodes.OK).json(userDoc);
};

const getAllUsers = async (req, res) => {
  const userDoc = await model.User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json(userDoc);
};

const getSingleUser = async (req, res) => {
  try {
    let user = await model.User.findOne({ _id: req.params.id }).select('-password');

    if (user && user._id) {
      checkPermissions(req.user, user._id);
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  usersCount,
  getAllUsers,
  updateUser,
  currentUser,
  getSingleUser,
};
