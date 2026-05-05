import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Entender laudo médico com IA",
  description:
    "Apoio à leitura de laudos em PDF em português — termos técnicos traduzidos para linguagem que paciente e família entendem. Não é diagnóstico nem conduta clínica.",
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
      intro="Transforme termos técnicos em explicações acessíveis e prepare perguntas para o seu médico. Este serviço é educativo: não interpreta exames no lugar de um profissional de saúde."
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
