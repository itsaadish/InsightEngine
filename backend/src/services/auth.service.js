const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { ValidationError, AuthenticationError } = require('../utils/errors/AppError');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(email, password) {
    const existingUser = await this.userRepository.findUnique({ where: { email } });
    if (existingUser) {
      throw new ValidationError('User already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      data: { email, password_hash }
    });

    return { id: user.id, email: user.email };
  }

  async authenticateUser(email, password) {
    const user = await this.userRepository.findUnique({ where: { email } });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1d' });
    return { token, email: user.email };
  }
}

module.exports = AuthService;
