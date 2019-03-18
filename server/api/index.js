
import { readdirSync } from 'fs';
import { join } from 'path';
import { resolve } from 'fast-url-parser';
import express from 'express';
import { gql, ApolloServer } from 'apollo-server-express';

const api = express();

const Query = gql`
  type Query {
    status: String
  }
`;
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
const typeDefs = [Query, Mutation];
let resolvers = {
  Query: {
    status: () => 'ok'
  }
};
readdirSync(join(__dirname, '../graphql/schemas'))
  .filter(dir => dir.indexOf('.') < 0)
  .forEach((dir) => {
    const tmp = require(join(__dirname, '../graphql/schema/', dir)).default;
    resolvers = Object.assign(resolvers, tmp.resolvers);
    typeDefs.push(tmp.types);
  });

const cfg = require('../../nuxt.config').apollo.clientConfigs.default;

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
