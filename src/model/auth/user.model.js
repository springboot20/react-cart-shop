const { Schema, model } = require('mongoose');
const { LoginType, AvailableLoginType, RoleEnums, AvailableRoles } = require('../../constants');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      require: [true, 'password is required'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: AvailableRoles,
      default: RoleEnums.USER,
    },
    refreshToken: {
      type: String,
    },
    loginType: {
      type: String,
      enum: AvailableLoginType,
      default: LoginType.EMAIL_PASSWORD,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
    role: this.role,
  };

  return jsonwebtoken.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};

UserSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };
  return jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
};

UserSchema.methods.generateTemporaryTokens = function () {
  const unHashedToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');

  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};

const UserModel = model('User', UserSchema);

module.exports = { UserModel };
