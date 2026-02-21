const config = require('./config/config');
const logger = require('./config/logger');
const app = require('./app');

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.env} mode`);
});
