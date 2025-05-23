import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { IGraphQLContext } from "@abstractions/index";
import { logger } from "@utils/logger";
import { schema } from "./schemas/schema";
import { connectToMongo } from "@stores/connect";
import { BookService } from "@services/book-service";
import { KafkaClient, REVIEW_TOPIC } from '@queue/kafka';
import "dotenv/config";

const kafkaClient = new KafkaClient(
  [process.env.KAFKA_BROKERS || "localhost:9092"],
  "book-service"
);
const yoga = createYoga<IGraphQLContext>({
  schema,
  healthCheckEndpoint: "/live",
  context: () =>{
    return {
       dataSources: {
        bookService: new BookService(logger,kafkaClient,REVIEW_TOPIC)
      }
    }
  }
});
connectToMongo();
const server = createServer(yoga);
server.listen(process.env.PORT || 4004, () => {
  logger.info(`Server is running on http://localhost:${process.env.PORT || 4004}/graphql`);
});