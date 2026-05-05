import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA para resumir PDF em português",
  description:
    "Resuma PDFs em PT-BR em três passos: envie, leia o resumo estruturado, faça perguntas. Veja o que a IA extrai, exemplo real e quando vale Premium.",
  path: "/ia-para-resumir-pdf",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "IA para resumir PDF", path: "/ia-para-resumir-pdf" },
];

const fields = [
  { label: "Tópicos principais", note: "5–8 bullets cobrindo o eixo do documento" },
  { label: "Datas e prazos", note: "Toda data citada, contextualizada (vencimento, audiência, vigência)" },
  { label: "Entidades", note: "Pessoas, empresas, órgãos públicos e seus papéis no texto" },
  { label: "Valores monetários", note: "R$, USD ou EUR identificados, com a referência ao parágrafo" },
  { label: "Cláusulas-chave", note: "Em contratos: rescisão, multa, foro, confidencialidade, exclusividade" },
  { label: "Perguntas sugeridas", note: "3–5 perguntas que o documento responde mas não destaca" },
];

const steps = [
  {
    n: "01",
    title: "Envie o PDF",
    body: "Arraste ou selecione um PDF com texto selecionável (não escaneado). Limite gratuito: 10 páginas. Premium aceita até 100 páginas e arquivos digitalizados via OCR.",
  },
  {
    n: "02",
    title: "Leia o resumo estruturado",
    body: "A IA devolve um parágrafo de visão geral seguido de tópicos, datas, entidades e perguntas. Trate como primeiro passe — não como parecer final.",
  },
  {
    n: "03",
    title: "Aprofunde com perguntas (Premium)",
    body: "No workspace Premium, você pergunta direto ao documento. Cada resposta cita a página, então é fácil verificar a fonte antes de agir.",
  },
];

const faqs = [
  {
    q: "Quando vale a pena usar IA para resumir um PDF em vez de ler?",
    a: "Quando o objetivo é triar — decidir se o documento merece leitura completa, ou identificar pontos críticos antes de uma reunião. Para parecer técnico, decisão jurídica ou clínica, a IA é apoio, não substituta.",
  },
  {
    q: "Que tipo de PDF a IA resume melhor?",
    a: "PDFs com texto selecionável e estrutura razoável (relatórios, contratos, editais, apólices, laudos). PDFs digitalizados precisam passar por OCR primeiro — o Premium faz isso automaticamente.",
  },
  {
    q: "O resumo grátis salva o arquivo?",
    a: "Não. O fluxo anônimo processa o PDF, devolve o resumo e descarta o conteúdo. Para histórico, perguntas posteriores ou reabertura do documento, é necessário entrar no Premium.",
  },
  {
    q: "Como saber se a IA inventou alguma informação?",
    a: "No Premium, toda resposta vem com a página citada — basta abrir e conferir. No resumo gratuito, valide os pontos mais importantes contra o texto original antes de tomar qualquer decisão.",
  },
];

export default function IaParaResumirPdfPage() {
  return (
    <SeoPageTemplate
      title="IA para resumir PDF"
      intro="Três passos do envio à conclusão. Veja o que a IA realmente extrai, um exemplo real e quando faz sentido subir para o Premium."
      showUpload
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/resumo-de-pdf", label: "Resumo de PDF" },
        { href: "/ia-pdf", label: "IA para PDF (casos de uso)" },
        { href: "/pdf-ia", label: "PDF + IA (como funciona)" },
        { href: "/chat-pdf", label: "Chat com o PDF" },
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que a IA extrai do PDF
        </h2>
        <p>
          Não é apenas um resumo de texto livre. A saída é estruturada para que
          você localize a informação rapidamente — em PDFs longos, o tempo
          médio para encontrar um valor ou prazo cai de 5–10 minutos para
          segundos.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {fields.map((f) => (
            <li
              key={f.label}
              className="rounded-lg border border-subtle-gray bg-crisp-white p-4"
            >
              <p className="font-display text-body font-semibold text-midnight-ink">
                {f.label}
              </p>
              <p className="mt-1 text-body-sm text-charcoal-text">{f.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Fluxo passo a passo
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-lg border border-subtle-gray bg-crisp-white p-5"
            >
              <p className="eyebrow text-faded-stone">
                {s.n}
              </p>
              <p className="mt-2 font-display text-body-lg font-semibold text-midnight-ink">
                {s.title}
              </p>
              <p className="mt-2 text-body-sm  text-charcoal-text">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Exemplo: contrato de prestação de serviços (PDF de 8 páginas)
        </h2>
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-5">
          <p className="eyebrow text-faded-stone">
            Saída resumida pela IA
          </p>
          <ul className="mt-3 space-y-2 text-body-sm text-charcoal-text">
            <li>
              <strong className="text-midnight-ink">Visão geral:</strong>{" "}
              Contrato entre Empresa X e Consultoria Y para serviços de
              implantação por 12 meses, com renovação automática salvo
              denúncia.
            </li>
            <li>
              <strong className="text-midnight-ink">Valor total:</strong> R$
              240.000 em 12 parcelas de R$ 20.000.
            </li>
            <li>
              <strong className="text-midnight-ink">Multa por
              rescisão antecipada:</strong> 30% do saldo restante (cláusula
              8.2, p.4).
            </li>
            <li>
              <strong className="text-midnight-ink">Prazo de aviso:</strong> 60
              dias antes da renovação.
            </li>
            <li>
              <strong className="text-midnight-ink">Foro:</strong> Comarca de
              São Paulo/SP.
            </li>
          </ul>
        </div>
        <p className="text-body-sm text-faded-stone">
          Exemplo ilustrativo — a saída real depende do conteúdo do seu PDF.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
