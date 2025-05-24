import mongoose, { Schema } from "mongoose";
import { IBook } from "@abstractions/index";
import { ReviewSchema } from "./review";

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    reviews: { type: [ReviewSchema], default: [] },
  },
  {
    timestamps: true,
    _id: true,
  },
);

export const BookModel = mongoose.model<IBook>("Book", BookSchema);
