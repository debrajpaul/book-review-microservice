"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("./schemas/schema");
describe("GraphQL addReview mutation", () => {
    it("adds a review to a book", async () => {
        const mutation = `
      mutation {
        addReview(bookId: "1", review: { content: "Excellent read!" }) {
          id
          content
        }
      }
    `;
        const result = await (0, graphql_1.graphql)({
            schema: schema_1.schema,
            source: mutation,
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.addReview.content).toContain("Excellent read");
    });
});
