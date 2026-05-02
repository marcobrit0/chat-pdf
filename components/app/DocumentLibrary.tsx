"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
 */
export function DocumentLibrary({ initialDocuments }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) {
      setError("Selecione um arquivo PDF.");
      return;
    }

    setPending(true);
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
        fileInput.value = "";
        router.push(`/app/documents/${json.id}`);
        router.refresh();
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          Adicionar PDF
        </h2>
        <p className="mt-2 text-sm text-charcoal-text">
          O texto é extraído no servidor e indexado em trechos com intervalo de
          páginas para citações no chat.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm text-charcoal-text">
            <span className="mb-1 block">Arquivo</span>
            <input
              name="file"
              type="file"
              accept="application/pdf"
              className="w-full border border-ash-gray bg-canvas px-3 py-2 text-sm file:mr-3"
              disabled={pending}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-[length:var(--radius-buttons)] bg-midnight-ink px-5 py-3 text-sm font-medium text-crisp-white disabled:opacity-50"
          >
            {pending ? "Enviando…" : "Enviar e abrir workspace"}
          </button>
        </form>
        {error ? (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          Seus documentos
        </h2>
        {initialDocuments.length === 0 ? (
          <p className="mt-3 text-charcoal-text">
            Nenhum PDF ainda. Envie um arquivo acima para começar o chat com
            fontes.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-subtle-gray rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
            {initialDocuments.map((d) => (
              <li key={d.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href={`/app/documents/${d.id}`}
                    className="font-medium text-midnight-ink underline-offset-2 hover:underline"
                  >
                    {d.title ?? "Sem título"}
                  </Link>
                  <p className="text-sm text-faded-stone">
                    {d.page_count != null ? `${d.page_count} páginas` : "Páginas —"}
                    {" · "}
                    {new Date(d.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Link
                  href={`/app/documents/${d.id}`}
                  className="text-sm text-charcoal-text underline"
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
