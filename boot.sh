#!/bin/sh

export NODE_ENV=production

if [ "x$1" = 'xdev' ]; then
  npm run dev
else
  npm run build \
  && pm2-runtime start ./ecosystem.config.js
fi
