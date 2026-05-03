import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como ler edital de licitação passo a passo",
  description:
    "Guia em PT-BR para empresas que vão participar de licitação: o que ler primeiro, como triar o edital, prazos críticos, habilitação e penalidades. ~10 min.",
  path: "/guias/como-ler-edital-de-licitacao",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como ler edital de licitação", path: "/guias/como-ler-edital-de-licitacao" },
];

const toc = [
  { id: "triagem", label: "1. Triagem em 10 minutos" },
  { id: "objeto", label: "2. Objeto e quantitativos" },
  { id: "prazos", label: "3. Prazos críticos" },
  { id: "habilitacao", label: "4. Habilitação e atestados" },
  { id: "julgamento", label: "5. Critério de julgamento" },
  { id: "penalidades", label: "6. Penalidades e garantia" },
];

const howTo = howToSchema({
  name: "Como ler edital de licitação passo a passo",
  description:
    "Roteiro de leitura para decidir se vale participar de uma licitação, e o que extrair do edital antes de montar a proposta.",
  steps: [
    { name: "Faça a triagem em 10 minutos", text: "Identifique objeto, prazo final e critério de julgamento antes de qualquer coisa." },
    { name: "Confirme objeto e quantitativos", text: "Veja se o que está sendo contratado bate com sua capacidade de entrega." },
    { name: "Mapeie prazos críticos", text: "Impugnação, esclarecimentos, envio da proposta, abertura, recurso." },
    { name: "Verifique habilitação", text: "Documentação fiscal, técnica e atestados — você tem o necessário?" },
    { name: "Entenda o critério de julgamento", text: "Menor preço por item ou lote, melhor técnica, técnica e preço, maior desconto." },
    { name: "Leia penalidades e garantia", text: "Multa, suspensão, inidoneidade. Tipo de garantia exigida e percentual." },
  ],
});

export default function GuiaComoLerEditalPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~10 min de leitura"
      title="Como ler edital de licitação passo a passo"
      intro="Edital de licitação tem estrutura padronizada — uma vez que você conhece, a leitura cai pra minutos. Este guia mostra a ordem de leitura que economiza tempo na hora de decidir &quot;participar ou não&quot;."
      tldrTitle="Leia em 10 minutos antes de gastar uma semana"
      tldrBody="Antes de mobilizar a equipe pra montar proposta, faça a triagem do edital: objeto, prazo, habilitação, critério de julgamento. Em 10 minutos você sabe se vale participar — sem desperdiçar dias com documentação que não vai ser aceita."
      toc={toc}
      primaryCta={{ href: "/ler-edital-com-ia", label: "Analisar um edital agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
        { href: "/edital-para-empresa-pequena", label: "Edital para empresa pequena" },
        { href: "/edital-para-construtora", label: "Edital para construtora" },
        { href: "/edital-para-gestor-de-licitacao", label: "Edital para gestor de licitação" },
        { href: "/resumir-edital-de-licitacao", label: "Resumir edital de licitação" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="triagem" title="1. Triagem em 10 minutos">
        <p>
          Antes de qualquer leitura linha-a-linha, faça quatro perguntas:
          (a) o que está sendo contratado e bate com o que você faz?
          (b) qual o prazo final pra enviar proposta — dá pra montar?
          (c) você cumpre as exigências de habilitação?
          (d) o critério de julgamento favorece sua estratégia?
        </p>
        <p>
          Se a resposta a qualquer uma das quatro for &quot;não claramente
          sim&quot;, a triagem já te poupou dias de trabalho. Editais
          recorrentes do mesmo órgão tendem a manter a estrutura — depois de
          alguns, você passa direto pros pontos que mudaram.
        </p>
        <GuideCallout tone="info" title="Atalho prático">
          A IA acelera essa triagem. Subir o edital e perguntar &quot;qual o
          objeto, prazo de envio, critério de julgamento e três principais
          exigências de habilitação?&quot; devolve a resposta em segundos.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="objeto" title="2. Objeto e quantitativos">
        <p>
          O objeto descreve o que está sendo contratado — bem ou serviço,
          quantidades, especificações. Editais grandes vêm com lotes; cada
          lote pode ser disputado separadamente. Para empresa pequena, lote
          único de valor alto costuma ser barreira; lotes menores ou cota
          ME/EPP (Lei 123/06) abrem espaço.
        </p>
        <p>
          Olhe quantitativos com cuidado: &quot;500 metros de cabo&quot; e
          &quot;5.000 metros&quot; mudam a equação financeira completa.
          Especificação que cita marca exclusiva pode ser direcionamento — em
          tese impugnável, mas exige análise jurídica.
        </p>
      </GuideSection>

      <GuideSection id="prazos" title="3. Prazos críticos">
        <p>
          O edital trabalha com 4 prazos que costumam pegar quem entra pela
          primeira vez: <strong>impugnação</strong> (questionar cláusula
          ilegal — normalmente 3-5 dias úteis após publicação),{" "}
          <strong>esclarecimentos</strong> (tirar dúvidas — prazo similar),{" "}
          <strong>envio da proposta</strong> (a data &quot;final&quot;
          principal) e <strong>recurso</strong> (após o resultado, normalmente
          3 dias úteis).
        </p>
        <p>
          Marque os 4 prazos no calendário antes de mais nada. O prazo de
          impugnação fecha rápido — se há cláusula que te exclui sem motivo
          legal, é o momento de agir, não no dia da abertura.
        </p>
      </GuideSection>

      <GuideSection id="habilitacao" title="4. Habilitação e atestados">
        <p>
          Habilitação se divide em quatro frentes: <strong>jurídica</strong>{" "}
          (contrato social, ata, procuração), <strong>fiscal</strong>{" "}
          (certidões negativas — Receita, FGTS, INSS, trabalhista),{" "}
          <strong>econômico-financeira</strong> (balanço, índices, capital
          mínimo) e <strong>técnica</strong> (atestados de capacidade técnica
          em volume e tipo similares ao objeto).
        </p>
        <p>
          A técnica é onde costuma travar. Edital pede atestado de
          &quot;obra de pavimentação asfáltica de 5.000 m²&quot;? Você precisa
          ter executado obra similar. Atestado de subcontratada normalmente
          não vale; consórcio às vezes vale. Cheque a redação exata.
        </p>
        <GuideCallout tone="warn" title="Não comece a montar sem confirmar">
          Falta de uma certidão fiscal ativa derruba a proposta na
          habilitação. Antes de qualquer outra coisa, peça à contabilidade
          confirmação de que todas as certidões estarão válidas até a data de
          abertura.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="julgamento" title="5. Critério de julgamento">
        <p>
          O critério define quem vence: <strong>menor preço</strong> (puro,
          ranking direto), <strong>melhor técnica</strong> (raro, em
          consultoria especializada), <strong>técnica e preço</strong>{" "}
          (combinação, com pesos), <strong>maior desconto</strong> (em
          contratos de tabela). Cada um exige estratégia diferente de
          proposta.
        </p>
        <p>
          Em &quot;menor preço por item&quot; vs &quot;menor preço por
          lote&quot;, o segundo costuma favorecer empresas de maior porte
          (capazes de fornecer todo o lote). Em &quot;técnica e preço&quot;,
          peso técnico de 70% favorece quem tem currículo no setor; peso de
          30% vira disputa de preço travestida.
        </p>
      </GuideSection>

      <GuideSection id="penalidades" title="6. Penalidades e garantia">
        <p>
          Penalidade clássica: multa diária por atraso (0,1% a 0,5% do valor
          contratado por dia), suspensão temporária do direito de licitar (até
          2 anos) e — extrema — declaração de inidoneidade (até 5 anos). Leia
          a tabela de multas com cuidado: empresa pequena pode quebrar com
          multa diária num contrato grande.
        </p>
        <p>
          Garantia de execução é exigida em contratos de valor relevante:
          tipicamente 5% do valor contratado, em caução, seguro-garantia ou
          fiança bancária. Seguro-garantia preserva capital de giro; caução
          imobiliza. Calcule o impacto antes da proposta.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
