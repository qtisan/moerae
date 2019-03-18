
import { gql } from 'apollo-server-express';

export const types = gql`
  type Query {
    status: String
  }
  type Mutation {
    _empty: String
  }
`;

export const resolvers = {
  Query: {
    status: () => 'ok'
  }
};
