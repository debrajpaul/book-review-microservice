import { createYoga } from "graphql-yoga";
import { schema } from "./schemas/schema";
import { IGraphQLContext } from "@abstractions/index";

// Mock BookService
const mockBookService = {
  emitReview: jest.fn().mockResolvedValue({
    content: "Excellent read - Verified",
  }),
};

describe("GraphQL addReview mutation", () => {
  it("adds a review to a book", async () => {
    const yoga = createYoga<IGraphQLContext>({
      schema,
      context: async () => ({
        dataSources: {
          bookService: mockBookService,
        },
      }),
    });

    const response = await yoga.fetch("http://localhost/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            addReview(bookId: "1", review: { content: "Excellent read!" }) {
              content
            }
          }
        `,
      }),
    });

    const result = await response.json();

    expect(result.errors).toBeUndefined();
    expect(result.data?.addReview.content).toContain("Excellent read");
    expect(mockBookService.emitReview).toHaveBeenCalledWith("1", {
      content: "Excellent read!",
    });
  });
});
