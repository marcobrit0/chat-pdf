import { NextResponse } from "next/server";
import { summarizePdfText } from "@/lib/ai/openrouter";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import {
  ANON_MAX_FILE_BYTES,
  ANON_MAX_PAGES,
  PDF_MIME_TYPES,
} from "@/lib/constants/limits";
import { parsePdfBuffer } from "@/lib/pdf/inspect";
import {
  isContentLengthWithinLimit,
  isPdfMagicBytes,
} from "@/lib/pdf/validation";
import {
  logApiError,
  userFacingMessage,
} from "@/lib/security/safe-api-response";
import { getClientIp, hashAnonymousFingerprint } from "@/lib/usage/fingerprint";
import { consumeAnonymousSummarySlot } from "@/lib/usage/anonymous-rate-limit";

export const runtime = "nodejs";

const ROUTE = "api/summarize/anonymous";
const MULTIPART_OVERHEAD_BYTES = 1024 * 1024;

/**
 * Dev-only fallback so contributors without an OpenRouter key still get a
 * working UI. Never returned in production — the route surfaces a 503 instead
 * so the operator notices the missing config.
 */
function buildDevStubSummary(pageCount: number): SummaryPayload & { stub: true } {
  return {
    stub: true,
    pageCount,
    summary:
      "Configure OPENROUTER_API_KEY para gerar resumos reais. Este é um retorno de exemplo para desenvolvimento.",
    bulletPoints: [
      "Limite anônimo: até 10 páginas.",
      "Sem chat no plano gratuito anônimo.",
      "Premium desbloqueia conversa com fontes.",
    ],
    keyDatesOrValues: [],
    entities: [],
    suggestedQuestions: ["Quais trechos do PDF você quer explorar no Premium?"],
  };
}

export async function POST(request: Request) {
  try {
    if (process.env.DISABLE_ANONYMOUS_SUMMARY === "true") {
      return NextResponse.json(
        {
          error:
            "Resumos anônimos estão temporariamente indisponíveis. Tente mais tarde ou assine o Premium.",
        },
        { status: 503 },
      );
    }

    if (
      !isContentLengthWithinLimit(
        request,
        ANON_MAX_FILE_BYTES + MULTIPART_OVERHEAD_BYTES,
      )
    ) {
      return NextResponse.json(
        { error: "Arquivo grande demais para o nível gratuito." },
        { status: 413 },
      );
    }

    const form = await request.formData();
    const intentRaw = form.get("intent");
    const contractIntent =
      typeof intentRaw === "string" && intentRaw.trim() === "contrato";

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Campo file é obrigatório (multipart/form-data)." },
        { status: 400 },
      );
    }

    if (
      !PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])
    ) {
      return NextResponse.json(
        { error: "Envie um PDF (application/pdf)." },
        { status: 400 },
      );
    }

    if (file.size > ANON_MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: `Arquivo grande demais para o nível gratuito (máx. ${Math.round(ANON_MAX_FILE_BYTES / (1024 * 1024))} MB).`,
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!isPdfMagicBytes(buffer)) {
      return NextResponse.json(
        { error: "O arquivo enviado não parece ser um PDF válido." },
        { status: 400 },
      );
    }

    let pageCount = 0;
    let text = "";
    try {
      const parsed = await parsePdfBuffer(buffer);
      pageCount = parsed.pageCount;
      text = parsed.text?.trim() ?? "";
    } catch (e) {
      logApiError(ROUTE, e);
      return NextResponse.json(
        {
          error:
            "Não foi possível ler o PDF (arquivo corrompido ou protegido por senha).",
        },
        { status: 400 },
      );
    }

    if (pageCount > ANON_MAX_PAGES) {
      return NextResponse.json(
        {
          error: `Este PDF tem ${pageCount} páginas. O resumo anônimo gratuito aceita até ${ANON_MAX_PAGES} páginas.`,
          pageCount,
        },
        { status: 400 },
      );
    }

    if (!text || text.length < 40) {
      return NextResponse.json(
        {
          error:
            "Texto insuficiente (PDF escaneado ou vazio). Tente um PDF com texto selecionável.",
        },
        { status: 400 },
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      if (process.env.NODE_ENV === "production") {
        logApiError(
          ROUTE,
          new Error("OPENROUTER_API_KEY missing in production"),
        );
        return NextResponse.json(
          {
            error:
              "Resumos temporariamente indisponíveis. Tente novamente em alguns minutos.",
          },
          { status: 503 },
        );
      }
      return NextResponse.json(buildDevStubSummary(pageCount));
    }

    const ip = getClientIp(request);
    const fp = hashAnonymousFingerprint(ip);
    const rate = await consumeAnonymousSummarySlot(fp);
    if (!rate.ok) {
      return NextResponse.json(
        {
          error:
            "Limite diário de resumos anônimos atingido. Tente amanhã ou assine o Premium.",
        },
        { status: 429 },
      );
    }

    try {
      const payload = await summarizePdfText(text, { contractIntent });
      return NextResponse.json({ ...payload, pageCount });
    } catch (e) {
      logApiError(ROUTE, e);
      return NextResponse.json(
        {
          error: userFacingMessage(
            e,
            "A IA não conseguiu concluir o resumo. Tente outro PDF ou mais tarde.",
          ),
        },
        { status: 502 },
      );
    }
  } catch (e) {
    logApiError(ROUTE, e);
    return NextResponse.json(
      { error: userFacingMessage(e, "Não foi possível processar o pedido.") },
      { status: 500 },
    );
  }
}
