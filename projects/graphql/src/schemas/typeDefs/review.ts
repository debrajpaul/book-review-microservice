export const reviewTypeDefs = /* GraphQL */ `
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
