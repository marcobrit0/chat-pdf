import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Política de privacidade — PDFIA",
  description:
    "Como o PDFIA trata seus dados sob a LGPD: o que coletamos, com quem compartilhamos (Stripe, Supabase, Vercel, OpenRouter), por quanto tempo guardamos e como você exerce seus direitos.",
  path: "/privacidade",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Política de privacidade", path: "/privacidade" },
];

const lastUpdated = "6 de maio de 2026";

/**
 * Política de privacidade do PDFIA. Texto ancorado nas tabelas reais
 * (profiles, subscriptions, documents, document_chunks, usage_events,
 * anonymous_usage_daily) e nos subprocessadores realmente usados.
 *
 * Ao alterar contatos, prazos ou subprocessadores, atualizar:
 *   - lastUpdated (acima)
 *   - lista de subprocessadores na seção 4
 *   - prazos de retenção na seção 6
 */
export default function PrivacidadePage() {
  return (
    <SeoPageTemplate
      title="Política de privacidade"
      intro={`Última atualização: ${lastUpdated}. Aqui está, sem juridiquês desnecessário, o que coletamos do PDFIA, por que coletamos, com quem compartilhamos e o que você pode pedir a qualquer momento. Em caso de dúvida específica, fale com a gente em privacidade@pdfia.com.br.`}
      breadcrumbs={breadcrumbs}
    >
      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          1. Quem somos
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
          . A MadeofIA é a controladora dos dados pessoais tratados nesta
          plataforma, conforme a Lei nº 13.709/2018 (LGPD).
        </p>
        <p>
          Para qualquer assunto sobre privacidade, dados pessoais ou exercício
          de direitos do titular, o canal oficial é{" "}
          <a
            href="mailto:privacidade@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            privacidade@pdfia.com.br
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          2. Que dados o PDFIA coleta
        </h2>
        <p>O que entra na nossa base — e nada além disso:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-midnight-ink">
              Dados de conta:
            </strong>{" "}
            e-mail informado no login. Opcionalmente, nome de exibição se você
            preencher. Login é por código único enviado por e-mail (sem senha
            armazenada).
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Dados de assinatura (Premium):
            </strong>{" "}
            ID do cliente Stripe, ID da assinatura, plano contratado, status
            (ativa, atrasada, cancelada) e fim do período pago. Dados de cartão
            ficam exclusivamente no Stripe — a MadeofIA{" "}
            <strong className="font-medium text-midnight-ink">
              não armazena número de cartão, CVV nem validade
            </strong>{" "}
            em nenhum momento.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Documentos enviados (Premium):
            </strong>{" "}
            o conteúdo dos PDFs que você sobe na sua biblioteca, indexado em
            trechos por intervalo de páginas para o chat com citação. Cada
            documento fica vinculado à sua conta com permissão de acesso
            apenas pelo seu login.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Documentos enviados (uso anônimo grátis):
            </strong>{" "}
            o PDF é processado em memória para gerar o resumo e descartado
            logo na sequência. Não guardamos o arquivo, nem o texto extraído,
            nem o resumo gerado.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Eventos de uso e analytics:
            </strong>{" "}
            registramos ações no produto (ex.: resumo gerado, análise
            rodada, chat aberto, checkout iniciado), páginas visitadas e
            propriedades técnicas básicas (navegador, sistema, país
            aproximado pelo IP) via PostHog. Servem pra entender padrões de
            uso, melhorar o produto e prevenir abuso. Não rastreiam o
            conteúdo dos seus PDFs nem o texto do chat.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Limite por dispositivo (uso anônimo):
            </strong>{" "}
            armazenamos apenas um <em>hash</em> (resumo criptográfico) do
            endereço IP para aplicar o limite diário do grátis. Não dá para
            reverter o hash de volta para o IP original.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          3. Por que coletamos (bases legais)
        </h2>
        <p>Cada finalidade tem uma base legal LGPD que a justifica:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-midnight-ink">
              Execução de contrato (art. 7º, V):
            </strong>{" "}
            criar e operar sua conta, processar pagamentos, gerar resumos e
            chat sobre PDFs que você enviou.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Cumprimento de obrigação legal (art. 7º, II):
            </strong>{" "}
            emissão de nota fiscal e guarda de registros fiscais conforme a
            legislação brasileira aplicável.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Legítimo interesse (art. 7º, IX):
            </strong>{" "}
            segurança da plataforma, prevenção de fraude e abuso (limites de
            uso por IP e por conta), melhoria do produto a partir de
            estatísticas agregadas.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Consentimento (art. 7º, I):
            </strong>{" "}
            quando exigido — por exemplo, para comunicações de marketing por
            e-mail. Você pode revogar a qualquer momento.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          4. Com quem compartilhamos
        </h2>
        <p>
          A MadeofIA não vende seus dados pessoais. Compartilhamos apenas com
          os subprocessadores estritamente necessários para o produto
          funcionar:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-midnight-ink">
              Vercel (EUA):
            </strong>{" "}
            hospedagem da aplicação web e entrega de conteúdo.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Supabase (EUA):
            </strong>{" "}
            banco de dados, autenticação por e-mail e armazenamento dos seus
            documentos no Premium.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Stripe (Brasil/EUA):
            </strong>{" "}
            processamento de pagamento da assinatura Premium. Stripe Brasil
            atua como processador local; dados de cartão ficam no Stripe, não
            no PDFIA.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              OpenRouter (EUA):
            </strong>{" "}
            roteamento das requisições para os modelos de IA que geram resumo
            e chat (provedores como OpenAI, Anthropic, Google etc.). O
            conteúdo do PDF é enviado durante o processamento e não é usado
            para treinar modelos por padrão.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              PostHog (EUA):
            </strong>{" "}
            analytics de produto e web. Registra páginas visitadas, eventos
            de uso (ex.: PDF resumido, chat aberto, checkout iniciado) e
            propriedades técnicas como navegador, sistema operacional e
            país aproximado pelo IP. Não captura o conteúdo dos seus PDFs
            nem o texto do que você digita no chat.
          </li>
        </ul>
        <p>
          Como vários desses serviços operam fora do Brasil, transferências
          internacionais ocorrem com base nas hipóteses legais previstas no
          art. 33 da LGPD — em especial, garantias contratuais de proteção
          equivalente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          5. Conteúdo dos PDFs e modelos de IA
        </h2>
        <p>
          O conteúdo de cada PDF que você envia é encaminhado ao provedor de
          IA exclusivamente para gerar o resumo, a análise ou a resposta no
          chat que você pediu. Não usamos, vendemos ou licenciamos esse
          conteúdo para treinamento de modelos. A MadeofIA mantém contratos
          com seus subprocessadores que vedam o uso do conteúdo de clientes
          para treino.
        </p>
        <p>
          As respostas geradas por IA podem conter imprecisões ou interpretar
          mal trechos do documento. Por isso, sempre que possível, o produto
          aponta a página de origem da resposta — para você conferir antes
          de tomar qualquer decisão importante.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          6. Por quanto tempo guardamos
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-midnight-ink">
              Conta e e-mail:
            </strong>{" "}
            enquanto sua conta estiver ativa. Após a exclusão da conta, os
            dados de identificação são removidos em até 30 dias.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Documentos da biblioteca Premium:
            </strong>{" "}
            enquanto a assinatura estiver ativa. Após o cancelamento, os
            documentos ficam disponíveis para você baixar por 30 dias antes
            de serem excluídos definitivamente.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Dados de cobrança:
            </strong>{" "}
            mantidos pelo período exigido pela legislação fiscal e contábil
            brasileira (em geral, 5 anos).
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              PDF anônimo (uso grátis):
            </strong>{" "}
            descartado imediatamente após gerar o resumo. Não fica salvo.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Hash de IP para limite diário:
            </strong>{" "}
            mantido por 30 dias para aplicar a regra de uso justo do plano
            grátis.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">
              Eventos de uso agregados:
            </strong>{" "}
            até 12 meses, em formato que não permite identificar pessoas
            individualmente.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          7. Seus direitos como titular
        </h2>
        <p>
          A LGPD garante a você direitos sobre seus dados pessoais. Você pode
          pedir, a qualquer momento e sem custo:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>Confirmação de que tratamos seus dados</li>
          <li>Acesso aos seus dados</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados</li>
          <li>Portabilidade dos dados (exportação em formato legível)</li>
          <li>Eliminação dos dados tratados com base no consentimento</li>
          <li>
            Informação sobre com quem compartilhamos seus dados
          </li>
          <li>Revogação do consentimento, quando aplicável</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, escreva para{" "}
          <a
            href="mailto:privacidade@pdfia.com.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            privacidade@pdfia.com.br
          </a>
          . Vamos pedir uma confirmação de identidade rápida (para evitar
          que outra pessoa solicite seus dados em seu nome) e responder em
          até 15 dias.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          8. Segurança
        </h2>
        <p>
          Aplicamos boas práticas técnicas e organizacionais para proteger
          seus dados: comunicação criptografada (HTTPS) entre você e a
          plataforma, criptografia em repouso no banco de dados,
          segregação de acesso por função e revisão periódica de
          permissões. Nenhum sistema é 100% seguro — em caso de incidente
          que possa afetar seus dados, comunicaremos você e a Autoridade
          Nacional de Proteção de Dados (ANPD) conforme exigido em lei.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          9. Encarregado pelo tratamento (DPO)
        </h2>
        <p>
          O contato do encarregado pelo tratamento de dados pessoais
          (Data Protection Officer) da MadeofIA é{" "}
          <a
            href="mailto:dpo@madeof.ia.br"
            className="text-midnight-ink underline underline-offset-4"
          >
            dpo@madeof.ia.br
          </a>
          . Use esse canal para tratar de assuntos relativos à LGPD com a
          pessoa formalmente responsável.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          10. Mudanças nesta política
        </h2>
        <p>
          Esta política pode ser atualizada à medida que o produto evolui ou
          que mudanças regulatórias exijam. A data no topo indica a versão em
          vigor. Mudanças relevantes são comunicadas por e-mail ou aviso no
          produto.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
