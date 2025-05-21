export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    reviews: [Review!]!
  }

  type Query {
    getBooks: [Book!]!
  }
`;
