import { z } from "zod";

/**
 * Modo "Extrair": fatos objetivos do texto — datas, valores, partes, prazos.
 */
export const extractSchema = z.object({
  keyFacts: z.array(z.string()),
  datesValuesAndAmounts: z.array(z.string()),
  partiesOrEntities: z.array(z.string()),
  obligationsOrDeadlines: z.array(z.string()),
});

export type ExtractPayload = z.infer<typeof extractSchema>;

/**
 * Modo "Riscos": observações para revisão humana — nunca apresentar como parecer jurídico.
 */
export const riskSchema = z.object({
  flaggedTopics: z.array(
    z.object({
      area: z.string(),
      observation: z.string(),
      pageReference: z.string().optional(),
    }),
  ),
  missingInformation: z.array(z.string()),
  suggestedReviewQuestions: z.array(z.string()),
});

export type RiskPayload = z.infer<typeof riskSchema>;

/** Modos suportados pelo workspace Premium + `/api/documents/[id]/analyze`. */
export const documentModeEnum = z.enum(["summary", "extract", "risk"]);

export type DocumentMode = z.infer<typeof documentModeEnum>;
