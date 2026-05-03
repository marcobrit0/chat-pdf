# Programmatic SEO — persona × document-type landings (bucket B1)

**Status:** approved 2026-05-03 · **Scope:** marketing surface only · **Stacked on:** main (after PR #5 + PR #6 merged)

## Goal

Capture long-tail Brazilian Portuguese search intent of the form "contrato CLT para RH", "edital para construtora", "laudo médico para paciente". One templated dynamic route + a curated data file generates 23 unique landings, each with persona-specific content (no thin/spam pages).

## Non-goals

- Mass-generated combinations (we curate 23, not 100+)
- Document sub-types (apólice auto vs apólice residencial) — different shape, different PR
- Localization (PT-BR only)
- Real product screenshots on these pages — that's bucket B3

## URL pattern

`/<doc-type>-para-<persona>` — natural Portuguese, matches search-query word order.

| Slug | Targets the query |
|---|---|
| `/contrato-clt-para-rh` | "contrato clt para rh", "analisar contrato clt rh" |
| `/edital-para-construtora` | "edital para construtora", "edital licitação construtora" |
| `/laudo-medico-para-paciente` | "como entender laudo médico", "laudo médico explicado" |

Implementation: `app/(marketing)/[slug]/page.tsx` (dynamic catch-all under the marketing route group) plus `generateStaticParams` listing exactly the 23 known slugs. Static routes in `(marketing)/` (precos, chat-pdf, etc.) take precedence in Next.js, so no conflicts. Unknown slugs call `notFound()` to render the existing 404 page.

## Initial 23 combinations

| Document type | Personas |
|---|---|
| contrato CLT | rh, juridico, empresa-pequena, trabalhador |
| contrato prestação serviços | freelancer, pj, empresa-pequena, juridico |
| edital | empresa-pequena, construtora, gestor-de-licitacao, fornecedor-publico |
| apólice de seguro | segurado, corretor |
| laudo médico | paciente, cuidador, medico |
| proposta comercial | comprador, vendas |
| relatório | gestor, investidor |
| boleto / fatura | pessoa-fisica, empresa |

## Data model

Single typed file `lib/seo/programmatic-seo-data.ts`:

```ts
type ProgrammaticEntry = {
  slug: string;                              // e.g. "contrato-clt-para-rh"
  title: string;                             // page H1
  metaTitle: string;                         // <title>
  metaDescription: string;                   // <meta name="description">
  intro: string;                             // 60–100 word lede
  docTypeLabel: string;                      // "contrato CLT"
  personaLabel: string;                      // "RH"
  contractIntent?: boolean;                  // forwards to AnonymousSummaryFlow
  fields: Array<{ label: string; note: string }>;  // 4–6 persona-specific extraction fields
  faqs: Array<{ q: string; a: string }>;     // 4 persona-specific Q&A
  canonicalUseCase: { href: string; label: string };
  siblings: Array<{ href: string; label: string }>;
};
```

The page renders this through the existing `SeoPageTemplate` (no new component). The `fields` list maps to a "O que a análise cobre" section above the FAQ.

## Per-page anti-thin-content checklist

Each entry must have, at minimum:
- ≥80 words of intro tailored to the persona (no template paraphrase)
- ≥4 unique extraction fields with persona-specific notes
- ≥4 unique FAQ Q&As reflecting questions that persona actually asks
- Persona-aware `metaTitle` and `metaDescription`
- Distinct `canonicalUseCase` link + 2–3 sibling persona links

Total: ~300 unique words/page minimum, ensuring Google sees real differentiation.

## Internal linking on canonical use-case pages

The existing 8 canonical pages get a new "Para sua função" section linking to their persona variants:

| Canonical | Adds links to |
|---|---|
| `/analisar-contrato-clt` | `/contrato-clt-para-rh`, `/contrato-clt-para-juridico`, `/contrato-clt-para-empresa-pequena`, `/contrato-clt-para-trabalhador` |
| `/analisar-contrato-de-prestacao-de-servicos` | freelancer, pj, empresa-pequena, juridico |
| `/ler-edital-com-ia` | empresa-pequena, construtora, gestor-de-licitacao, fornecedor-publico |
| `/analisar-apolice-de-seguro` | segurado, corretor |
| `/entender-laudo-medico` | paciente, cuidador, medico |
| `/analisar-proposta-comercial` | comprador, vendas |
| `/resumir-relatorio-pdf` | gestor, investidor |
| `/resumir-boleto-ou-fatura` | pessoa-fisica, empresa |

This bidirectional internal linking ensures both the canonical and the persona variant get crawled and ranked.

## Sitemap

23 new URLs added at priority 0.7 (long-tail intent, lower than canonical use-cases at 0.8 to avoid signaling them as primary).

## Files touched

```
NEW   lib/seo/programmatic-seo-data.ts
NEW   app/(marketing)/[slug]/page.tsx
EDIT  app/sitemap.ts
EDIT  app/(marketing)/analisar-contrato-clt/page.tsx
EDIT  app/(marketing)/analisar-contrato-de-prestacao-de-servicos/page.tsx
EDIT  app/(marketing)/ler-edital-com-ia/page.tsx
EDIT  app/(marketing)/analisar-apolice-de-seguro/page.tsx
EDIT  app/(marketing)/entender-laudo-medico/page.tsx
EDIT  app/(marketing)/analisar-proposta-comercial/page.tsx
EDIT  app/(marketing)/resumir-relatorio-pdf/page.tsx
EDIT  app/(marketing)/resumir-boleto-ou-fatura/page.tsx
```

## Acceptance

- All 23 new routes return 200
- Unknown slug under (marketing) (e.g. `/foo-para-bar`) returns 404
- Each new page emits FAQPage + BreadcrumbList JSON-LD
- Each canonical use-case page renders the new "Para sua função" section linking to its persona variants
- Sitemap includes the 23 new URLs at priority 0.7
- `npm run lint` and `npm run typecheck` clean
- View source on at least one new page shows distinct content (intro, fields, FAQ) — not a paraphrase of another entry

## Risk mitigations

- **Thin content / spam pattern**: ≥300 unique words/page enforced by data shape; 23 pages is well under any platform's "mass-generated" threshold
- **Cannibalization**: persona pages target long-tail; canonical pages target broad query intent
- **Maintenance**: all data lives in one file; adding new combinations is a few lines + a verification run
