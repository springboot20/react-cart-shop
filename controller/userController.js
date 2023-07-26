/** @format */

const customErrors = require('../middleware/customErrors');
const model = require('../model/index');
const withTransactions = require('../middleware/mongooseTransaction');
const bcrypt = require('bcryptjs');
const { checkPermissions } = require('../utils/permission');
const { StatusCodes } = require('http-status-codes');
const moment = require('moment');

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
    const user = await model.User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    await user.save({ session });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

const currentUser = async (req, res, next) => {
  const user = await model.User.findById(req.user.userId);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }

  res.status(StatusCodes.OK).json(userDoc);
};

const usersCount = async (req, res, next) => {
  const userDoc = await model.User.countDocuments({});
  res.status(StatusCodes.OK).json(userDoc);
};

const getAllUsers = async (req, res) => {
  const userDoc = await model.User.find({ role: 'user' }).select('-password');
  console.log(userDoc);
  res.status(StatusCodes.OK).json({ users: userDoc });
};

const getSingleUser = async (req, res) => {
  try {
    let user = await model.User.findOne({ _id: req.params.id }).select(
      '-password'
    );

    if (user && user._id) {
      checkPermissions(req.user, user._id);
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const userStats = async (req, res, next) => {
  const date = new Date();
  let lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  let lastYear = new Date(date.setYear(date.getFullYear() - 1));

  try {
    let monthlyStats = await model.User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth, $gte: lastYear },
          role: 'user',
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
          role: '$role',
        },
      },
      {
        $group: {
          _id: { month: '$month', year: '$year', role: '$role' },
          totalUser: { $sum: 1 },
        },
      },
      { $sort: { '_id.month': -1, '_id.year': -1 } },
      { $limit: 6 },
    ]);

    monthlyStats = monthlyStats
      .map((item) => {
        const {
          _id: { year, month, role },
          totalUser,
        } = item;

        const date = moment()
          .month(month - 1)
          .year(year)
          .format('MMMM YYYY');
        return { date, totalUser, role };
      })
      .reverse();

    console.log(monthlyStats);
    res.status(StatusCodes.OK).json({ monthlyStats });
  } catch (error) {
    throw new Error(error);
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  usersCount,
  getAllUsers,
  updateUser,
  currentUser,
  getSingleUser,
  userStats,
};
