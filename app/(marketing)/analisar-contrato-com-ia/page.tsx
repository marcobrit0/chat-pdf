import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato com IA — leitura rápida e modo riscos",
  description:
    "Use IA para ler contratos mais rápido: partes, objeto, prazos, valores e pontos de atenção. Resumo gratuito; chat com citação de página no Premium. Não é aconselhamento jurídico.",
  path: "/analisar-contrato-com-ia",
});

const faqs = [
  {
    q: "Para que tipo de contrato funciona?",
    a: "Qualquer contrato em PDF com texto selecionável: prestação de serviços, compra e venda, parceria, NDA, distribuição, locação. Para CLT use a página específica.",
  },
  {
    q: "A IA aponta cláusulas problemáticas?",
    a: "No modo Riscos do Premium, ela sinaliza pontos de atenção comuns (multas elevadas, prazos curtos, cláusulas atípicas) para revisão humana. Não é parecer jurídico.",
  },
  {
    q: "Quantas páginas de contrato posso enviar?",
    a: "Até 10 páginas no gratuito, 100 no Premium. Para contratos maiores, divida em partes ou fale conosco.",
  },
  {
    q: "Vocês armazenam meu contrato?",
    a: "No gratuito, não. No Premium, fica vinculado à sua conta com criptografia em repouso e excluído conforme sua política — você controla.",
  },
];

export default function AnalisarContratoPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato com IA"
      intro="Identifique partes, objeto, prazos, valores e pontos de atenção num primeiro passe. O resumo gratuito ajuda na leitura inicial; revisão detalhada, modos Extrair e Riscos e chat com citações ficam no Premium."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Analisar contrato", path: "/analisar-contrato-com-ia" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-clt", label: "Contrato CLT" },
        { href: "/resumir-contrato-pdf", label: "Resumir contrato" },
        {
          href: "/analisar-contrato-de-prestacao-de-servicos",
          label: "Prestação de serviços",
        },
        { href: "/comparar-pdfs", label: "Comparar versões" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Com o Premium você pode
        </p>
        <ul className="mt-4 grid gap-3 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                Chat com fontes
              </strong>{" "}
              — pergunte sobre cláusulas e veja trechos com a página citada.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                Modos Extrair e Riscos
              </strong>{" "}
              — dados objetivos e pontos para checagem humana (não é parecer
              jurídico).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                PDFs longos
              </strong>{" "}
              acima do limite gratuito, salvos na sua conta.
            </span>
          </li>
        </ul>
        <p className="mt-5 text-body-sm text-faded-stone">
          IA pode errar ou omitir cláusulas. Este produto não substitui
          advogado, contador ou assessor contratual.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
