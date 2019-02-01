
const { join } = require('path');
const LOG_PATH = join('/', process.env.MR_NAME, 'volumes/logs/');

module.exports = {
  apps: [{
    name: `${process.env.MR_NAME}-backend`,
    script: 'npm',
    args: 'start',
    log: join(LOG_PATH, 'backend-server.log'),
    output: join(LOG_PATH, 'backend-output.log'),
    error: join(LOG_PATH, 'backend-error.log'),
    port: process.env.MR_SRV_PORT,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};