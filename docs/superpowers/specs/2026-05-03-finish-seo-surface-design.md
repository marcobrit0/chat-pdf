# Finish the SEO surface (bucket A)

**Status:** approved 2026-05-03 · **Scope:** marketing pages + site chrome only

## Goal

Close the remaining gaps in the marketing/SEO surface left after the rebuild PR (#5): synonym pages with no unique angle, missing Open Graph images, a stub guide, no custom 404, legal pages without breadcrumbs, and a permissive robots.ts. Six small items shipped together as one follow-up PR.

## Non-goals

- No work on the authed `/app` surface
- No new guides beyond rewriting the one that already exists
- No XML feed / sitemap-news (premature with one guide)
- No social-proof / testimonials / sample-PDF library (bucket C)

## Items

### 1. Synonym pages — enrich (not noindex)

Three thin pages get distinct angles, ~500 words each:

| Path | Angle | Spine |
|---|---|---|
| `/ia-para-resumir-pdf` | Task-focused | Step-by-step flow · fields the AI extracts (datas, valores, partes, prazos) · sample input→output · when AI beats reading manually |
| `/pdf-ia` | General-audience explainer | "What does it mean for a PDF tool to use AI?" · LLM vs OCR vs pre-AI Acrobat · educational positioning |
| `/ia-pdf` | Use-case roundup hub | "Pessoa X precisa Y → use modo Z" table linking deep into all use-case landings; serves as an internal-linking hub |

Each page: unique H2 structure, unique 4-question FAQ, breadcrumbs, "Veja também" deep links, FAQPage + BreadcrumbList JSON-LD.

### 2. Dynamic Open Graph images

- New root `app/opengraph-image.tsx` emits 1200×630 default: Apollo Gold accent stripe, Midnight Ink wordmark, canvas off-white, page-derived title in Montserrat 550.
- Per-route OG files for high-CTR pages: `/precos`, `/chat-pdf`, `/resumir-pdf`, all 6 comparison pages, top 4 use-cases (CLT, edital, apólice, laudo).
- Everything else inherits the root template (Next.js default behavior).
- Implemented with `ImageResponse` from `next/og`. Edge-rendered. No headless browser.
- Same asset reused for `twitter-image.tsx`.

### 3. Guide rebuild — `/guias/como-resumir-pdf-com-ia`

Rewrite to ~1500 words long-form:
- TL;DR card · table of contents · 5 sections (envio · leitura · perguntas para fazer ao resumo · quando vale Premium · checklist por tipo de documento) · pull-quote callout · "Veja também"
- HowTo + BreadcrumbList JSON-LD
- Reading typography: drop caps on first paragraph, max-w-3xl reading column, body-lg

### 4. Custom 404 — `app/not-found.tsx`

Apollo system: canvas bg, "404" decorative display type, "Não encontramos esta página" headline, "Talvez você esteja procurando..." with 2-column grid of 8 top destinations (resumir-pdf, chat-pdf, precos, vs-chatgpt, CLT, edital, apólice, laudo) + inline upload card at the bottom. Default Next.js noindex behavior is fine.

### 5. /termos and /privacidade

- Wrap in `SeoPageTemplate` for breadcrumbs + consistent typography
- "Última atualização" timestamp at top
- Body verbatim (legal text)
- Indexed (useful trust signal in SERPs)

### 6. robots.ts hardening

```ts
rules: [
  { userAgent: "*", allow: "/", disallow: ["/api/", "/app/", "/auth/"] },
]
```

## Acceptance

- All 30 marketing routes still return 200
- `npm run lint` and `npm run typecheck` clean
- OG image renders for at least one per-route override (visual check) and the root default (visual check)
- View-source on each touched page shows the expected JSON-LD blocks
- 404 reachable by visiting any nonexistent path
- robots.txt at `/robots.txt` shows the disallow lines
