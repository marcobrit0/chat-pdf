import { z } from "zod";

/**
 * Structured summary JSON returned to the client (validated after model output).
 */
export const summarySchema = z.object({
  summary: z.string(),
  bulletPoints: z.array(z.string()),
  keyDatesOrValues: z.array(z.string()),
  entities: z.array(z.string()),
  suggestedQuestions: z.array(z.string()),
});

export type SummaryPayload = z.infer<typeof summarySchema>;
