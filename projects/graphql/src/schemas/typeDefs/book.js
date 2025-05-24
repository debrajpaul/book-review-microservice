"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTypeDefs = void 0;
exports.bookTypeDefs = `
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
