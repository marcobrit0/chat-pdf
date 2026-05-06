import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar apólice de seguro com IA — entenda o que cobre e o que exclui | PDFIA",
  description:
    "Apólice de seguro em português direto: coberturas, exclusões, franquia, carência e prazos em segundos. Auto, vida, residencial, viagem, saúde — qualquer apólice em PDF.",
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
      intro="A apólice tem 60 páginas e a parte que importa mora num parágrafo lateral. Em segundos: o que está coberto, o que está excluído, qual a franquia, qual a carência, qual o prazo de aviso de sinistro. Pra você decidir contratar, renovar ou acionar — sem ler tudo."
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
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Limites importantes
        </p>
        <p className="mt-4 text-body-sm  text-charcoal-text">
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
