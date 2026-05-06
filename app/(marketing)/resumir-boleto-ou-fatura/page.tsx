import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Resumir boleto ou fatura em PDF com IA | PDFIA",
  description:
    "Boleto ou fatura difícil de ler? Em segundos: emitente, valor, vencimento, descrição dos itens. Pra você bater o olho e entender — mas confirme sempre o código de barras no documento original antes de pagar.",
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
      intro="Quem paga o boleto? Quanto? Quando vence? Quais itens estão na fatura? Em segundos a IA extrai isso pra você. Importante: pra pagar, sempre confira o código de barras no documento original ou no app do banco — a IA é triagem, não substituto do cuidado."
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
      <section className="rounded-lg border border-midnight-ink bg-canvas p-6">
        <p className="font-condensed text-caption uppercase tracking-[0.2em] text-midnight-ink">
          Aviso importante
        </p>
        <p className="mt-3 text-body  text-charcoal-text">
          Nunca use a saída da IA como fonte única para executar um pagamento.
          Confirme valor, código de barras e vencimento diretamente no
          documento ou no sistema emissor antes de pagar.
        </p>
      </section>

      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que a IA consegue extrair
        </h2>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Emitente e sacador</li>
          <li>· Valor e data de vencimento mencionados no texto</li>
          <li>· Descrição dos itens ou serviços na fatura</li>
          <li>· Dados do beneficiário quando presentes no texto</li>
        </ul>
        <p className="mt-4 text-body-sm text-faded-stone">
          Códigos de barras e dados de pagamento em formato gráfico ou imagem
          escaneada podem não ser lidos corretamente.
        </p>
      </section>

      <PersonaVariantsSection
        variants={
          personaVariantsByCanonical["/resumir-boleto-ou-fatura"] ?? []
        }
      />
    </SeoPageTemplate>
  );
}
