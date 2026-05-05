"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import type { DocumentRow } from "@/components/app/DocumentLibrary";
import { PREMIUM_UPLOADS_PER_DAY } from "@/lib/constants/limits";

type Props = {
  email: string | null;
  documents: DocumentRow[];
  justUpgraded?: boolean;
};

const SHORTCUTS = [
  { href: "/app/compare", label: "Comparar PDFs", badge: "BETA" },
  { href: "/app/pasta", label: "Pasta de PDFs", badge: "BETA" },
  { href: "/precos", label: "Assinatura", badge: null },
  { href: "/privacidade", label: "Privacidade", badge: null },
] as const;

const TYPE_HINTS: Array<{ test: RegExp; tag: string; code: string }> = [
  { test: /contrat/i, tag: "Contrato", code: "CTR" },
  { test: /edital|licita/i, tag: "Edital", code: "EDT" },
  { test: /ap[óo]lice|seguro/i, tag: "Apólice", code: "APL" },
  { test: /laudo|m[ée]dic/i, tag: "Laudo", code: "LDM" },
  { test: /relat[óo]rio/i, tag: "Relatório", code: "REL" },
  { test: /boleto|fatura/i, tag: "Financeiro", code: "BLT" },
];

function classifyDocument(title: string | null): { tag: string; code: string } {
  if (!title) return { tag: "Documento", code: "PDF" };
  for (const h of TYPE_HINTS) if (h.test.test(title)) return { tag: h.tag, code: h.code };
  return { tag: "Documento", code: "PDF" };
}

function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffH = Math.round((now - then) / 36e5);
  if (diffH < 1) return "agora";
  if (diffH < 24) return `há ${diffH}h`;
  const diffD = Math.round(diffH / 24);
  if (diffD === 1) return "ontem";
  if (diffD < 7) return `${diffD} dias`;
  return new Date(iso).toLocaleDateString("pt-BR");
}

export function WorkspaceShell({ email, documents, justUpgraded = false }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(file: File | null) {
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
      const res = await fetch("/api/documents", { method: "POST", body });
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

  const totalPages = documents.reduce(
    (acc, d) => acc + (typeof d.page_count === "number" ? d.page_count : 0),
    0,
  );

  return (
    <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="hidden border-r border-subtle-gray bg-canvas px-4 py-6 md:block">
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-4">
          <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
            Conta
          </p>
          <p
            className="mt-1 truncate text-[13px] text-graphite"
            title={email ?? ""}
          >
            {email ?? "—"}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-subtle-gray bg-canvas px-2.5 py-1 font-condensed text-[10px] uppercase tracking-[0.18em] text-charcoal-text">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-apollo-gold" />
              Premium
            </span>
            <span className="font-mono text-[10px] tracking-[0.06em] text-faded-stone">
              R$29/mês
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between px-1">
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
              Biblioteca
            </p>
            <span className="font-mono text-[11px] tracking-[0.06em] text-faded-stone">
              {documents.length}
            </span>
          </div>
          {documents.length === 0 ? (
            <p className="mt-3 px-1 text-xs text-faded-stone">
              Sem documentos ainda.
            </p>
          ) : (
            <ul className="mt-2 grid gap-1">
              {documents.slice(0, 8).map((d, i) => {
                const { code } = classifyDocument(d.title);
                return (
                  <li key={d.id}>
                    <Link
                      href={`/app/documents/${d.id}`}
                      className={
                        "block rounded-[6px] border px-3 py-2.5 text-left transition-colors hover:border-subtle-gray hover:bg-crisp-white " +
                        (i === 0
                          ? "border-subtle-gray bg-crisp-white"
                          : "border-transparent")
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-faded-stone">
                          {code}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.06em] text-faded-stone">
                          {relativeDate(d.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-[13px] text-graphite">
                        {d.title ?? "Sem título"}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <p className="px-1 font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
            Atalhos
          </p>
          <ul className="mt-2 grid gap-1">
            {SHORTCUTS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between rounded-[6px] px-3 py-2 text-[13px] text-charcoal-text hover:bg-crisp-white"
                >
                  {s.label}
                  {s.badge ? (
                    <span className="font-mono text-[10px] tracking-[0.06em] text-faded-stone">
                      {s.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <main className="px-4 py-8 sm:px-6 md:px-10 md:py-10">
        {justUpgraded ? (
          <div className="mb-6 rounded-[length:var(--radius-cards)] border border-midnight-ink bg-midnight-ink p-5 text-crisp-white">
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-apollo-gold">
              Pagamento confirmado
            </p>
            <p className="mt-2 font-display text-lg font-semibold leading-tight">
              Bem-vindo ao Premium. Tudo desbloqueado.
            </p>
          </div>
        ) : null}

        {/* Welcome card */}
        <section className="grid gap-8 rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-7 sm:p-8 md:grid-cols-[1fr_280px]">
          <div>
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
              Workspace Premium
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tight text-midnight-ink">
              Bom te ver de volta.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal-text">
              Solte um PDF para gerar resumo, dados-chave e abrir o chat com
              citação de página.
            </p>
          </div>
          <div className="grid content-start gap-2">
            {[
              ["LIMITE", "100 págs"],
              ["HISTÓRICO", "Salvo"],
              ["MODOS", "4 ativos"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-[4px] bg-canvas px-3 py-2 text-[13px]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
                  {k}
                </span>
                <span className="font-medium text-midnight-ink">{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upload + KPIs */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <form
            onSubmit={onSubmit}
            className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Novo documento
              </p>
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
                Premium · até 100 págs
              </span>
            </div>
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
                pickFile(f);
                if (inputRef.current && f.type === "application/pdf") {
                  const dt = new DataTransfer();
                  dt.items.add(f);
                  inputRef.current.files = dt.files;
                }
              }}
              className={
                "mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[length:var(--radius-md)] border border-dashed py-10 px-5 text-center transition-colors " +
                (isDragging
                  ? "border-midnight-ink bg-canvas"
                  : "border-soft-stone bg-canvas hover:border-midnight-ink hover:bg-crisp-white")
              }
            >
              <span className="font-display text-lg font-semibold tracking-tight text-midnight-ink">
                Solte um PDF aqui
              </span>
              <span className="text-sm text-charcoal-text">
                ou{" "}
                <span className="underline underline-offset-4">
                  clique para selecionar
                </span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faded-stone">
                Histórico salvo · indexação por página
              </span>
              <input
                ref={inputRef}
                name="file"
                type="file"
                accept="application/pdf"
                className="sr-only"
                disabled={pending}
                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {fileName ? (
              <p className="mt-3 text-sm text-graphite">
                Arquivo selecionado:{" "}
                <span className="font-medium text-midnight-ink">{fileName}</span>
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending || !fileName}
              className={
                "mt-4 w-full rounded-[length:var(--radius-buttons)] px-5 py-3 text-sm font-medium transition-opacity " +
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

            {error ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </form>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["DOCUMENTOS", String(documents.length), "no total"],
              [
                "ESTE MÊS",
                String(
                  documents.filter((d) => {
                    const t = new Date(d.created_at);
                    const now = new Date();
                    return (
                      t.getMonth() === now.getMonth() &&
                      t.getFullYear() === now.getFullYear()
                    );
                  }).length,
                ),
                "processados",
              ],
              ["PÁGINAS", String(totalPages), "analisadas"],
              ["LIMITE/DIA", String(PREMIUM_UPLOADS_PER_DAY), "uploads"],
            ].map(([k, v, sub]) => (
              <div
                key={k}
                className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone">
                  {k}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-midnight-ink">
                  {v}
                </p>
                <p className="mt-1 text-[11px] text-charcoal-text">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents table */}
        <section className="mt-4 overflow-hidden rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
          <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-4">
            <div>
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Documentos recentes
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-midnight-ink">
                Sua biblioteca
              </h2>
            </div>
            <span className="font-mono text-[11px] tracking-[0.06em] text-faded-stone">
              {documents.length} {documents.length === 1 ? "arquivo" : "arquivos"}
            </span>
          </div>

          {documents.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-charcoal-text">
                Nenhum PDF ainda. Envie um arquivo acima para começar.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[60px_minmax(0,1fr)_120px_140px_100px_24px] gap-4 border-b border-subtle-gray bg-canvas px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-faded-stone md:grid">
                <span>Tipo</span>
                <span>Documento</span>
                <span>Páginas</span>
                <span>Atualizado</span>
                <span>Status</span>
                <span />
              </div>
              <ul>
                {documents.map((d, i) => {
                  const { tag, code } = classifyDocument(d.title);
                  return (
                    <li
                      key={d.id}
                      className={
                        i < documents.length - 1
                          ? "border-b border-subtle-gray"
                          : ""
                      }
                    >
                      <Link
                        href={`/app/documents/${d.id}`}
                        className="grid grid-cols-[60px_minmax(0,1fr)_24px] items-center gap-4 px-5 py-4 transition-colors hover:bg-canvas md:grid-cols-[60px_minmax(0,1fr)_120px_140px_100px_24px]"
                      >
                        <span
                          className="justify-self-start rounded-[3px] border border-subtle-gray bg-canvas px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-midnight-ink"
                          aria-label={tag}
                        >
                          {code}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-display text-[15px] font-semibold tracking-tight text-midnight-ink">
                            {d.title ?? "Sem título"}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-faded-stone">
                            {tag}
                          </p>
                        </div>
                        <span className="hidden font-mono text-xs text-graphite md:inline">
                          {d.page_count != null
                            ? `${d.page_count} págs`
                            : "—"}
                        </span>
                        <span className="hidden font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone md:inline">
                          {relativeDate(d.created_at)}
                        </span>
                        <span className="hidden md:inline">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-subtle-gray bg-canvas px-2.5 py-1 font-condensed text-[10px] uppercase tracking-[0.18em] text-charcoal-text">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-apollo-gold" />
                            Pronto
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="justify-self-end text-faded-stone"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>

        {/* Roadmap cards */}
        <section className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            [
              "Comparar PDFs",
              "Alinhar dois documentos e destacar diferenças por seção.",
              "BETA",
              "/app/compare",
            ],
            [
              "Pasta de PDFs",
              "Agrupar arquivos num projeto com busca compartilhada.",
              "BETA",
              "/app/pasta",
            ],
          ].map(([t, b, badge, href]) => (
            <Link
              key={t}
              href={href}
              className="grid gap-3 rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6 transition-colors hover:border-midnight-ink"
            >
              <div className="flex items-center justify-between">
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Em desenvolvimento
                </p>
                <span className="font-mono text-[10px] tracking-[0.06em] text-faded-stone">
                  {badge}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-midnight-ink">
                {t}
              </h3>
              <p className="text-[13px] leading-relaxed text-charcoal-text">{b}</p>
              <div className="flex items-center justify-between border-t border-subtle-gray pt-3 text-xs">
                <span className="text-charcoal-text">Abrir</span>
                <span aria-hidden="true" className="text-midnight-ink">
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>

        <div className="mt-8 border-t border-subtle-gray pt-6">
          <Link
            href="/precos"
            className="text-sm text-faded-stone underline-offset-4 hover:text-charcoal-text hover:underline"
          >
            Gerenciar assinatura
          </Link>
        </div>
      </main>
    </div>
  );
}
