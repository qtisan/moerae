const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const debug = require('debug')('mongo');
const genericPool = require('generic-pool');
const muri = require('muri');
const { database } = require('../nuxt.config.js');

const defaultOptions = {
  host: 'localhost',
  port: 27017,
  db: 'test',
  max: 100,
  min: 1,
  acquireTimeoutMillis: 100
};

const genUrl = (options) => {
  let mongoUrl = options.uri || options.url;
  let dbName = options.db;
  if (!mongoUrl) {
    if (options.user && options.pass) {
      mongoUrl = `mongodb://${options.user}:${options.pass}@${options.host}:${options.port}/${options.db}`;
    } else {
      mongoUrl = `mongodb://${options.host}:${options.port}/${options.db}`;
    }
  } else {
    const o = muri(mongoUrl);
    dbName = o.db;
  }
  return { mongoUrl, dbName };
};

const createPool = (mongoUrl, options) => genericPool.createPool({
  create: () => MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    reconnectTries: 1
  }),
  destroy: client => client.close()
}, options);

const options = Object.assign({}, defaultOptions, database);
const { mongoUrl, dbName } = genUrl(options);
const mongoPool = createPool(mongoUrl, options);

const acquire = async () => {
  const resource = await mongoPool.acquire();
  debug('Acquire one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size);
  return resource;
};

const release = async (resource) => {
  if (resource && !resource.isConnected()) {
    await mongoPool.destroy(resource);
  } else {
    await mongoPool.release(resource);
  }
  debug('Release one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size);
};

exports.MongoDB = MongoDB;

// Usage:
// const { once } = require('./db');
// once(async (db) => {
//   const user = await db.collection('user').findOne({ user_id: '123' });
//   doSomethingWith(user);
// });
exports.once = async (fn) => {
  const _mongo = await acquire();
  const _db = _mongo.db(dbName);
  try {
    await fn(_db, _mongo);
  } finally {
    await release(_mongo);
  }
};
exports.middleware = () => async (ctx, next) => {
  ctx.mongo = await acquire();
  ctx.db = ctx.mongo.db(dbName);
  try {
    await next();
  } finally {
    await release(ctx.mongo);
  }
};
