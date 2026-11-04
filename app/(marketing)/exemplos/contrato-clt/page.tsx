import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como resumir um contrato CLT com o PDFIA — exemplo passo a passo | PDFIA",
  description:
    "Veja como o PDFIA resume um contrato CLT: cargo, salário, jornada, férias e rescisão, com um exemplo fictício. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/contrato-clt",
});

const faqs = [
  {
    q: "O PDFIA resume contrato CLT?",
    a: "Sim. O modo contrato CLT é um dos modos prontos do PDFIA, ao lado de edital, apólice e laudo. Ele organiza o resumo por cargo, remuneração, jornada, férias e rescisão, com datas, valores e nomes em destaque.",
  },
  {
    q: "Preciso pagar para resumir um contrato CLT?",
    a: "Não, para começar. O plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas — o exemplo desta página tem 4 páginas, então caberia no grátis. Para PDFs de até 100 páginas, com chat com citação de página e biblioteca salva, o Premium custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Como confiro se o resumo está certo?",
    a: "No Premium, o chat cita a página exata de cada resposta, para você abrir o contrato no ponto certo e conferir. No plano grátis não há chat, então confira os trechos principais diretamente no PDF original.",
  },
  {
    q: "Funciona com contrato escaneado?",
    a: "Não, ainda não. Hoje o PDFIA só funciona com PDF com texto selecionável. Se o PDF é uma foto ou imagem escaneada, ele precisa passar por OCR antes. O OCR automático no Premium está previsto, mas ainda não está disponível.",
  },
  {
    q: "O resumo do PDFIA substitui a leitura do contrato?",
    a: "Não. O documento original é o que vale — use o resumo para entender e localizar informações, e baseie qualquer decisão no texto do contrato. O PDFIA resume e localiza informações; ele não dá consultoria jurídica.",
  },
  {
    q: "Meu contrato fica salvo?",
    a: "No plano grátis, não — o arquivo não fica guardado depois do resumo. No Premium, o documento fica na biblioteca salva, e você pode voltar a ele depois. Se cancelar o Premium, os arquivos ficam arquivados por 30 dias para baixar antes da exclusão definitiva.",
  },
];

export default function ExemploContratoCltPage() {
  return (
    <SeoPageTemplate
      title="Como resumir um contrato CLT com o PDFIA"
      intro="Um contrato CLT parece simples até você precisar achar uma cláusula no meio dele: qual é o salário exato, como fica a jornada, quando vencem as férias, o que acontece na rescisão. É para isso que serve o modo contrato CLT do PDFIA: ele lê o PDF e devolve um resumo organizado por esses pontos, em português, sem você precisar caçar cada informação página por página."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: contrato CLT", path: "/exemplos/contrato-clt" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é um contrato CLT
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          O contrato CLT é o documento que formaliza o vínculo empregatício:
          ele registra o cargo, a remuneração, a jornada, as férias, as
          regras de rescisão e os direitos e deveres das partes. É o
          documento que vale — qualquer resumo é um atalho para entender o
          contrato, não um substituto dele.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com um contrato CLT
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF do contrato e o PDFIA devolve um resumo com
          tópicos, datas, valores e nomes em destaque, além de perguntas
          sugeridas para aprofundar nos pontos que importam para você. No
          plano Premium, você ainda pode conversar com o documento: cada
          resposta do chat cita a página exata de onde a informação saiu,
          para você conferir no original antes de tomar qualquer decisão.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em um contrato CLT:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Cargo:</strong> a função contratada e as atribuições
            principais, quando informadas no contrato.
          </li>
          <li>
            <strong>Remuneração:</strong> o salário e os adicionais ou
            benefícios previstos, com os valores.
          </li>
          <li>
            <strong>Jornada:</strong> a carga horária semanal e os horários
            de trabalho.
          </li>
          <li>
            <strong>Férias:</strong> o período aquisitivo e as regras de
            concessão das férias.
          </li>
          <li>
            <strong>Rescisão:</strong> o que o contrato prevê para o fim do
            vínculo, como aviso prévio e verbas rescisórias.
          </li>
          <li>
            <strong>Alertas:</strong> pontos que merecem atenção, como
            cláusulas de experiência, confidencialidade ou exclusividade,
            quando presentes.
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
            Não corresponde a nenhum contrato real, empresa real ou pessoa
            real. Os valores, datas e nomes foram inventados apenas para
            mostrar o formato do resumo. O resumo real do seu contrato vai
            depender do conteúdo do PDF que você enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> contrato CLT de
          4 páginas entre a empresa fictícia “Empresa Exemplo Ltda” e a
          funcionária fictícia “Maria da Silva (nome fictício)”, para o
          cargo de analista administrativa. Chamamos aqui de “Contrato
          Exemplo nº 000/2026” apenas para identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para esse contrato fictício:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Cargo (exemplo):</strong> analista administrativa, com
            atribuições de rotina administrativa e atendimento interno.
          </li>
          <li>
            <strong>Remuneração (exemplo):</strong> salário mensal de
            R$ 3.500,00, pago até o 5º dia útil do mês seguinte.
          </li>
          <li>
            <strong>Jornada (exemplo):</strong> 44 horas semanais, de
            segunda a sexta, das 9h às 18h, com 1 hora de intervalo.
          </li>
          <li>
            <strong>Férias (exemplo):</strong> 30 dias após cada período
            aquisitivo de 12 meses, concedidas conforme a programação da
            empresa.
          </li>
          <li>
            <strong>Rescisão (exemplo):</strong> aviso prévio conforme a
            legislação, com as verbas rescisórias devidas na data prevista
            em lei.
          </li>
          <li>
            <strong>Ponto de atenção (exemplo):</strong> o contrato
            fictício prevê período de experiência de 90 dias e cláusula de
            confidencialidade sobre informações internas da empresa.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo, no Premium):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Qual é o salário e a jornada previstos? (página 2)</li>
          <li>O que o contrato diz sobre as férias? (página 3)</li>
          <li>Quais verbas aparecem na rescisão? (página 4)</li>
          <li>Há período de experiência? De quantos dias? (página 2)</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata do
          contrato citada, para você abrir o PDF no ponto certo e conferir.
          No plano grátis, não há chat com o documento: você recebe o
          resumo, e o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para um contrato CLT
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Um contrato curto como o do exemplo (4 páginas)
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
            contrato for um PDF escaneado (foto/imagem das páginas), o PDFIA não
            o lê hoje. O PDF precisa passar por OCR antes, e o OCR automático
            no Premium ainda não está disponível.
          </li>
          <li>
            <strong>O resumo não substitui a leitura do contrato.</strong> Antes
            de assinar ou decidir qualquer coisa, confira salário, jornada,
            férias e rescisão no documento original. O resumo pode ajudar a
            encontrar a informação, mas a decisão deve se basear no texto
            original.
          </li>
          <li>
            <strong>O PDFIA não dá consultoria jurídica nem garante resultado.</strong>{" "}
            Ele resume e localiza informações do documento; não avalia se uma
            cláusula é válida, nem se um direito está sendo respeitado.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            no contrato enviado.
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
