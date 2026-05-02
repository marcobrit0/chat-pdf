import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumo de PDF com IA",
  description:
    "Gere o resumo de qualquer PDF em português — tópicos, datas, entidades e perguntas sugeridas. Gratuito para documentos curtos.",
  path: "/resumo-de-pdf",
});

export default function ResumoDePdfPage() {
  return (
    <SeoPageTemplate
      title="Resumo de PDF com IA"
      intro="Envie um PDF e receba o resumo estruturado: pontos centrais, datas, valores e entidades encontrados no documento. Sem cadastro para arquivos curtos; PDFs longos e chat com citações ficam no Premium."
      showUpload
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          O que o resumo inclui
        </h2>
        <ul className="list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Síntese do conteúdo em parágrafos curtos</li>
          <li>Tópicos e pontos principais em lista</li>
          <li>Datas, valores e entidades encontrados no texto</li>
          <li>Perguntas de follow-up sugeridas</li>
        </ul>
        <p className="text-sm text-faded-stone">
          A IA trabalha com o texto do PDF. Confirme dados críticos no documento original antes de tomar decisões.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">O resumo é confiável?</dt>
            <dd className="mt-1 text-charcoal-text">
              A IA extrai o que está no texto. Onde há citação de página, você pode verificar. Para decisões importantes, confirme no documento original.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Qual o tamanho máximo no plano gratuito?</dt>
            <dd className="mt-1 text-charcoal-text">
              PDFs com até 10 páginas e texto selecionável. Documentos maiores exigem Premium.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">O que muda no Premium?</dt>
            <dd className="mt-1 text-charcoal-text">
              Chat com o documento, respostas com citações de página, modos de extração e análise de riscos, e suporte a PDFs de até 100 páginas.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/resumir-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir PDF</Link></li>
          <li><Link href="/chat-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Conversar com PDF</Link></li>
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
