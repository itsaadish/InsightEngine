const ResponseFormatter = require('../ResponseFormatter');
const logger = require('../../config/logger');
const { AppError } = require('./AppError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log all unhandled errors
  if (!error.isOperational) {
    logger.error('Unhandled Exception 💥', { error: err.stack });
  } else {
    logger.warn('Operational Error', { error: error.message });
  }

  // Prisma Specific Errors
  if (err.code === 'P2002') {
    const field = err.meta.target;
    error.message = `Duplicate field value entered: ${field}. Please use another value!`;
    error.statusCode = 400;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  ResponseFormatter.error(res, message, statusCode);
};

module.exports = errorHandler;
