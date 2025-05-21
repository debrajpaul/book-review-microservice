import { createSchema } from 'graphql-yoga';
import { books, reviews } from './mockDb';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Book {
      id: ID!
      title: String!
      reviews: [Review!]!
    }

    type Review {
      id: ID!
      content: String!
    }

    input ReviewInput {
      content: String!
    }

    type Query {
      getBooks: [Book!]!
    }

    type Mutation {
      addReview(bookId: ID!, review: ReviewInput!): Review!
    }
  `,
  resolvers: {
    Query: {
      getBooks: () => books,
    },
    Mutation: {
      addReview: (_: any, { bookId, review }: any) => {
        const newReview:any = {
          id: `${Date.now()}`,
          content: review.content,
        };
        const book = books.find((b) => b.id === bookId);
        if (!book) throw new Error("Book not found");
        book.reviews.push(newReview);
        // Simulate background job
        setTimeout(() => {
          newReview.content += ' - Verified';
        }, 1000);
        return newReview;
      },
    },
    Book: {
      reviews: (parent: any) => parent.reviews,
    },
  }
});
