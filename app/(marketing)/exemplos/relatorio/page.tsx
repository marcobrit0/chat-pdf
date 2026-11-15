import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Exemplo de relatório em PDF com IA: resumo e perguntas | PDFIA",
  description:
    "Exemplo fictício de relatório trimestral analisado com o PDFIA: receita, lucro, recomendações e as perguntas que o chat responde com a página citada. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/relatorio",
});

const faqs = [
  {
    q: "Funciona para relatório financeiro e de auditoria?",
    a: "Sim. Para documentos com tabelas complexas, os dados tabulares podem não ser capturados com precisão — confirme números no original.",
  },
  {
    q: "Qual o tamanho máximo do relatório?",
    a: "Grátis: até 10 páginas. Premium: até 100 páginas, com chat e modo de extração de dados. Relatórios maiores podem ser divididos por seção.",
  },
  {
    q: "Posso fazer perguntas sobre seções específicas?",
    a: "Sim, no chat do Premium. A resposta cita a página onde a informação aparece no relatório.",
  },
  {
    q: "E se o relatório for escaneado ou uma foto?",
    a: "Ele precisa passar por OCR antes — o PDFIA não faz OCR. Hoje o PDFIA só lê PDF com texto selecionável.",
  },
  {
    q: "O exemplo desta página cabe no plano grátis?",
    a: "Sim. O exemplo tem 6 páginas e o plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas. O chat com citação de página é Premium e custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Meu relatório fica salvo?",
    a: "No plano gratuito o arquivo é processado e descartado. No Premium fica salvo na sua conta, para você voltar ao documento quando quiser. Não vendemos seus dados pessoais.",
  },
  {
    q: "O resumo substitui a leitura do relatório antes de decidir?",
    a: "Não. O resumo ajuda você a ver conclusões, números e recomendações sem reler o documento inteiro, mas antes de qualquer decisão, confira os números no documento original. O PDFIA não dá aconselhamento financeiro.",
  },
];

export default function ExemploRelatorioPage() {
  return (
    <SeoPageTemplate
      title="Exemplo de relatório explicado com IA"
      intro="Um relatório trimestral traz conclusões, números, períodos e recomendações — mas o que importa para a decisão costuma estar espalhado por dezenas de páginas. O modo relatório do PDFIA organiza o resumo por tópicos e ajuda você a ver receita, lucro e recomendações antes da reunião. É apoio pra entender o documento — não é aconselhamento financeiro."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: relatório", path: "/exemplos/relatorio" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-relatorio-pdf", label: "Resumir relatório em PDF com IA" },
        { href: "/relatorio-para-gestor", label: "Resumir relatório para gestor" },
        { href: "/relatorio-para-investidor", label: "Resumir relatório para investidor" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é um relatório em PDF
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          O relatório é o documento que consolida o que aconteceu em um
          período: conclusões, dados e indicadores centrais, períodos e datas
          de referência, entidades, áreas ou projetos mencionados e
          recomendações para o próximo período. Pode ser um relatório
          trimestral, financeiro, de auditoria ou corporativo — a lógica é a
          mesma: muita informação, pouco tempo para ler tudo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O PDFIA resume o texto do relatório: ele organiza conclusões,
          números e recomendações, mas não audita o documento e não diz se
          você deve investir, aprovar um orçamento ou seguir uma
          recomendação — essa decisão é sua. Nunca use a saída da IA como
          fonte única para uma decisão. Confirme os números no documento
          original antes de decidir. A IA é triagem, não substituto da
          leitura.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com um relatório
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF do relatório e o PDFIA devolve um resumo com as
          conclusões e recomendações principais, os dados e indicadores
          centrais, os períodos e datas de referência e as entidades, áreas
          ou projetos mencionados, organizado para você conferir antes da
          reunião. No plano Premium, você ainda pode conversar com o
          documento: cada resposta do chat cita a página exata de onde a
          informação saiu, para você conferir no original antes de decidir.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em um relatório:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Conclusões e recomendações principais:</strong> o que o
            relatório conclui e o que ele sugere fazer em seguida.
          </li>
          <li>
            <strong>Dados e indicadores centrais:</strong> receita, lucro,
            margem e outros números que importam para a decisão.
          </li>
          <li>
            <strong>Períodos e datas de referência:</strong> a que trimestre
            ou período os números se referem e quando o relatório foi emitido.
          </li>
          <li>
            <strong>Entidades, áreas ou projetos mencionados:</strong> quem
            e o quê aparece no documento — diretorias, departamentos,
            projetos.
          </li>
          <li>
            <strong>Perguntas de follow-up úteis:</strong> o que vale
            aprofundar depois do resumo.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          O resumo não cobre tudo: em documentos com tabelas complexas, os
          dados tabulares podem não ser capturados com precisão — confirme
          os números no original.
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
            Não corresponde a nenhum relatório real, empresa real ou pessoa
            real. Os valores, datas e nomes foram inventados apenas para
            mostrar o formato do resumo. Este exemplo é inventado; nada aqui
            descreve uma empresa real nem se aplica ao seu caso. O resumo
            real do seu relatório vai depender do conteúdo do PDF que você
            enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> relatório
          trimestral de 6 páginas da empresa fictícia “Empresa Exemplo
          Serviços Ltda.”, referente ao 3º trimestre de 2026 (período de
          01/07/2026 a 30/09/2026), com data fictícia de emissão de
          15/10/2026. As áreas mencionadas no exemplo são a Diretoria
          Exemplo, o Departamento Comercial e o Departamento Financeiro.
          Chamamos aqui de “Relatório Exemplo nº 000/2026” apenas para
          identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para esse relatório fictício:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Receita total (exemplo):</strong> receita total fictícia
            de R$ 2.400.000 no trimestre — alta fictícia de 12% em relação ao
            2º trimestre de 2026.
          </li>
          <li>
            <strong>Despesas operacionais (exemplo):</strong> despesas
            operacionais fictícias de R$ 1.800.000 no trimestre.
          </li>
          <li>
            <strong>Lucro líquido (exemplo):</strong> lucro líquido fictício
            de R$ 320.000 no trimestre, com margem fictícia de 13,3% sobre a
            receita.
          </li>
          <li>
            <strong>Recomendações (exemplo):</strong> o relatório fictício
            traz três recomendações — ampliar a equipe de vendas na região
            exemplo; renegociar o contrato de fornecimento; adiar a compra
            de equipamento para o 4º trimestre.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo, no Premium):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Quais foram a receita e o lucro do trimestre? (página 1)</li>
          <li>O que explica o crescimento de 12% da receita? (página 2)</li>
          <li>Como ficaram as despesas por departamento? (página 3)</li>
          <li>
            Quais são as 3 recomendações do relatório e em que página estão?
            (página 4)
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata do
          relatório citada, para você abrir o PDF no ponto certo e conferir.
          No plano grátis, não há chat com o documento: você recebe o resumo,
          e o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para um relatório
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Um relatório curto como o do exemplo (6 páginas)
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
            relatório for um PDF escaneado (foto/imagem das páginas), o PDFIA
            não o lê hoje. O PDF precisa passar por OCR antes, e o PDFIA não faz
            OCR.
          </li>
          <li>
            <strong>Tabelas complexas podem não ser capturadas com precisão.</strong>{" "}
            Em relatórios financeiros e de auditoria, confirme os números no
            documento original antes de qualquer decisão.
          </li>
          <li>
            <strong>O resumo não substitui a leitura do original antes de
            decidir.</strong>{" "}
            Antes de qualquer decisão, confira conclusões, números e
            recomendações no documento original. O PDFIA não dá
            aconselhamento financeiro e não diz se você deve investir ou
            aprovar um orçamento.
          </li>
          <li>
            <strong>A IA pode errar em valores, datas ou recomendações.</strong>{" "}
            Confira sempre o documento original antes de decidir.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            no relatório enviado.
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
