import { describe, expect, it } from "vitest";
import { chatRequestSchema } from "@/lib/security/request-validation";
import { toPremiumChatRequestMessages } from "@/lib/chat/request-payload";

const documentId = "00000000-0000-4000-8000-000000000000";

describe("toPremiumChatRequestMessages", () => {
  it("strips UI-only assistant metadata before schema validation", () => {
    const messages = toPremiumChatRequestMessages([
      { role: "user", content: "Quando foi feito?" },
      {
        role: "assistant",
        content: "O documento não especifica a data [p. 5–6].",
        pageHints: ["p. 5–6"],
      },
      { role: "user", content: "Quem assina?" },
    ]);

    expect(messages).toEqual([
      { role: "user", content: "Quando foi feito?" },
      {
        role: "assistant",
        content: "O documento não especifica a data [p. 5–6].",
      },
      { role: "user", content: "Quem assina?" },
    ]);
    expect(chatRequestSchema.safeParse({ documentId, messages }).success).toBe(
      true,
    );
  });
});
