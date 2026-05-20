class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(message) {
    return new CustomError(message, 400);
  }

  static NotFound(message) {
    return new CustomError(message, 404);
  }

  static Unauthorized(message) {
    return new CustomError(message, 401);
  }

  static Forbidden(message) {
    return new CustomError(message, 403);
  }

  static InternalServerError(message) {
    return new CustomError(message || 'Server xatosi', 500);
  }
}

module.exports = CustomError;