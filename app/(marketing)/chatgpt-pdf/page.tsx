import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatGPT para PDF — alternativa dedicada",
  description:
    "ChatGPT consegue ler PDFs, mas foi feito para ser genérico. O ChatPDF Brasil é uma ferramenta dedicada: upload direto, respostas com fonte e modos prontos para documentos brasileiros.",
  path: "/chatgpt-pdf",
});

export default function ChatgptPdfPage() {
  return (
    <SeoPageTemplate
      title="ChatGPT para PDF: como funciona e quando usar outra ferramenta"
      intro="ChatGPT consegue ler PDFs — mas exige engenharia de prompt, não cita páginas por padrão e perde contexto em documentos longos. Ferramentas dedicadas resolvem isso com upload direto, respostas ancoradas no texto e modos prontos para contratos, editais e laudos."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          O que o ChatGPT faz (e o que complica)
        </h2>
        <ul className="list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Lê PDFs via upload, mas o limite de contexto varia por plano</li>
          <li>Não cita a página de origem por padrão — você precisa pedir explicitamente</li>
          <li>Pode inventar informações que não estão no documento</li>
          <li>Não tem modos específicos para contratos, editais ou apólices brasileiras</li>
          <li>Não salva histórico associado ao documento para sessões futuras</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          O que uma ferramenta dedicada adiciona
        </h2>
        <ul className="list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Upload direto do arquivo — sem copiar texto ou descrever o documento</li>
          <li>Respostas com referência de página para você conferir</li>
          <li>Aviso claro quando a informação não está no PDF</li>
          <li>Modos prontos: resumo, extração de dados, revisão de riscos</li>
          <li>Histórico do documento salvo para voltar depois (Premium)</li>
        </ul>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">
          Experimente grátis
        </h2>
        <p className="mt-2 text-charcoal-text">
          O resumo de PDFs curtos (até 10 páginas) é gratuito e sem cadastro. Chat e documentos longos ficam no Premium.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/resumir-pdf"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
          >
            Resumir PDF grátis
          </Link>
          <Link
            href="/precos"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-sm font-medium text-midnight-ink"
          >
            Ver planos
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">ChatGPT Plus lê PDFs grandes?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, mas com limite de contexto. Em documentos muito longos o modelo pode truncar partes ou perder coerência. Ferramentas dedicadas fazem chunking do documento e selecionam o contexto relevante por pergunta.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Preciso de conta no ChatGPT para usar o ChatPDF Brasil?</dt>
            <dd className="mt-1 text-charcoal-text">
              Não. O resumo gratuito funciona sem cadastro — só faça upload do PDF.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">A IA pode inventar coisas que não estão no PDF?</dt>
            <dd className="mt-1 text-charcoal-text">
              Pode, se não for instruída a citar fonte. O ChatPDF Brasil instrui o modelo a só responder com base no documento e a avisar quando a informação não estiver lá.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/alternativa-ao-chatpdf" className="text-sm text-midnight-ink underline underline-offset-4">Alternativa ao ChatPDF</Link></li>
          <li><Link href="/chatpdf-vs-chatgpt" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs ChatGPT</Link></li>
          <li><Link href="/resumir-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir PDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
