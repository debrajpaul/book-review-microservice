import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { IGraphQLContext } from "@abstractions/index";
import { logger } from "@utils/logger";
import { schema } from "./schemas/schema";
import { connectToMongo } from "@stores/connect";
import { BookService } from "@services/book-service";
import { KafkaClient, REVIEW_TOPIC } from "@queue/kafka";
import { config } from "./environment";

const kafkaClient = new KafkaClient(
  [`${config.kafkaBrokersHost}:${config.kafkaBrokersPort}`],
  config.clientId,
);
const yoga = createYoga<IGraphQLContext>({
  schema,
  healthCheckEndpoint: "/live",
  context: () => {
    return {
      dataSources: {
        bookService: new BookService(logger, kafkaClient, REVIEW_TOPIC),
      },
    };
  },
});
connectToMongo(config);
const server = createServer(yoga);
server.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}/graphql`);
});
