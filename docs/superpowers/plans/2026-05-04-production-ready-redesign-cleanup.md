# Production-Ready Redesign Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the new PDFIA redesign visuals exactly as-is, while removing every "demo / Demonstração / mock-paper" cosmetic and ensuring every value rendered in the post-upload flow comes from the real `/api/summarize/anonymous` response (which already calls OpenRouter via `summarizePdfText`).

**Architecture:** The wiring is already correct — `app/api/summarize/anonymous/route.ts` parses the PDF (`parsePdfBuffer`), enforces limits, calls `summarizePdfText` (OpenRouter / `google/gemini-2.5-flash-lite` by default), and returns a `SummaryPayload`. What needs to change is *what we render*: extend the success payload with `pageCount`, hide the dev-only `stub` path from production, drop fabricated stats and the mock document preview, and reword the two homepage strings that currently read "demo".

**Tech Stack:** Next.js 16 (App Router, RSC + client components), React 19, Tailwind v4 with the design tokens already in `app/globals.css`, Zod for the summary schema, OpenRouter (Gemini 2.5 Flash Lite) for inference, Supabase for persisted documents, vitest for unit tests.

---

## File Structure

**Modify**
- `lib/ai/summary-schema.ts` — extend the response with `pageCount`.
- `app/api/summarize/anonymous/route.ts` — return real `pageCount`; gate the dev stub behind `NODE_ENV !== "production"`; bubble a real 503 in prod when the key is absent.
- `components/marketing/PdfSummaryClient.tsx` — bind every visible stat to the real payload, drop the `Demonstração` chip, drop the fake confidence/limits, drop the mock `DocPreview`, replace the locked-chat fake assistant answer with the real first suggested question.
- `components/marketing/PdfLoadingAnimation.tsx` — remove the inline "Document mock with scan line" comment label (purely a comment hygiene touch — the visual stays).
- `app/(marketing)/page.tsx` — change the hero card eyebrow chip from "demo" to "exemplo"; change the "Ver demo completo →" button label to "Ver guia completo →".

**Tests**
- `lib/ai/summary-schema.test.ts` *(new)* — proves `pageCount` round-trips through the schema.
- `app/api/summarize/anonymous/route.test.ts` *(new)* — proves the route returns 503 (not a stub) in production when the key is missing, and returns `pageCount` on success in dev.

No new directories; everything fits under existing patterns.

---

### Task 1: Add `pageCount` to the summary schema

**Files:**
- Modify: `lib/ai/summary-schema.ts`
- Test: `lib/ai/summary-schema.test.ts` (create)

- [ ] **Step 1: Write the failing test**

Create `lib/ai/summary-schema.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

```
npx vitest run lib/ai/summary-schema.test.ts
```

Expected: FAIL — `pageCount` is unknown / strip causes the assertion to fail (`pageCount` returned as `undefined`).

- [ ] **Step 3: Update the schema**

Edit `lib/ai/summary-schema.ts` so the file reads:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

```
npx vitest run lib/ai/summary-schema.test.ts
```

Expected: 2 passing.

- [ ] **Step 5: Commit**

```
git add lib/ai/summary-schema.ts lib/ai/summary-schema.test.ts
git commit -m "feat(summary): add optional pageCount to summary schema

Adds an optional pageCount field so the API can surface the real page
count (from parsePdfBuffer) to the UI without round-tripping through
the LLM."
```

---

### Task 2: Return `pageCount` from the anonymous summarize route + drop stub in prod

**Files:**
- Modify: `app/api/summarize/anonymous/route.ts`
- Test: `app/api/summarize/anonymous/route.test.ts` (create)

- [ ] **Step 1: Write the failing tests**

Create `app/api/summarize/anonymous/route.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `parsePdfBuffer` is the only heavy dep we need to fake.
vi.mock("@/lib/pdf/inspect", () => ({
  parsePdfBuffer: vi.fn(async () => ({
    pageCount: 4,
    text: "Conteúdo de teste suficiente para passar do limite mínimo de 40 caracteres.",
  })),
}));
vi.mock("@/lib/pdf/validation", () => ({
  isContentLengthWithinLimit: () => true,
  isPdfMagicBytes: () => true,
}));
vi.mock("@/lib/usage/anonymous-rate-limit", () => ({
  consumeAnonymousSummarySlot: async () => ({ ok: true, remaining: 4 }),
}));
vi.mock("@/lib/usage/fingerprint", () => ({
  getClientIp: () => "127.0.0.1",
  hashAnonymousFingerprint: () => "fp",
}));
vi.mock("@/lib/ai/openrouter", () => ({
  summarizePdfText: vi.fn(async () => ({
    summary: "ok",
    bulletPoints: ["a"],
    keyDatesOrValues: [],
    entities: [],
    suggestedQuestions: [],
  })),
}));

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // "%PDF"

function buildRequest(): Request {
  const file = new File([PDF_BYTES], "doc.pdf", { type: "application/pdf" });
  const fd = new FormData();
  fd.set("file", file);
  return new Request("http://localhost/api/summarize/anonymous", {
    method: "POST",
    body: fd,
  });
}

describe("POST /api/summarize/anonymous", () => {
  const ORIGINAL_ENV = { ...process.env };
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    vi.clearAllMocks();
  });

  it("returns pageCount on success when OPENROUTER_API_KEY is set", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    process.env.NODE_ENV = "production";
    const { POST } = await import("@/app/api/summarize/anonymous/route");
    const res = await POST(buildRequest());
    const body = (await res.json()) as { pageCount?: number; summary?: string };
    expect(res.status).toBe(200);
    expect(body.pageCount).toBe(4);
    expect(body.summary).toBe("ok");
  });

  it("returns 503 (not a stub) in production when the key is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;
    process.env.NODE_ENV = "production";
    const { POST } = await import("@/app/api/summarize/anonymous/route");
    const res = await POST(buildRequest());
    expect(res.status).toBe(503);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```
npx vitest run app/api/summarize/anonymous/route.test.ts
```

Expected: both fail — first asserts on a `pageCount` field the route doesn't yet return, second currently returns 200 with a stub when the key is missing.

- [ ] **Step 3: Update the route**

Edit `app/api/summarize/anonymous/route.ts`. Replace the stub helper and the two relevant blocks:

Replace the existing `buildStubSummary` declaration with:

```ts
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
```

Replace the missing-key block:

```ts
    if (!process.env.OPENROUTER_API_KEY) {
      if (process.env.NODE_ENV === "production") {
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
```

Replace the success block to attach `pageCount`:

```ts
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
```

Also rename the leftover call site at the top of the file: `buildStubSummary` → `buildDevStubSummary` (already done above; double-check there is no remaining `buildStubSummary` reference with `grep -n buildStubSummary app/api/summarize/anonymous/route.ts`).

- [ ] **Step 4: Run tests to verify they pass**

```
npx vitest run app/api/summarize/anonymous/route.test.ts
```

Expected: 2 passing.

- [ ] **Step 5: Run the full test suite**

```
npm run test
```

Expected: all suites green (no regression in the existing `lib/usage/*.test.ts`, `lib/pdf/validation.test.ts`, etc.).

- [ ] **Step 6: Commit**

```
git add app/api/summarize/anonymous/route.ts app/api/summarize/anonymous/route.test.ts
git commit -m "feat(summary api): return pageCount; gate dev stub behind NODE_ENV

In production the route now returns 503 when OPENROUTER_API_KEY is
missing instead of silently serving a stub payload. The dev stub is
preserved for local contributors. Successful responses now include the
real pageCount from parsePdfBuffer so the UI can drop fabricated stats."
```

---

### Task 3: Bind PdfSummaryClient to real payload + drop fabricated UI

**Files:**
- Modify: `components/marketing/PdfSummaryClient.tsx`

- [ ] **Step 1: Replace the hero KPI panel with real payload values**

In `components/marketing/PdfSummaryClient.tsx`, locate the `Results` component's right-side KPI panel (the four-row grid currently rendering `["Idioma","pt-BR"], ["Confiança","~96%"], ["Histórico","Premium"], ["Limite", `${ANON_MAX_PAGES} págs`]`). Replace those rows with values that come from the actual response:

```tsx
        <div className="grid gap-2 self-start text-xs">
          {[
            ["Páginas", result.pageCount != null ? String(result.pageCount) : "—"],
            ["Idioma", "pt-BR"],
            ["Tópicos", String(result.bulletPoints.length)],
            ["Entidades", String(result.entities.length)],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-[4px] bg-canvas px-3 py-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
                {k}
              </span>
              <span className="font-medium text-midnight-ink">{v}</span>
            </div>
          ))}
        </div>
```

- [ ] **Step 2: Drop the "Demonstração" chip in the hero card**

In the same `Results` component, remove this block entirely:

```tsx
            {result.stub ? (
              <span className="rounded-full border border-subtle-gray bg-canvas px-3 py-1 font-condensed text-[11px] uppercase tracking-[0.18em] text-charcoal-text">
                Demonstração
              </span>
            ) : null}
```

The dev stub still works (the rest of the response renders normally); we just stop labelling production output as "demo".

- [ ] **Step 3: Add a real page-count chip into the toolbar**

In the `Results` component's toolbar (the row that currently renders `pt-BR {sizeKb}`), replace that span with a real-data version:

```tsx
          <span className="rounded-[4px] border border-subtle-gray bg-canvas px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-charcoal-text">
            {result.pageCount != null ? `${result.pageCount} págs · ` : ""}pt-BR
          </span>
```

Then delete the now-unused `const sizeKb = "";` line directly above it.

- [ ] **Step 4: Replace the mock DocPreview with a file-metadata card**

Find the `DocPreview` function near the bottom of the file. Replace the entire function body with a metadata card that renders only true facts about the file:

```tsx
function DocPreview({
  fileName,
  pageCount,
}: {
  fileName: string;
  pageCount: number | null;
}) {
  return (
    <div className="overflow-hidden rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
      <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
          Documento
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-faded-stone">
          {pageCount != null ? `${pageCount} págs` : "—"}
        </span>
      </div>
      <dl className="grid gap-3 px-5 py-5 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
            Arquivo
          </dt>
          <dd
            className="truncate text-right font-medium text-midnight-ink"
            title={fileName}
          >
            {fileName}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
            Idioma
          </dt>
          <dd className="text-midnight-ink">pt-BR</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
            Origem
          </dt>
          <dd className="text-midnight-ink">Upload anônimo</dd>
        </div>
      </dl>
    </div>
  );
}
```

Update the single call site in the right-rail aside from `<DocPreview fileName={fileName} />` to:

```tsx
            <DocPreview fileName={fileName} pageCount={result.pageCount ?? null} />
```

- [ ] **Step 5: Replace the fake assistant answer in the locked Premium chat**

Find the `Locked` block titled "Pergunte ao PDF" inside `Results`. Replace the inner JSX (the part that currently renders the fake "VOCÊ … PDFIA …" exchange and the suggestion buttons) with a version that shows only real values from the response — no fabricated assistant text:

```tsx
            <Card title="Pergunte ao PDF" eyebrow="Chat com citação · Premium">
              <div className="grid gap-3">
                {result.suggestedQuestions.length > 0 ? (
                  <div className="flex items-start gap-3 rounded-[length:var(--radius-md)] border border-subtle-gray bg-canvas px-4 py-3">
                    <span className="font-mono text-[11px] uppercase text-faded-stone">
                      VOCÊ
                    </span>
                    <span className="text-sm">{result.suggestedQuestions[0]}</span>
                  </div>
                ) : null}
                <p className="text-sm leading-relaxed text-charcoal-text">
                  No Premium cada resposta é gerada do seu PDF e cita a página
                  exata onde a informação aparece.
                </p>
                {result.suggestedQuestions.length > 1 ? (
                  <div className="flex flex-wrap gap-2 border-t border-subtle-gray pt-3">
                    {result.suggestedQuestions.slice(1, 5).map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() =>
                          onLockedAction("anonymous_suggested_question_click")
                        }
                        className="rounded-[length:var(--radius-md)] border border-midnight-ink/40 px-3 py-1.5 text-xs text-charcoal-text hover:border-midnight-ink hover:text-midnight-ink"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </Card>
```

The locked overlay (with "Desbloquear ↗") stays exactly as it is — it's part of the new design and not "mock data".

- [ ] **Step 6: Verify typecheck + lint pass**

```
npm run typecheck
npx eslint components/marketing/PdfSummaryClient.tsx
```

Expected: both clean.

- [ ] **Step 7: Commit**

```
git add components/marketing/PdfSummaryClient.tsx
git commit -m "fix(summary): bind result UI to real API payload

- Replace fabricated KPI rows (~96% confidence, 10 págs limit) with
  values from the SummaryPayload (pageCount, topic count, entity count).
- Drop the 'Demonstração' chip; the stub flag is dev-only and shouldn't
  leak into the visible UI.
- Replace the decorative DocPreview paper-mock with a metadata card
  (filename / page count / language / source) — no more drawn lines.
- Replace the locked Premium chat's hardcoded fake answer with the
  document's real first suggested question + a neutral teaser line."
```

---

### Task 4: Reword the two homepage "demo" strings

**Files:**
- Modify: `app/(marketing)/page.tsx`

- [ ] **Step 1: Rename the hero card "Saída esperada" chip**

In `app/(marketing)/page.tsx`, find the span that currently renders the literal text `demo` inside the hero card (under "Saída esperada"). Change the inner text from `demo` to `exemplo`:

```tsx
                <span className="rounded-[4px] border border-subtle-gray bg-crisp-white px-1.5 py-0.5 font-mono text-[11px] tracking-[0.04em] text-charcoal-text">
                  exemplo
                </span>
```

The contract-style preview itself stays: it's the design's intentional "what your output will look like" illustration, equivalent to a product-marketing screenshot, and the `exemplo` chip now labels it honestly.

- [ ] **Step 2: Rename the "How it works" CTA**

Still in `app/(marketing)/page.tsx`, find the `Link` whose label is `Ver demo completo →` and rewrite it as:

```tsx
            <Link
              href="/guias/como-resumir-pdf-com-ia"
              className="self-start rounded-[6px] border border-midnight-ink px-3 py-2 text-[13px] font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white md:self-end"
            >
              Ver guia completo →
            </Link>
```

- [ ] **Step 3: Verify build**

```
npm run build
```

Expected: clean build, no new errors.

- [ ] **Step 4: Commit**

```
git add 'app/(marketing)/page.tsx'
git commit -m "copy(home): drop 'demo' wording on hero chip and how-it-works CTA

The output preview is now labelled 'exemplo' (it's a design illustration
of a real summary), and the how-it-works link points to the existing
guide instead of a non-existent demo."
```

---

### Task 5: Comment hygiene in PdfLoadingAnimation

**Files:**
- Modify: `components/marketing/PdfLoadingAnimation.tsx`

The animation itself is decorative motion design (shimmer + scan), not "mock data" — it represents the API call in flight. The only thing to clean up is a misleading source comment.

- [ ] **Step 1: Replace the misleading comment**

In `components/marketing/PdfLoadingAnimation.tsx`, find the line:

```tsx
        {/* Document mock with scan line */}
```

Replace it with:

```tsx
        {/* Stylized document silhouette + scan animation while the API runs. */}
```

- [ ] **Step 2: Commit**

```
git add components/marketing/PdfLoadingAnimation.tsx
git commit -m "chore(loading): clarify decorative-silhouette comment

The scan-line animation is a stylized progress indicator, not a fake
document preview — adjust the comment so future readers don't assume
it's mock data."
```

---

### Task 6: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Type-check, lint, test, build**

Run each, in order, and confirm a clean result before moving on:

```
npm run typecheck
npm run lint
npm run test
npm run build
```

Expected:
- `typecheck` — no output (success)
- `lint` — no errors
- `test` — all suites passing (the two new tests from Tasks 1 and 2 are now part of the suite)
- `build` — clean build, only the pre-existing benign "workspace root" warning

- [ ] **Step 2: Manual smoke (dev server)**

Start the dev server, then exercise the upload flow with a real PDF:

```
npm run dev
```

In a browser:
1. Visit `/` — confirm the navbar matches the screenshot the user shared, the hero "exemplo" chip reads correctly, and "Ver guia completo →" replaces the old "Ver demo completo →".
2. Drop a real PDF on the homepage hero. Confirm the route changes to `/resumir-pdf?from=hero` immediately and the loading animation runs while the API call is in flight.
3. When the response lands: confirm the toolbar shows the real page count, the hero KPI panel shows real topic/entity counts, the right-rail "Documento" card shows the real filename + page count, and the locked Premium chat card shows the API's first suggested question (not a hardcoded line).
4. With `OPENROUTER_API_KEY` unset and `NODE_ENV=production`, hitting the API should now produce a 503 from the route (verify with `curl -X POST -F file=@some.pdf -i http://localhost:3000/api/summarize/anonymous`). With `NODE_ENV=development`, the dev stub still serves the UI for offline contributors.

If any of those checks fails, fix it inline before declaring the plan done.

- [ ] **Step 3: Commit any final touch-ups**

If steps 1–2 surfaced last-mile issues (typo, missed binding), commit them with a tight `fix:` message. Otherwise, no extra commit.

---

## Self-Review

**1. Spec coverage:** All four user requests are addressed —
   - "Wire it back in" → Task 6 manual smoke confirms wiring; Task 2 hardens the production path so we can't accidentally regress to a stub.
   - "Remove mentions of 'demo' across the flow" → Tasks 3 (Demonstração chip), 4 (homepage chip + CTA), 5 (comment).
   - "Create summaries/data based on real PDF data" → Tasks 1+2 surface `pageCount`; Task 3 binds every visible stat in the result UI to real `SummaryPayload` fields; the underlying OpenRouter call was already in place in `lib/ai/openrouter.ts`.
   - "Keep the new designs" → no layout, color token, font, or spacing changes; only the data each visual binds to.

**2. Placeholder scan:** No "TBD / TODO / similar to / handle edge cases" copy. Every code block is complete and pasteable.

**3. Type consistency:** `SummaryPayload` is the single shared type; `pageCount` is added in Task 1 and consumed (via `result.pageCount`) in Task 3 and via the return value in Task 2. The `DocPreview` signature change in Task 3 is updated at its single call site in the same task.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-04-production-ready-redesign-cleanup.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
