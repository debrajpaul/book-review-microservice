import mongoose from "mongoose";
import { IConfig } from "@abstractions/IConfig";
import { logger } from "@utils/logger";

export const connectToMongo = (env: IConfig) => {
  const connection_string = `mongodb://${env.mongoHost}:${env.mongoPort}/${env.mongoDB}`;
  mongoose
    .connect(connection_string)
    .then(() => {
      mongoose.set("debug", true);
      console.log("Connected to MongoDB");
      logger.info("Connected to MongoDB");
    })
    .catch(() => {
      console.error("Mongo connection failed! Please check .env setting");
      logger.error("Mongo connection failed! Please check .env setting");
    });
};
