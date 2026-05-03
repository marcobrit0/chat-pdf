import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF em português — feito para o Brasil",
  description:
    "Ferramenta de chat com PDF em português do Brasil: resumos, perguntas com citação de página e modos para CLT, editais e apólices. Preços em BRL.",
  path: "/chatpdf-em-portugues",
});

const faqs = [
  {
    q: "O ChatPDF Brasil é o mesmo que o ChatPDF.com?",
    a: "Não. São produtos independentes. O ChatPDF Brasil foi construído especificamente para o mercado brasileiro, com foco em documentos e vocabulário local.",
  },
  {
    q: "Funciona para PDFs em inglês?",
    a: "Sim. O resumo e o chat funcionam para qualquer PDF com texto selecionável — a resposta sai em português do Brasil por padrão.",
  },
  {
    q: "Preciso de conta para usar?",
    a: "Para o resumo gratuito, não. Para chat com o documento, histórico salvo e PDFs longos, é necessário plano Premium (R$29/mês).",
  },
];

export default function ChatpdfEmPortuguesPage() {
  return (
    <SeoPageTemplate
      title="ChatPDF em português"
      intro="O ChatPDF Brasil é uma ferramenta de chat com PDF construída para o mercado brasileiro: interface, respostas e modos em PT-BR sem precisar configurar idioma. Contratos CLT, editais, apólices e laudos têm tratamento específico."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "ChatPDF em português", path: "/chatpdf-em-portugues" },
      ]}
      faqs={faqs}
      related={[
        { href: "/alternativa-ao-chatpdf", label: "Alternativa ao ChatPDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
      ]}
    >
      <section>
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Como funciona
        </h2>
        <ol className="mt-4 grid gap-3 text-base text-charcoal-text">
          <li className="flex items-start gap-4">
            <span className="font-condensed text-sm tracking-[0.16em] text-faded-stone">
              01
            </span>
            <span>Envie um PDF — sem cadastro para documentos curtos</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="font-condensed text-sm tracking-[0.16em] text-faded-stone">
              02
            </span>
            <span>
              Receba um resumo com tópicos, datas e entidades encontradas
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="font-condensed text-sm tracking-[0.16em] text-faded-stone">
              03
            </span>
            <span>
              No Premium, abra o chat e faça perguntas sobre qualquer parte do
              documento
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="font-condensed text-sm tracking-[0.16em] text-faded-stone">
              04
            </span>
            <span>Cada resposta cita a página onde a informação aparece</span>
          </li>
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            ChatPDF (internacional)
          </p>
          <h3 className="mt-3 font-display text-lg font-semibold text-midnight-ink">
            Para o mercado global
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-text">
            <li>Interface em inglês por padrão</li>
            <li>Respostas dependem do idioma do prompt</li>
            <li>Sem modos para documentos brasileiros</li>
            <li>Preços em USD</li>
          </ul>
        </div>
        <div className="rounded-[length:var(--radius-cards)] border border-midnight-ink bg-crisp-white p-6">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            ChatPDF Brasil
          </p>
          <h3 className="mt-3 font-display text-lg font-semibold text-midnight-ink">
            Para o mercado brasileiro
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-text">
            <li>Interface em português do Brasil</li>
            <li>Respostas em PT-BR por padrão</li>
            <li>Modos para CLT, editais e apólices</li>
            <li>Preços em BRL</li>
          </ul>
        </div>
      </section>
    </SeoPageTemplate>
  );
}
