import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Entender laudo médico com IA",
  description:
    "Apoio à leitura de laudos em PDF em português — glossário simples e perguntas ao documento no Premium. Não é diagnóstico nem conduta clínica.",
  path: "/entender-laudo-medico",
});

export default function EntenderLaudoMedicoPage() {
  return (
    <SeoPageTemplate
      title="Entender laudo médico com IA"
      intro="Transforme termos técnicos em explicações acessíveis e prepare perguntas para seu médico. Este serviço é educativo; não interpreta exames no lugar de um profissional de saúde."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-red-100 bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Saúde e responsabilidade</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-text">
          Nunca use só a IA para decisões de tratamento. Em emergência, procure atendimento presencial ou serviço de urgência.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
