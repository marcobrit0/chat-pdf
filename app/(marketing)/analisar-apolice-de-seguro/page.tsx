import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar apólice de seguro com IA",
  description:
    "Leia apólices em PDF com IA: coberturas, exclusões, franquias, carências e prazos em linguagem direta. Não é recomendação financeira nem parecer jurídico.",
  path: "/analisar-apolice-de-seguro",
});

const faqs = [
  {
    q: "Funciona para qual tipo de seguro?",
    a: "Auto, residencial, vida, viagem, saúde e empresarial — desde que o PDF tenha texto selecionável. Apólices muito antigas, em imagem, exigem OCR.",
  },
  {
    q: "A IA confere se a cobertura cobre meu caso?",
    a: "Ela localiza cláusulas relevantes e organiza o texto, mas a decisão final sobre cobertura é da seguradora. Em sinistros, contate seu corretor.",
  },
  {
    q: "Consigo comparar duas apólices?",
    a: "No Premium, sim — abra cada apólice e use o chat para perguntas comparativas. Para comparação automática lado a lado, use a ferramenta /comparar-pdfs.",
  },
  {
    q: "Meu corretor pode usar?",
    a: "Sim. Premium tem histórico salvo e exportação de pacote organizado, que ajuda a documentar o atendimento ao cliente.",
  },
];

export default function AnalisarApolicePage() {
  return (
    <SeoPageTemplate
      title="Analisar apólice de seguro com IA"
      intro="Identifique coberturas, exclusões, franquias, carências e prazos num primeiro panorama. A IA ajuda na leitura; decisões de contratação ou sinistro exigem profissional habilitado."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Apólice de seguro", path: "/analisar-apolice-de-seguro" },
      ]}
      faqs={faqs}
      related={[
        { href: "/comparar-pdfs", label: "Comparar dois PDFs" },
        { href: "/entender-laudo-medico", label: "Laudo médico" },
        { href: "/resumir-pdf", label: "Resumir PDF (geral)" },
      ]}
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          Limites importantes
        </p>
        <p className="mt-4 text-sm leading-relaxed text-charcoal-text">
          A IA pode errar em valores, vigência ou condições especiais. Confira
          sempre a apólice original e consulte seu corretor ou seguradora para
          dúvidas sobre cobertura, sinistro ou renovação.
        </p>
      </section>

      <PersonaVariantsSection
        variants={
          personaVariantsByCanonical["/analisar-apolice-de-seguro"] ?? []
        }
      />
    </SeoPageTemplate>
  );
}
