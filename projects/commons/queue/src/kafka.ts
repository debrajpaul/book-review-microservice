import { Kafka, Producer, Consumer, EachMessagePayload } from "kafkajs";

export const REVIEW_TOPIC: string = "reviews";
export interface KafkaMessage<T = any> {
  topic: string;
  payload: T;
}
export class KafkaClient {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(brokers: string[], clientId: string, groupId = "review-group") {
    this.kafka = new Kafka({ brokers, clientId });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId });
  }

  async connectProducer(): Promise<void> {
    await this.producer.connect();
  }

  async connectConsumer(): Promise<void> {
    await this.producer.connect();
  }

  async send<T>(message: KafkaMessage<T>): Promise<void> {
    await this.producer.send({
      topic: message.topic,
      messages: [{ value: JSON.stringify(message.payload) }],
    });
  }

  async subscribe(
    topic: string,
    onMessage: (payload: any) => Promise<void>,
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (message.value) {
          const payload = JSON.parse(message.value.toString());
          await onMessage(payload);
        }
      },
    });
  }

  async disconnectProducer(): Promise<void> {
    await this.producer.disconnect();
  }

  async disconnectConsumer(): Promise<void> {
    await this.consumer.disconnect();
  }
}
