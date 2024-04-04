const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

const ProfileModel = model('Profile', ProfileSchema);
module.exports = { ProfileModel };
