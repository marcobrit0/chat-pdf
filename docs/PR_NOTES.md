# PR notes — ChatPDF (local branch, no `origin` yet)

**Branch:** `feat/chatpdf-mvp-phase4` — use `git log -1 --oneline` for the current commit hash.

This repository had **no `git remote` configured** at commit time. After you add a GitHub remote, push the branch and open a PR (or use the suggested `gh` command).

## Suggested branch

- `feat/chatpdf-mvp-phase4` (current work)

## Commands (after `git remote add origin <url>`)

```bash
git checkout feat/chatpdf-mvp-phase4
git push -u origin feat/chatpdf-mvp-phase4
gh pr create --base main --head feat/chatpdf-mvp-phase4 --title "feat: ChatPDF MVP — marketing, APIs, Premium workspace (Phase 4)" --body-file - <<'EOF'
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
EOF
```

## One PR vs two

The working tree is a **single cohesive MVP** (initial Create Next App state was almost empty). Splitting into “foundation” vs “marketing” PRs would require reverting/reapplying overlapping files; this delivery is **one PR**. If you prefer two PRs later, use interactive rebase or stacked branches from this baseline.
