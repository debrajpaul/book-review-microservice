"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewResolvers = void 0;
const logger_1 = require("@utils/logger");
const review_1 = require("@validation/review");
exports.reviewResolvers = {
    Mutation: {
        addReview: async (_, { bookId, review }, ctx) => {
            try {
                const parsed = review_1.ReviewInputSchema.safeParse(review);
                if (!parsed.success) {
                    logger_1.logger.error(`Invalid review input: ${JSON.stringify(parsed.error.issues)}`);
                }
                return ctx.dataSources.bookService.emitReview(bookId, review);
            }
            catch (error) {
                logger_1.logger.error(`addReview failed: ${error.message}`);
                throw new Error("Internal error while adding review");
            }
        },
    },
};
