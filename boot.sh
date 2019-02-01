#!/bin/sh

if [ "x$1" = 'xdev' ]; then
  cd ./client \
  && npm run dev
else
  cd ./client \
  && npm run build \
  && pm2-runtime start ./ecosystem.config.js \
  && cd ../backend \
  && pm2-runtime start ./ecosystem.config.js 
fi
