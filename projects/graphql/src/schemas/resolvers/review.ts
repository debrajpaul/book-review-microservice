import { logger } from "@utils/logger";
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
        }
        return ctx.dataSources.bookService.emitReview(bookId, review);
      } catch (error) {
        logger.error(`addReview failed: ${(error as Error).message}`);
        throw new Error("Internal error while adding review");
      }
    },
  },
};
