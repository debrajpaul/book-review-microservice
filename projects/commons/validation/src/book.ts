import { z } from "zod";

export const BookInputSchema = z.object({
  title: z.string().min(4, "Book title must be at least 4 characters long"),
});
