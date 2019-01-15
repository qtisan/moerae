#!/bin/sh

cd ./frontend \
&& npm run build \
&& pm2 install pm2-logrotate \
&& pm2 set pm2-logrotate:compress true \
&& pm2-runtime start ./ecosystem.config.js
