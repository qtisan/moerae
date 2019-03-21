
import {
  camelToHyphenate, camelToUnderscore, underscoreToCamel,
  underscoreToHyphenate, hyphenateToCamel, hyphenateToUnderscore
} from '../../lib/utilities/conversion';
import { isCnNewID } from '../../lib/utilities/social';
import { toTree } from '../../lib/utilities/tree';

test('camelToHyphenate', () => {
  const cth = camelToHyphenate('sayHelloWorld');
  expect(cth).toBe('say-hello-world');
});
test('camelToUnderscore', () => {
  const ctu = camelToUnderscore('sayHelloWorld');
  expect(ctu).toBe('say_hello_world');
});

test('underscoreToCamel', () => {
  const ctu = underscoreToCamel('say_hello_world');
  expect(ctu).toBe('sayHelloWorld');
});
test('underscoreToHyphenate', () => {
  const ctu = underscoreToHyphenate('say_hello_world');
  expect(ctu).toBe('say-hello-world');
});

test('hyphenateToCamel', () => {
  const ctu = hyphenateToCamel('say-hello-world');
  expect(ctu).toBe('sayHelloWorld');
});
test('hyphenateToUnderscore', () => {
  const ctu = hyphenateToUnderscore('say-hello-world');
  expect(ctu).toBe('say_hello_world');
});

test('isCnNewID', () => {
  const correctID = isCnNewID('330382198608110018');
  const uncorrectID1 = isCnNewID('231243252343');
  const uncorrectID2 = isCnNewID('320105199909090033');
  const uncorrectID3 = isCnNewID('510492177702310939');
  const uncorrectID4 = isCnNewID('999999999999999999999');
  expect(correctID).toBeTruthy();
  expect(uncorrectID1).toBeFalsy();
  expect(uncorrectID2).toBeFalsy();
  expect(uncorrectID3).toBeFalsy();
  expect(uncorrectID4).toBeFalsy();
});

test('toTree', () => {
  const table = [{
    id: 1,
    name: 'zhang san'
  }, {
    id: 2,
    name: 'li si'
  }, {
    id: 3,
    name: 'zhang da san',
    parent_id: 1
  }, {
    id: 4,
    name: 'zhang er san',
    parent_id: 1
  }, {
    id: 5,
    name: 'li xiao si',
    parent_id: 2
  }];
  const converted = toTree(table);
  expect(converted.length === 2).toBeTruthy();
  expect(converted.find(p => p.name === 'zhang san').children.length === 2).toBeTruthy();
  expect(converted.find(p => p.name === 'li si').children[0].name).toBe('li xiao si');
});
