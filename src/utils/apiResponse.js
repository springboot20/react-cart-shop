class ApiResponse {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {any} data
   */

  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = this.statusCode < 400;
  }
}

module.exports = { ApiResponse };
