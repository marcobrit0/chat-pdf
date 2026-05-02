import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF vs ChatGPT para documentos em PDF",
  description:
    "Quando usar uma ferramenta dedicada como o ChatPDF Brasil e quando o ChatGPT é suficiente. Comparação direta em PT-BR.",
  path: "/chatpdf-vs-chatgpt",
});

export default function ChatpdfVsChatgptPage() {
  return (
    <SeoPageTemplate
      title="ChatPDF vs ChatGPT para PDFs"
      intro="ChatGPT é uma ferramenta genérica que também lê PDFs. Ferramentas como o ChatPDF Brasil são construídas para isso — upload direto, respostas ancoradas no texto, citação de página por padrão e modos para tipos de documento específicos."
    >
      <section className="overflow-x-auto">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">Comparação direta</h2>
        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-subtle-gray text-left">
              <th className="py-3 pr-6 font-medium text-faded-stone">Ponto</th>
              <th className="py-3 pr-6 font-medium text-midnight-ink">ChatPDF Brasil</th>
              <th className="py-3 font-medium text-faded-stone">ChatGPT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle-gray text-charcoal-text">
            <tr>
              <td className="py-3 pr-6">Upload de PDF</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Upload direto, processado para chat</td>
              <td className="py-3 text-faded-stone">Upload por sessão, sem persistência</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Citação de página</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sempre, por padrão</td>
              <td className="py-3 text-faded-stone">Só se você pedir no prompt</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Aviso quando a resposta não está no PDF</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">Nem sempre</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Modos para contratos, editais, apólices</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim</td>
              <td className="py-3 text-faded-stone">Não — prompt manual</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Histórico do documento</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Sim (Premium)</td>
              <td className="py-3 text-faded-stone">Por sessão</td>
            </tr>
            <tr>
              <td className="py-3 pr-6">Preço</td>
              <td className="py-3 pr-6 font-medium text-midnight-ink">Gratuito (básico) / Premium em BRL</td>
              <td className="py-3 text-faded-stone">ChatGPT Plus em USD</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">Quando cada ferramenta faz mais sentido</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray p-5">
            <h3 className="font-display text-base font-semibold text-midnight-ink">Use o ChatPDF Brasil quando</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
              <li>Precisar de respostas com fonte verificável</li>
              <li>O documento é um contrato, edital ou apólice brasileira</li>
              <li>Precisar salvar o documento para voltar depois</li>
              <li>Quiser um resumo rápido sem precisar de conta</li>
            </ul>
          </div>
          <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray p-5">
            <h3 className="font-display text-base font-semibold text-midnight-ink">Use o ChatGPT quando</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-charcoal-text">
              <li>Já tiver o ChatGPT Plus e a tarefa for pontual</li>
              <li>Precisar de outras tarefas além de leitura de PDF</li>
              <li>O PDF for muito longo e não houver alternativa</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Teste sem compromisso</h2>
        <p className="mt-2 text-charcoal-text">Resumo gratuito sem cadastro para PDFs de até 10 páginas.</p>
        <div className="mt-4">
          <Link
            href="/resumir-pdf"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
          >
            Resumir PDF grátis
          </Link>
        </div>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/chatgpt-pdf" className="text-sm text-midnight-ink underline underline-offset-4">ChatGPT para PDF</Link></li>
          <li><Link href="/alternativa-ao-chatpdf" className="text-sm text-midnight-ink underline underline-offset-4">Alternativa ao ChatPDF</Link></li>
          <li><Link href="/chatpdf-vs-smallpdf" className="text-sm text-midnight-ink underline underline-offset-4">ChatPDF vs Smallpdf</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
