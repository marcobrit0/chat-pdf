import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF vs Smallpdf — editar ou entender?",
  description:
    "Smallpdf é para editar, converter e compactar PDFs. ChatPDF Brasil é para ler, perguntar e entender o que o documento diz. São categorias diferentes.",
  path: "/chatpdf-vs-smallpdf",
});

export default function ChatpdfVsSmallpdfPage() {
  return (
    <SeoPageTemplate
      title="ChatPDF vs Smallpdf — editar ou entender?"
      intro="Smallpdf resolve edição, conversão e compactação de PDFs. ChatPDF Brasil resolve leitura, resumo e perguntas sobre o conteúdo — você não precisa editar o arquivo, precisa entender o que ele diz. São ferramentas complementares, não concorrentes diretas."
    >
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray p-5">
          <h2 className="font-display text-base font-semibold text-midnight-ink">Smallpdf</h2>
          <p className="mt-2 text-sm text-faded-stone">Para trabalhar no arquivo</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
            <li>Converter PDF em Word, Excel, imagem</li>
            <li>Compactar e reduzir tamanho</li>
            <li>Assinar digitalmente</li>
            <li>Mesclar e dividir PDFs</li>
            <li>Preencher formulários</li>
          </ul>
        </div>
        <div className="rounded-[length:var(--radius-cards)] border border-midnight-ink p-5">
          <h2 className="font-display text-base font-semibold text-midnight-ink">ChatPDF Brasil</h2>
          <p className="mt-2 text-sm text-faded-stone">Para entender o conteúdo</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
            <li>Resumir o documento em tópicos</li>
            <li>Perguntas com respostas citadas por página</li>
            <li>Extrair datas, valores e obrigações</li>
            <li>Análise de riscos para revisão humana</li>
            <li>Modos para contratos, editais e apólices</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Qual usar?</h2>
        <p className="text-base text-charcoal-text">
          Se precisar transformar o formato do arquivo — use o Smallpdf. Se precisar entender o conteúdo antes de assinar, pagar ou decidir — use o ChatPDF Brasil. Para contratos, relatórios, editais e apólices, as duas ferramentas podem ser usadas em sequência: Smallpdf para converter, ChatPDF Brasil para entender.
        </p>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Experimente o resumo grátis</h2>
        <p className="mt-2 text-charcoal-text">Sem cadastro para PDFs de até 10 páginas.</p>
        <div className="mt-4">
          <Link
            href="/resumir-pdf"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
          >
            Resumir PDF grátis
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Posso usar os dois juntos?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim. Use o Smallpdf para converter ou compactar o arquivo, depois carregue no ChatPDF Brasil para entender o conteúdo.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">O Smallpdf tem IA para resumir conteúdo?</dt>
            <dd className="mt-1 text-charcoal-text">
              O foco do Smallpdf é em operações no arquivo (editar, converter, assinar). Para resumo e chat sobre o conteúdo, use o ChatPDF Brasil.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/chatpdf-vs-chatgpt" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs ChatGPT</Link></li>
          <li><Link href="/chatpdf-vs-adobe-acrobat-ai" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs Adobe Acrobat AI</Link></li>
          <li><Link href="/alternativa-ao-chatpdf" className="text-sm text-midnight-ink underline underline-offset-4">Alternativa ao ChatPDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
