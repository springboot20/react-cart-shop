const customErrors = require('../middleware/customErrors');

const checkPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customErrors.UnAuthorized('Unauthorized to access this route');
    }
    next();
  };
};

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  console.log(requestUser.role);
  throw new customErrors.UnAuthorized('Not authorized to access this route');
};

module.exports = { checkPermission, checkPermissions };
