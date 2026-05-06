import Link from "next/link";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Comparar dois PDFs com IA — o que mudou entre as versões | PDFIA",
  description:
    "Compare versões de contrato, proposta ou edital e veja o que mudou em datas, valores, cláusulas e obrigações. Lado a lado direto está em construção — por enquanto, dá pra rodar análise de cada PDF separado.",
  path: "/comparar-pdfs",
});

const faqs = [
  {
    q: "Quando a comparação direta vai estar disponível?",
    a: "Está em desenvolvimento. Clientes Premium terão acesso assim que lançar.",
  },
  {
    q: "Que tipos de diferença a IA consegue identificar?",
    a: "Datas, valores, partes, prazos, cláusulas de rescisão, obrigações e termos definidos. Diferenças de formatação sem impacto no conteúdo são ignoradas.",
  },
  {
    q: "Funciona para contratos escaneados?",
    a: "Para PDFs escaneados, o texto precisa ser extraído via OCR primeiro. Suporte a OCR está previsto para uma versão futura.",
  },
  {
    q: "Posso comparar versões de edital com aditivos?",
    a: "Sim — esse é um dos casos de uso principais. Hoje você analisa cada arquivo separadamente; a comparação direta vai automatizar essa etapa.",
  },
];

export default function CompararPdfsPage() {
  return (
    <SeoPageTemplate
      title="Comparar dois PDFs com IA"
      intro="Contrato renegociado, proposta v2, edital com aditivo: o que mudou entre uma versão e outra? A comparação lado a lado tá em construção — vai entrar como bônus do Premium quando soltar. Por enquanto, dá pra rodar análise de cada PDF separado e bater na mão."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Comparar PDFs", path: "/comparar-pdfs" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
        { href: "/resumir-contrato-pdf", label: "Resumir contrato" },
        { href: "/precos", label: "Ver planos" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Como dá pra fazer hoje
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Sobe o primeiro PDF e roda a análise
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Repete com a segunda versão
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Usa o modo <strong className="font-medium text-midnight-ink">Extrair dados</strong> nos dois pra ter datas, valores e obrigações lado a lado
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Usa o modo <strong className="font-medium text-midnight-ink">Mapear riscos</strong> pra ver os pontos de atenção em cada versão
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body-sm font-medium text-midnight-ink"
          >
            Abrir o workspace Premium
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que a comparação direta vai entregar
        </h2>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Diferenças lado a lado em datas, valores e obrigações</li>
          <li>· Cláusulas presentes em um documento e ausentes no outro</li>
          <li>· Mudanças em definições e termos entre versões</li>
          <li>· Resumo do que mudou, adicionou ou removeu</li>
        </ul>
        <p className="mt-4 text-body-sm text-faded-stone">
          Casos de uso típicos: contrato novo vs antigo, proposta vs contrato
          final, edital vs resposta de esclarecimentos.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
