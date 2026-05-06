"use client";

import { useCallback, useState } from "react";
import { ANON_MAX_FILE_BYTES, ANON_MAX_PAGES, PDF_MIME_TYPES } from "@/lib/constants/limits";

export function UploadShell() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File) => {
    setError(null);
    if (!PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])) {
      setError("Só aceita PDF aqui.");
      return false;
    }
    if (file.size > ANON_MAX_FILE_BYTES) {
      setError("Arquivo grande demais pro grátis.");
      return false;
    }
    setFileName(file.name);
    return true;
  }, []);

  return (
    <div className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
      <h2 className="font-display text-subheading font-semibold">Solta um PDF</h2>
      <p className="mt-2 text-body-sm text-charcoal-text">Até {ANON_MAX_PAGES} páginas, sem cadastro.</p>
      <label className="mt-6 flex cursor-pointer flex-col items-center border border-dashed border-soft-stone py-10">
        <span className="text-body-sm">Escolher PDF do computador</span>
        <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) validateFile(f);
        }} />
      </label>
      {fileName ? <p className="mt-4 text-body-sm">{fileName}</p> : null}
      {error ? <p className="mt-2 text-body-sm text-red-700">{error}</p> : null}
    </div>
  );
}
