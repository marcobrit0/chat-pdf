import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Exemplo de proposta comercial com IA: resumo e perguntas | PDFIA",
  description:
    "Exemplo fictício de proposta comercial analisado com o PDFIA: escopo, valor, prazo, validade e o que ficou de fora. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/proposta-comercial",
});

const faqs = [
  {
    q: "O resumo substitui a leitura da proposta?",
    a: "Não. O resumo ajuda você a ver escopo, valor, prazo e validade sem reler o documento inteiro, mas antes de aceitar ou assinar qualquer coisa, confira a proposta original e negocie os pontos que importam pra você.",
  },
  {
    q: "Serve para propostas de TI, marketing ou jurídico?",
    a: "Sim. A ferramenta não é específica de setor: ela lê o texto do documento e extrai o que está escrito, seja uma proposta de software, de serviço de marketing ou de assessoria jurídica.",
  },
  {
    q: "O PDFIA compara duas propostas concorrentes?",
    a: "Ainda não. A comparação direta entre dois PDFs está em desenvolvimento. Por enquanto, analise cada proposta separadamente e compare os resumos.",
  },
  {
    q: "E se a proposta for escaneada ou uma foto?",
    a: "Ela precisa passar por OCR antes — o PDFIA não faz OCR. Hoje o PDFIA só lê PDF com texto selecionável.",
  },
  {
    q: "O exemplo desta página cabe no plano grátis?",
    a: "Sim. O exemplo tem 7 páginas e o plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas. O chat com citação de página é Premium e custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Minha proposta fica salva?",
    a: "No plano gratuito o arquivo é processado e descartado. No Premium fica salvo na sua conta, para você voltar ao documento quando quiser. Não vendemos seus dados pessoais.",
  },
];

export default function ExemploPropostaComercialPage() {
  return (
    <SeoPageTemplate
      title="Exemplo de proposta comercial explicado com IA"
      intro="Uma proposta comercial diz o que será feito, por quanto, em quanto tempo e em quais condições — mas o detalhe que muda a negociação costuma estar no meio do texto. O modo proposta do PDFIA organiza o resumo por tópicos e ajuda você a conferir escopo, valor, prazo e validade antes de responder. É apoio pra entender o documento — não é consultoria jurídica nem financeira."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: proposta comercial", path: "/exemplos/proposta-comercial" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-proposta-comercial", label: "Analisar proposta comercial com IA" },
        { href: "/comparar-pdfs", label: "Comparar PDFs" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é uma proposta comercial
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          A proposta comercial é o documento em que um fornecedor descreve o
          serviço ou produto que oferece, por qual valor, em qual prazo e sob
          quais condições. Ela costuma trazer escopo, valor total e forma de
          pagamento, prazo de entrega e etapas, o que está incluído e o que
          ficou de fora, condições de reajuste ou revisão de escopo e a
          validade da proposta.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O PDFIA analisa o texto da proposta: ele resume e organiza esses
          pontos, mas não diz se você deve aceitar, negociar ou recusar — essa
          decisão é sua. Para dúvidas sobre o que a proposta significa para o
          seu caso, confira o documento original e fale com o fornecedor ou
          com um profissional de sua confiança.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com uma proposta comercial
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF da proposta e o PDFIA devolve um resumo com
          tópicos, datas, valores e nomes em destaque, com as condições
          organizadas para você conferir antes de responder. No plano
          Premium, você ainda pode conversar com o documento: cada resposta
          do chat cita a página exata de onde a informação saiu, para você
          conferir no original antes de negociar.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em uma proposta comercial:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Escopo:</strong> o que será entregue e o que ficou fora
            do escopo.
          </li>
          <li>
            <strong>Valor e pagamento:</strong> valor total, parcelas e
            condições de pagamento.
          </li>
          <li>
            <strong>Prazo e etapas:</strong> prazo de entrega e as etapas do
            projeto.
          </li>
          <li>
            <strong>Validade:</strong> até quando a proposta vale e o que
            acontece depois desse prazo.
          </li>
          <li>
            <strong>Reajuste e revisão:</strong> condições de reajuste de
            valor ou revisão de escopo, quando existirem.
          </li>
        </ul>
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
            Não corresponde a nenhuma proposta real, empresa real ou pessoa
            real. Os valores, prazos e nomes foram inventados apenas para
            mostrar o formato do resumo. Este exemplo é inventado; nada aqui
            descreve uma empresa real nem se aplica ao seu caso. O resumo
            real da sua proposta vai depender do conteúdo do PDF que você
            enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> proposta
          comercial de 7 páginas da empresa fictícia “Empresa Exemplo
          Serviços Ltda.” para a cliente fictícia “Cliente Exemplo Comércio
          Ltda.”, para o desenvolvimento de uma loja virtual, com data
          fictícia de 03/11/2026. Chamamos aqui de “Proposta Exemplo nº
          000/2026” apenas para identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para essa proposta fictícia:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Escopo (exemplo):</strong> desenvolvimento de uma loja
            virtual com catálogo de produtos, carrinho, pagamento e painel
            de pedidos; inclui treinamento da equipe da cliente fictícia.
            Hospedagem e domínio ficam fora do escopo, por conta da cliente.
          </li>
          <li>
            <strong>Valor e pagamento (exemplo):</strong> valor total
            fictício de R$ 18.000, em duas parcelas: 50% na assinatura e 50%
            na entrega.
          </li>
          <li>
            <strong>Prazo e etapas (exemplo):</strong> prazo fictício de 60
            dias, em três etapas: layout (20 dias), desenvolvimento (30
            dias) e testes com entrega (10 dias).
          </li>
          <li>
            <strong>Validade (exemplo):</strong> a proposta fictícia vale
            por 30 dias a partir da data de emissão; depois desse prazo, os
            valores e o prazo podem ser revistos.
          </li>
          <li>
            <strong>Reajuste e revisão (exemplo):</strong> a proposta
            fictícia prevê que mudança de escopo depois do início gera novo
            orçamento; não há reajuste previsto dentro do prazo de 60 dias.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Qual é o valor total e como é o pagamento? (página 2)</li>
          <li>Qual é o prazo de entrega e quais são as etapas? (página 3)</li>
          <li>O que está fora do escopo desta proposta? (página 4)</li>
          <li>Até quando a proposta é válida e o que acontece depois? (página 6)</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata da
          proposta citada, para você abrir o PDF no ponto certo e conferir.
          No plano grátis, não há chat com o documento: você recebe o resumo,
          e o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para uma proposta comercial
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Uma proposta curta como a do exemplo (7 páginas)
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
            <strong>Só funciona com PDF com texto selecionável.</strong> Se a
            proposta for um PDF escaneado (foto/imagem das páginas), o PDFIA
            não o lê hoje. O PDF precisa passar por OCR antes, e o PDFIA não faz
            OCR.
          </li>
          <li>
            <strong>O resumo não substitui a leitura da proposta original.</strong>{" "}
            Antes de aceitar, negociar ou assinar qualquer coisa, confira o
            documento original. O PDFIA não dá consultoria jurídica nem
            financeira e não diz se a proposta é boa para você.
          </li>
          <li>
            <strong>A IA pode errar em valores, prazos ou condições.</strong>{" "}
            Confira sempre a proposta original antes de responder ao
            fornecedor.
          </li>
          <li>
            <strong>O PDFIA não compara duas propostas lado a lado.</strong>{" "}
            A comparação direta entre dois PDFs está em desenvolvimento. Por
            enquanto, analise cada proposta separadamente e compare os
            resumos.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            na proposta enviada.
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
