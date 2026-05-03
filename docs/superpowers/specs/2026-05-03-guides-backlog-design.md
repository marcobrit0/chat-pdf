# Guides backlog — 8 long-form guides (bucket B2)

**Status:** approved 2026-05-03 · **Scope:** /guias content only

## Goal

Bring the /guias section from 1 published guide to 9. Each new guide matches
the quality of `/guias/como-resumir-pdf-com-ia` (~1500 words, TL;DR, TOC,
HowTo or Article JSON-LD, BreadcrumbList, related links). Architecture is
proven; this is editorial work.

## Topics

| Slug | Pairs with | Schema |
|---|---|---|
| `/guias/como-ler-edital-de-licitacao` | /ler-edital-com-ia | HowTo |
| `/guias/como-analisar-contrato-clt` | /analisar-contrato-clt | HowTo |
| `/guias/como-entender-apolice-de-seguro` | /analisar-apolice-de-seguro | HowTo |
| `/guias/como-entender-laudo-medico` | /entender-laudo-medico | HowTo |
| `/guias/como-conferir-boleto-antes-de-pagar` | /resumir-boleto-ou-fatura | HowTo |
| `/guias/ocr-para-pdf` | (technical, evergreen) | Article |
| `/guias/pdf-protegido-por-senha` | (technical, evergreen) | Article |
| `/guias/comparar-versoes-de-pdf` | /comparar-pdfs | HowTo |

## Per-guide structure

Matches `/guias/como-resumir-pdf-com-ia`:
- `~1200–1500` words
- TL;DR card (border + canvas bg, font-display title)
- Table of contents with anchor links
- 4–5 sections with `id` anchors
- Optional callouts (warnings, examples)
- HowTo or Article JSON-LD
- BreadcrumbList JSON-LD
- "Próximo passo" CTA card linking to paired use-case + /precos
- "Veja também" deep links to 3–5 related pages

## Files

```
NEW   8 × app/(marketing)/guias/<slug>/page.tsx
EDIT  app/(marketing)/guias/page.tsx        # surface 9 guides + topic clusters
EDIT  app/sitemap.ts                         # add 8 URLs at priority 0.6
```

## Acceptance

- All 8 new guide URLs return 200
- Each emits BreadcrumbList JSON-LD; HowTo or Article where appropriate
- /guias index lists all 9 guides
- Sitemap includes 8 new URLs at priority 0.6
- `npm run lint` and `npm run typecheck` clean
- Each guide has TL;DR + TOC + ≥4 unique sections (no template paraphrasing across guides)

## Anti-template-paraphrase discipline

The biggest risk in shipping 8 guides at once is they all sound the same.
Mitigation: each guide is anchored in the actual document type's voice.
- Edital → procedural, procurement-flavored
- CLT → cautious, work-relations-aware
- Apólice → consumer-protection-aware
- Laudo médico → empathetic, patient-facing
- Boleto → fraud-aware, practical
- OCR → technical, troubleshooting
- PDF protegido por senha → technical, mostly-permissive
- Comparar versões → practical, before/after framing
