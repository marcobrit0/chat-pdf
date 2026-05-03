import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF Brasil vs Adobe Acrobat AI Assistant",
  description:
    "Adobe Acrobat AI exige assinatura do pacote Adobe. ChatPDF Brasil é independente, com resumo gratuito e Premium em BRL. Veja qual faz sentido para você.",
  path: "/chatpdf-vs-adobe-acrobat-ai",
});

const comparison = [
  {
    label: "Requisito de software",
    you: "Nenhum — acesso pelo navegador",
    them: "Assinatura Adobe Acrobat",
  },
  {
    label: "Preço",
    you: "Gratuito (básico) / Premium em BRL",
    them: "Incluído no plano Adobe (USD)",
  },
  {
    label: "Idioma padrão das respostas",
    you: "Português do Brasil",
    them: "Inglês (multilíngue)",
  },
  {
    label: "Modos para documentos brasileiros",
    you: "Sim (CLT, editais, apólices)",
    them: "Não",
  },
  {
    label: "Resumo sem cadastro",
    you: "Sim",
    them: "Não",
  },
];

const faqs = [
  {
    q: "O AI Assistant do Acrobat funciona em português?",
    a: "Suporta múltiplos idiomas, mas não foi desenvolvido com foco no mercado brasileiro. O ChatPDF Brasil tem modos específicos para CLT, editais e apólices — e responde em PT-BR por padrão.",
  },
  {
    q: "Qual o custo da assinatura Adobe com AI Assistant?",
    a: "O AI Assistant está incluído em planos pagos da Adobe Acrobat, cobrados em USD. O ChatPDF Brasil tem resumo gratuito sem cadastro e Premium a R$29/mês.",
  },
  {
    q: "Posso usar o Acrobat só para o AI Assistant?",
    a: "Faz pouco sentido contratar o pacote Adobe completo só para chat com PDF. Se você não usa Acrobat para edição, uma ferramenta dedicada como o ChatPDF Brasil sai mais barato e mais focada.",
  },
];

export default function ChatpdfVsAdobePage() {
  return (
    <SeoPageTemplate
      title="ChatPDF Brasil vs Adobe Acrobat AI Assistant"
      intro="O AI Assistant do Adobe Acrobat faz parte de um pacote completo de software — útil se você já usa Acrobat, mas não vale contratar só para chat com PDFs. O ChatPDF Brasil é independente: upload direto, sem licença Adobe."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "vs Adobe Acrobat AI", path: "/chatpdf-vs-adobe-acrobat-ai" },
      ]}
      faqs={faqs}
      related={[
        { href: "/chatpdf-vs-chatgpt", label: "vs ChatGPT" },
        { href: "/chatpdf-vs-smallpdf", label: "vs Smallpdf" },
        { href: "/alternativa-ao-chatpdf", label: "Alternativa ao ChatPDF" },
      ]}
    >
      <section>
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Comparação direta
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-midnight-ink text-left">
                <th className="py-4 pr-6 font-medium text-faded-stone">
                  Recurso
                </th>
                <th className="py-4 pr-6 font-medium text-midnight-ink">
                  ChatPDF Brasil
                </th>
                <th className="py-4 font-medium text-faded-stone">
                  Adobe Acrobat AI Assistant
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle-gray text-charcoal-text">
              {comparison.map((row) => (
                <tr key={row.label}>
                  <td className="py-4 pr-6">{row.label}</td>
                  <td className="py-4 pr-6 font-medium text-midnight-ink">
                    {row.you}
                  </td>
                  <td className="py-4 text-faded-stone">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          Quando o Acrobat faz mais sentido
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal-text">
          Se sua equipe já usa o Adobe Acrobat para edição, assinaturas e gestão
          de PDFs em escala, o AI Assistant é um complemento natural. Para quem
          não tem licença, contratar o pacote inteiro só pelo AI raramente vale
          a pena.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
