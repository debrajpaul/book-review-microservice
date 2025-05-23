import { consumer, REVIEW_TOPIC } from '../../../commons/queue/src/kafka';
import { logger } from '../../../commons/utils/src/logger';
import { connectToMongo } from '../../../commons/stores/src/connect';
import { BookModel } from '../../../commons/stores/src/models/book';
import 'dotenv/config';


async function processReviews() {
  connectToMongo();
  await consumer.connect();
  await consumer.subscribe({ topic: REVIEW_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        logger.info(`Received message: ${message.value?.toString()}`);
        const { bookId, review } = JSON.parse(message.value?.toString() || '{}');
        review.content += ' - Verified';
        const book = await BookModel.findOne({id:bookId.trim()});
        if (!book) {
          console.error(`Book not found: ${bookId}`);
          logger.error(`Book not found: ${bookId}`);
          return;
        }
        
        book.reviews.push(review);
        await book.save();

        console.log(`Saved verified review for book ${bookId}`);
        logger.info(`Saved verified review for book ${bookId}`);
      } catch (error) {
        logger.error(`Error processing message: ${(error as Error).message}`);
      }
    }
  }).catch((e)=>{
    logger.error(`Error processing consumer: ${(e as Error).message}`)
  });
}

processReviews();
