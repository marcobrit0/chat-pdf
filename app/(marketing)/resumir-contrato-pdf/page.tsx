import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir contrato em PDF com IA",
  description:
    "Identifique partes, objeto, prazo, valores e cláusulas-chave antes de negociar ou assinar. Resumo gratuito para contratos curtos; chat com citações no Premium.",
  path: "/resumir-contrato-pdf",
});

export default function ResumirContratoPdfPage() {
  return (
    <SeoPageTemplate
      title="Resumir contrato em PDF"
      intro="Identifique partes, objeto, prazo, valores e cláusulas principais antes de negociar ou assinar. O resumo gratuito cobre contratos curtos; o Premium adiciona chat com citações de página, extração estruturada e revisão de riscos."
      showUpload
      contractIntent
    >
      <section className="rounded-[length:var(--radius-cards)] border border-amber-200 bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">No resumo você vai ver</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Partes contratantes (contratante e contratado)</li>
          <li>Objeto do contrato</li>
          <li>Vigência, renovação e condições de rescisão</li>
          <li>Valores, forma e prazo de pagamento</li>
          <li>Cláusulas de multa e penalidades quando presentes</li>
        </ul>
        <p className="mt-4 text-sm text-faded-stone">
          Isso é um primeiro passe para leitura — não substitui análise jurídica. Para contratos com consequências financeiras ou legais relevantes, envolva um advogado.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Perguntas frequentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-midnight-ink">Funciona com contratos em formato imagem (escaneados)?</dt>
            <dd className="mt-1 text-charcoal-text">
              Não no plano gratuito. O PDF precisa ter texto selecionável. Suporte a OCR para arquivos escaneados está no roadmap Premium.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">A IA vai entender termos jurídicos?</dt>
            <dd className="mt-1 text-charcoal-text">
              Ela extrai e organiza o texto do contrato. Não interpreta consequências legais — isso é papel de um advogado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-midnight-ink">Posso fazer perguntas sobre cláusulas específicas?</dt>
            <dd className="mt-1 text-charcoal-text">
              Sim, no chat do Premium. Cada resposta cita a página do contrato onde o trecho aparece.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-subtle-gray pt-6">
        <p className="text-sm font-medium text-faded-stone uppercase tracking-wide">Veja também</p>
        <ul className="mt-3 flex flex-wrap gap-4">
          <li><Link href="/analisar-contrato-com-ia" className="text-sm text-midnight-ink underline underline-offset-4">Analisar contrato</Link></li>
          <li><Link href="/analisar-contrato-clt" className="text-sm text-midnight-ink underline underline-offset-4">Contrato CLT</Link></li>
          <li><Link href="/analisar-contrato-de-prestacao-de-servicos" className="text-sm text-midnight-ink underline underline-offset-4">Prestação de serviços</Link></li>
          <li><Link href="/comparar-pdfs" className="text-sm text-midnight-ink underline underline-offset-4">Comparar PDFs</Link></li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
