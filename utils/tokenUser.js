const createTokenUser = (user) => {
  return { username: user.username, role: user.role, userId: user._id };
};

module.exports = createTokenUser;
