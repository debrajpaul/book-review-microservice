"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const logger_1 = require("@utils/logger");
const schema_1 = require("./schemas/schema");
const connect_1 = require("@stores/connect");
const book_service_1 = require("@services/book-service");
const kafka_1 = require("@queue/kafka");
const environment_1 = require("./environment");
const kafkaClient = new kafka_1.KafkaClient([`${environment_1.config.kafkaBrokersHost}:${environment_1.config.kafkaBrokersPort}`], environment_1.config.clientId);
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.schema,
    healthCheckEndpoint: "/live",
    context: () => {
        return {
            dataSources: {
                bookService: new book_service_1.BookService(logger_1.logger, kafkaClient, kafka_1.REVIEW_TOPIC),
            },
        };
    },
});
(0, connect_1.connectToMongo)(environment_1.config);
const server = (0, http_1.createServer)(yoga);
server.listen(environment_1.config.port, () => {
    logger_1.logger.info(`Server is running on http://localhost:${environment_1.config.port}/graphql`);
});
