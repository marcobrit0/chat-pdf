# Blockers for full production behavior

The app **builds and runs** without the variables below, but some features are stubbed or degraded until you add real project keys.

## Supabase (auth session + DB + anonymous rate limit table)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (public). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key for browser + server client (RLS). |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — webhooks and `anonymous_usage_daily` writes. Without it, anonymous rate limits use an in-memory map (dev only; not for production). |

Apply SQL in `supabase/migrations/20250502000000_init_schema.sql` in the Supabase SQL editor or via CLI.

## Stripe (checkout + webhooks)

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Create Checkout sessions. |
| `STRIPE_WEBHOOK_SECRET` | Verify `POST /api/stripe/webhook`. |
| `STRIPE_PRICE_IDS` *or* `STRIPE_PRICE_PREMIUM_MONTHLY` / `STRIPE_PRICE_PREMIUM_YEARLY` | Allowlist for `POST /api/stripe/checkout` (server rejects unknown price IDs). |
| `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY` / `NEXT_PUBLIC_STRIPE_PRICE_YEARLY` | Optional; only to populate buttons on `/precos` (still re-validated server-side). |

Also set `NEXT_PUBLIC_SITE_URL` for success/cancel redirect URLs in checkout and webhooks in production.

## OpenRouter (real anonymous summaries)

| Variable | Purpose |
|----------|---------|
| `OPENROUTER_API_KEY` | If unset, `POST /api/summarize/anonymous` returns a **stub** JSON payload (clearly marked) after PDF checks. |
| `OPENROUTER_SUMMARY_MODEL` | Optional; defaults to `google/gemini-2.5-flash-lite`. |
| `OPENROUTER_CHAT_MODEL` | Optional; defaults to `OPENROUTER_SUMMARY_MODEL` or `google/gemini-2.5-flash-lite` for Premium grounded chat. |

## Premium workspace (Phase 4)

| Variable | Purpose |
|----------|---------|
| `CHATPDF_PREMIUM_STUB` | Set to `true` to allow document upload + `/api/chat/premium` **without** an active Stripe subscription (local QA only). |
| `CHATPDF_PREMIUM_STUB_USER_IDS` | Comma-separated Supabase `user.id` UUIDs allowed as Premium without subscription (optional alternative to the flag above). |

Without stub env vars, Premium routes require `subscriptions.status` in `active` or `trialing` (synced via Stripe webhooks).

Apply `supabase/migrations/20250502120000_document_chunks.sql` after the init migration so chunk storage + RLS exist.

## Recommended hardening

| Variable | Purpose |
|----------|---------|
| `ANONYMOUS_RATE_SALT` | Secret salt for hashed fingerprints when counting anonymous usage (set in production). |

No irreversible decisions were required from you beyond choosing your Stripe Price IDs and Supabase project when you connect environments.
