import { createSchema } from "graphql-yoga";
import { bookTypeDefs, reviewTypeDefs } from "./typeDefs";
import { bookResolvers, reviewResolvers } from "./resolvers";

export const resolvers = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...reviewResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
  Book: {
    ...bookResolvers.Book,
  },
};

export const schema = createSchema({
  typeDefs: [bookTypeDefs, reviewTypeDefs],
  resolvers,
});
