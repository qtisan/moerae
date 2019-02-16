import Mongolass from 'mongolass';
import genericPool from 'generic-pool';
import muri from 'muri';
import { env } from '../nuxt.config.js';

const debug = require('debug')('mongo');

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
  create: async () => {
    const mongolass = new Mongolass(mongoUrl, {
      useNewUrlParser: true,
      reconnectTries: 1
    });
    await mongolass.connect();
    return mongolass;
  },
  destroy: mongolass =>
    mongolass.disconnect()
}, options);

const options = Object.assign({}, {
  host: 'localhost',
  port: 27017,
  db: 'test',
  max: 100,
  min: 1,
  acquireTimeoutMillis: 100
}, env.database);
const { mongoUrl } = genUrl(options);
const mongoPool = createPool(mongoUrl, options);

export const acquire = async () => {
  const resource = await mongoPool.acquire();
  debug('Acquire one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size);
  return resource;
};

export const release = async (resource) => {
  if (resource && resource._client && !resource._client.isConnected()) {
    await mongoPool.destroy(resource);
  } else {
    await mongoPool.release(resource);
  }
  debug('Release one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size);
};

// Usage:
// const { once, Schema } = require('./db');
// once(async (db) => {
//   const UserSchema = new Schema('UserSchema', {
//     name: { type: 'string', required: true },
//     age: { type: 'number', default: 18 }
//   });
//   const User = db.model('User', UserSchema);
//   const result = await User.insertOne({ name: 'nswbmw', age: 'wrong age' });
//   doSomethingWith(result);
// });
export const once = async (fn = () => new Promise(resolve => resolve())) => {
  const db = await acquire();
  try {
    await fn(db);
  } finally {
    await release(db);
  }
};

export const middleware = () => async (req, res, next) => {
  req.db = await acquire();
  try {
    await next();
  } finally {
    await release(req.db);
  }
};

export const model = schema => Mongolass.model(schema, require(`./schema/${schema}`));

export default Mongolass;
