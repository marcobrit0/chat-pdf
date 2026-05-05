"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export type DocumentRow = {
  id: string;
  title: string | null;
  page_count: number | null;
  created_at: string;
};

type Props = {
  initialDocuments: DocumentRow[];
};

/**
 * Premium library: list persisted PDFs and multipart upload to `/api/documents`.
 * Refreshes the route after a successful import so the server list stays in sync.
 *
 * The drop zone matches the marketing surface (`AnonymousSummaryFlow`) so the
 * upload affordance doesn't regress after a user upgrades.
 */
export function DocumentLibrary({ initialDocuments }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function setSelectedFile(file: File | null) {
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Envie apenas arquivos PDF.");
      return;
    }
    setError(null);
    setFileName(file.name);
  }

  async function uploadFile(file: File) {
    setPending(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/documents", {
        method: "POST",
        body,
      });
      const json = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Falha no envio");
        return;
      }
      if (json.id) {
        if (inputRef.current) inputRef.current.value = "";
        setFileName(null);
        router.push(`/app/documents/${json.id}`);
        router.refresh();
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Selecione um arquivo PDF.");
      return;
    }
    await uploadFile(file);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Adicionar PDF
        </h2>
        <p className="mt-2 text-body-sm text-charcoal-text">
          O texto é extraído no servidor e indexado em trechos com intervalo de
          páginas para citações no chat.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (!f) return;
              setSelectedFile(f);
              if (inputRef.current && f.type === "application/pdf") {
                const dt = new DataTransfer();
                dt.items.add(f);
                inputRef.current.files = dt.files;
              }
            }}
            className={
              "group flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed py-10 px-5 text-center transition-colors " +
              (isDragging
                ? "border-midnight-ink bg-canvas"
                : "border-soft-stone bg-canvas hover:border-midnight-ink")
            }
          >
            <span className="font-display text-subheading font-semibold text-midnight-ink">
              Solte um PDF aqui
            </span>
            <span className="text-body-sm text-charcoal-text">
              ou{" "}
              <span className="underline underline-offset-4">
                clique para selecionar
              </span>
            </span>
            <span className="eyebrow text-faded-stone">
              Premium · até 100 páginas · histórico salvo
            </span>
            <input
              ref={inputRef}
              name="file"
              type="file"
              accept="application/pdf"
              className="sr-only"
              disabled={pending}
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {fileName ? (
            <p className="text-body-sm text-graphite">
              Arquivo selecionado:{" "}
              <span className="font-medium text-midnight-ink">{fileName}</span>
            </p>
          ) : (
            <p className="text-body-sm text-faded-stone">
              Selecione um PDF para criar um novo workspace.
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !fileName}
            className={
              "w-full rounded-lg px-5 py-3 text-body-sm font-medium transition-opacity sm:w-auto " +
              (fileName && !pending
                ? "bg-apollo-gold text-midnight-ink hover:opacity-90"
                : "cursor-not-allowed bg-subtle-gray text-faded-stone")
            }
          >
            {pending
              ? "Enviando…"
              : fileName
                ? "Enviar e abrir workspace"
                : "Selecione um PDF primeiro"}
          </button>
        </form>

        {error ? (
          <p className="mt-3 text-body-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Seus documentos
        </h2>
        {initialDocuments.length === 0 ? (
          <p className="mt-3 text-charcoal-text">
            Nenhum PDF ainda. Envie um arquivo acima para começar o chat com
            fontes.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-subtle-gray rounded-lg border border-subtle-gray bg-crisp-white">
            {initialDocuments.map((d) => (
              <li
                key={d.id}
                className="flex flex-col gap-1 p-card-compact sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    href={`/app/documents/${d.id}`}
                    className="font-medium text-midnight-ink underline-offset-2 hover:underline"
                  >
                    {d.title ?? "Sem título"}
                  </Link>
                  <p className="text-body-sm text-faded-stone">
                    {d.page_count != null
                      ? `${d.page_count} páginas`
                      : "Páginas —"}
                    {" · "}
                    {new Date(d.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Link
                  href={`/app/documents/${d.id}`}
                  className="text-body-sm text-charcoal-text underline"
                >
                  Abrir workspace →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
