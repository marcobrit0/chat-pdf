import { z } from "zod";

/**
 * Structured summary JSON returned to the client (validated after model output).
 *
 * `pageCount` is sourced from `parsePdfBuffer` server-side, not from the model,
 * so the UI can show a real page count next to the result without trusting the LLM.
 */
export const summarySchema = z.object({
  summary: z.string(),
  bulletPoints: z.array(z.string()),
  keyDatesOrValues: z.array(z.string()),
  entities: z.array(z.string()),
  suggestedQuestions: z.array(z.string()),
  pageCount: z.number().int().nonnegative().optional(),
});

export type SummaryPayload = z.infer<typeof summarySchema>;
