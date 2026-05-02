import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato de prestação de serviços com IA",
  description:
    "Entenda escopo, preço, prazo, condições de rescisão e propriedade intelectual antes de assinar. Útil para autônomos, MEIs e empresas que precisam de uma leitura rápida.",
  path: "/analisar-contrato-de-prestacao-de-servicos",
});

export default function AnalisarContratoPrestacaoPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato de prestação de serviços"
      intro="Identifique escopo do serviço, valor, forma de pagamento, prazo, condições de rescisão e cláusulas de propriedade intelectual antes de assinar. O resumo gratuito cobre contratos curtos; o chat com citações fica no Premium."
      showUpload
      contractIntent
    >
      <section className="rounded-[length:var(--radius-cards)] border border-amber-200 bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Pontos que a análise cobre</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Partes contratantes e qualificação</li>
          <li>Escopo e entregáveis descritos no contrato</li>
          <li>Valor, parcelas e condições de pagamento</li>
          <li>Prazo de execução e critérios de aceite</li>
          <li>Multas e penalidades por atraso ou rescisão</li>
          <li>Quem fica com a propriedade intelectual do que for criado</li>
          <li>Cláusula de sigilo e não-concorrência quando presente</li>
        </ul>
        <p className="mt-4 text-sm text-faded-stone">
          Esta análise é um ponto de partida — não substitui assessoria jurídica para contratos com valor ou risco relevante.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Serve para contratos entre pessoa física e jurídica?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. A ferramenta lê o texto do contrato independente do tipo de pessoa envolvida.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">A IA sabe identificar cláusulas abusivas?</dt>
            <dd className="mt-1 text-charcoal-text">
              Ela sinaliza cláusulas que merecem atenção — não avalia legalidade. Use o modo Riscos no Premium para ver pontos de checagem listados.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Posso perguntar sobre um trecho específico?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, no chat do Premium. A resposta cita o número da página onde o trecho aparece.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/resumir-contrato-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir contrato</Link></li>
          <li><Link href="/analisar-contrato-clt" className="text-sm text-midnight-ink underline underline-offset-4">Contrato CLT</Link></li>
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
