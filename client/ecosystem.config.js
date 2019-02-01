
const { join } = require('path');
const LOG_PATH = join('/', process.env.MR_NAME, 'volumes/logs/');

module.exports = {
  apps: [{
    name: `${process.env.MR_NAME}-client`,
    script: 'npm',
    args: 'start',
    log: join(LOG_PATH, 'client-server.log'),
    output: join(LOG_PATH, 'client-output.log'),
    error: join(LOG_PATH, 'client-error.log'),
    port: process.env.MR_APP_PORT,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
