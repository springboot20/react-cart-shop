const OrderStatuses = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

const AvailableOrderStatusEnums = Object.values(OrderStatuses);

const PaymentMethods = {
  UNKNOWN: 'UNKNOWN',
  BANK: 'BANK',
  PAYSTACK: 'PAYSTACK',
  FLUTTERWAVE: 'FLUTTERWAVE',
};

const AvailablePaymentMethods = Object.values(PaymentMethods);

const RoleEnums = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const AvailableRoles = Object.values(RoleEnums);

const LoginType = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
  GOOGLE: 'GOOGLE',
};

const AvailableLoginType = Object.values(LoginType);

module.exports = {
  AvailableOrderStatusEnums,
  OrderStatuses,
  PaymentMethods,
  AvailablePaymentMethods,
  RoleEnums,
  AvailableRoles,
  LoginType,
  AvailableLoginType
};
