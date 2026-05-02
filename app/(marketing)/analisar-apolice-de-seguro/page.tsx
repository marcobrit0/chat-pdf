import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar apólice de seguro com IA",
  description:
    "Leia apólices em PDF com ajuda de IA — coberturas, exclusões e carências em linguagem direta. Não é recomendação financeira nem parecer jurídico.",
  path: "/analisar-apolice-de-seguro",
});

export default function AnalisarApolicePage() {
  return (
    <SeoPageTemplate
      title="Analisar apólice de seguro com IA"
      intro="Organize informações de cobertura, exclusões, carências e sinistralidade num primeiro panorama. O produto ajuda na leitura; decisões de contratação exigem profissional habilitado."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Limites importantes</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-text">
          IA pode errar em valores, vigência ou condições especiais. Confira sempre a apólice original e consulte seu corretor ou seguradora para dúvidas sobre cobertura.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
