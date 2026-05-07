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
      setError("Esse arquivo não é PDF. Envie um .pdf pra continuar.");
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
        setError(json.error ?? "Não rolou enviar o PDF. Tenta de novo?");
        return;
      }
      if (json.id) {
        if (inputRef.current) inputRef.current.value = "";
        setFileName(null);
        router.push(`/app/documents/${json.id}`);
        router.refresh();
      }
    } catch {
      setError("Sem conexão. Confere a internet e tenta de novo.");
    } finally {
      setPending(false);
    }
  }

  function openPicker() {
    if (pending) return;
    inputRef.current?.click();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Solte um PDF aí em cima primeiro.");
      return;
    }
    await uploadFile(file);
  }

  const totalPages = documents.reduce(
    (acc, d) => acc + (typeof d.page_count === "number" ? d.page_count : 0),
    0,
  );
  const thisMonth = documents.filter((d) => {
    const t = new Date(d.created_at);
    const now = new Date();
    return (
      t.getMonth() === now.getMonth() && t.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="container-page grid gap-14 pb-20 pt-8 md:grid-cols-[220px_minmax(0,1fr)]">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden self-start md:sticky md:top-20 md:flex md:flex-col md:gap-8">
        <div>
          <p className="eyebrow text-faded-stone">Atalhos</p>
          <ul className="mt-3.5 grid gap-0.5">
            <SidebarLink label="Solte um PDF" href="#drop" active />
            <SidebarLink
              label="Biblioteca"
              href="#biblioteca"
              badge={String(documents.length)}
            />
            <SidebarLink
              label="Comparar PDFs"
              href="/app/compare"
              badge="EM BREVE"
              muted
            />
            <SidebarLink
              label="Pasta de PDFs"
              href="/app/pasta"
              badge="EM BREVE"
              muted
            />
          </ul>
        </div>

        <div>
          <p className="eyebrow text-faded-stone">Conta</p>
          <ul className="mt-3.5 grid gap-0.5">
            <SidebarLink label="Assinatura" href="/precos" />
            <SidebarLink label="Privacidade" href="/privacidade" />
          </ul>
          {email ? (
            <p
              className="mt-4 truncate font-mono text-caption text-faded-stone"
              title={email}
            >
              {email}
            </p>
          ) : null}
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-14">
        {justUpgraded ? (
          <div className="rounded-lg border border-midnight-ink bg-midnight-ink p-card text-crisp-white">
            <p className="eyebrow text-apollo-gold">Pagamento confirmado</p>
            <p className="mt-2 font-display text-subheading font-semibold">
              Premium ativo. Tá tudo liberado pra você usar.
            </p>
          </div>
        ) : null}

        {/* Hero — drop zone is the focal point */}
        <section id="drop">
          <div className="mb-5 flex items-baseline justify-between">
            <p className="eyebrow text-faded-stone">Workspace · Premium</p>
            <span className="mono-label text-faded-stone">
              Até 100 págs · histórico salvo · 4 modos
            </span>
          </div>

          <h1 className="m-0 font-display text-display font-semibold text-midnight-ink text-[clamp(48px,6vw,84px)] leading-[0.96]">
            Solte um PDF.
            <br />
            Receba{" "}
            <span className="bg-apollo-gold px-[0.05em]">resumo</span> com fonte.
          </h1>

          <form onSubmit={onSubmit} className="mt-9">
            <label
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openPicker();
              }}
              onClick={openPicker}
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
                "block cursor-pointer rounded-lg bg-crisp-white px-8 py-16 text-center transition-colors " +
                (isDragging
                  ? "border border-solid border-midnight-ink"
                  : "border border-dashed border-soft-stone hover:border-solid hover:border-midnight-ink")
              }
            >
              <span className="mb-3.5 inline-flex items-center gap-3 text-midnight-ink">
                <UploadGlyph />
                <span className="font-display text-subheading font-semibold">
                  Solte um PDF aqui
                </span>
              </span>
              <span className="block text-body-sm text-charcoal-text">
                ou{" "}
                <span className="text-midnight-ink underline underline-offset-[3px]">
                  clique para selecionar do computador
                </span>
              </span>
              <span className="mt-3.5 block mono-label text-faded-stone">
                Premium · até 100 págs · indexado por página
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
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-body-sm text-graphite">
                  Arquivo escolhido:{" "}
                  <span className="font-medium text-midnight-ink">
                    {fileName}
                  </span>
                </p>
                <button
                  type="submit"
                  disabled={pending}
                  className={
                    "rounded-lg px-5 py-3 text-body-sm font-medium transition-opacity " +
                    (pending
                      ? "cursor-not-allowed bg-subtle-gray text-faded-stone"
                      : "bg-apollo-gold text-midnight-ink hover:opacity-90")
                  }
                >
                  {pending ? "Subindo…" : "Subir e abrir workspace"}
                </button>
              </div>
            ) : null}

            {error ? (
              <p className="mt-4 text-body-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </section>

        {/* Slim mono stats strip — context, not focal */}
        <section>
          <div className="grid grid-cols-2 border-y border-subtle-gray sm:grid-cols-4">
            {[
              ["Documentos", String(documents.length), "no total"],
              ["Este mês", String(thisMonth), "processados"],
              ["Páginas", String(totalPages), "analisadas"],
              ["Limite/dia", String(PREMIUM_UPLOADS_PER_DAY), "uploads"],
            ].map(([k, v, sub], i) => (
              <div
                key={k}
                className={
                  "py-5 " +
                  (i === 0 ? "pl-0 pr-6" : "px-6") +
                  " " +
                  (i < 3
                    ? "border-r-0 sm:border-r sm:border-subtle-gray"
                    : "")
                }
              >
                <div className="mono-label text-faded-stone">{k}</div>
                <div className="mt-2 font-display text-heading leading-none font-semibold text-midnight-ink">
                  {v}
                </div>
                <div className="mt-1.5 font-mono text-caption text-faded-stone">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Library — inline table on hairlines */}
        <section id="biblioteca">
          <div className="mb-[18px] flex items-baseline justify-between">
            <div>
              <p className="eyebrow text-faded-stone">Biblioteca</p>
              <h2 className="mt-2 m-0 font-display text-heading font-semibold text-midnight-ink">
                Documentos recentes
              </h2>
            </div>
            <span className="mono-label text-faded-stone">
              {documents.length} arquivo{documents.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="border-t border-subtle-gray">
            <div className="hidden grid-cols-[60px_minmax(0,1fr)_100px_120px_100px_24px] gap-4 border-b border-subtle-gray py-3 mono-label text-faded-stone md:grid">
              <span>Tipo</span>
              <span>Documento</span>
              <span>Páginas</span>
              <span>Atualizado</span>
              <span>Status</span>
              <span />
            </div>

            {documents.length === 0 ? (
              <div className="py-10 text-center text-body-sm text-faded-stone">
                Sua biblioteca está vazia. Solte um PDF acima para começar.
              </div>
            ) : (
              <ul>
                {documents.map((d) => {
                  const { tag, code } = classifyDocument(d.title);
                  const titleClean = (d.title ?? "Sem título").replace(
                    /\.pdf$/i,
                    "",
                  );
                  return (
                    <li
                      key={d.id}
                      className="border-b border-subtle-gray last:border-b-0"
                    >
                      <Link
                        href={`/app/documents/${d.id}`}
                        className="grid grid-cols-[60px_minmax(0,1fr)_24px] items-center gap-4 py-5 text-left transition-colors hover:bg-crisp-white md:grid-cols-[60px_minmax(0,1fr)_100px_120px_100px_24px]"
                      >
                        <span className="justify-self-start rounded-md border border-subtle-gray bg-canvas px-2 py-1 mono-label text-midnight-ink">
                          {code}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-display text-body font-semibold text-midnight-ink">
                            {titleClean}
                          </div>
                          <div className="mt-1 mono-label text-faded-stone">
                            {tag}
                          </div>
                        </div>
                        <span className="hidden font-mono text-caption text-graphite md:inline">
                          {d.page_count != null ? `${d.page_count} págs` : "—"}
                        </span>
                        <span className="hidden mono-label text-faded-stone md:inline">
                          {relativeDate(d.created_at)}
                        </span>
                        <span className="hidden md:inline">
                          <span className="inline-flex items-center gap-2 rounded-full border border-subtle-gray bg-crisp-white px-3 py-1 eyebrow text-charcoal-text">
                            <span
                              aria-hidden="true"
                              className="inline-block h-1.5 w-1.5 rounded-full bg-status-dot"
                            />
                            Pronto
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="justify-self-end font-mono text-faded-stone"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarLink({
  label,
  href,
  badge,
  active = false,
  muted = false,
}: {
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={
          "flex items-center justify-between py-2 text-body-sm " +
          (active
            ? "font-semibold text-midnight-ink"
            : muted
              ? "text-faded-stone"
              : "text-charcoal-text hover:text-midnight-ink")
        }
      >
        <span
          className={active ? "border-b border-midnight-ink" : ""}
        >
          {label}
        </span>
        {badge ? (
          <span className="mono-label text-faded-stone">{badge}</span>
        ) : null}
      </Link>
    </li>
  );
}

function UploadGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 13V3M10 3l-3.5 3.5M10 3l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13v3a1 1 0 001 1h11a1 1 0 001-1v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
