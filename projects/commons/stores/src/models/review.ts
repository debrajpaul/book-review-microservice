import { Schema } from "mongoose";
import { IReview } from "@abstractions/index";

export const ReviewSchema = new Schema<IReview>({
  content: { type: String, required: true },
});
