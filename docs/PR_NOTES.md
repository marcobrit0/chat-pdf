# PR notes — ChatPDF

**Repository:** https://github.com/marcobrit0/chat-pdf  
**Default branch:** `main`  
**Feature branch (historical):** `feat/chatpdf-mvp-phase4` — **merged** into `main`; safe to delete locally/remotely after sync.

## Completed PR

| Item | Value |
|------|--------|
| PR | https://github.com/marcobrit0/chat-pdf/pull/1 |
| Status | **Merged** into `main` |
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

## Phases 0–7 vs Git (audit)

**Logical phases** (see `docs/PHASE7.md` and related docs) are **not** separate git milestones on this branch.

| Finding | Detail |
|--------|--------|
| **Single PR vs split** | **One PR** — https://github.com/marcobrit0/chat-pdf/pull/1 — contains the full MVP + follow-up marketing/SEO work. There is **no** set of 8 branches/commits that map 1:1 to phases 0–7. |
| **History shape** | MVP arrived in **one GitHub PR** with **few fat commits** on the feature branch (not one commit per plan phase). After merge, **`main` contains the full app**; use small branches for the next milestones. |
| **Stacked PRs pr/phase-0 … pr/phase-7** | **Not created.** There are no commit anchors for eight phases; opening eight PRs into `main` would **repeat the same diff** and waste review. **No force-push to `main`.** |
| **Going forward** | Prefer **new branches per milestone** from `main` after merge, or **interactive rebase / filter-repo** only if the team explicitly wants to rewrite unpublished history — not done here. |

**Optional smaller stack (only if you choose to split later):** the natural non-destructive split is **two** follow-up branches from history — `d459af3` (bulk MVP) then `a72127a` (incremental landings) — not eight. That still does not match “phase 0–7” labels without manual file boundaries.

## PR list and merge order

| Order | PR | Base | Head | Notes |
|------|-----|------|------|--------|
| 1 | https://github.com/marcobrit0/chat-pdf/pull/1 | `main` | `feat/chatpdf-mvp-phase4` | **Merged** — full MVP (marketing, APIs, Premium workspace, later SEO/hardening per repo history). |

**Next:** deploy from `main` (e.g. Vercel), apply secrets per `docs/BLOCKERS.md`, optional `git branch -d feat/chatpdf-mvp-phase4` and delete remote branch if GitHub did not auto-delete.


## GitHub CLI setup

If `gh auth status` fails: run `gh auth login` (browser or token), enable SSO for the org if applicable, then re-run the push / `gh pr create` commands above.
