import { z } from "zod";
import { documentModeEnum } from "@/lib/ai/document-modes-schema";

/** Keep chat requests bounded before provider billing or prompt construction begins. */
export const MAX_CHAT_TURNS = 12;
export const MAX_CHAT_MESSAGE_CHARS = 4_000;

const uuidSchema = z.string().uuid();

export const documentIdParamSchema = uuidSchema;

const chatTurnSchema = z
  .object({
    // Only user/assistant turns are accepted from the browser; system prompts stay server-owned.
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(MAX_CHAT_MESSAGE_CHARS),
  })
  .strict();

export const chatRequestSchema = z
  .object({
    documentId: uuidSchema,
    messages: z.array(chatTurnSchema).min(1).max(MAX_CHAT_TURNS),
  })
  .strict()
  .refine((value) => value.messages[value.messages.length - 1]?.role === "user", {
    message: "A última mensagem deve ser do usuário.",
    path: ["messages"],
  });

export const analyzeRequestSchema = z
  .object({
    mode: documentModeEnum,
    contractIntent: z.boolean().optional(),
  })
  .strict();

export const checkoutRequestSchema = z
  .object({
    // Stripe Price IDs are server-allowlisted later, but the shape is rejected early.
    priceId: z.string().regex(/^price_[A-Za-z0-9_]+$/),
  })
  .strict();

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
export type AnalyzeRequestInput = z.infer<typeof analyzeRequestSchema>;
export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;

export type JsonValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/**
 * Parses unknown JSON with a runtime schema so malformed public endpoint bodies return 400s.
 */
export async function parseJsonWithSchema<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<JsonValidationResult<T>> {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return { ok: false, error: "JSON inválido." };
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return { ok: false, error: "Dados inválidos." };
  }

  return { ok: true, data: parsed.data };
}
