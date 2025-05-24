"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewInputSchema = void 0;
const zod_1 = require("zod");
exports.ReviewInputSchema = zod_1.z.object({
    content: zod_1.z.string().min(5, "Review must be at least 5 characters long"),
});
