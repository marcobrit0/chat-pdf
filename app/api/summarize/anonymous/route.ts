import { NextResponse } from "next/server";
import { summarizePdfText } from "@/lib/ai/openrouter";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import {
  ANON_MAX_FILE_BYTES,
  ANON_MAX_PAGES,
  PDF_MIME_TYPES,
} from "@/lib/constants/limits";
import { parsePdfBuffer } from "@/lib/pdf/inspect";
import { logApiError, userFacingMessage } from "@/lib/security/safe-api-response";
import { getClientIp, hashAnonymousFingerprint } from "@/lib/usage/fingerprint";
import { consumeAnonymousSummarySlot } from "@/lib/usage/anonymous-rate-limit";

export const runtime = "nodejs";

const ROUTE = "api/summarize/anonymous";

/**
 * Placeholder summary when OpenRouter is not configured (keeps API contract for UI tests).
 */
function buildStubSummary(): SummaryPayload & { stub: true } {
  return {
    stub: true,
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

    const ip = getClientIp(request);
    const ua = request.headers.get("user-agent");
    const fp = hashAnonymousFingerprint(ip, ua);
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
    let pageCount = 0;
    let text = "";
    try {
      const parsed = await parsePdfBuffer(buffer);
      pageCount = parsed.pageCount;
      text = parsed.text?.trim() ?? "";
    } catch {
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
      return NextResponse.json(buildStubSummary());
    }

    try {
      const payload = await summarizePdfText(text, { contractIntent });
      return NextResponse.json(payload);
    } catch (e) {
      logApiError(ROUTE, e);
      return NextResponse.json(
        { error: userFacingMessage(e, "A IA não conseguiu concluir o resumo. Tente outro PDF ou mais tarde.") },
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
