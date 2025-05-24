"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@utils/logger");
const connect_1 = require("@stores/connect");
const kafka_1 = require("@queue/kafka");
const book_service_1 = require("@services/book-service");
const environment_1 = require("./environment");
async function processReviews() {
    try {
        (0, connect_1.connectToMongo)(environment_1.config);
        const kafkaClient = new kafka_1.KafkaClient([`${environment_1.config.kafkaBrokersHost}:${environment_1.config.kafkaBrokersPort}`], environment_1.config.clientId);
        const bookService = new book_service_1.BookService(logger_1.logger, kafkaClient, kafka_1.REVIEW_TOPIC);
        await kafkaClient.connectConsumer();
        await kafkaClient.subscribe(kafka_1.REVIEW_TOPIC, async (payload) => {
            const { bookId, review } = payload;
            await bookService.addReview(bookId, review);
        });
    }
    catch (error) {
        logger_1.logger.error(`Failed to process review message: ${error.message}`);
        process.exit(1);
    }
}
processReviews();
