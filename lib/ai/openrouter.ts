import { summarySchema, type SummaryPayload } from "@/lib/ai/summary-schema";

/** Default matches build spec; override via OPENROUTER_SUMMARY_MODEL. */
const DEFAULT_MODEL = "google/gemini-2.5-flash-lite";

/**
 * Calls OpenRouter for a structured PT-BR summary. Throws on HTTP errors or invalid JSON.
 */
export async function summarizePdfText(text: string): Promise<SummaryPayload> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY não configurada");
  }

  const trimmed =
    text.length > 120_000 ? `${text.slice(0, 120_000)}\n[truncado]` : text;

  const model = process.env.OPENROUTER_SUMMARY_MODEL ?? DEFAULT_MODEL;

  const body = {
    model,
    messages: [
      {
        role: "system",
        content:
          "Você resume PDFs em pt-BR. Responda apenas JSON válido no schema pedido, sem markdown.",
      },
      {
        role: "user",
        content: [
          "Extraia um resumo do texto abaixo. Retorne JSON com chaves: summary (string), bulletPoints (array de strings), keyDatesOrValues (array), entities (array de nomes importantes), suggestedQuestions (perguntas de follow-up).",
          "",
          trimmed,
        ].join("\n"),
      },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "ChatPDF Brasil",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("Resposta vazia do modelo");
  }

  const parsed = JSON.parse(raw) as unknown;
  return summarySchema.parse(parsed);
}

/** Label like "p. 3–5" for prompt + UI; `id` matches DB chunk id for citation panel. */
export type GroundedContextChunk = {
  id: string;
  label: string;
  text: string;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };

const DEFAULT_CHAT_MODEL = "google/gemini-2.5-flash-lite";

/** Cap total context sent to the model so large PDFs stay within limits. */
const MAX_CONTEXT_CHARS = 100_000;

/**
 * Multi-turn chat grounded in document chunks. Requires OPENROUTER_API_KEY.
 * Instructs the model to cite page ranges and refuse when the PDF does not support an answer.
 */
export async function premiumDocumentChat(options: {
  contextChunks: GroundedContextChunk[];
  history: ChatTurn[];
  userMessage: string;
}): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY não configurada");
  }

  const model =
    process.env.OPENROUTER_CHAT_MODEL ??
    process.env.OPENROUTER_SUMMARY_MODEL ??
    DEFAULT_CHAT_MODEL;

  let docBody = options.contextChunks
    .map((c) => `#### ${c.label} (ref: ${c.id})\n${c.text}`)
    .join("\n\n---\n\n");

  if (docBody.length > MAX_CONTEXT_CHARS) {
    docBody = `${docBody.slice(0, MAX_CONTEXT_CHARS)}\n\n[…documento truncado por limite de contexto…]`;
  }

  const system = [
    "Você é um assistente em português (Brasil). Use **somente** o material do documento abaixo.",
    "Cite trechos com o rótulo de página indicado, por exemplo [p. 2] ou [p. 3–4], coerente com o trecho usado.",
    "Se a informação não estiver no documento, diga isso claramente. Não invente páginas nem citações.",
    "",
    "Documento:",
    docBody,
  ].join("\n");

  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [
      { role: "system", content: system },
      ...options.history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: options.userMessage },
    ];

  const body = {
    model,
    messages,
    temperature: 0.3,
    max_tokens: 2048,
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "ChatPDF Brasil",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("Resposta vazia do modelo");
  }
  return raw.trim();
}

/**
 * Same as premiumDocumentChat but returns a friendly PT-BR stub when no API key (dev UX).
 */
export async function premiumDocumentChatOrStub(options: {
  contextChunks: GroundedContextChunk[];
  history: ChatTurn[];
  userMessage: string;
}): Promise<{ text: string; stub: boolean }> {
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      stub: true,
      text:
        "[Stub — configure OPENROUTER_API_KEY] Com base no documento carregado, responderia aqui com citações [p. X]. O painel à direita lista os trechos indexados para o Premium.",
    };
  }
  const text = await premiumDocumentChat(options);
  return { text, stub: false };
}
