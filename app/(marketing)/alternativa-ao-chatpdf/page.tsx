import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Alternativa ao ChatPDF feita pro Brasil — em real e em português | PDFIA",
  description:
    "ChatPDF funciona, mas foi feito pro mercado global. PDFIA tem interface em PT-BR, modos prontos pra contrato CLT, edital e apólice brasileira, e pagamento em real. Sem dólar, sem traduzir prompt.",
  path: "/alternativa-ao-chatpdf",
});

const comparison = [
  {
    label: "Idioma da interface",
    you: "Português do Brasil",
    them: "Inglês (multilíngue)",
  },
  {
    label: "Respostas em PT-BR",
    you: "Por padrão",
    them: "Depende do prompt",
  },
  {
    label: "Modos para contratos CLT",
    you: "Sim",
    them: "Não",
  },
  {
    label: "Modos para editais e apólices",
    you: "Sim",
    them: "Não",
  },
  {
    label: "Preços em BRL",
    you: "Sim",
    them: "USD",
  },
  {
    label: "Resumo gratuito sem cadastro",
    you: "Sim (até 10 páginas)",
    them: "Limitado",
  },
];

const faqs = [
  {
    q: "Por que não usar o ChatPDF internacional com prompt em português?",
    a: "Funciona, mas exige configurar idioma em cada sessão e o produto não tem modos específicos para documentos típicos do mercado brasileiro. O PDFIA já vem assim por padrão.",
  },
  {
    q: "Quais documentos o PDFIA cobre melhor?",
    a: "Contratos de trabalho CLT, contratos de prestação de serviços, editais de licitação, apólices de seguro, laudos médicos e relatórios técnicos — todos com modos otimizados.",
  },
  {
    q: "É mais caro?",
    a: "Pelo contrário. O resumo é grátis sem cadastro e o Premium é R$29/mês — bem abaixo do ChatPDF internacional convertido em real.",
  },
];

export default function AlternativaAoChatpdfPage() {
  return (
    <SeoPageTemplate
      title="Alternativa ao ChatPDF, feita pro Brasil"
      intro="O ChatPDF funciona bem pro mundo todo. Mas pra quem trabalha com documento brasileiro — contrato CLT, edital de licitação, apólice nacional — falta tratamento dedicado, fica em inglês por padrão e cobra em dólar. O PDFIA é pensado pro Brasil desde o primeiro dia."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "Alternativa ao ChatPDF", path: "/alternativa-ao-chatpdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/chatpdf-em-portugues", label: "ChatPDF em português" },
        { href: "/chatpdf-vs-chatgpt", label: "vs ChatGPT" },
        { href: "/chat-pdf", label: "Chat com PDF" },
      ]}
    >
      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Diferenças práticas
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-midnight-ink text-left">
                <th className="py-4 pr-6 font-medium text-faded-stone">
                  Recurso
                </th>
                <th className="py-4 pr-6 font-medium text-midnight-ink">
                  PDFIA
                </th>
                <th className="py-4 font-medium text-faded-stone">ChatPDF</th>
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
    </SeoPageTemplate>
  );
}
