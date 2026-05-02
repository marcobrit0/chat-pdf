import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Alternativa ao ChatPDF para o mercado brasileiro",
  description:
    "ChatPDF funciona mas foi feito para o mercado global. O ChatPDF Brasil tem UX em PT-BR, modos para documentos brasileiros e preços em reais.",
  path: "/alternativa-ao-chatpdf",
});

export default function AlternativaAoChatpdfPage() {
  return (
    <SeoPageTemplate
      title="Alternativa ao ChatPDF em português"
      intro="ChatPDF funciona bem para o mercado global, mas não foi feito para o Brasil. O ChatPDF Brasil tem interface e respostas em PT-BR, modos prontos para contratos CLT, editais de licitação e apólices de seguro, e preços em reais."
    >
      <section className="overflow-x-auto">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">Diferenças práticas</h2>
        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-subtle-gray text-left">
              <th className="py-3 pr-6 font-medium text-faded-stone">Recurso</th>
              <th className="py-3 pr-6 font-medium text-midnight-ink">ChatPDF Brasil</th>
              <th className="py-3 font-medium text-faded-stone">ChatPDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle-gray text-charcoal-text">
            <tr>
              <td className="py-3 pr-6">Idioma da interface</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Português do Brasil</td>
              <td className="py-3 text-faded-stone">Inglês (multilíngue)</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Respostas em PT-BR</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Por padrão</td>
              <td className="py-3 text-faded-stone">Depende do prompt</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Modos para contratos CLT</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">Não</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Modos para editais e apólices</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">Não</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Preços em BRL</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">USD</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Resumo gratuito sem cadastro</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim (até 10 páginas)</td>
              <td className="py-3 text-faded-stone">Limitado</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Experimente grátis</h2>
        <p className="mt-2 text-charcoal-text">
          Resumo de PDFs curtos gratuito e sem cadastro. Para chat, documentos longos e modos avançados, veja os planos.
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
            <dt className="font-medium text-midnight-ink">Por que não usar o ChatPDF internacional com prompt em português?</dt>
            <dd className="mt-1 text-charcoal-text">
              Funciona, mas exige que você configure o idioma em cada sessão e o produto não tem modos para documentos típicos do mercado brasileiro. O ChatPDF Brasil faz isso por padrão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Quais documentos o ChatPDF Brasil cobre melhor?</dt>
            <dd className="mt-1 text-charcoal-text">
              Contratos de trabalho CLT, contratos de prestação de serviços, editais de licitação, apólices de seguro, laudos médicos e relatórios técnicos.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/chatpdf-em-portugues" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF em português</Link></li>
          <li><Link href="/chatpdf-vs-chatgpt" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs ChatGPT</Link></li>
          <li><Link href="/chat-pdf" className="text-sm text-midnight-ink underline underline-offset-4">Chat com PDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
