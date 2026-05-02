import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Política de privacidade",
  description:
    "Política de privacidade do ChatPDF Brasil — modelo LGPD (placeholder até revisão jurídica).",
  path: "/privacidade",
});

/**
 * Placeholders PT-BR alinhados à LGPD: complete dados do controlador, DPO e bases legais com seu jurídico.
 */
export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight-ink">Política de privacidade</h1>
      <p className="mt-4 text-sm text-faded-stone">Última atualização: texto modelo — revisar antes do uso amplo.</p>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">1. Quem somos</h2>
        <p>
          Descreva aqui o nome empresarial, CNPJ e contato do controlador dos dados. Esta página é um esqueleto para
          atender à transparência prevista na LGPD.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">2. Dados que tratamos</h2>
        <p>
          Podemos tratar: dados de conta (e-mail, identificador de usuário), metadados de uso (logs, limites de rate),
          conteúdo de PDFs enviados para processamento e dados de pagamento processados pelo provedor de cobrança (não
          armazenamos cartão completo no ChatPDF salvo indicação contrária na integração).
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">3. Bases legais</h2>
        <p>
          Execução de contrato, legítimo interesse (segurança e melhoria do serviço), consentimento quando exigido e
          cumprimento de obrigação legal. Detalhe cada finalidade com seu advogado.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">4. Compartilhamento</h2>
        <p>
          Prestadores necessários ao produto: hospedagem (ex.: Vercel), banco de dados e auth (ex.: Supabase), pagamentos
          (ex.: Stripe), provedor de IA (ex.: OpenRouter e modelos subjacentes). Não vendemos seus dados pessoais.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">5. Retenção e exclusão</h2>
        <p>
          Defina prazos de retenção por tipo de dado. O usuário pode solicitar exclusão ou exportação conforme a LGPD;
          descreva o canal (e-mail do DPO / formulário).
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">6. Direitos do titular</h2>
        <p>
          Confirmação, acesso, correção, anonimização, portabilidade, eliminação e informação sobre compartilhamentos.
          Indique prazo de resposta e autenticação necessária para evitar vazamento a terceiros.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">7. Encarregado (DPO)</h2>
        <p>Inclua nome e contato do encarregado quando aplicável ao seu porte e tratamento de dados.</p>
      </section>
    </article>
  );
}
