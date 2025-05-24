"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaClient = exports.REVIEW_TOPIC = void 0;
const kafkajs_1 = require("kafkajs");
exports.REVIEW_TOPIC = "reviews";
class KafkaClient {
    constructor(brokers, clientId, groupId = "review-group") {
        this.kafka = new kafkajs_1.Kafka({ brokers, clientId });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId });
    }
    async connectProducer() {
        await this.producer.connect();
    }
    async connectConsumer() {
        await this.producer.connect();
    }
    async send(message) {
        await this.producer.send({
            topic: message.topic,
            messages: [{ value: JSON.stringify(message.payload) }],
        });
    }
    async subscribe(topic, onMessage) {
        await this.consumer.subscribe({ topic, fromBeginning: false });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                if (message.value) {
                    const payload = JSON.parse(message.value.toString());
                    await onMessage(payload);
                }
            },
        });
    }
    async disconnectProducer() {
        await this.producer.disconnect();
    }
    async disconnectConsumer() {
        await this.consumer.disconnect();
    }
}
exports.KafkaClient = KafkaClient;
