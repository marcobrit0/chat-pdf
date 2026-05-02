import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir relatório em PDF com IA",
  description:
    "Extraia os pontos centrais de relatórios técnicos, financeiros ou corporativos sem ler o documento inteiro. Gratuito para relatórios curtos; Premium para arquivos longos e chat.",
  path: "/resumir-relatorio-pdf",
});

export default function ResumirRelatorioPdfPage() {
  return (
    <SeoPageTemplate
      title="Resumir relatório em PDF"
      intro="Extraia os pontos centrais de relatórios técnicos, financeiros ou corporativos sem ler o documento inteiro. Ideal para briefings, apresentações e tomada de decisão rápida. Gratuito para documentos curtos; PDFs longos ficam no Premium."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">O que o resumo extrai</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Conclusões e recomendações principais</li>
          <li>Dados e indicadores centrais do documento</li>
          <li>Períodos e datas de referência</li>
          <li>Entidades, áreas ou projetos mencionados</li>
          <li>Perguntas de follow-up úteis para aprofundar</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Funciona para relatórios financeiros e de auditoria?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. Para documentos com tabelas complexas, os dados tabulares podem não ser capturados com precisão — confirme números no original.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Qual o tamanho máximo do relatório?</dt>
            <dd className="mt-1 text-charcoal-text">
              Gratuito: até 10 páginas. Premium: até 100 páginas com chat e modo de extração de dados. Relatórios maiores podem ser divididos por seção.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Posso fazer perguntas sobre seções específicas?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, no chat do Premium. A resposta cita a página onde a informação aparece no relatório.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/resumir-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir PDF</Link></li>
          <li><Link href="/analisar-proposta-comercial" className="text-sm text-midnight-ink underline underline-offset-4">Proposta comercial</Link></li>
          <li><Link href="/chat-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Conversar com PDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
