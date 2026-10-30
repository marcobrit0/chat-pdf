import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como resumir um edital com o PDFIA — exemplo passo a passo | PDFIA",
  description:
    "Veja como o PDFIA resume um edital de licitação: objeto, prazos, valores e documentos exigidos, com um exemplo ilustrativo. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/edital",
});

const faqs = [
  {
    q: "O PDFIA resume edital de licitação?",
    a: "Sim. O modo edital é um dos modos prontos do PDFIA, ao lado de contrato CLT, apólice e laudo. Ele organiza o resumo por objeto, prazos, valores e documentos exigidos, com datas, valores e nomes em destaque.",
  },
  {
    q: "Preciso pagar para resumir um edital?",
    a: "Não, para começar. O plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas. Editais costumam ter mais de 10 páginas; nesse caso, o Premium (R$29/mês ou R$290/ano) cobre PDFs de até 100 páginas, sem limite por dia.",
  },
  {
    q: "Como confiro se o resumo está certo?",
    a: "No Premium, o chat cita a página exata de cada resposta, para você abrir o edital no ponto certo e conferir. No plano grátis não há chat, então confira os trechos principais diretamente no PDF original.",
  },
  {
    q: "Funciona com edital escaneado?",
    a: "Não, ainda não. Hoje o PDFIA só funciona com PDF com texto selecionável. Se o PDF é uma foto ou imagem escaneada, ele precisa passar por OCR antes. O OCR automático no Premium está previsto, mas ainda não está disponível.",
  },
  {
    q: "O resumo do PDFIA vale como documento oficial?",
    a: "Não. O documento oficial é o edital publicado pelo órgão. Use o resumo para entender e localizar informações, e baseie qualquer decisão no texto original.",
  },
  {
    q: "Meu edital fica salvo?",
    a: "No plano grátis, não — o arquivo não fica guardado depois do resumo. No Premium, o documento fica na biblioteca salva, e você pode voltar a ele depois. Se cancelar o Premium, os arquivos ficam arquivados por 30 dias para baixar antes da exclusão definitiva.",
  },
];

export default function ExemploEditalPage() {
  return (
    <SeoPageTemplate
      title="Como resumir um edital de licitação com o PDFIA"
      intro="Um edital de licitação é um documento longo, cheio de prazos, valores e exigências. Antes de decidir se vale participar, você precisa responder rápido a quatro perguntas: o que está sendo contratado, até quando dá para participar, quanto vale e o que é preciso apresentar. É para isso que serve o modo edital do PDFIA: ele lê o PDF e devolve um resumo organizado por esses pontos, em português, sem você precisar caçar cada informação página por página."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: edital", path: "/exemplos/edital" },
      ]}
      faqs={faqs}
      related={[
        { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
        { href: "/resumir-edital-de-licitacao", label: "Resumir edital" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é um edital de licitação
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          O edital é o documento oficial que define as regras de uma licitação
          pública: o objeto (o que será contratado), as condições de
          participação, os prazos, os critérios de julgamento, os valores de
          referência e os documentos exigidos para habilitação. Ele é a fonte
          que vale — qualquer resumo é um atalho para entender o documento, não
          um substituto dele.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com um edital
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF do edital e o PDFIA devolve um resumo com tópicos,
          datas, valores e nomes em destaque, além de perguntas sugeridas para
          aprofundar nos pontos que importam para você. No plano Premium, você
          ainda pode conversar com o documento: cada resposta do chat cita a
          página exata de onde a informação saiu, para você conferir no original
          antes de tomar qualquer decisão.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em um edital:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Objeto:</strong> o que está sendo contratado, em uma frase
            clara.
          </li>
          <li>
            <strong>Prazos:</strong> data e hora da sessão, prazo para
            impugnação e para pedidos de esclarecimento, prazo de entrega ou
            execução.
          </li>
          <li>
            <strong>Valores:</strong> valor estimado, valor máximo aceitável
            (quando houver) e condições de pagamento, quando informadas no
            edital.
          </li>
          <li>
            <strong>Habilitação:</strong> os documentos exigidos e as condições
            de participação.
          </li>
          <li>
            <strong>Critérios:</strong> como as propostas serão julgadas (por
            exemplo, menor preço ou técnica e preço, conforme o edital).
          </li>
          <li>
            <strong>Alertas:</strong> pontos que merecem atenção, como
            exigências específicas de qualificação ou prazos curtos.
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
            Não corresponde a nenhum edital real, órgão real, empresa real ou
            resultado real. Os valores, datas e nomes foram inventados apenas
            para mostrar o formato do resumo. O resumo real do seu edital vai
            depender do conteúdo do PDF que você enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> Edital fictício de
          pregão eletrônico, 42 páginas, para contratação de serviços de
          limpeza predial. Chamamos aqui de “Edital Exemplo nº 000/2026” apenas
          para identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para esse edital fictício (no Premium, que cobre PDFs de até 100 páginas):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Objeto:</strong> Contratação de empresa especializada em
            serviços de limpeza predial, com fornecimento de materiais e
            equipamentos, para um período de 12 meses.
          </li>
          <li>
            <strong>Sessão pública:</strong> dia 15 de um mês fictício, às 10h,
            em plataforma eletrônica indicada no edital.
          </li>
          <li>
            <strong>Prazo para esclarecimentos e impugnação:</strong> até 3 dias
            úteis antes da sessão (conforme as regras do edital fictício).
          </li>
          <li>
            <strong>Valor estimado (fictício):</strong> R$ 480.000,00 para 12
            meses.
          </li>
          <li>
            <strong>Habilitação exigida (exemplo):</strong> regularidade fiscal
            e trabalhista, atestado de capacidade técnica e comprovação de
            experiência em serviços similares, nos termos do edital.
          </li>
          <li>
            <strong>Critério de julgamento (exemplo):</strong> menor preço por
            lote.
          </li>
          <li>
            <strong>Ponto de atenção (exemplo):</strong> o edital fictício
            prevê visita técnica opcional e apresentação de planilha de custos
            junto com a proposta.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Qual é o prazo final para enviar a proposta?</li>
          <li>Quais documentos são exigidos para habilitação?</li>
          <li>Há exigência de atestado técnico? Qual?</li>
          <li>Qual é o valor estimado e a forma de pagamento?</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata do
          edital citada, para você abrir o PDF no ponto certo e conferir. No
          plano grátis, não há chat com o documento: você recebe o resumo, e o
          arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para um edital
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Se o seu edital tiver mais de 10 páginas, o plano
            grátis não cobre o documento inteiro.
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
            edital for um PDF escaneado (foto/imagem das páginas), o PDFIA não
            o lê hoje. O PDF precisa passar por OCR antes, e o OCR automático
            no Premium ainda não está disponível.
          </li>
          <li>
            <strong>O resumo não substitui a leitura do edital.</strong> Antes
            de participar de qualquer licitação, confira prazos, valores e
            exigências no documento oficial e no canal de publicação do órgão.
            O resumo pode ajudar a encontrar a informação, mas a decisão deve
            se basear no texto original.
          </li>
          <li>
            <strong>O PDFIA não dá consultoria jurídica nem garante resultado.</strong>{" "}
            Ele resume e localiza informações do documento; não avalia se você
            deve participar, nem se sua proposta será aceita.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            no edital enviado.
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
