import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Match the Next.js/TypeScript `@/*` path alias inside tests.
      "@": fileURLToPath(new URL(".", import.meta.url)),
      // Next enforces this marker at build time; tests only need imports to resolve.
      "server-only": fileURLToPath(new URL("./test/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
  },
});
