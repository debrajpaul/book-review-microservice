"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const index_1 = require("@stores/index");
class BookService {
    constructor(logger, kafkaClient, reviewTopic) {
        this.logger = logger;
        this.kafkaClient = kafkaClient;
        this.reviewTopic = reviewTopic;
    }
    async getAll() {
        return await index_1.BookModel.find();
    }
    async getById(bookId) {
        return await index_1.BookModel.findById(bookId);
    }
    async create(title) {
        try {
            this.logger.info(`creating book ${title}`);
            const createBook = await index_1.BookModel.create({ title });
            this.logger.debug(`book created: ${title}`);
            return createBook;
        }
        catch (error) {
            this.logger.error(`create failed: ${error.message}`);
            return null;
        }
    }
    async update(bookId, book) {
        try {
            this.logger.info(`updating book ${bookId}`);
            const updatedBook = await index_1.BookModel.findByIdAndUpdate(bookId, book, {
                new: true,
            });
            this.logger.debug(`book updated: ${bookId}`);
            return updatedBook;
        }
        catch (error) {
            this.logger.error(`update failed: ${error.message}`);
            return null;
        }
    }
    async delete(bookId) {
        try {
            this.logger.info(`deleting book ${bookId}`);
            const deletedBook = await index_1.BookModel.findByIdAndDelete(bookId);
            this.logger.debug(`book deleted: ${bookId}`);
            return deletedBook;
        }
        catch (error) {
            this.logger.error(`delete failed: ${error.message}`);
            return null;
        }
    }
    async addReview(bookId, review) {
        try {
            this.logger.info(`reviewing to book ${bookId}`);
            const book = await index_1.BookModel.findById(bookId);
            if (!book) {
                this.logger.error(`book not found: ${bookId}`);
                return;
            }
            book.reviews.push(review);
            await book.save();
            this.logger.debug(`review added to book ${bookId}: ${review.content}`);
            return;
        }
        catch (error) {
            this.logger.error(`addReview failed: ${error.message}`);
            return;
        }
    }
    async emitReview(bookId, review) {
        try {
            this.logger.info(`emitting review event ${bookId}`);
            const book = await index_1.BookModel.findById(bookId);
            if (!book) {
                this.logger.error(`book not found: ${bookId}`);
                return null;
            }
            const event = {
                bookId,
                review,
            };
            await this.kafkaClient.connectProducer();
            await this.kafkaClient.send({
                topic: this.reviewTopic,
                payload: event,
            });
            this.logger.info(`review published to Kafka: ${JSON.stringify(event)}`);
            await this.kafkaClient.disconnectProducer();
            return review;
        }
        catch (error) {
            this.logger.error(`addReview failed: ${error.message}`);
            return null;
        }
    }
}
exports.BookService = BookService;
