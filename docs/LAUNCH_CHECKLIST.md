# Launch checklist — ChatPDF Brasil

Use esta lista antes de apontar domínio de produção e divulgar SEO em escala.

## Ambiente e URLs

- [ ] `NEXT_PUBLIC_SITE_URL` definido com **HTTPS** e domínio final (ex.: `https://www.seudominio.com.br`).
- [ ] Projeto Vercel ligado ao repositório; **Production Branch** e domínios apex/www configurados no dashboard.
- [ ] Redirect apex → www (ou o contrário), conforme política escolhida.
- [ ] Variáveis duplicadas por ambiente (Preview vs Production) revisadas no painel Vercel.

## Supabase

- [ ] Migrações aplicadas em produção (`supabase/migrations/`), incluindo chunks + RLS.
- [ ] No dashboard Supabase: **RLS habilitado** em todas as tabelas expostas ao cliente anon/authenticated.
- [ ] Políticas conferidas: usuário só lê/escreve próprios `documents`, `document_chunks`, assinatura própria.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` **somente** em variáveis server-side na Vercel (nunca `NEXT_PUBLIC_*`).
- [ ] Storage e buckets (se usados) com políticas restritivas.

## Stripe

- [ ] Modo **live** em produção: `STRIPE_SECRET_KEY` live, webhook endpoint live apontando para `POST /api/stripe/webhook`.
- [ ] `STRIPE_WEBHOOK_SECRET` do webhook **live** (diferente do teste).
- [ ] Price IDs live na allowlist (`STRIPE_PRICE_IDS` ou `STRIPE_PRICE_PREMIUM_*`).
- [ ] Fluxo testado em **test mode** em Preview antes de promover.
- [ ] Customer Portal e políticas de cancelamento alinhadas ao texto em `/termos`.

## OpenRouter e limites

- [ ] `OPENROUTER_API_KEY` apenas server-side; modelo padrão revisado (`OPENROUTER_SUMMARY_MODEL` / `OPENROUTER_CHAT_MODEL` se necessário).
- [ ] Limites anônimos com `ANONYMOUS_RATE_SALT` e Supabase service role para persistir contagens (evitar mapa em memória em prod).
- [ ] Kill-switch opcional: `DISABLE_ANONYMOUS_SUMMARY=true` se precisar cortar abuso rapidamente.

## Segurança após deploy

- [ ] Headers de segurança ativos em produção (`next.config.ts`: CSP, HSTS, etc.).
- [ ] Nenhuma chave secreta referenciada em `NEXT_PUBLIC_*`.
- [ ] Revisar logs de erro na Vercel após primeiros tráfegos reais.

## SEO e indexação

- [ ] `app/sitemap.ts` e `app/robots.ts` refletem URLs de produção.
- [ ] Smoke test manual das landing pages principais e upload/resumo anônimo.

## Analytics (opcional)

- [ ] Se usar PostHog ou similar, definir `NEXT_PUBLIC_POSTHOG_KEY` (e host se aplicável) e validar eventos em staging.

## Pós-go-live

- [ ] Monitorar custos OpenRouter e Stripe nos primeiros dias.
- [ ] Plano de resposta se SEO gerar pico de tráfego abusivo (rate limit + kill-switch).
