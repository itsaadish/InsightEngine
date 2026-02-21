const { authService } = require('../di/container');
const ResponseFormatter = require('../utils/ResponseFormatter');
const logger = require('../config/logger');
const { ValidationError, AuthenticationError } = require('../utils/errors/AppError');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new ValidationError('Email and password required');
    }

    const user = await authService.registerUser(email, password);
    logger.info(`New admin user registered: ${email}`);
    
    return ResponseFormatter.success(res, { userId: user.id }, 'Admin user created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new ValidationError('Email and password required');
    }

    const data = await authService.authenticateUser(email, password);
    logger.info(`Admin user logged in: ${email}`);
    
    return ResponseFormatter.success(res, data, 'Login successful');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
