import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  content: { type: String, required: true }
});

const BookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  reviews: [ReviewSchema],
});

export const BookModel = mongoose.model('Book', BookSchema);
