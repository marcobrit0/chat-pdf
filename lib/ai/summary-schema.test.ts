import { describe, expect, it } from "vitest";
import {
  normalizeSummaryPayload,
  summarySchema,
} from "@/lib/ai/summary-schema";

describe("summarySchema", () => {
  it("accepts a payload with pageCount", () => {
    const payload = {
      summary: "ok",
      bulletPoints: ["a"],
      keyDatesOrValues: [],
      entities: [],
      suggestedQuestions: [],
      pageCount: 7,
    };
    const parsed = summarySchema.parse(payload);
    expect(parsed.pageCount).toBe(7);
  });

  it("treats pageCount as optional for back-compat", () => {
    const payload = {
      summary: "ok",
      bulletPoints: [],
      keyDatesOrValues: [],
      entities: [],
      suggestedQuestions: [],
    };
    const parsed = summarySchema.parse(payload);
    expect(parsed.pageCount).toBeUndefined();
  });

  it("normalizes layered summaries without capping relevant detail", () => {
    const parsed = normalizeSummaryPayload({
      shortSummary: "Resumo curto para leitura rápida.",
      detailedSummary: "Resumo longo com contexto e nuances do documento.",
      summary: "Resumo legado.",
      bulletPoints: Array.from({ length: 30 }, (_, i) => `Ponto ${i + 1}`),
      keyDatesOrValues: [],
      entities: [],
      suggestedQuestions: [],
    });

    expect(parsed.shortSummary).toBe("Resumo curto para leitura rápida.");
    expect(parsed.detailedSummary).toBe(
      "Resumo longo com contexto e nuances do documento.",
    );
    expect(parsed.bulletPoints).toHaveLength(30);
  });
});
