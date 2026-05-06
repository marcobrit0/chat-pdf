import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF em português brasileiro — feito no Brasil, em real | PDFIA",
  description:
    "Ferramenta de chat com PDF em português do Brasil: resumo grátis, perguntas com a página citada e modos prontos pra contrato CLT, edital de licitação e apólice de seguro. Pagamento em real.",
  path: "/chatpdf-em-portugues",
});

const faqs = [
  {
    q: "O PDFIA é o mesmo ChatPDF.com?",
    a: "Não. São produtos diferentes. O PDFIA foi feito do zero pro Brasil — vocabulário local, modos pra documento brasileiro, suporte em PT-BR e pagamento em real.",
  },
  {
    q: "Funciona com PDF em inglês?",
    a: "Funciona. O resumo e o chat aceitam qualquer PDF com texto selecionável — e a resposta sai em português do Brasil por padrão. Útil pra paper acadêmico ou contrato internacional.",
  },
  {
    q: "Preciso criar conta?",
    a: "Pra resumo grátis, não. Pra chat com o PDF, biblioteca salva e PDFs longos, é Premium (R$29/mês).",
  },
];

export default function ChatpdfEmPortuguesPage() {
  return (
    <SeoPageTemplate
      title="ChatPDF em português brasileiro"
      intro="O PDFIA é a alternativa de ChatPDF feita pra quem trabalha com documento em português: interface, respostas e modos em PT-BR sem precisar configurar nada. Contrato CLT, edital, apólice e laudo têm tratamento próprio."
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
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Como funciona, na prática
        </h2>
        <ol className="mt-4 grid gap-3 text-body text-charcoal-text">
          <li className="flex items-start gap-4">
            <span className="eyebrow text-faded-stone">
              01
            </span>
            <span>Sobe um PDF — sem cadastro pra documento curto</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="eyebrow text-faded-stone">
              02
            </span>
            <span>
              Recebe o resumo com tópicos, datas e nomes em destaque
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="eyebrow text-faded-stone">
              03
            </span>
            <span>
              No Premium, abre o chat e pergunta o que quiser sobre qualquer
              parte do PDF
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="eyebrow text-faded-stone">
              04
            </span>
            <span>Cada resposta vem com a página exata de onde a info saiu</span>
          </li>
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            ChatPDF (internacional)
          </p>
          <h3 className="mt-3 font-display text-body-lg font-semibold text-midnight-ink">
            Pensado pro mundo todo
          </h3>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Interface em inglês por padrão</li>
            <li>Resposta depende do idioma do prompt</li>
            <li>Sem modo dedicado pra documento brasileiro</li>
            <li>Pagamento em dólar</li>
          </ul>
        </div>
        <div className="rounded-lg border border-midnight-ink bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            PDFIA
          </p>
          <h3 className="mt-3 font-display text-body-lg font-semibold text-midnight-ink">
            Pensado pro Brasil
          </h3>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Interface em português do Brasil</li>
            <li>Resposta sai em PT-BR sem configurar</li>
            <li>Modos pra contrato CLT, edital e apólice</li>
            <li>Pagamento em real, NF, suporte em português</li>
          </ul>
        </div>
      </section>
    </SeoPageTemplate>
  );
}
