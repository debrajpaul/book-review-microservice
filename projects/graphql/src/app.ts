import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import "dotenv/config";
import { logger } from "@utils/logger";
import { schema } from "./schemas/schema";
import { connectToMongo } from "@stores/connect";

const yoga = createYoga({
  schema,
  healthCheckEndpoint: "/live",
});
connectToMongo();
const server = createServer(yoga);
server.listen(4002, () => {
  logger.info("Server is running on http://localhost:4002/graphql");
});
