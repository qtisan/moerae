import test from 'ava';
import {
  camelToHyphenate, camelToUnderscore, underscoreToCamel,
  underscoreToHyphenate, hyphenateToCamel, hyphenateToUnderscore
} from '../../../lib/utilities/conversion';
import { isCnNewID } from '../../../lib/utilities/social';
import { toTree } from '../../../lib/utilities/tree';

test('camelToHyphenate', (t) => {
  const cth = camelToHyphenate('sayHelloWorld');
  t.is(cth, 'say-hello-world');
});
test('camelToUnderscore', (t) => {
  const ctu = camelToUnderscore('sayHelloWorld');
  t.is(ctu, 'say_hello_world');
});

test('underscoreToCamel', (t) => {
  const ctu = underscoreToCamel('say_hello_world');
  t.is(ctu, 'sayHelloWorld');
});
test('underscoreToHyphenate', (t) => {
  const ctu = underscoreToHyphenate('say_hello_world');
  t.is(ctu, 'say-hello-world');
});

test('hyphenateToCamel', (t) => {
  const ctu = hyphenateToCamel('say-hello-world');
  t.is(ctu, 'sayHelloWorld');
});
test('hyphenateToUnderscore', (t) => {
  const ctu = hyphenateToUnderscore('say-hello-world');
  t.is(ctu, 'say_hello_world');
});

test('isCnNewID', (t) => {
  const correctID = isCnNewID('330382198608110018');
  const uncorrectID1 = isCnNewID('231243252343');
  const uncorrectID2 = isCnNewID('320105199909090033');
  const uncorrectID3 = isCnNewID('510492177702310939');
  const uncorrectID4 = isCnNewID('999999999999999999999');
  t.true(correctID);
  t.false(uncorrectID1);
  t.false(uncorrectID2);
  t.false(uncorrectID3);
  t.false(uncorrectID4);
});

test('toTree', (t) => {
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
  t.true(converted.length === 2);
  t.true(converted.find(p => p.name === 'zhang san').children.length === 2);
  t.true(converted.find(p => p.name === 'li si').children[0].name === 'li xiao si');
});
