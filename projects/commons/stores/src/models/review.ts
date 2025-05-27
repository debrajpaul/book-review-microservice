import { Schema } from "mongoose";
import { IReview } from "@abstractions/index";

export const ReviewSchema = new Schema<IReview>({
  id: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{ _id: false });
