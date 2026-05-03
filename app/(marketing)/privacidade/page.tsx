import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Política de privacidade",
  description:
    "Política de privacidade do PDFIA — modelo LGPD (placeholder até revisão jurídica).",
  path: "/privacidade",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Política de privacidade", path: "/privacidade" },
];

const lastUpdated = "3 de maio de 2026";

/**
 * Texto modelo PT-BR alinhado à LGPD. Complete dados do controlador, DPO e
 * bases legais com seu jurídico antes de escalar marketing.
 */
export default function PrivacidadePage() {
  return (
    <SeoPageTemplate
      title="Política de privacidade"
      intro={`Última atualização: ${lastUpdated}. Esqueleto LGPD — substituir nomes, prazos de retenção e canais oficiais antes da revisão jurídica final.`}
      breadcrumbs={breadcrumbs}
    >
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          1. Quem somos
        </h2>
        <p>
          Descreva aqui o nome empresarial, CNPJ e contato do controlador dos
          dados. Esta seção é o ponto de transparência exigido pela LGPD.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          2. Dados que tratamos
        </h2>
        <p>
          Podemos tratar: dados de conta (e-mail, identificador de usuário),
          metadados de uso (logs, limites de rate), conteúdo de PDFs enviados
          para processamento e dados de pagamento processados pelo provedor de
          cobrança (não armazenamos cartão completo no PDFIA).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          3. Bases legais
        </h2>
        <p>
          Execução de contrato, legítimo interesse (segurança e melhoria do
          serviço), consentimento quando exigido e cumprimento de obrigação
          legal. Detalhe cada finalidade com seu advogado.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          4. Compartilhamento
        </h2>
        <p>
          Prestadores necessários ao produto: hospedagem (Vercel), banco de
          dados e auth (Supabase), pagamentos (Stripe), provedor de IA
          (OpenRouter e modelos subjacentes). Não vendemos seus dados pessoais.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          5. Retenção e exclusão
        </h2>
        <p>
          Defina prazos de retenção por tipo de dado. O usuário pode solicitar
          exclusão ou exportação conforme a LGPD; descreva o canal (e-mail do
          DPO ou formulário).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          6. Direitos do titular
        </h2>
        <p>
          Confirmação, acesso, correção, anonimização, portabilidade,
          eliminação e informação sobre compartilhamentos. Indique prazo de
          resposta e autenticação necessária para evitar vazamento a terceiros.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">
          7. Encarregado (DPO)
        </h2>
        <p>
          Inclua nome e contato do encarregado quando aplicável ao seu porte e
          tratamento de dados.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
