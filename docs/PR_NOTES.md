# PR notes — ChatPDF

**Repository:** https://github.com/marcobrit0/chat-pdf  
**Default branch:** `main`  
**Feature branch:** `feat/chatpdf-mvp-phase4`

## Completed PR

| Item | Value |
|------|--------|
| PR | https://github.com/marcobrit0/chat-pdf/pull/1 |
| Base | `main` |
| Head | `feat/chatpdf-mvp-phase4` |

## What was run (2026-05-02)

`gh auth status` was OK (account `marcobrit0`, HTTPS, token scopes include `repo`).

```bash
# Uncommitted work was committed on feat/chatpdf-mvp-phase4 before push:
# git add -A && git commit -m "feat: marketing landings, compare/pasta, ..."

gh repo create chat-pdf --public --source=. --remote=origin --description "ChatPDF — AI PDF chat, summarize, and Premium workspace"

git push -u origin main
git push -u origin feat/chatpdf-mvp-phase4

gh pr create --base main --head feat/chatpdf-mvp-phase4 \
  --title "feat: ChatPDF MVP — marketing, APIs, Premium workspace (Phase 4)" \
  --body "...(same Summary / Migrations / Environment / Test plan as below)..."
```

## PR title and body (reference)

**Title:** feat: ChatPDF MVP — marketing, APIs, Premium workspace (Phase 4)

**Body:**

## Summary

- **Marketing / SEO**: landings, shell, sitemap, robots, pricing, legal.
- **Foundation**: Supabase (profiles, subscriptions, documents, RLS), middleware session refresh, Stripe checkout + webhook, anonymous PDF summarize with rate limits, OpenRouter integration.
- **Phase 4 — Premium workspace**: `/app` library (list + upload), document workspace with chat UI and citation panel placeholder, `document_chunks` migration, protected `POST /api/chat/premium` with subscription/stub entitlements, `GET/POST /api/documents` and `GET/DELETE /api/documents/[id]`, grounded prompts with page-labelled chunks (OpenRouter; stub when no key).

## Migrations

Run in order: `supabase/migrations/20250502000000_init_schema.sql`, then `20250502120000_document_chunks.sql`.

## Environment

See `docs/BLOCKERS.md` (incl. `CHATPDF_PREMIUM_STUB`, `OPENROUTER_CHAT_MODEL`).

## Test plan

- `npm run build` / `npm run lint` / `npm run typecheck`
- With `CHATPDF_PREMIUM_STUB=true` and Supabase: upload PDF on `/app`, open workspace, send chat message (stub without `OPENROUTER_API_KEY`).

## One PR vs two

The working tree is a **single cohesive MVP** (initial Create Next App state was almost empty). Splitting into “foundation” vs “marketing” PRs would require reverting/reapplying overlapping files; this delivery is **one PR**. If you prefer two PRs later, use interactive rebase or stacked branches from this baseline.

## GitHub CLI setup

If `gh auth status` fails: run `gh auth login` (browser or token), enable SSO for the org if applicable, then re-run the push / `gh pr create` commands above.
