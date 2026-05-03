import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDFIA vs Smallpdf — editar ou entender PDFs?",
  description:
    "Smallpdf edita, converte e compacta PDFs. PDFIA lê, resume e responde com fonte. São categorias complementares — entenda quando usar cada um.",
  path: "/chatpdf-vs-smallpdf",
});

const faqs = [
  {
    q: "Posso usar Smallpdf e PDFIA juntos?",
    a: "Sim, e faz sentido. Use o Smallpdf para converter, compactar ou unir PDFs; depois carregue o arquivo no PDFIA para resumir e perguntar.",
  },
  {
    q: "O Smallpdf tem IA para resumir conteúdo?",
    a: "O foco do Smallpdf é em operações no arquivo (editar, converter, assinar). Para resumo e chat sobre o conteúdo, use uma ferramenta dedicada como o PDFIA.",
  },
  {
    q: "Qual é mais barato?",
    a: "Depende do uso. Para edição recorrente, Smallpdf compensa. Para leitura e análise de PDFs, o PDFIA tem resumo gratuito sem cadastro e Premium em BRL.",
  },
];

export default function ChatpdfVsSmallpdfPage() {
  return (
    <SeoPageTemplate
      title="PDFIA vs Smallpdf — editar ou entender?"
      intro="Smallpdf resolve edição, conversão e compactação. PDFIA resolve leitura, resumo e perguntas sobre o conteúdo. São categorias complementares — você usa o primeiro para mexer no arquivo, o segundo para entender o que ele diz."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "vs Smallpdf", path: "/chatpdf-vs-smallpdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/chatpdf-vs-chatgpt", label: "vs ChatGPT" },
        { href: "/chatpdf-vs-adobe-acrobat-ai", label: "vs Adobe Acrobat AI" },
        { href: "/alternativa-ao-chatpdf", label: "Alternativa ao ChatPDF" },
      ]}
    >
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            Smallpdf
          </p>
          <h2 className="mt-3 font-display text-xl font-semibold text-midnight-ink">
            Para trabalhar no arquivo
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-text">
            <li>Converter PDF em Word, Excel, imagem</li>
            <li>Compactar e reduzir tamanho</li>
            <li>Assinar digitalmente</li>
            <li>Mesclar e dividir PDFs</li>
            <li>Preencher formulários</li>
          </ul>
        </div>
        <div className="rounded-[length:var(--radius-cards)] border border-midnight-ink bg-crisp-white p-6">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            PDFIA
          </p>
          <h2 className="mt-3 font-display text-xl font-semibold text-midnight-ink">
            Para entender o conteúdo
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-text">
            <li>Resumir o documento em tópicos</li>
            <li>Perguntas com respostas citadas por página</li>
            <li>Extrair datas, valores e obrigações</li>
            <li>Análise de riscos para revisão humana</li>
            <li>Modos para contratos, editais e apólices</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Qual usar?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal-text">
          Se precisa transformar o formato do arquivo, use o Smallpdf. Se
          precisa entender o conteúdo antes de assinar, pagar ou decidir, use o
          PDFIA. Para contratos, relatórios, editais e apólices, as
          duas em sequência é o fluxo mais comum: Smallpdf para preparar,
          PDFIA para entender.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
