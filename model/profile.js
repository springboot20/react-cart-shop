const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const AddressSchema = new Schema(
  {
    city: String,
    streetAddress: String,
    zipCode: Number,
    state: String,
  },
  { _id: false }
);

const ProfileSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  phone: Number,
  address: AddressSchema,
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ProfileModel = model('Profile', ProfileSchema);
module.exports = ProfileModel;
