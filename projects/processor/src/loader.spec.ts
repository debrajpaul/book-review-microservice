import { logger } from "@utils/logger";
import { connectToMongo } from "@stores/connect";
import { KafkaClient, REVIEW_TOPIC } from "@queue/kafka";
import { BookService } from "@services/book-service";
import { config } from "./environment";
import { processReviews } from "./loader";

// Mock dependencies
jest.mock("@utils/logger");
jest.mock("@stores/connect");
jest.mock("@queue/kafka");
jest.mock("@services/book-service");
jest.mock("./environment", () => ({
  config: {
    kafkaBrokersHost: "localhost",
    kafkaBrokersPort: "9092",
    clientId: "test-client",
  },
}));

describe("processReviews", () => {
  let mockKafkaClient: jest.Mocked<KafkaClient>;
  let mockBookService: jest.Mocked<BookService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockKafkaClient = {
      connectConsumer: jest.fn(),
      subscribe: jest.fn(),
    } as unknown as jest.Mocked<KafkaClient>;
    mockBookService = {
      addReview: jest.fn(),
    } as unknown as jest.Mocked<BookService>;

    (KafkaClient as jest.Mock).mockImplementation(() => mockKafkaClient);
    (BookService as jest.Mock).mockImplementation(() => mockBookService);
  });

  it("should initialize services and process reviews successfully", async () => {
    const testPayload = {
      bookId: "123",
      review: "Great book!",
    };

    await processReviews();

    expect(connectToMongo).toHaveBeenCalledWith(config);
    expect(KafkaClient).toHaveBeenCalledWith(
      [`${config.kafkaBrokersHost}:${config.kafkaBrokersPort}`],
      config.clientId,
    );
    expect(BookService).toHaveBeenCalledWith(
      logger,
      mockKafkaClient,
      REVIEW_TOPIC,
    );
    expect(mockKafkaClient.connectConsumer).toHaveBeenCalled();
    expect(mockKafkaClient.subscribe).toHaveBeenCalledWith(
      REVIEW_TOPIC,
      expect.any(Function),
    );

    // Test the callback function
    const subscribeCallback = mockKafkaClient.subscribe.mock.calls[0][1];
    await subscribeCallback(testPayload);
    expect(mockBookService.addReview).toHaveBeenCalledWith(
      testPayload.bookId,
      testPayload.review,
    );
  });
});
