import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir edital de licitação",
  description:
    "Gere um resumo objetivo de editais e termos de referência em PDF. Limite gratuito; Premium para PDFs longos e chat com o documento.",
  path: "/resumir-edital-de-licitacao",
});

export default function ResumirEditalPage() {
  return (
    <SeoPageTemplate
      title="Resumir edital de licitação"
      intro="Transforme PDFs extensos em visão executiva: prazos-chave, documentação exigida e etapas do processo. Use o upload anônimo para testar; Premium desbloqueia análises mais profundas e histórico."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-amber-200 bg-canvas p-6">
        <p className="text-sm text-charcoal-text">
          Aviso: interpretação automática pode omitir requisitos. Valide sempre no texto integral e com sua equipe técnica ou jurídica antes de enviar propostas.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
