import { graphql } from 'graphql';
import { schema } from '../../../commons/schema';

describe('GraphQL addReview mutation', () => {
  it('adds a review to a book', async () => {
    const mutation = `
      mutation {
        addReview(bookId: "1", review: { content: "Excellent read!" }) {
          id
          content
        }
      }
    `;

    const result:any = await graphql({
      schema,
      source: mutation
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.addReview.content).toContain("Excellent read");
  });
});
