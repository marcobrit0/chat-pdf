import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar contrato de trabalho CLT com IA",
  description:
    "Entenda salário, jornada, benefícios, aviso prévio e condições de rescisão no seu contrato CLT antes de assinar. A IA lê o texto — não é assessoria trabalhista.",
  path: "/analisar-contrato-clt",
});

const faqs = [
  {
    q: "Posso usar para contratos de experiência, intermitente ou temporário?",
    a: "Sim. A ferramenta funciona para qualquer tipo de contrato de trabalho em PDF com texto selecionável.",
  },
  {
    q: "A IA sabe se uma cláusula é ilegal?",
    a: "Não. Ela lê e organiza o que está escrito, mas não avalia conformidade com a CLT ou jurisprudência. Para isso, consulte um advogado trabalhista.",
  },
  {
    q: "O documento fica salvo?",
    a: "O resumo gratuito não salva o arquivo. No Premium, o documento fica vinculado à sua conta para você voltar e fazer mais perguntas.",
  },
  {
    q: "Funciona para contratos PJ?",
    a: "Para contratos de prestação de serviços (PJ), use a página específica — o modo de análise é diferente do CLT.",
  },
];

export default function AnalisarContratoCltPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato de trabalho CLT com IA"
      intro="Entenda o que o contrato diz sobre salário, jornada, benefícios, aviso prévio e rescisão antes de assinar ou contestar. A IA extrai e organiza o texto — não interpreta conformidade legal nem substitui assessoria trabalhista."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Contrato CLT", path: "/analisar-contrato-clt" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-contrato-pdf", label: "Resumir contrato" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
        {
          href: "/analisar-contrato-de-prestacao-de-servicos",
          label: "Prestação de serviços",
        },
        { href: "/resumir-pdf", label: "Resumir PDF (geral)" },
      ]}
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          O que a análise cobre
        </p>
        <ul className="mt-4 grid gap-2 text-base text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Salário base, adicionais e forma de pagamento
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Jornada de trabalho e regime de horas extras
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Benefícios listados (VT, VR, plano de saúde, etc.)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Prazo de experiência e condições de efetivação
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Aviso prévio e condições de rescisão
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Cláusulas de não-concorrência ou confidencialidade
          </li>
        </ul>
        <p className="mt-5 text-sm text-faded-stone">
          Esta análise não substitui assessoria jurídica ou trabalhista. Para
          dúvidas sobre direitos, verbas rescisórias ou irregularidades,
          consulte um advogado trabalhista ou o sindicato da categoria.
        </p>
      </section>

      <PersonaVariantsSection
        variants={personaVariantsByCanonical["/analisar-contrato-clt"] ?? []}
      />
    </SeoPageTemplate>
  );
}
