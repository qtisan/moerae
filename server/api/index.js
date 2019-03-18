
import { readdirSync } from 'fs';
import { join } from 'path';
import consola from 'consola';
import { resolve } from 'fast-url-parser';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const api = express();
const schemaDir = join(__dirname, '../graphql/schema');
let typeDefs = [];
let resolverDefs = {};

consola.info('[graphql] - start loading schemas.');
readdirSync(schemaDir)
  .filter(dir => dir.indexOf('.') < 0)
  .forEach((dir) => {
    consola.info(`[graphql] - load schema <${dir}>`);
    const { resolvers, types } = require(join(schemaDir, dir));
    resolverDefs = Object.assign(resolverDefs, resolvers);
    if (types instanceof Array) {
      typeDefs = [...typeDefs, ...types];
    } else {
      typeDefs.push(types);
    }
  });

const cfg = require('../../nuxt.config').apollo.clientConfigs.default;

const server = new ApolloServer({
  typeDefs,
  resolvers: resolverDefs,
  playground: process.env.NODE_ENV === 'development' && {
    endpoint: resolve(cfg.httpEndpoint, cfg.httpLinkOptions.uri)
  }
  // TODO: cache with redis.
  // cache: new RedisCache({
  //   host: 'redis-server'
  //   // Options are passed through to the Redis client
  // })
});
server.applyMiddleware({ app: api, path: '/' });

export default api;
