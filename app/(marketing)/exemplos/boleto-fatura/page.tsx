import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Exemplo de boleto ou fatura com IA: resumo e perguntas | PDFIA",
  description:
    "Exemplo fictício de boleto ou fatura analisado com o PDFIA: valor, vencimento, beneficiário e o que compõe o total. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/boleto-fatura",
});

const faqs = [
  {
    q: "O resumo substitui a conferência antes de pagar?",
    a: "Não. O resumo ajuda você a ver valor, vencimento, beneficiário e itens sem reler o documento inteiro, mas antes de pagar qualquer coisa, confira valor, código de barras e vencimento no documento original ou no sistema emissor.",
  },
  {
    q: "A IA lê o código de barras?",
    a: "Não. O código de barras é uma imagem e o PDFIA só lê texto selecionável do PDF — ele não lê o código de barras. Para pagar pelo código, use o app do banco ou confira a linha digitável no documento original.",
  },
  {
    q: "Funciona para fatura de cartão de crédito?",
    a: "Sim, se o PDF tiver texto selecionável. A IA lista itens, valores e datas da fatura — mas confirme no extrato original antes de pagar.",
  },
  {
    q: "O PDFIA compara faturas de meses diferentes?",
    a: "Ainda não. A comparação direta entre dois PDFs está em desenvolvimento. Por enquanto, analise cada fatura separadamente.",
  },
  {
    q: "E se o boleto for escaneado ou uma foto?",
    a: "Ele precisa passar por OCR antes — o PDFIA não faz OCR. Hoje o PDFIA só lê PDF com texto selecionável.",
  },
  {
    q: "O exemplo desta página cabe no plano grátis?",
    a: "Sim. O exemplo tem 2 páginas e o plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas. O chat com citação de página é Premium e custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Meu boleto fica salvo?",
    a: "No plano gratuito o arquivo é processado e descartado. No Premium fica salvo na sua conta, para você voltar ao documento quando quiser. Não vendemos seus dados pessoais.",
  },
];

export default function ExemploBoletoFaturaPage() {
  return (
    <SeoPageTemplate
      title="Exemplo de boleto ou fatura explicado com IA"
      intro="Um boleto ou fatura diz o que pagar, quanto, até quando e para quem — mas o valor total, a composição dos itens e as condições depois do vencimento costumam estar espalhados pelo documento. O modo boleto ou fatura do PDFIA organiza o resumo por tópicos e ajuda você a conferir valor, vencimento e beneficiário antes de pagar. É apoio pra entender o documento — não é consultoria financeira."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: boleto ou fatura", path: "/exemplos/boleto-fatura" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-boleto-ou-fatura", label: "Resumir boleto ou fatura com IA" },
        { href: "/guias/como-conferir-boleto-antes-de-pagar", label: "Como conferir boleto antes de pagar — checklist anti-fraude" },
        { href: "/boleto-para-pessoa-fisica", label: "Boleto para pessoa física" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é um boleto (ou fatura)
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          O boleto é o documento de cobrança que traz o valor a pagar, a data
          de vencimento, quem recebe (beneficiário) e quem paga (pagador), além
          da descrição dos itens ou serviços cobrados e das instruções de
          pagamento. A fatura segue a mesma lógica: ela detalha o que foi
          cobrado, item por item, com valores e datas.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O PDFIA analisa o texto do boleto ou da fatura: ele resume e
          organiza esses pontos, mas não paga por você e não diz se você deve
          pagar — essa decisão é sua. Nunca use a saída da IA como fonte única
          para executar um pagamento. Confirme valor, código de barras e
          vencimento diretamente no documento ou no sistema emissor antes de
          pagar. A IA é triagem, não substituto do cuidado.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com um boleto ou fatura
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF do boleto ou da fatura e o PDFIA devolve um resumo
          com emitente, valor, vencimento e itens em destaque, organizado para
          você conferir antes de pagar. No plano Premium, você ainda pode
          conversar com o documento: cada resposta do chat cita a página
          exata de onde a informação saiu, para você conferir no original
          antes de pagar.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em um boleto ou fatura:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Beneficiário e pagador:</strong> quem emite a cobrança e
            quem deve pagar.
          </li>
          <li>
            <strong>Valor total e vencimento:</strong> quanto pagar e até
            quando.
          </li>
          <li>
            <strong>Itens e serviços:</strong> o que compõe o valor cobrado.
          </li>
          <li>
            <strong>Linha digitável:</strong> o resumo indica que ela está
            presente no texto do documento, quando estiver no texto — confira
            os dígitos no original ou no app do banco antes de pagar.
          </li>
          <li>
            <strong>Condições após o vencimento:</strong> multa, juros e
            prazo para pagamento, quando estiverem escritos no documento.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          O código de barras não entra no resumo: ele é uma imagem e o PDFIA
          só lê texto selecionável. O resumo também não diz se o boleto é
          legítimo — para isso, confira o documento original, o emissor e o
          checklist anti-fraude.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Exemplo ilustrativo: como fica o resumo
        </h2>
        <div className="mt-4 rounded-lg border border-subtle-gray bg-crisp-white p-6">
          <p className="text-body-sm text-charcoal-text">
            <strong>
              Atenção: o exemplo abaixo é totalmente fictício e ilustrativo.
            </strong>{" "}
            Não corresponde a nenhum boleto real, empresa real ou pessoa
            real. Os valores, datas e nomes foram inventados apenas para
            mostrar o formato do resumo. Este exemplo é inventado; nada aqui
            descreve uma empresa real nem se aplica ao seu caso. O resumo
            real do seu boleto vai depender do conteúdo do PDF que você
            enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> boleto de 2
          páginas da empresa fictícia “Empresa Exemplo Serviços Ltda.” para o
          pagador fictício “Pagador Exemplo”, referente à mensalidade de um
          plano de internet, com data fictícia de emissão de 10/11/2026.
          Chamamos aqui de “Boleto Exemplo nº 000/2026” apenas para
          identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para esse boleto fictício:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Valor total (exemplo):</strong> valor total fictício de
            R$ 189,90 — mensalidade do plano de R$ 179,90 mais taxa de
            manutenção de R$ 10,00.
          </li>
          <li>
            <strong>Vencimento (exemplo):</strong> 20/11/2026.
          </li>
          <li>
            <strong>Beneficiário e pagador (exemplo):</strong> beneficiário
            fictício “Empresa Exemplo Serviços Ltda.”; pagador fictício
            “Pagador Exemplo”.
          </li>
          <li>
            <strong>Condições após o vencimento (exemplo):</strong> após o
            vencimento, o boleto fictício prevê multa de 2% e juros de 1% ao
            mês; não receber após 30 dias do vencimento.
          </li>
          <li>
            <strong>Linha digitável (exemplo):</strong> presente no texto do
            boleto fictício — confira os dígitos no documento original ou no
            app do banco antes de pagar.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo, no Premium):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Qual é o valor total e qual é o vencimento? (página 1)</li>
          <li>Quem é o beneficiário e quem é o pagador? (página 1)</li>
          <li>O que compõe o valor total deste boleto? (página 2)</li>
          <li>O que acontece se eu pagar depois do vencimento? (página 2)</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata do
          boleto citada, para você abrir o PDF no ponto certo e conferir.
          No plano grátis, não há chat com o documento: você recebe o resumo,
          e o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para um boleto ou fatura
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Um boleto curto como o do exemplo (2 páginas)
            cabe no plano grátis.
          </li>
          <li>
            <strong>Premium:</strong> R$29 por mês, ou R$290 por ano
            (equivalente a R$24,17 por mês). Cobre PDFs de até 100 páginas, sem
            limite de PDFs por dia, com chat com citação de página, biblioteca
            salva e exportação do resumo em PDF e Markdown. Pagamento em real,
            por cartão via Stripe, sem fidelidade, com cancelamento a qualquer
            momento na conta.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Limitações — leia antes de usar
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Só funciona com PDF com texto selecionável.</strong> Se o
            boleto for um PDF escaneado (foto/imagem das páginas), o PDFIA
            não o lê hoje. O PDF precisa passar por OCR antes, e o PDFIA não faz
            OCR.
          </li>
          <li>
            <strong>O código de barras não é lido.</strong> O código de barras
            é uma imagem. O PDFIA só extrai texto selecionável — para pagar,
            use o app do banco ou confira a linha digitável no documento
            original.
          </li>
          <li>
            <strong>O resumo não substitui a conferência do original antes de
            pagar.</strong>{" "}
            Antes de pagar qualquer coisa, confira valor, código de barras e
            vencimento no documento original ou no sistema emissor. O PDFIA
            não dá consultoria financeira e não diz se o boleto é legítimo.
          </li>
          <li>
            <strong>A IA pode errar em valores, datas ou condições.</strong>{" "}
            Confira sempre o documento original antes de pagar.
          </li>
          <li>
            <strong>O PDFIA não compara duas faturas lado a lado.</strong>{" "}
            A comparação direta entre dois PDFs está em desenvolvimento. Por
            enquanto, analise cada fatura separadamente.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            no boleto enviado.
          </li>
          <li>
            <strong>Limites por plano:</strong> grátis até 10 páginas e 1 PDF
            por dia, sem chat e sem biblioteca salva; Premium até 100 páginas,
            sem limite diário, com chat com citação de página e biblioteca
            salva.
          </li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
