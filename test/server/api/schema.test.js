
import { loadSchema } from '../../../server/api/schema';

test('loading schemas', () => {
  const { typeDefs, resolverDefs } = loadSchema(require('path').join(__dirname, '../../../server/graphql/schema'));
  expect(typeDefs).toBeTruthy();
  expect(resolverDefs).toBeTruthy();
});
