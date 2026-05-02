import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato de trabalho CLT com IA",
  description:
    "Entenda salário, jornada, benefícios, aviso prévio e condições de rescisão no seu contrato CLT antes de assinar. A IA lê o texto — não é assessoria trabalhista.",
  path: "/analisar-contrato-clt",
});

export default function AnalisarContratoCltPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato de trabalho CLT com IA"
      intro="Entenda o que o contrato diz sobre salário, jornada, benefícios, aviso prévio e rescisão antes de assinar ou contestar. A IA extrai e organiza o texto — não interpreta conformidade legal nem substitui assessoria trabalhista."
      showUpload
      contractIntent
    >
      <section className="rounded-[length:var(--radius-cards)] border border-amber-200 bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">O que a análise cobre</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Salário base, adicionais e forma de pagamento</li>
          <li>Jornada de trabalho e regime de horas extras</li>
          <li>Benefícios listados (VT, VR, plano de saúde, etc.)</li>
          <li>Prazo de experiência e condições de efetivação</li>
          <li>Aviso prévio e condições de rescisão</li>
          <li>Cláusulas de não-concorrência ou confidencialidade quando presentes</li>
        </ul>
        <p className="mt-4 text-sm text-faded-stone">
          Esta análise não substitui assessoria jurídica ou trabalhista. Para dúvidas sobre direitos, verbas rescisórias ou irregularidades, consulte um advogado trabalhista ou o sindicato da categoria.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Posso usar para contratos de experiência, intermitente ou temporário?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. A ferramenta funciona para qualquer tipo de contrato de trabalho em PDF com texto selecionável.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">A IA sabe se uma cláusula é ilegal?</dt>
            <dd className="mt-1 text-charcoal-text">
              Não. Ela lê e organiza o que está escrito, mas não avalia conformidade com a CLT ou jurisprudência. Para isso, consulte um advogado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">O documento fica salvo?</dt>
            <dd className="mt-1 text-charcoal-text">
              O resumo gratuito não salva o arquivo. No Premium, você pode salvar e voltar ao documento quando precisar.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/resumir-contrato-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir contrato</Link></li>
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
          <li><Link href="/analisar-contrato-de-prestacao-de-servicos" className="text-sm text-midnight-ink underline underline-offset-4">Prestação de serviços</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
