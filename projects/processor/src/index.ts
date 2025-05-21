import { consumer, REVIEW_TOPIC } from '../../../commons/queue/src/kafka';
import { logger } from '../../../commons/utils/src/logger';

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: REVIEW_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value?.toString() || '{}');
      console.log(`[Worker] Processed data: ${data}`);
      const review = data.review;
      review.content += ' - Verified';

      console.log(`[Worker] Processed bookId: ${data.bookId}`);
      console.log(`[Worker] Processed review: ${review.content}`);
      logger.info(`Processed review for bookId=${data.bookId}: ${review.content}`);
      // TODO: Save back to DB
    }
  });
})();
