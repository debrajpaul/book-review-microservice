export const reviewTypeDefs = /* GraphQL */ `
  type Review {
    id: ID!
    content: String!
    createdAt: String
  }

  input ReviewInput {
    content: String!
  }

  type Mutation {
    addReview(bookId: ID!, review: ReviewInput!): Review!
  }
`;
