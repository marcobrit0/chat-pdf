import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Termos de uso — PDFIA",
  description:
    "Termos de uso do PDFIA: o que o serviço entrega, limitações da IA, planos e pagamentos via Stripe, cancelamento, reembolso, conteúdo do usuário e responsabilidade.",
  path: "/termos",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Termos de uso", path: "/termos" },
];

const lastUpdated = "6 de maio de 2026";

/**
 * Termos de uso do PDFIA. Texto ancorado no fluxo real de assinatura
 * (Stripe checkout, webhook que sincroniza status), na regra dos limites
 * (lib/constants/limits.ts) e nos modos do produto.
 *
 * Ao alterar preço, limites técnicos, política de reembolso ou
 * subprocessadores, atualizar:
 *   - lastUpdated (acima)
 *   - valores e limites nas seções 3 e 4
 *   - referência cruzada com a Política de privacidade
 */
export default function TermosPage() {
  return (
    <SeoPageTemplate
      title="Termos de uso"
      intro={`Última atualização: ${lastUpdated}. Aqui está, em português direto, o que o PDFIA entrega, o que você precisa saber sobre IA, como funcionam plano, pagamento, cancelamento e reembolso, e o que cabe a cada lado nesse acordo.`}
      breadcrumbs={breadcrumbs}
    >
      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          1. Quem oferece o serviço
        </h2>
        <p>
          O PDFIA (pdfia.com.br) é um produto da{" "}
          <strong className="font-medium text-midnight-ink">MadeofIA</strong>,
          inscrita no CNPJ{" "}
          <span className="font-mono text-body-sm">65.599.230/0001-64</span>,
          com site institucional em{" "}
          <a
            href="https://madeof.ia.br"
            className="text-midnight-ink underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            madeof.ia.br
          </a>
          . Ao usar o PDFIA, você concorda com estes termos. Se não
          concordar, não use o serviço.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          2. O que o PDFIA faz
        </h2>
        <p>
          O PDFIA é uma ferramenta web que extrai texto de arquivos PDF e
          gera, com apoio de modelos de IA, saídas como resumo, listas de
          datas e valores, identificação de partes, análise de riscos e
          respostas em chat com a página de origem citada.
        </p>
        <p>O serviço é disponibilizado em dois níveis:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-midnight-ink">Grátis:</strong>{" "}
            resumo de PDF de até 10 páginas e até 5 MB, sem cadastro, com
            limite de uso justo por dia por dispositivo.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">Premium:</strong>{" "}
            chat com o documento, biblioteca salva, modos de análise,
            exportação e PDFs maiores. Os limites técnicos atuais aparecem
            no produto e podem ser ajustados conforme uso responsável e
            evolução da infraestrutura.
          </li>
        </ul>
        <p>
          A MadeofIA pode alterar, limitar ou interromper funcionalidades
          para manutenção, melhoria ou conformidade. Em mudanças relevantes
          a quem já assina, comunicaremos por e-mail ou aviso no produto.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          3. Planos, preços e pagamento
        </h2>
        <p>
          O Premium é cobrado em real (BRL), no plano{" "}
          <strong className="font-medium text-midnight-ink">
            mensal de R$29
          </strong>{" "}
          ou{" "}
          <strong className="font-medium text-midnight-ink">
            anual de R$290
          </strong>{" "}
          (equivalente a R$24,17/mês), conforme a opção escolhida no
          checkout. Preços vigentes aparecem na página{" "}
          <a
            href="/precos"
            className="text-midnight-ink underline underline-offset-4"
          >
            /precos
          </a>{" "}
          e podem ser reajustados; novos preços só passam a valer para você
          a partir da próxima renovação, com aviso prévio por e-mail.
        </p>
        <p>
          O processamento de pagamentos é feito pela{" "}
          <strong className="font-medium text-midnight-ink">Stripe</strong>{" "}
          (Stripe Payments do Brasil Instituição de Pagamento Ltda. ou
          entidade equivalente do grupo Stripe). Aceitamos cartão de crédito
          (Visa, Mastercard, American Express, Elo). Dados de cartão são
          coletados, processados e armazenados exclusivamente pela Stripe; a
          MadeofIA{" "}
          <strong className="font-medium text-midnight-ink">
            não armazena dados de cartão
          </strong>
          .
        </p>
        <p>
          A assinatura renova automaticamente ao fim de cada ciclo (mensal
          ou anual) até que você cancele. Em caso de divergência sobre
          valores cobrados, o registro do gateway de pagamento (Stripe)
          prevalece para fins de reconciliação.
        </p>
        <p>
          <strong className="font-medium text-midnight-ink">
            Nota fiscal:
          </strong>{" "}
          emitimos NF-e mediante solicitação. Após o pagamento, envie o
          CNPJ ou CPF e o recibo do Stripe para{" "}
          <a
            href="mailto:financeiro@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            financeiro@pdfia.com.br
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          4. Cancelamento e reembolso
        </h2>
        <p>
          Você pode cancelar o Premium a qualquer momento, sem fidelidade e
          sem multa, diretamente na sua conta. Após o cancelamento, o acesso
          às funcionalidades pagas continua válido até o fim do período já
          pago. Não há renovação automática após o cancelamento.
        </p>
        <p>
          <strong className="font-medium text-midnight-ink">Reembolso:</strong>{" "}
          conforme o art. 49 do Código de Defesa do Consumidor, contratos
          de serviço fechados pela internet podem ser desfeitos em até 7
          (sete) dias corridos a contar da contratação, com devolução
          integral do valor pago. Para solicitar, escreva para{" "}
          <a
            href="mailto:financeiro@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            financeiro@pdfia.com.br
          </a>{" "}
          dentro do prazo, com o recibo do Stripe. O reembolso é processado
          pelo mesmo meio de pagamento original.
        </p>
        <p>
          Após o fim do período pago, sua biblioteca Premium fica disponível
          para download por 30 dias antes de ser excluída definitivamente —
          conforme a{" "}
          <a
            href="/privacidade"
            className="text-midnight-ink underline underline-offset-4"
          >
            Política de privacidade
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          5. O que a IA faz e o que não faz
        </h2>
        <p>
          As saídas geradas por IA são apoio à leitura, não decisão. Podem
          conter omissões, imprecisões ou interpretações equivocadas de
          trechos. Quando possível, o produto cita a página de origem da
          resposta — use isso para conferir antes de agir.
        </p>
        <p>O PDFIA não fornece, em nenhuma hipótese:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>Aconselhamento jurídico ou parecer de advogado</li>
          <li>Diagnóstico médico, prescrição ou conduta clínica</li>
          <li>
            Aconselhamento financeiro, tributário ou recomendação de
            investimento
          </li>
          <li>
            Qualquer outro parecer profissional regulamentado por lei ou por
            órgão de classe
          </li>
        </ul>
        <p>
          Para decisões que envolvam direitos, dinheiro ou saúde, consulte
          um profissional habilitado e use a IA apenas como triagem. A
          MadeofIA não se responsabiliza por decisões tomadas com base
          exclusivamente em saídas geradas pelo PDFIA.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          6. Conteúdo enviado por você
        </h2>
        <p>
          Você é responsável pelos PDFs que envia ao PDFIA. Ao usar o
          serviço, você declara que:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            Tem o direito de processar e analisar o conteúdo daquele
            documento
          </li>
          <li>
            O envio não viola direitos de terceiros (autoria, sigilo,
            propriedade intelectual)
          </li>
          <li>
            O conteúdo não é ilegal, não contém material relacionado a
            abuso infantil, instigação a violência ou qualquer outro tipo
            vedado em lei
          </li>
        </ul>
        <p>
          Você mantém todos os direitos sobre os PDFs que envia. A
          MadeofIA não usa o conteúdo dos seus documentos para treinar
          modelos de IA, comercializar dados ou qualquer outra finalidade
          além de operar o serviço para você. O detalhe operacional sobre
          tratamento de dados está na{" "}
          <a
            href="/privacidade"
            className="text-midnight-ink underline underline-offset-4"
          >
            Política de privacidade
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          7. Uso indevido e suspensão
        </h2>
        <p>
          A MadeofIA pode suspender ou encerrar contas que façam uso
          indevido do serviço — por exemplo, tentativa de burlar limites
          técnicos, uso automatizado não autorizado, processamento em massa
          de PDFs de terceiros sem direito, ou uso para finalidades
          vedadas pela lei. Em casos graves, podemos suspender sem aviso
          prévio para preservar a integridade do serviço.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          8. Limitação de responsabilidade
        </h2>
        <p>
          Na máxima extensão permitida pela legislação aplicável, a
          responsabilidade total da MadeofIA por qualquer prejuízo
          decorrente do uso do PDFIA fica limitada ao valor pago por você
          nos 12 (doze) meses anteriores ao fato. A MadeofIA não responde
          por lucros cessantes, perda de oportunidade, dano indireto ou
          decisão tomada com base em saída gerada por IA sem verificação
          humana adequada.
        </p>
        <p>
          Estas limitações não afetam direitos do consumidor previstos em
          normas de ordem pública.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          9. Mudanças nestes termos
        </h2>
        <p>
          Estes termos podem ser atualizados. A data no topo indica a versão
          em vigor. Mudanças relevantes para quem já assina são comunicadas
          por e-mail ou aviso no produto, com pelo menos 30 dias de
          antecedência quando a mudança afetar preço ou direitos
          essenciais. Se você não concordar com a nova versão, pode
          cancelar a assinatura conforme a seção 4.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          10. Lei aplicável e foro
        </h2>
        <p>
          Estes termos são regidos pelas leis brasileiras. Conflitos serão
          resolvidos pelo foro do consumidor (consumidor pessoa física), ou
          pelo foro da Comarca da sede da MadeofIA quando a relação não for
          de consumo, salvo competência diversa imposta pela legislação.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          11. Contato
        </h2>
        <p>
          Suporte ao produto:{" "}
          <a
            href="mailto:suporte@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            suporte@pdfia.com.br
          </a>
          .
          <br />
          Cobrança e nota fiscal:{" "}
          <a
            href="mailto:financeiro@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            financeiro@pdfia.com.br
          </a>
          .
          <br />
          Privacidade e LGPD:{" "}
          <a
            href="mailto:privacidade@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            privacidade@pdfia.com.br
          </a>
          .
        </p>
      </section>
    </SeoPageTemplate>
  );
}
