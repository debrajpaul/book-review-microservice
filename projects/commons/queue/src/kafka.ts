import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "book-service",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "review-group" });

export const REVIEW_TOPIC = "reviews";
