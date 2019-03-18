const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

app.use(cookieParser());

async function start() {
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(nuxt.render);

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}, at the server port ${port}.`,
    badge: true
  });
}

start();
