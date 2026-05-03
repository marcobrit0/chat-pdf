"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ANON_MAX_FILE_BYTES,
  ANON_MAX_PAGES,
  PDF_MIME_TYPES,
} from "@/lib/constants/limits";

type Props = {
  /** Where to send the user once a file is selected. */
  redirectTo?: string;
  /** Visual size — `compact` for inline hero, `large` for landings. */
  size?: "compact" | "large";
};

/**
 * Hero-friendly drop-zone. Validates, then redirects to `/resumir-pdf?pending=1`
 * where the full `AnonymousSummaryFlow` picks up the file from sessionStorage.
 *
 * Why redirect instead of summarizing inline: keeps the hero light, defers all
 * the result UI to one canonical surface, and avoids two implementations of the
 * same flow drifting apart.
 */
export function InlineUpload({
  redirectTo = "/resumir-pdf",
  size = "compact",
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])) {
        setError("Envie um arquivo PDF.");
        return;
      }
      if (file.size > ANON_MAX_FILE_BYTES) {
        const mb = Math.round(ANON_MAX_FILE_BYTES / (1024 * 1024));
        setError(`Arquivo grande demais (limite gratuito: ${mb} MB).`);
        return;
      }
      try {
        sessionStorage.setItem(
          "pendingUpload",
          JSON.stringify({ name: file.name, size: file.size, ts: Date.now() }),
        );
      } catch {
        // sessionStorage may be unavailable; flow still continues on next page.
      }
      router.push(`${redirectTo}?from=hero`);
    },
    [redirectTo, router],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const padY = size === "large" ? "py-12" : "py-8";

  return (
    <div className="space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={
          "group flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed " +
          padY +
          " px-5 text-center transition-colors " +
          (dragging
            ? "border-midnight-ink bg-canvas"
            : "border-soft-stone bg-crisp-white hover:border-midnight-ink")
        }
      >
        <span className="font-display text-lg font-semibold text-midnight-ink sm:text-xl">
          Solte um PDF aqui
        </span>
        <span className="text-sm text-charcoal-text">
          ou{" "}
          <span className="underline underline-offset-4">clique para selecionar</span>
        </span>
        <span className="font-condensed text-xs uppercase tracking-[0.18em] text-faded-stone">
          Grátis · Sem cadastro · Até {ANON_MAX_PAGES} páginas
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={onChange}
        />
      </label>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
