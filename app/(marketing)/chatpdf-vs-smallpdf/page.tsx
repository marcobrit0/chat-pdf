import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDFIA vs Smallpdf — editar ou entender PDF? | PDFIA",
  description:
    "Smallpdf edita, converte e compacta PDF. PDFIA lê, resume e responde com a página citada. Não competem — se complementam. Veja qual usar quando.",
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
      title="PDFIA vs Smallpdf — editar ou entender o PDF?"
      intro="Spoiler: não competem. Smallpdf é pra mexer no arquivo (converter, compactar, juntar, assinar). O PDFIA é pra entender o que está dentro (resumir, perguntar, extrair dados). O fluxo comum é usar os dois: Smallpdf primeiro pra preparar, PDFIA depois pra ler."
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
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            Smallpdf
          </p>
          <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
            Pra mexer no arquivo
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Converter PDF em Word, Excel, imagem</li>
            <li>Compactar e reduzir tamanho</li>
            <li>Assinar digitalmente</li>
            <li>Juntar ou separar páginas</li>
            <li>Preencher formulário</li>
          </ul>
        </div>
        <div className="rounded-lg border border-midnight-ink bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            PDFIA
          </p>
          <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
            Pra entender o que está dentro
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Resumir o documento em tópicos diretos</li>
            <li>Perguntar e receber resposta com a página citada</li>
            <li>Extrair datas, valores e obrigações estruturadas</li>
            <li>Mapear riscos pra revisão com a equipe</li>
            <li>Modos prontos pra contrato, edital e apólice</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Qual usar quando?
        </h2>
        <p className="mt-3 text-body  text-charcoal-text">
          Precisa converter ou compactar o arquivo? Smallpdf. Precisa entender o
          que está escrito antes de assinar, pagar ou decidir? PDFIA. Pra
          contrato, edital, apólice, relatório, o fluxo comum é os dois em
          sequência: Smallpdf pra preparar o arquivo, PDFIA pra entender o
          conteúdo.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
