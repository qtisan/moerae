
import { gql } from 'apollo-server-express';

export const types = gql`
  type Query {
    getResponse: Response
  }
  type Mutation {
    _empty: String
  }
  type Response {
    status: String
    msg: String
  }
`;

export const resolvers = {
  Query: {
    getResponse: () => ({
      status: 'ok',
      msg: 'I am waiting for a better PRISMA!'
    })
  }
};
