import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF em português — ferramenta feita para o Brasil",
  description:
    "Procurando uma ferramenta de chat com PDF em português? O ChatPDF Brasil funciona em PT-BR, com resumos, chat com citações e modos para documentos brasileiros.",
  path: "/chatpdf-em-portugues",
});

export default function ChatpdfEmPortuguesPage() {
  return (
    <SeoPageTemplate
      title="ChatPDF em português"
      intro="O ChatPDF Brasil é uma ferramenta de chat com PDF construída para o mercado brasileiro: interface, respostas e modos em PT-BR, sem precisar configurar idioma. Contratos CLT, editais, apólices e laudos têm tratamento específico."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">Como funciona</h2>
        <ol className="list-inside list-decimal space-y-3 text-base text-charcoal-text">
          <li>Envie um PDF — sem cadastro para documentos curtos</li>
          <li>Receba um resumo com tópicos, datas e entidades encontradas</li>
          <li>No Premium, abra o chat e faça perguntas sobre qualquer parte do documento</li>
          <li>Cada resposta cita a página onde a informação aparece</li>
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray p-5">
          <h2 className="font-display text-base font-semibold text-midnight-ink">ChatPDF (internacional)</h2>
          <p className="mt-2 text-sm text-faded-stone">Para o mercado global</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
            <li>Interface em inglês por padrão</li>
            <li>Respostas dependem do idioma do prompt</li>
            <li>Sem modos para documentos brasileiros</li>
            <li>Preços em USD</li>
          </ul>
        </div>
        <div className="rounded-[length:var(--radius-cards)] border border-midnight-ink p-5">
          <h2 className="font-display text-base font-semibold text-midnight-ink">ChatPDF Brasil</h2>
          <p className="mt-2 text-sm text-faded-stone">Para o mercado brasileiro</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
            <li>Interface em português do Brasil</li>
            <li>Respostas em PT-BR por padrão</li>
            <li>Modos para CLT, editais e apólices</li>
            <li>Preços em BRL</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Comece agora</h2>
        <p className="mt-2 text-charcoal-text">
          Resumo gratuito para PDFs de até 10 páginas. Chat e documentos longos no Premium.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
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
            <dt className="font-medium text-midnight-ink">O ChatPDF Brasil é o mesmo que o ChatPDF.com?</dt>
            <dd className="mt-1 text-charcoal-text">
              Não. São produtos independentes. O ChatPDF Brasil foi construído especificamente para o mercado brasileiro, com foco em documentos e vocabulário local.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Funciona para PDFs em inglês?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. O resumo e o chat funcionam para qualquer PDF com texto selecionável — a resposta sempre sai em português do Brasil.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Preciso de conta para usar?</dt>
            <dd className="mt-1 text-charcoal-text">
              Para o resumo gratuito, não. Para chat, histórico e documentos longos, é necessário conta Premium.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/alternativa-ao-chatpdf" className="text-sm text-midnight-ink underline underline-offset-4">Alternativa ao ChatPDF</Link></li>
          <li><Link href="/chat-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Chat com PDF</Link></li>
          <li><Link href="/resumir-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Resumir PDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
