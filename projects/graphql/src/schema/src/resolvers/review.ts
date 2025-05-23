import { producer, REVIEW_TOPIC } from '../../../queue/src/kafka';
import { logger } from '../../../utils/src/logger';
import { ReviewInputSchema } from '../../../validation/src/review';

export const reviewResolvers = {
  Mutation: {
    addReview: async (_: any, { bookId, review }: any) => {
      try {
        const parsed = ReviewInputSchema.safeParse(review);
        if (!parsed.success) {
          logger.error(`Invalid review input: ${JSON.stringify(parsed.error.issues)}`);
        }
        const newReview = { content: review.content };
        logger.info(`review for book ${bookId}: ${review.content}`);
        const event = {
          bookId,
          review: newReview,
        };
        await producer.connect();
        await producer.send({
          topic: REVIEW_TOPIC,
          messages: [{ value: JSON.stringify(event) }],
        });
        logger.info(`review published to Kafka: ${JSON.stringify(event)}`);
        await producer.disconnect()
        return {id:bookId,content:newReview.content};
      } catch (error) {
        logger.error(`addReview failed: ${(error as Error).message}`);
        throw new Error('Internal error while adding review');
      }
    },
  },
};
