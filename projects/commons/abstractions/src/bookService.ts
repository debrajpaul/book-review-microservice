import { IBook, IReview } from "./index";
import { Types } from "mongoose";

export interface IBookService {
  getAll(): Promise<IBook[]>;
  getById(bookId: string | Types.ObjectId): Promise<IBook | null>;
  create(title: string): Promise<IBook | null>;
  update(bookId: string | Types.ObjectId, title: string): Promise<IBook | null>;
  delete(bookId: string | Types.ObjectId): Promise<IBook | null>;
  addReview(bookId: string | Types.ObjectId, review: IReview): Promise<void>;
  emitReview(
    bookId: string | Types.ObjectId,
    review: IReview,
  ): Promise<IReview | null>;
}
