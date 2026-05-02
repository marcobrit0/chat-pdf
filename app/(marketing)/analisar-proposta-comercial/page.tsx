import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar proposta comercial com IA",
  description:
    "Entenda escopo, preço, prazo, condições e o que não está explícito antes de aceitar ou contrapropor. Resumo gratuito para propostas curtas; chat aprofundado no Premium.",
  path: "/analisar-proposta-comercial",
});

export default function AnalisarPropostaComercialPage() {
  return (
    <SeoPageTemplate
      title="Analisar proposta comercial com IA"
      intro="Entenda o que a proposta oferece, o que está incluído, o que não está e quais condições se aplicam antes de aceitar ou contrapropor. O resumo gratuito cobre propostas curtas; o chat com citações fica no Premium."
      showUpload
      contractIntent
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">O que a análise identifica</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Escopo do serviço ou produto oferecido</li>
          <li>Valor total, parcelas e condições de pagamento</li>
          <li>Prazo de entrega e etapas do projeto</li>
          <li>O que está e o que não está incluído</li>
          <li>Condições de reajuste ou revisão de escopo</li>
          <li>Validade da proposta</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">A IA consegue comparar duas propostas concorrentes?</dt>
            <dd className="mt-1 text-charcoal-text">
              A comparação direta entre dois PDFs está em desenvolvimento. Por enquanto, analise cada proposta separadamente e compare os resumos. Veja <Link href="/comparar-pdfs" className="underline">comparar PDFs</Link>.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Funciona para propostas de TI, marketing, jurídico?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. A ferramenta não é específica de setor — lê o texto do documento e extrai o que está escrito.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Posso perguntar sobre uma cláusula específica?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, no chat do Premium. Cada resposta cita a página onde o trecho aparece.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
          <li><Link href="/resumir-relatorio-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir relatório</Link></li>
          <li><Link href="/comparar-pdfs" className="text-sm text-midnight-ink underline underline-offset-4">Comparar PDFs</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
