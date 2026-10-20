import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title is too long"),

  frozen: z.boolean().default(false),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
