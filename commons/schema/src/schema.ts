import { createSchema } from 'graphql-yoga';
import { bookTypeDefs } from './typeDefs/book';
import { reviewTypeDefs } from './typeDefs/review';
import { bookResolvers, reviewResolvers } from './resolvers';

export const resolvers = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...reviewResolvers.Mutation,
  },
  Book: {
    ...bookResolvers.Book,
  },
};

export const schema = createSchema({
  typeDefs: [bookTypeDefs, reviewTypeDefs],
  resolvers,
});
