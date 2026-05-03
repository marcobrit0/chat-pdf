import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como analisar contrato CLT antes de assinar — guia em PT-BR",
  description:
    "Antes de assinar a CLT: o que ler primeiro (jornada, salário, benefícios), o que costuma surpreender (não-concorrência, exclusividade) e o que negociar.",
  path: "/guias/como-analisar-contrato-clt",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como analisar contrato CLT", path: "/guias/como-analisar-contrato-clt" },
];

const toc = [
  { id: "ordem", label: "1. A ordem certa de leitura" },
  { id: "remuneracao", label: "2. Remuneração e benefícios" },
  { id: "jornada", label: "3. Jornada e horas extras" },
  { id: "rescisao", label: "4. Aviso prévio e rescisão" },
  { id: "atipicas", label: "5. Cláusulas atípicas" },
  { id: "duvidas", label: "6. O que perguntar pro RH" },
];

const howTo = howToSchema({
  name: "Como analisar contrato CLT antes de assinar",
  description:
    "Roteiro de leitura para identificar o que importa em um contrato CLT — sem precisar de um(a) advogado(a) pra cada admissão.",
  steps: [
    { name: "Leia na ordem certa", text: "Identificação das partes, função, jornada, salário, benefícios — depois cláusulas atípicas." },
    { name: "Cheque remuneração e benefícios", text: "Salário base, adicionais, benefícios listados — confronte com a proposta verbal." },
    { name: "Leia jornada e horas extras", text: "Carga semanal, escala, regime de banco de horas, possibilidade de home office." },
    { name: "Veja aviso prévio e rescisão", text: "Prazo de aviso, dispensa, multa rescisória, condições de saída." },
    { name: "Marque cláusulas atípicas", text: "Não-concorrência, exclusividade, multa por descumprimento, foro distante." },
    { name: "Tire dúvidas com o RH", text: "Antes de assinar, peça por escrito o que ficou ambíguo. O contrato assinado vale mais que a explicação verbal." },
  ],
});

export default function GuiaComoAnalisarCltPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~10 min de leitura"
      title="Como analisar contrato CLT antes de assinar"
      intro="Receber a CLT pra assinar é momento de cuidado, não de pressa. Este guia mostra o que ler primeiro, o que costuma pegar quem só passou os olhos e o que ainda dá pra negociar antes da assinatura."
      tldrTitle="O contrato vale mais que a conversa com o RH"
      tldrBody="Se algo foi prometido verbalmente mas não está no contrato, na hora do conflito o que vale é o documento. Antes de assinar, leia, anote o que precisa esclarecer e exija que conste por escrito o que for relevante."
      toc={toc}
      primaryCta={{ href: "/analisar-contrato-clt", label: "Analisar um contrato CLT agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/analisar-contrato-clt", label: "Analisar contrato CLT" },
        { href: "/contrato-clt-para-trabalhador", label: "Contrato CLT — para trabalhador" },
        { href: "/contrato-clt-para-rh", label: "Contrato CLT — para RH" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA (geral)" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="ordem" title="1. A ordem certa de leitura">
        <p>
          Contratos CLT seguem estrutura previsível, mas a ordem em que você
          lê muda o que você nota. Comece pela{" "}
          <strong>identificação das partes</strong> (nome, CNPJ, endereço — bate
          com o que combinaram?), depois <strong>função e
          atribuições</strong> (a descrição cobre o que você vai fazer?), em
          seguida <strong>remuneração</strong>, <strong>jornada</strong> e
          <strong> benefícios</strong>.
        </p>
        <p>
          Só depois entre em <strong>cláusulas atípicas</strong> — restrições
          pós-contratuais, multas, exclusividade. É onde mora a maior parte das
          surpresas. Quem lê na ordem inversa cansa antes de chegar nas
          cláusulas que mais importam.
        </p>
      </GuideSection>

      <GuideSection id="remuneracao" title="2. Remuneração e benefícios">
        <p>
          O salário base aparece em destaque, mas confira separadamente:{" "}
          <strong>adicionais</strong> (insalubridade, periculosidade, noturno),{" "}
          <strong>comissões</strong> (com regra de pagamento — base, percentual,
          quando vence) e <strong>variáveis</strong> (PLR, bônus por meta).
          O total prometido na entrevista e o salário do contrato devem bater.
        </p>
        <p>
          Benefícios precisam estar listados nominalmente: VT, VR, plano de
          saúde, plano odontológico, seguro de vida. Cláusula genérica
          (&quot;benefícios conforme política da empresa&quot;) é frágil — a
          empresa pode mudar a política depois sem violar o contrato. Se um
          benefício é importante pra você, exija o nome no contrato.
        </p>
        <GuideCallout tone="info" title="FGTS e INSS">
          Esses dois descontos não aparecem no salário-base — são obrigatórios.
          O que aparece no contrato é o salário bruto. O líquido depende dos
          descontos legais + benefícios com participação.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="jornada" title="3. Jornada e horas extras">
        <p>
          Carga horária semanal padrão CLT é 44h, mas variações são comuns
          (40h, 36h, 30h em algumas convenções). O contrato deve dizer:
          quantas horas/semana, escala (comercial, 6x1, 5x2),{" "}
          <strong>regime de horas extras</strong> (pago como hora extra ou
          banco de horas) e — se houver — <strong>home office</strong>{" "}
          (modelo: integral, híbrido, ocasional).
        </p>
        <p>
          Se a empresa adota banco de horas, o contrato precisa indicar o
          prazo máximo de compensação (até 6 meses por acordo individual, até
          1 ano por acordo coletivo). Sem prazo, o banco de horas fica frágil
          juridicamente.
        </p>
      </GuideSection>

      <GuideSection id="rescisao" title="4. Aviso prévio e rescisão">
        <p>
          O aviso prévio é proporcional ao tempo de casa: <strong>30 dias</strong>{" "}
          até completar 1 ano, mais <strong>3 dias por ano adicional</strong>{" "}
          até o teto de <strong>90 dias</strong>. O contrato pode dizer o
          mínimo (30); o resto vale automaticamente pela CLT.
        </p>
        <p>
          Verifique se há cláusula de <strong>multa por descumprimento</strong>{" "}
          (atenção: multa pra você ou pra empresa? Reciprocidade
          importa) e <strong>condições de saída</strong> em pedido de demissão.
          Em pedido de demissão, você dispensa o FGTS sacável e a multa de 40%
          — mas isso é da CLT, não negociável.
        </p>
      </GuideSection>

      <GuideSection id="atipicas" title="5. Cláusulas atípicas">
        <p>
          Onde mora a maior parte do problema. As mais comuns:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Não-concorrência pós-contrato</strong>: válida apenas com
            contrapartida financeira proporcional ao tempo de restrição. Sem
            contrapartida, a cláusula vira nula.
          </li>
          <li>
            <strong>Exclusividade durante o contrato</strong>: comum, mas
            redação ampla (&quot;qualquer atividade remunerada&quot;) pode te
            impedir de freelas paralelos legítimos. Tente delimitar pra
            concorrentes diretos.
          </li>
          <li>
            <strong>Cessão de direitos autorais</strong>: em funções
            criativas (design, dev, conteúdo), a cessão automática é padrão.
            Negocie direito de uso pra portfólio.
          </li>
          <li>
            <strong>Foro distante</strong>: foro de eleição diferente do
            local de trabalho encarece muito eventual ação. Foro do local de
            trabalho é regra geral — vale resistir a mudanças.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="duvidas" title="6. O que perguntar pro RH">
        <p>
          Antes de assinar, mande um e-mail (não só conversa verbal) com o
          que ficou ambíguo: cobertura do plano de saúde, regra de PLR,
          critério pra promoção, política de home office. Resposta por
          escrito vira anexo ao seu raciocínio — e, se houver conflito
          depois, prova do que foi prometido.
        </p>
        <p>
          Se algum ponto importante (benefício, jornada, política) não está
          no contrato, peça que conste. Empresa séria ajusta o documento;
          empresa que recusa ajustar está te avisando o que vai acontecer
          depois.
        </p>
        <GuideCallout tone="warn" title="Quando consultar advogado(a) ou sindicato">
          Em contratos com muito dinheiro (cargo executivo, opção de stock,
          cláusula de não-concorrência ampla), vale a consulta. O custo é
          baixo comparado ao risco. Sindicato da categoria também pode
          esclarecer dúvidas sobre convenção coletiva.
        </GuideCallout>
      </GuideSection>
    </GuideLayout>
  );
}
