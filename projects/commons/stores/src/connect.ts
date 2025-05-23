import mongoose from "mongoose";

export const connectToMongo = () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/bookdb";
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(() =>
      console.log("Mongo connection failed! Please check .env setting"),
    );
};
