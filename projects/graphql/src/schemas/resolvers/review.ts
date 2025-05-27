import { logger } from "@utils/logger";
import { GraphQLError } from "graphql";
import { ReviewInputSchema } from "@validation/review";
import { IGraphQLContext } from "@abstractions/index";

export const reviewResolvers = {
  Mutation: {
    addReview: async (
      _: any,
      { bookId, review }: any,
      ctx: IGraphQLContext,
    ) => {
      try {
        const parsed = ReviewInputSchema.safeParse(review);
        if (!parsed.success) {
          logger.error(
            `Invalid review input: ${JSON.stringify(parsed.error.issues)}`,
          );
          throw new GraphQLError("Invalid review input", {
            extensions: {
              code: "BAD_USER_INPUT",
              details: parsed.error.issues,
            },
          });
        }
        return ctx.dataSources.bookService.emitReview(bookId, {
          ...parsed.data,
          id: ctx.dataSources.bookService.generateReviewId(),
        });
      } catch (error) {
        logger.error(`addReview failed: ${(error as Error).message}`);
        throw new GraphQLError("Internal error while adding review", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            originalMessage: (error as Error).message,
          },
        });
      }
    },
  },
};
