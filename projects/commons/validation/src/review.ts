import { z } from "zod";

export const ReviewInputSchema = z.object({
  content: z.string().min(6, "Review must be at least 6 characters long"),
});
