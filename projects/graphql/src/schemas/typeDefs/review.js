"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewTypeDefs = void 0;
exports.reviewTypeDefs = `
  type Review {
    content: String!
  }

  input ReviewInput {
    content: String!
  }

  type Mutation {
    addReview(bookId: ID!, review: ReviewInput!): Review!
  }
`;
