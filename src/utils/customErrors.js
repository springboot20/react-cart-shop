class CustomApiError extends Error {
  /**
   * @params {string} message
   * @params {any[]} errors
   * @params {string} stack
   */

  constructor(message, errors = [], stack) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequest extends CustomApiError {
  /**
   * @params {string} message
   * @params {any[]} errors
   * @params {string} stack
   */
  constructor(statusCode, message, errors,stack) {
    super(message, errors);
    this.statusCode = statusCode;
  }
}

class InternalServerError extends CustomApiError {
  /**
   * @params {string} message
   * @params {any[]} errors
   * @params {string} stack
   */
  constructor(statusCode, message, errors,stack) {
    super(message, errors,stack);
    this.statusCode = statusCode;
  }
}

class NotFound extends CustomApiError {
  constructor(statusCode, message, errors,stack) {
    super(message, errors, stack);
    this.statusCode = statusCode;
  }
}

class UnAuthorized extends CustomApiError {
  constructor(statusCode, message, errors,stack) {
    super(message, errors, stack);
    this.statusCode = statusCode;
  }
}

class UnAuthenticated extends CustomApiError {
  constructor(statusCode, message, errors, data) {
    super(message, errors, data);
    this.statusCode = statusCode;
  }
}

class Conflict extends CustomApiError {
  constructor(statusCode, message, errors, stack) {
    super(message, errors, stack);
    this.statusCode = statusCode;
  }
}

class UnprocessableEntity extends CustomApiError {
  constructor(statusCode, message, errors, stack) {
    super(message, errors, stack);
    this.statusCode = statusCode;
  }
}


module.exports = {
  BadRequest,
  NotFound,
  UnAuthenticated,
  UnAuthenticated,
  UnAuthorized,
  InternalServerError,
  Conflict,
  UnprocessableEntity,
};
