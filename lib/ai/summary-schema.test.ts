import { describe, expect, it } from "vitest";
import { summarySchema } from "@/lib/ai/summary-schema";

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
});
