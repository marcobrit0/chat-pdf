import Link from "next/link";

type Props = {
  email: string | null;
};

const featurePreview = [
  {
    label: "Chat com o PDF, com a página citada",
    body: "Pergunta em português normal; a resposta vem com a página exata de onde a IA tirou. Toda vez.",
  },
  {
    label: "Modos prontos por tipo de PDF",
    body: "Resumo aprofundado, extrair dados (datas, valores, partes) e mapear riscos — sem montar prompt.",
  },
  {
    label: "PDFs longos, até 100 páginas",
    body: "Contrato de 60 páginas, edital de 80, apólice cheia de cláusula — não corta no meio.",
  },
  {
    label: "Biblioteca salva na conta",
    body: "Tudo o que você já analisou fica disponível pra voltar e perguntar de novo depois.",
  },
  {
    label: "Feito pra documento brasileiro",
    body: "Contrato CLT, edital de licitação, apólice de seguro e laudo médico têm modos dedicados.",
  },
  {
    label: "Exportar pro time",
    body: "Resumo + perguntas em PDF + Markdown, prontos pra compartilhar no Slack ou no e-mail.",
  },
] as const;

/**
 * Authenticated-but-not-Premium landing. Replaces the prior raw "gate.reason"
 * error screen with a desire-first upsell: shows what's behind the wall and
 * a single, prominent path to /precos.
 */
export function PremiumUpsell({ email }: Props) {
  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
        <div className="space-y-6">
          <p className="eyebrow text-faded-stone">
            {email ? `Logado como ${email}` : "Conta criada"} · Ainda no grátis
          </p>
          <h1 className="font-display text-display font-semibold text-midnight-ink text-[clamp(36px,5vw,60px)]">
            Falta um clique pra usar de verdade.
          </h1>
          <p className="max-w-xl text-body-lg text-charcoal-text">
            O resumo grátis é só pra você ver como funciona. O Premium libera o
            chat com o PDF (com a página citada em cada resposta), os modos pra
            contrato e edital e a biblioteca salva — por menos que um delivery
            por semana.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-6 py-3.5 text-body font-medium text-midnight-ink hover:opacity-90"
            >
              Assinar Premium · R$29/mês
            </Link>
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body-sm font-medium text-midnight-ink hover:bg-canvas"
            >
              Continuar com o grátis
            </Link>
          </div>

          <p className="text-caption text-faded-stone">
            Cancele quando quiser · Pagamento em real pelo Stripe · Reembolso em
            até 7 dias
          </p>
        </div>

        <aside className="rounded-lg border-2 border-midnight-ink bg-crisp-white p-card sm:p-card-elevated">
          <p className="eyebrow text-faded-stone">
            Premium · R$29/mês
          </p>
          <p className="mt-3 font-display text-heading font-semibold text-midnight-ink">
            O que você desbloqueia.
          </p>
          <ul className="mt-5 space-y-3 text-body-sm text-charcoal-text">
            {featurePreview.slice(0, 4).map((f) => (
              <li key={f.label} className="grid grid-cols-[14px_1fr] gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-2 w-2 bg-midnight-ink"
                />
                <span>
                  <span className="font-medium text-midnight-ink">
                    {f.label}
                  </span>{" "}
                  — {f.body}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/precos"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-midnight-ink px-5 py-3 text-body-sm font-medium text-crisp-white hover:opacity-90 transition-opacity"
          >
            Comparar planos
          </Link>
        </aside>
      </section>

      <section
        aria-labelledby="full-features"
        className="rounded-lg bg-crisp-white p-card md:p-card-elevated"
      >
        <p className="eyebrow text-faded-stone">Tudo o que entra no Premium</p>
        <h2
          id="full-features"
          className="mt-3 font-display text-heading font-semibold text-midnight-ink"
        >
          Feito pra quem mexe com PDF toda semana.
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {featurePreview.map((f) => (
            <div key={f.label} className="space-y-2">
              <p className="font-display text-body font-semibold text-midnight-ink">
                {f.label}
              </p>
              <p className="text-body-sm text-charcoal-text">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="space-y-2">
            <p className="font-display text-subheading font-semibold text-midnight-ink">
              Bora ativar?
            </p>
            <p className="text-body-sm text-charcoal-text">
              Assina em menos de 1 minuto e volta direto pro seu workspace assim
              que o pagamento confirma.
            </p>
          </div>
          <Link
            href="/precos"
            className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
          >
            Assinar Premium · R$29/mês
          </Link>
        </div>
      </section>
    </div>
  );
}
