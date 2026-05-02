import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir boleto ou fatura em PDF",
  description:
    "Identifique emitente, valor, vencimento e descrição dos itens numa fatura ou boleto em PDF. Confirme sempre os dados no documento original antes de pagar.",
  path: "/resumir-boleto-ou-fatura",
});

export default function ResumirBoletoOuFaturaPage() {
  return (
    <SeoPageTemplate
      title="Resumir boleto ou fatura em PDF"
      intro="Identifique emitente, valor, vencimento e descrição dos itens num boleto ou fatura em PDF. Confirme sempre os dados no documento original antes de qualquer pagamento — nunca pague baseado apenas na resposta da IA."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-red-200 bg-red-50 p-6">
        <h2 className="font-display text-lg font-semibold text-red-900">Aviso importante</h2>
        <p className="mt-2 text-base text-red-800">
          Nunca use a saída da IA como fonte única para executar um pagamento. Confirme valor, código de barras e vencimento diretamente no documento ou no sistema emissor antes de pagar.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">O que a IA consegue extrair</h2>
        <ul className="list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Emitente e sacador</li>
          <li>Valor e data de vencimento mencionados no texto</li>
          <li>Descrição dos itens ou serviços na fatura</li>
          <li>Dados do beneficiário quando presentes no texto</li>
        </ul>
        <p className="text-sm text-faded-stone">
          Códigos de barras e dados de pagamento em formato gráfico ou imagem escaneada podem não ser lidos corretamente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">A IA consegue ler o código de barras do boleto?</dt>
            <dd className="mt-1 text-charcoal-text">
              Não. Código de barras é uma imagem — a ferramenta só extrai texto selecionável do PDF.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Funciona para faturas de cartão de crédito?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, se o PDF tiver texto selecionável. A IA lista itens, valores e datas encontrados no texto. Confirme no extrato original.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">É possível comparar faturas de meses diferentes?</dt>
            <dd className="mt-1 text-charcoal-text">
              A comparação direta entre dois PDFs está em desenvolvimento. Analise cada fatura separadamente por enquanto.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/resumir-relatorio-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir relatório</Link></li>
          <li><Link href="/resumir-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir PDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
