"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("@utils/logger");
const connectToMongo = (env) => {
    const connection_string = `mongodb://${env.mongoHost}:${env.mongoPort}/${env.mongoDB}`;
    mongoose_1.default
        .connect(connection_string)
        .then(() => {
        mongoose_1.default.set("debug", true);
        console.log("Connected to MongoDB");
        logger_1.logger.info("Connected to MongoDB");
    })
        .catch(() => {
        console.error("Mongo connection failed! Please check .env setting");
        logger_1.logger.error("Mongo connection failed! Please check .env setting");
    });
};
exports.connectToMongo = connectToMongo;
