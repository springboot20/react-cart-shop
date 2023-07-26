const withTransactions = require('../middleware/mongooseTransaction');
const model = require('../model/index.js');
const errorHandler = require('../middleware/errorResponseHandler');
const cloudinary = require('cloudinary').v2;

const newUserProfile = errorHandler(
  withTransactions(async (req, res, session) => {
    req.body.userId = req.user.userId;
    const {} = req.body;

    return;
  })
);

module.exports = {
  newUserProfile,
};
