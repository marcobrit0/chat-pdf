import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Termos de uso",
  description:
    "Termos de uso do ChatPDF Brasil — texto modelo PT-BR até revisão jurídica.",
  path: "/termos",
});

/**
 * Placeholders PT-BR para pré-lançamento: substituir por texto revisado por advogado antes de escalar marketing.
 */
export default function TermosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight-ink">Termos de uso</h1>
      <p className="mt-4 text-sm text-faded-stone">Última atualização: texto modelo — revisar antes do uso amplo.</p>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">1. Serviço</h2>
        <p>
          O ChatPDF Brasil oferece ferramentas para extrair texto de PDFs e gerar saídas assistidas por IA (resumos,
          extrações, perguntas e respostas no plano pago). O serviço pode mudar, ser limitado ou interrompido para
          manutenção.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">2. Limitações da IA</h2>
        <p>
          Saídas geradas por IA podem estar incompletas, imprecisas ou tendenciosas. Você é responsável por validar
          informações críticas. O produto não fornece assessoria jurídica, médica, financeira nem qualquer parecer
          profissional regulamentado.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">3. Planos e pagamentos</h2>
        <p>
          Planos pagos são processados por provedor terceiro (ex.: Stripe). Preços, impostos e renovação aparecem na página
          de preços e no checkout. Em caso de divergência com o gateway de pagamento, prevalece o registro do provedor de
          pagamento para fins de cobrança.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">4. Cancelamento e reembolso</h2>
        <p>
          Você pode cancelar a renovação pelo portal de cobrança indicado na conta. Políticas de reembolso seguem a
          legislação aplicável ao consumidor brasileiro e as regras do meio de pagamento; ajuste este parágrafo após
          definir política comercial e jurídica.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">5. Conteúdo do usuário</h2>
        <p>
          Você declara ter direito de usar os PDFs enviados. Não envie dados que violem lei ou direitos de terceiros. O
          tratamento de dados pessoais está descrito na Política de privacidade.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">6. Contato</h2>
        <p>Para suporte ou solicitações relacionadas a estes termos, use o canal de contato divulgado no site.</p>
      </section>
    </article>
  );
}
