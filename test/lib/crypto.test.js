
import { encodeByMap, decodeByMap } from '../../lib/crypto/encoding';

test('encode `hello, world`.', () => {
  const code = encodeByMap('hello, world');
  expect(code).toBe('vyM4IyMxIyNtb2VyYWVfY3J5cHRI.etxdr6ya7nnfw66xegxj');
});

test('decode code into `hello, world`.', () => {
  const origin = decodeByMap('vyM4IyMxIyNtb2VyYWVfY3J5cHRI.etxdr6ya7nnfw66xegxj');
  expect(origin).toBe('hello, world');
});
