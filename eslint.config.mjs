import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * Design-system guardrails. The Apollo theme exposes a small, ratified set of
 * tokens (see DESIGN.md and components/ui/*). These rules flag drift back to
 * raw Tailwind defaults or arbitrary one-off values in JSX class strings, so
 * the home/app/marketing chrome stays visually consistent.
 *
 * Rules are warn-level by design — content/MDX guides occasionally need
 * arbitrary clamps, and we don't want the build to fail on every legacy file
 * before each is ported. Run `pnpm lint` to surface offenders.
 */
const designTokenGuards = {
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          "Literal[value=/text-\\[(?!clamp)[0-9.]+(px|rem)\\]/]",
        message:
          "Use the type-token scale (text-caption|body-sm|body|body-lg|subheading|heading|heading-lg|display) instead of arbitrary text-[Npx]/[Nrem]. Clamp() is allowed for fluid sizing.",
      },
      {
        // Allowlist the two canonical tracking values used by the eyebrow
        // (0.2em) and mono-label (0.06em) utilities — every other arbitrary
        // tracking value is rejected.
        selector:
          "Literal[value=/tracking-\\[(?!0\\.06em\\]|0\\.2em\\])[0-9.-]+(em|px)\\]/]",
        message:
          "Use the eyebrow/mono-label utility (or text-caption with default tracking). Only tracking-[0.06em] and tracking-[0.2em] are allowed as overrides.",
      },
      {
        selector:
          "Literal[value=/py-\\[(?!clamp)[0-9]+px\\]|pt-\\[[0-9]+px\\]|pb-\\[[0-9]+px\\]/]",
        message:
          "Use py-section-sm|md|lg for section vertical rhythm, or p-card|p-card-elevated|p-card-compact for card padding. No arbitrary py-[Npx].",
      },
      {
        selector:
          "Literal[value=/rounded-\\[[0-9]+px\\]|rounded-\\[length:var\\(/]",
        message:
          "Use rounded-md (4) | rounded-lg (8) | rounded-xl (12). The arbitrary radii fragment the visual system.",
      },
      {
        selector:
          "Literal[value=/(^|\\s)text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)(\\s|$)/]",
        message:
          "Use the design-token text scale (text-caption|body-sm|body|body-lg|subheading|heading|heading-lg|display) instead of Tailwind defaults.",
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.tsx"],
    ...designTokenGuards,
  },
]);

export default eslintConfig;
