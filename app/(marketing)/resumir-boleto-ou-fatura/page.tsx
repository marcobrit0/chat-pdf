import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir boleto ou fatura em PDF — IA em português",
  description:
    "Identifique emitente, valor, vencimento e descrição dos itens em um boleto ou fatura PDF. Confirme sempre os dados no documento original antes de pagar.",
  path: "/resumir-boleto-ou-fatura",
});

const faqs = [
  {
    q: "A IA consegue ler o código de barras do boleto?",
    a: "Não. Código de barras é uma imagem — a ferramenta só extrai texto selecionável do PDF.",
  },
  {
    q: "Funciona para faturas de cartão de crédito?",
    a: "Sim, se o PDF tiver texto selecionável. A IA lista itens, valores e datas encontrados no texto. Confirme no extrato original antes de pagar.",
  },
  {
    q: "É possível comparar faturas de meses diferentes?",
    a: "A comparação direta entre dois PDFs está em desenvolvimento. Analise cada fatura separadamente por enquanto.",
  },
];

export default function ResumirBoletoOuFaturaPage() {
  return (
    <SeoPageTemplate
      title="Resumir boleto ou fatura em PDF"
      intro="Identifique emitente, valor, vencimento e descrição dos itens em um boleto ou fatura PDF. Confirme sempre os dados no documento original antes de qualquer pagamento — nunca pague baseado apenas na resposta da IA."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Boleto ou fatura", path: "/resumir-boleto-ou-fatura" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-relatorio-pdf", label: "Resumir relatório" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
      ]}
    >
      <section className="rounded-[length:var(--radius-cards)] border border-midnight-ink bg-canvas p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-midnight-ink">
          Aviso importante
        </p>
        <p className="mt-3 text-base leading-relaxed text-charcoal-text">
          Nunca use a saída da IA como fonte única para executar um pagamento.
          Confirme valor, código de barras e vencimento diretamente no
          documento ou no sistema emissor antes de pagar.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          O que a IA consegue extrair
        </h2>
        <ul className="mt-4 grid gap-2 text-base text-charcoal-text">
          <li>· Emitente e sacador</li>
          <li>· Valor e data de vencimento mencionados no texto</li>
          <li>· Descrição dos itens ou serviços na fatura</li>
          <li>· Dados do beneficiário quando presentes no texto</li>
        </ul>
        <p className="mt-4 text-sm text-faded-stone">
          Códigos de barras e dados de pagamento em formato gráfico ou imagem
          escaneada podem não ser lidos corretamente.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
