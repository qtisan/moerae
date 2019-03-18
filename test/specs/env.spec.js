
import test from 'ava';
import consola from 'consola';

const path = require('path').join(__dirname, '../../.env');
require('dotenv').config({ path });
consola.log(`env path: ${path}`);

test('is process.env set?', (t) => {
  t.is(process.env.MR_HOST, 'moerae.imqx.com');
});
