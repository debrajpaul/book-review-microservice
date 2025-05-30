import { KafkaClient } from "@queue/kafka";
import { BookModel } from "@stores/index";
import * as winston from "winston";
import { IBook, IReview, IBookService } from "@abstractions/index";
import { Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export class BookService implements IBookService {
  constructor(
    private readonly logger: winston.Logger,
    private readonly kafkaClient: KafkaClient,
    private readonly reviewTopic: string,
  ) {}

  public async getAll(): Promise<IBook[]> {
    return await BookModel.find();
  }

  public async getById(bookId: string | Types.ObjectId): Promise<IBook | null> {
    return await BookModel.findById(bookId);
  }

  public async create(title: string): Promise<IBook | null> {
    try {
      this.logger.info(`creating book ${title}`);
      const createBook = await BookModel.create({ title , createdAt: new Date() });
      this.logger.debug(`book created: ${title}`);
      return createBook;
    } catch (error) {
      this.logger.error(`create failed: ${(error as Error).message}`);
      return null;
    }
  }
  public async update(
    bookId: string | Types.ObjectId,
    title: string,
  ): Promise<IBook | null> {
    try {
      this.logger.info(`updating book ${bookId}`);
      const updatedBook = await BookModel.findByIdAndUpdate(
        bookId,
        { title },
        {
          new: true,
        },
      );
      this.logger.debug(`book updated: ${bookId}`);
      return updatedBook;
    } catch (error) {
      this.logger.error(`update failed: ${(error as Error).message}`);
      return null;
    }
  }
  public async delete(bookId: string | Types.ObjectId): Promise<IBook | null> {
    try {
      this.logger.info(`deleting book ${bookId}`);
      const deletedBook = await BookModel.findByIdAndDelete(bookId);
      this.logger.debug(`book deleted: ${bookId}`);
      return deletedBook;
    } catch (error) {
      this.logger.error(`delete failed: ${(error as Error).message}`);
      return null;
    }
  }

  public async addReview(
    bookId: string | Types.ObjectId,
    review: IReview,
  ): Promise<void> {
    try {
      this.logger.info(`reviewing to book ${bookId}`);
      const book = await BookModel.findById(bookId);
      if (!book) {
        this.logger.error(`book not found: ${bookId}`);
        return;
      }
      const isExist = book.reviews.find(r => r.id === review.id);
      if (isExist) {
        this.logger.warn(`review already exists for book ${bookId}: ${review.id}`);
        return;
      }
      book.reviews.push({ ...review, createdAt: new Date()});
      await book.save();
      this.logger.debug(`review added to book ${bookId}: ${review.content}`);
      return;
    } catch (error) {
      this.logger.error(`addReview failed: ${(error as Error).message}`);
      return;
    }
  }

  public async emitReview(
    bookId: string | Types.ObjectId,
    review: IReview,
  ): Promise<IReview | null> {
    try {
      this.logger.info(`emitting review event ${bookId}`);
      const book = await BookModel.findById(bookId);
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
    } catch (error) {
      this.logger.error(`addReview failed: ${(error as Error).message}`);
      return null;
    }
  }
  
  public generateReviewId(): string {
    return uuidv4();
  }
}
