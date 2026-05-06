import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Entender laudo médico com IA — termo técnico em português que dá pra entender | PDFIA",
  description:
    "Laudo de exame cheio de termo clínico? A IA traduz pra linguagem normal e te ajuda a montar perguntas pro médico. Não é diagnóstico — é apoio pra você entender o que está no papel.",
  path: "/entender-laudo-medico",
});

const faqs = [
  {
    q: "A IA dá diagnóstico?",
    a: "Não. A ferramenta traduz termos médicos para linguagem acessível e ajuda a preparar perguntas para o seu médico. Diagnóstico e conduta clínica são exclusivos do profissional de saúde.",
  },
  {
    q: "Funciona com laudos de exame de imagem?",
    a: "Sim, desde que o laudo esteja em PDF com texto selecionável (não a imagem do exame em si). Para PDFs digitalizados, é preciso OCR primeiro.",
  },
  {
    q: "É seguro enviar meu laudo?",
    a: "No plano gratuito o arquivo é processado e descartado. No Premium fica salvo na sua conta, criptografado em repouso. Não compartilhamos dados com terceiros.",
  },
  {
    q: "Posso usar para vários laudos da mesma família?",
    a: "Sim. No Premium você mantém uma biblioteca da sua conta. Para questões clínicas continuadas, prefira sempre acompanhar com o médico.",
  },
];

export default function EntenderLaudoMedicoPage() {
  return (
    <SeoPageTemplate
      title="Entender laudo médico com IA"
      intro="Pegou o laudo, leu três vezes e ainda não entendeu? A IA traduz cada termo técnico pra linguagem que dá pra entender e te ajuda a chegar na consulta com perguntas certas. É apoio pra você entender o papel — não substitui médico, nunca."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Laudo médico", path: "/entender-laudo-medico" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-relatorio-pdf", label: "Resumir relatório" },
        { href: "/analisar-apolice-de-seguro", label: "Apólice de seguro" },
        { href: "/resumir-pdf", label: "Resumir PDF (geral)" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Saúde e responsabilidade
        </p>
        <p className="mt-4 text-body-sm  text-charcoal-text">
          Nunca use só a IA para decisões de tratamento. Em emergência, procure
          atendimento presencial ou serviço de urgência. Para acompanhamento
          contínuo, mantenha sempre o vínculo com o seu médico.
        </p>
      </section>

      <PersonaVariantsSection
        variants={personaVariantsByCanonical["/entender-laudo-medico"] ?? []}
      />
    </SeoPageTemplate>
  );
}
