
const path = require('path').join(__dirname, '../../.env');

test('environment varibles testing.', () => {
  require('dotenv').config({ path });
  expect(process.env.MR_HOST).toBe('moerae.imqx.com');
});
