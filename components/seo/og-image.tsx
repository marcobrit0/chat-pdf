import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

type OgImageInput = {
  /** Eyebrow text shown above the title. e.g. "Comparação", "Caso de uso". */
  eyebrow?: string;
  /** Main headline. Kept short (≤ 60 chars) for legibility at preview sizes. */
  title: string;
  /** Optional subtitle / supporting line. */
  subtitle?: string;
};

/**
 * Renders the Apollo-branded 1200×630 Open Graph image.
 *
 * Apollo design language: canvas off-white background, Apollo Gold accent
 * stripe at the bottom, Midnight Ink type. Uses system-fallback fonts (Next's
 * ImageResponse can't load custom fonts without binary embedding) — the result
 * is close enough to the production typography for social preview legibility.
 */
export function renderOgImage({ eyebrow, title, subtitle }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f2",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#000",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "#ebf212",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              fontSize: "30px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            PDFIA
          </span>
        </div>

        {/* Middle: title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {eyebrow ? (
            <span
              style={{
                fontSize: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#736f6c",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <span
            style={{
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              style={{
                fontSize: "28px",
                lineHeight: 1.4,
                color: "#47423d",
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

        {/* Bottom: accent stripe + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "32px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "12px",
              background: "#ebf212",
              borderRadius: "6px",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              color: "#000",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            pdfia.com.br
          </span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
