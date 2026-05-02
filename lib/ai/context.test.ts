import { describe, expect, it } from "vitest";
import { selectRelevantChunks } from "@/lib/ai/openrouter";

describe("selectRelevantChunks", () => {
  it("keeps chunks that share meaningful terms with the user question first", () => {
    const chunks = [
      { id: "1", label: "p. 1", text: "Dados gerais sobre o documento." },
      { id: "2", label: "p. 2", text: "Cláusula de rescisão e multa contratual." },
      { id: "3", label: "p. 3", text: "Informações sobre endereço." },
    ];

    const selected = selectRelevantChunks(chunks, "Qual é a multa de rescisão?", 2);

    expect(selected.map((chunk) => chunk.id)).toEqual(["2", "1"]);
  });
});
