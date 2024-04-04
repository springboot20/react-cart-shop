const { ProductModel } = require('./product/product.model.js');
const { UserModel } = require('./auth/user.model.js');
const { ProfileModel } = require('./product/profile.model.js');
const { AddressModel } = require('./product/address.model.js');

module.exports = {
  ProductModel,
  UserModel,
  ProfileModel,
  AddressModel,
};
