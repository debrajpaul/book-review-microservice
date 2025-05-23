export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    reviews: [Review]
  }

  type Query {
    getBooks: [Book!]!
  }

  input BookInput {
    title: String!
  }

  type Mutation {
    addBook(book: BookInput!): Book!
    updateBook(id: ID!, book: BookInput!): Book!
    deleteBook(id: ID!): Book!
  }
`;
