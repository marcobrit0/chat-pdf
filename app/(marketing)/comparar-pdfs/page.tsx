import Link from "next/link";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Comparar dois PDFs com IA — diferenças entre versões",
  description:
    "Compare versões de contratos, propostas ou editais e encontre o que mudou em datas, valores, cláusulas e obrigações. Comparação direta em desenvolvimento.",
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
      intro="Compare versões de contratos, propostas, editais ou qualquer documento para identificar mudanças em datas, valores, cláusulas e obrigações. A comparação direta está em desenvolvimento — por enquanto, analise cada PDF separadamente no workspace."
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
          O que você pode fazer agora
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Envie o primeiro documento e extraia os pontos principais
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Repita com o segundo documento
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Use o modo <strong className="font-medium text-midnight-ink">Extrair</strong> nos dois para listar datas, valores e obrigações lado a lado
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Use o modo <strong className="font-medium text-midnight-ink">Riscos</strong> para ver pontos de atenção em cada versão
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body-sm font-medium text-midnight-ink"
          >
            Abrir workspace Premium
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
