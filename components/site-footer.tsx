import Link from "next/link";

const productLinks = [
  { href: "/resumir-pdf", label: "Resumir PDF" },
  { href: "/chat-pdf", label: "Chat com PDF" },
  { href: "/comparar-pdfs", label: "Comparar dois PDFs" },
  { href: "/resumo-de-pdf", label: "Resumo de PDF" },
  { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF" },
  { href: "/guias", label: "Guias" },
  { href: "/precos", label: "Preços" },
] as const;

const useCaseLinks = [
  { href: "/analisar-contrato-clt", label: "Contrato de trabalho CLT" },
  { href: "/resumir-contrato-pdf", label: "Resumir contrato em PDF" },
  { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
  {
    href: "/analisar-contrato-de-prestacao-de-servicos",
    label: "Contrato de prestação de serviços",
  },
  { href: "/analisar-proposta-comercial", label: "Proposta comercial" },
  { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
  { href: "/resumir-edital-de-licitacao", label: "Edital de licitação" },
  { href: "/analisar-apolice-de-seguro", label: "Apólice de seguro" },
  { href: "/entender-laudo-medico", label: "Laudo médico" },
  { href: "/resumir-relatorio-pdf", label: "Resumir relatório" },
  { href: "/resumir-boleto-ou-fatura", label: "Boleto ou fatura" },
] as const;

const compareLinks = [
  { href: "/chatpdf-vs-chatgpt", label: "PDFIA vs ChatGPT" },
  { href: "/chatpdf-vs-smallpdf", label: "PDFIA vs Smallpdf" },
  { href: "/chatpdf-vs-adobe-acrobat-ai", label: "PDFIA vs Adobe Acrobat AI" },
  { href: "/alternativa-ao-chatpdf", label: "Alternativa ao ChatPDF" },
  { href: "/chatpdf-em-portugues", label: "ChatPDF em português" },
  { href: "/chatgpt-pdf", label: "ChatGPT para PDF" },
  { href: "/ia-pdf", label: "IA PDF" },
  { href: "/pdf-ia", label: "PDF + IA" },
] as const;

const legalLinks = [
  { href: "/termos", label: "Termos de uso" },
  { href: "/privacidade", label: "Privacidade" },
  { href: "/login", label: "Entrar" },
] as const;

/**
 * Site-map footer: every SEO landing reachable in one click from every page.
 * Internal-link density is the cheapest, most effective SEO surface we own.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-subtle-gray bg-ash-gray">
      <div className="mx-auto w-full max-w-[1240px] px-8 pb-10 pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Produto" items={[...productLinks]} />
          <FooterColumn title="Casos de uso" items={[...useCaseLinks]} />
          <FooterColumn title="Comparações" items={[...compareLinks]} />
          <div className="space-y-6">
            <FooterColumn title="Conta" items={[...legalLinks]} />
            <div className="rounded-[length:var(--radius-cards)] bg-canvas p-4 text-sm text-charcoal-text">
              <p className="font-display text-base font-semibold leading-tight text-midnight-ink">
                Pronto para começar?
              </p>
              <p className="mt-2 leading-relaxed">
                Resumo grátis, sem cadastro, em português.
              </p>
              <Link
                href="/resumir-pdf"
                className="mt-3 inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-3 py-2 text-sm font-medium text-midnight-ink"
              >
                Resumir PDF grátis
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-subtle-gray pt-6 text-xs text-faded-stone sm:flex-row sm:items-center sm:justify-between">
          <p className="font-condensed tracking-tight">
            © {new Date().getFullYear()} PDFIA · Resumos e chat com PDFs em português
          </p>
          <p className="font-condensed tracking-tight">
            Pagamentos seguros via Stripe · LGPD
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={title}>
      <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-charcoal-text underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
