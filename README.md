# ChatPDF Brasil

Phase 0: scaffold Next.js (App Router), Apollo design tokens (`DESIGN.md`), SEO primitives (`lib/seo`), `robots.ts` / `sitemap.ts`, and CI.

## Requisitos

- Node.js 20+
- npm (lockfile: `package-lock.json`)

## Setup local

```bash
cp .env.example .env.local
# Opcional: defina NEXT_PUBLIC_SITE_URL para URLs canônicas corretas
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Rotas públicas

`/`, `/precos`, `/login`, `/chat-pdf`, `/resumir-pdf`, `/guias`, landings SEO (licitações, seguros, laudos, etc.) e páginas legais vivem em `app/(marketing)/`. O segmento `(marketing)` é só organização — não entra na URL.

Iterações recentes (SEO, placeholders Premium, UX de citações): ver **[docs/PHASE7.md](./docs/PHASE7.md)**.

## Scripts

| Comando                | Descrição                   |
| ---------------------- | --------------------------- |
| `npm run dev`          | Servidor de desenvolvimento |
| `npm run build`        | Build de produção           |
| `npm run start`        | Servidor após build         |
| `npm run lint`         | ESLint                      |
| `npm run typecheck`    | `tsc` via `tsconfig.typecheck.json` (fonte, sem tipos em `.next`) |
| `npm run format`       | Prettier (escrever)         |
| `npm run format:check` | Prettier (verificar)        |

## Deploy (Vercel)

1. Conecte o repositório ao Vercel e use **Framework Preset: Next.js**.
2. Em **Environment Variables**, defina pelo menos `NEXT_PUBLIC_SITE_URL` com a URL pública (ex.: `https://seu-dominio.vercel.app` ou domínio customizado).
3. Adicione chaves de Supabase, Stripe e OpenRouter quando as fases seguintes estiverem prontas — veja `.env.example`.

## Próximos passos (produto)

- Evoluções listadas em `docs/PHASE7.md` (OCR, compare real, pastas multi-PDF).
