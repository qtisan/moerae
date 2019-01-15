#!/bin/sh

if [ $1 = 'dev' ]; then
  cd ./frontend \
  && npm run dev
else
  cd ./frontend \
  && npm run build \
  && pm2-runtime start ./ecosystem.config.js
fi
