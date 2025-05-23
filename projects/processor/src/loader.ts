import { logger } from "@utils/logger";
import { connectToMongo } from "@stores/connect";
import { KafkaClient, REVIEW_TOPIC } from "@queue/kafka";
import { BookService } from "@services/book-service";
import "dotenv/config";

async function processReviews() {
  try {
    connectToMongo();
    const kafkaClient = new KafkaClient(
      [process.env.KAFKA_BROKERS || "localhost:9092"],
      "book-service",
    );
    const bookService = new BookService(logger, kafkaClient, REVIEW_TOPIC);
    await kafkaClient.connectConsumer();
    await kafkaClient.subscribe(REVIEW_TOPIC, async (payload) => {
      const { bookId, review } = payload;
      await bookService.addReview(bookId, review);
    });
  } catch (error) {
    logger.error(
      `Failed to process review message: ${(error as Error).message}`,
    );
    logger.error(`Startup failure: ${(error as Error).message}`);
    process.exit(1);
  }
}

processReviews();
