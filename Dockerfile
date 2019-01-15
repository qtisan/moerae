FROM keymetrics/pm2:10-alpine
ARG NODE_ENV
ARG MR_MS
ARG MR_NAME
ARG MR_LOG_PATH
ARG MR_APP_PORT
ARG MR_SRV_PORT

ENV NODE_ENV=${NODE_ENV:-production}
ENV MR_MS ${MR_MS:-imqx}
ENV MR_NAME ${MR_NAME:-moerae}
ENV MR_LOG_PATH ${MR_LOG_PATH:-/var/logs}
ENV MR_APP_PORT ${MR_APP_PORT:-8000}
ENV MR_SRV_PORT ${MR_SRV_PORT:-8337}

WORKDIR /$MR_NAME

ADD . .
RUN chmod +x . \
  && cd frontend \
  && npm install

ENTRYPOINT [ "./boot.sh" ]

VOLUME /$MR_NAME/volumes/logs

EXPOSE ${MR_APP_PORT:-8000}
