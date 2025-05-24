import * as dotenv from "dotenv";
import path from "path";
import { IConfig } from "@abstractions/IConfig";

console.log(`### path:${path.join(__dirname, "../../../.env")}`);
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const {
  PORT,
  NODE_ENV,
  LOG_LEVEL,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  KAFKA_BROKERS_HOST,
  KAFKA_BROKERS_PORT,
  CLIENT_ID,
} = process.env;

export const config: IConfig = {
  port: PORT as string,
  nodeEnv: NODE_ENV as string,
  logLevel: LOG_LEVEL as string,
  mongoHost: MONGO_HOST as string,
  mongoPort: MONGO_PORT as string,
  mongoDB: MONGO_DB as string,
  kafkaBrokersHost: KAFKA_BROKERS_HOST as string,
  kafkaBrokersPort: KAFKA_BROKERS_PORT as string,
  clientId: CLIENT_ID as string,
};
