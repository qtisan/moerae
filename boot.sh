#!/bin/sh

if [ "x$1" = 'xdev' ]; then
  cd ./frontend \
  && npm run dev
else
  cd ./frontend \
  && npm run build \
  && pm2-runtime start ./ecosystem.config.js
fi
