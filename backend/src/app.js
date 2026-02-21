const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const logger = require('./config/logger');
const errorHandler = require('./utils/errors/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Use centralized base router
app.use('/api', routes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Central Error Handling Middleware
app.use(errorHandler);

module.exports = app;
