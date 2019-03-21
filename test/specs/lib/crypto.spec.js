
import test from 'ava';
import { encodeByMap, decodeByMap } from '../../../lib/crypto/encoding';

test('encode `hello, world`.', (t) => {
  const code = encodeByMap('hello, world');
  t.is(code, 'vyM4IyMxIyNtb2VyYWVfY3J5cHRI.etxdr6ya7nnfw66xegxj');
});

test('decode code into `hello, world`.', (t) => {
  const origin = decodeByMap('vyM4IyMxIyNtb2VyYWVfY3J5cHRI.etxdr6ya7nnfw66xegxj');
  t.is(origin, 'hello, world');
});
