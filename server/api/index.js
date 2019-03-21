
import { join } from 'path';
import { resolve } from 'fast-url-parser';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchema } from './schema';

const api = express();
const schemaDir = join(__dirname, '../graphql/schema');

const { typeDefs, resolverDefs } = loadSchema(schemaDir);

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
