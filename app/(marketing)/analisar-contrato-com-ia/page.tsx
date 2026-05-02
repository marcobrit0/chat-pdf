import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato com IA",
  description:
    "Use IA para ler contratos mais rápido — resumo gratuito limitado; Premium para revisão aprofundada. Não é aconselhamento jurídico.",
  path: "/analisar-contrato-com-ia",
});

/** Landing SEO — upload e fluxo completo entram nas fases seguintes. */
export default function AnalisarContratoPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        Analisar contrato com IA
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-text">
        Extraia pontos-chave de um contrato em PDF. O resumo anônimo ajuda na
        primeira leitura; análises detalhadas e chat exigem Premium. Sempre
        confirme com um profissional habilitado.
      </p>
      <p className="mt-6 text-sm text-faded-stone">
        Aviso: IA pode errar. Este produto não substitui assessoria jurídica.
      </p>
    </article>
  );
}
