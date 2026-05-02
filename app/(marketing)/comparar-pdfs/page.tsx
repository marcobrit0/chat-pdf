import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Comparar dois PDFs com IA",
  description:
    "Compare versões de contratos, propostas ou editais. Identifique diferenças em datas, valores, cláusulas e obrigações. Comparação direta em desenvolvimento — analise cada arquivo separadamente já.",
  path: "/comparar-pdfs",
});

export default function CompararPdfsPage() {
  return (
    <SeoPageTemplate
      title="Comparar dois PDFs com IA"
      intro="Compare versões de contratos, propostas, editais ou qualquer documento para identificar mudanças em datas, valores, cláusulas e obrigações. A comparação direta entre dois arquivos está em desenvolvimento. Por enquanto, analise cada PDF separadamente no workspace."
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">
          O que você pode fazer agora
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Envie o primeiro documento e extraia os pontos principais</li>
          <li>Repita com o segundo documento</li>
          <li>Use o modo <strong>Extrair</strong> nos dois para listar datas, valores e obrigações lado a lado</li>
          <li>Use o modo <strong>Riscos</strong> para ver pontos de atenção em cada versão</li>
        </ul>
        <div className="mt-5">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
          >
            Abrir workspace Premium
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          O que a comparação direta vai entregar
        </h2>
        <ul className="list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Diferenças lado a lado em datas, valores e obrigações</li>
          <li>Cláusulas presentes em um documento e ausentes no outro</li>
          <li>Mudanças em definições e termos entre versões</li>
          <li>Resumo do que mudou, adicionou ou removeu</li>
        </ul>
        <p className="text-sm text-faded-stone">
          Casos de uso típicos: contrato novo vs antigo, proposta vs contrato final, edital vs resposta de esclarecimentos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Quando a comparação direta vai estar disponível?</dt>
            <dd className="mt-1 text-charcoal-text">
              Está em desenvolvimento. Crie conta no Premium e você recebe acesso quando lançar.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Que tipos de diferença a IA consegue identificar?</dt>
            <dd className="mt-1 text-charcoal-text">
              Datas, valores, partes, prazos, cláusulas de rescisão, obrigações e termos definidos. Diferenças de formatação sem impacto no conteúdo são ignoradas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Funciona para contratos escaneados?</dt>
            <dd className="mt-1 text-charcoal-text">
              Para PDFs escaneados, o texto precisa ser extraído via OCR primeiro. Suporte a OCR está previsto para uma versão futura.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
          <li><Link href="/resumir-contrato-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir contrato</Link></li>
          <li><Link href="/precos" className="text-sm text-midnight-ink underline underline-offset-4">Ver planos</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
