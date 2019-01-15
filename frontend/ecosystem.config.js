
const { join } = require('path');
const LOG_PATH = join('/', process.env.MR_NAME, 'volumes/logs/');

module.exports = {
  apps: [{
    name: process.env.MR_NAME,
    script: 'npm',
    args: 'start',
    log: join(LOG_PATH, 'frontend-server.log'),
    output: join(LOG_PATH, 'frontend-output.log'),
    error: join(LOG_PATH, 'frontend-error.log'),
    port: 8000,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};