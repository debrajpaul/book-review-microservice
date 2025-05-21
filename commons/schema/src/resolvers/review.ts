import { producer, REVIEW_TOPIC } from '../../../queue/src/kafka';
import { logger } from '../../../utils/src/logger';

export const reviewResolvers = {
  Mutation: {
    addReview: async (_: any, { bookId, review }: any) => {
      try {
        const newReview = {
          id: `${Date.now()}`,
          content: review.content,
        };
        logger.info(`Received review for book ${bookId}: ${review.content}`);
        
        const event = {
          bookId,
          review: newReview,
        };

        await producer.connect();
        await producer.send({
          topic: REVIEW_TOPIC,
          messages: [{ value: JSON.stringify(event) }],
        });
        logger.info(`Review published to Kafka: ${JSON.stringify(event)}`);
        await producer.disconnect()
        return event.review;
      } catch (error) {
        logger.error(`addReview failed: ${(error as Error).message}`);
        throw new Error('Internal error while adding review');
      }
    },
  },
};
