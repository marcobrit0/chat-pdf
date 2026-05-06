import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar contrato CLT com IA — antes de assinar | PDFIA",
  description:
    "Receba o contrato CLT pra assinar e queira entender em minutos o que está ali? Salário, jornada, benefícios, aviso prévio e cláusulas que costumam pegar — a IA lê e organiza pra você. Não substitui assessoria trabalhista.",
  path: "/analisar-contrato-clt",
});

const faqs = [
  {
    q: "Funciona com contrato de experiência, intermitente ou temporário?",
    a: "Sim. A ferramenta lê qualquer contrato de trabalho em PDF com texto selecionável — experiência, prazo determinado, intermitente, temporário, todos rolam.",
  },
  {
    q: "A IA sabe se uma cláusula é ilegal?",
    a: "Não. Ela lê e organiza o que está escrito, mas não avalia se está dentro da CLT ou da jurisprudência. Pra isso, advogado trabalhista — a IA é triagem, não parecer.",
  },
  {
    q: "O contrato fica salvo?",
    a: "No grátis, não — o resumo é gerado e o arquivo é descartado. No Premium, fica salvo na sua conta pra você voltar e perguntar mais coisas depois.",
  },
  {
    q: "E pra contrato PJ?",
    a: "Use a página de contrato de prestação de serviços — o modo de análise é outro, com foco em escopo, multa, exclusividade e indícios de pejotização.",
  },
];

export default function AnalisarContratoCltPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato CLT com IA"
      intro="Recebeu o contrato CLT pra assinar e tem 10 minutos pra entender o que tem ali? A IA lê o PDF e te entrega salário, jornada, benefícios, aviso prévio e as cláusulas que costumam surpreender — em segundos. Não substitui assessoria trabalhista, mas economiza muita reunião."
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
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          O que a análise cobre
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
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
        <p className="mt-5 text-body-sm text-faded-stone">
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
