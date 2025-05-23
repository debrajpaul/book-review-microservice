import { z } from "zod";

export const ReviewInputSchema = z.object({
  content: z.string().min(5, "Review must be at least 5 characters long"),
});
