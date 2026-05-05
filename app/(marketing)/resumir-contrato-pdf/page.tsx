import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir contrato em PDF — IA em português",
  description:
    "Identifique partes, objeto, prazo, valores e cláusulas-chave do contrato antes de negociar ou assinar. Resumo gratuito; chat com citação de página no Premium.",
  path: "/resumir-contrato-pdf",
});

const faqs = [
  {
    q: "Funciona com contratos em formato imagem (escaneados)?",
    a: "Não no plano gratuito — o PDF precisa ter texto selecionável. Suporte a OCR para arquivos escaneados está no roadmap Premium.",
  },
  {
    q: "A IA vai entender termos jurídicos?",
    a: "Ela extrai e organiza o texto do contrato. Não interpreta consequências legais — isso é papel de um advogado.",
  },
  {
    q: "Posso fazer perguntas sobre cláusulas específicas?",
    a: "Sim, no chat do Premium. Cada resposta cita a página do contrato onde o trecho aparece.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Em geral 5 a 20 segundos para um contrato curto. Contratos longos no Premium podem levar até 1 minuto.",
  },
];

export default function ResumirContratoPdfPage() {
  return (
    <SeoPageTemplate
      title="Resumir contrato em PDF"
      intro="Identifique partes, objeto, prazo, valores e cláusulas principais antes de negociar ou assinar. O resumo gratuito cobre contratos curtos; o Premium adiciona chat com citações de página, extração estruturada e revisão de riscos."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Resumir contrato", path: "/resumir-contrato-pdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
        { href: "/analisar-contrato-clt", label: "Contrato CLT" },
        {
          href: "/analisar-contrato-de-prestacao-de-servicos",
          label: "Prestação de serviços",
        },
        { href: "/comparar-pdfs", label: "Comparar PDFs" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          No resumo você vai ver
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Partes contratantes (contratante e contratado)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Objeto do contrato
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Vigência, renovação e condições de rescisão
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Valores, forma e prazo de pagamento
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Cláusulas de multa e penalidades quando presentes
          </li>
        </ul>
        <p className="mt-5 text-body-sm text-faded-stone">
          Este é um primeiro passe para leitura — não substitui análise
          jurídica. Para contratos com consequências financeiras ou legais
          relevantes, envolva um advogado.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
