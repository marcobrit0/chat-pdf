<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Design system — use the primitives, not raw Tailwind

The design system is canonical. Tokens live in [DESIGN.md](DESIGN.md) and [app/globals.css](app/globals.css). Reach for primitives in [components/ui/](components/ui/) before reaching for Tailwind utilities.

**Always use:**

- Layout: `<Section bg size>`, `<Container>`, `<SectionHeading eyebrow title cta />`
- Surfaces: `<Card variant="default|elevated|callout|compact">`
- Actions: `<Button>` / `<ButtonLink>` with `variant="primary|secondary|ghost"`
- Labels: `<Eyebrow>`, `<MonoLabel>`, `<Chip>`

**Never write:**

- Arbitrary text sizes — `text-[11px]`, `text-[13px]`, `text-[19px]`, etc. Use the token scale: `text-caption` (12), `text-body-sm` (14), `text-body` (16), `text-body-lg` (18), `text-subheading` (20), `text-heading` (24), `text-heading-lg` (48), `text-display` (88).
- Tailwind default text scale — `text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl`. Use the token scale above.
- Arbitrary section padding — `py-[88px]`, `py-12`, `py-14`, `py-20`, `py-24`. Use `py-section-sm` (56), `py-section-md` (80), `py-section-lg` (96) — or compose via `<Section size>`.
- Arbitrary card padding — `p-3`, `p-4`, `p-5`, `p-6`, `p-8`. Use `p-card-compact` (16), `p-card` (24), `p-card-elevated` (40) — or compose via `<Card variant>`.
- Hex colors in JSX. Promote to a token in [app/globals.css](app/globals.css) `@theme` block first.
- Bespoke eyebrow markup — `font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone`. Use `<Eyebrow>` or the `eyebrow` utility.
- Bespoke mono-meta markup — `font-mono text-[11px] uppercase tracking-[0.06em]…`. Use `<MonoLabel>` or the `mono-label` utility.
- `font-medium` / `font-semibold` on body text. Body Inter loads at weight 400 only — those classes synth-bold. Use `font-display` (Montserrat 500/600) when you need real weight.

**Page width:** outer container is `<Container>` (1240px max, 32px gutters). Inside `<SectionHeading>`, the title block clamps to `narrow|default|wide` — pick one, don't reinvent `max-w-[640px]`.

**When in doubt:** there should be ~3 padding values, ~3 section heights, ~8 type sizes, ~12 colors. If you find yourself reaching for a fourth, you're drifting — fix the spec instead of the consumer.
