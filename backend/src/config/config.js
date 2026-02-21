require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5001,
  jwtSecret: process.env.JWT_SECRET || 'secret-key',
  databaseUrl: process.env.DATABASE_URL
};

module.exports = config;
