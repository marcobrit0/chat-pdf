import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF Brasil vs Adobe Acrobat AI Assistant",
  description:
    "O AI Assistant do Acrobat é poderoso mas exige assinatura do pacote Adobe completo. O ChatPDF Brasil é independente — upload direto, preços em BRL, sem precisar de licença Adobe.",
  path: "/chatpdf-vs-adobe-acrobat-ai",
});

export default function ChatpdfVsAdobePage() {
  return (
    <SeoPageTemplate
      title="ChatPDF Brasil vs Adobe Acrobat AI Assistant"
      intro="O AI Assistant do Adobe Acrobat faz parte de um pacote de software completo — útil se você já usa Acrobat, mas não faz sentido contratar só para chat com documentos. O ChatPDF Brasil é independente: upload direto do arquivo, sem precisar de licença Adobe."
    >
      <section className="overflow-x-auto">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">Comparação</h2>
        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-subtle-gray text-left">
              <th className="py-3 pr-6 font-medium text-faded-stone">Ponto</th>
              <th className="py-3 pr-6 font-medium text-midnight-ink">ChatPDF Brasil</th>
              <th className="py-3 font-medium text-faded-stone">Adobe Acrobat AI Assistant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle-gray text-charcoal-text">
            <tr>
              <td className="py-3 pr-6">Requisito de software</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Nenhum — acesso pelo navegador</td>
              <td className="py-3 text-faded-stone">Assinatura Adobe Acrobat</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Preço</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Gratuito (básico) / Premium em BRL</td>
              <td className="py-3 text-faded-stone">Incluído no plano Adobe (USD)</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Idioma padrão das respostas</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Português do Brasil</td>
              <td className="py-3 text-faded-stone">Inglês (multilíngue)</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Modos para documentos brasileiros</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim (CLT, editais, apólices)</td>
              <td className="py-3 text-faded-stone">Não</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Resumo sem cadastro</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">Não</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Quando o Acrobat faz mais sentido</h2>
        <p className="text-base text-charcoal-text">
          Se sua equipe já usa o Adobe Acrobat para edição, assinaturas e gestão de PDFs em escala, o AI Assistant é um complemento natural. Para quem não tem a licença, não compensa assinar o pacote completo só para chat com documentos.
        </p>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Comece sem licença</h2>
        <p className="mt-2 text-charcoal-text">Resumo gratuito para PDFs curtos, sem cadastro.</p>
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
            Ver planos em BRL
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">O AI Assistant do Acrobat funciona em português?</dt>
            <dd className="mt-1 text-charcoal-text">
              Suporta múltiplos idiomas, mas não foi desenvolvido com foco no mercado brasileiro. O ChatPDF Brasil tem modos específicos para documentos como CLT, editais e apólices.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Qual o custo da assinatura Adobe com AI Assistant?</dt>
            <dd className="mt-1 text-charcoal-text">
              O AI Assistant está incluído em planos pagos da Adobe, cobrados em USD. O ChatPDF Brasil tem resumo gratuito e planos Premium em BRL.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/chatpdf-vs-chatgpt" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs ChatGPT</Link></li>
          <li><Link href="/chatpdf-vs-smallpdf" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs Smallpdf</Link></li>
          <li><Link href="/alternativa-ao-chatpdf" className="text-sm text-midnight-ink underline underline-offset-4">Alternativa ao ChatPDF</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
