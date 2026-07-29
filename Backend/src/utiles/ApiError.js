class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = null,
    stack = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      // Capture stack trace properly
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
