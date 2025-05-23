import { Document, Types } from "mongoose";
import { IReview } from "./review";

export interface IBook extends Document {
  _id: Types.ObjectId;
  title: string;
  reviews: IReview[];
}
