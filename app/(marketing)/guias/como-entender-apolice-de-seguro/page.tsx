import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como entender uma apólice de seguro — guia para o segurado",
  description:
    "Recebeu a apólice e travou nos termos? Este guia em PT-BR mostra como ler coberturas, exclusões, carência e franquia, e o que conferir antes de qualquer sinistro.",
  path: "/guias/como-entender-apolice-de-seguro",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como entender uma apólice de seguro", path: "/guias/como-entender-apolice-de-seguro" },
];

const toc = [
  { id: "estrutura", label: "1. Estrutura padrão de uma apólice" },
  { id: "coberturas", label: "2. Coberturas e capital segurado" },
  { id: "exclusoes", label: "3. Exclusões — onde ler com atenção" },
  { id: "carencia-franquia", label: "4. Carência e franquia" },
  { id: "sinistro", label: "5. Como acionar em caso de sinistro" },
  { id: "renovacao", label: "6. Renovação e mudanças silenciosas" },
];

const howTo = howToSchema({
  name: "Como entender uma apólice de seguro",
  description:
    "Roteiro de leitura pra apólices brasileiras — coberturas, exclusões, carência, franquia e como acionar em caso de sinistro.",
  steps: [
    { name: "Localize a estrutura", text: "Especificação particular, condições gerais, condições especiais. Cada parte cobre uma camada diferente." },
    { name: "Liste coberturas e capitais", text: "Confira o que está coberto e até qual valor. Cobertura básica varia entre seguradoras." },
    { name: "Leia exclusões", text: "É onde mora o problema na hora do sinistro. Leia com atenção dobrada." },
    { name: "Confirme carência e franquia", text: "Carência é o tempo até a cobertura entrar em vigor. Franquia é o que você paga antes da seguradora cobrir." },
    { name: "Memorize o fluxo de sinistro", text: "Documentos, prazo de aviso, canal oficial. Atraso pode invalidar a indenização." },
    { name: "Confira mudanças na renovação", text: "Apólice nova pode ter cobertura, franquia ou exclusão diferente. Leia o que mudou." },
  ],
});

export default function GuiaComoEntenderApolicePage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~10 min de leitura"
      title="Como entender uma apólice de seguro"
      intro="Apólice é o documento que ninguém lê — até precisar. E quando precisa, descobre que a cobertura que parecia incluída estava na lista de exclusões. Este guia mostra o que ler antes do problema acontecer."
      tldrTitle="Não confie no nome da cobertura — leia o que está coberto"
      tldrBody="&quot;Cobertura básica&quot; varia entre seguradoras. &quot;Auto compreensiva&quot; também. O nome é resumo de marketing; o conteúdo está nas condições gerais. Quem lê só o nome descobre na hora do sinistro o que faltou."
      toc={toc}
      primaryCta={{ href: "/analisar-apolice-de-seguro", label: "Analisar uma apólice agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/analisar-apolice-de-seguro", label: "Analisar apólice de seguro" },
        { href: "/apolice-de-seguro-para-segurado", label: "Apólice para o segurado" },
        { href: "/apolice-de-seguro-para-corretor", label: "Apólice para corretor" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="estrutura" title="1. Estrutura padrão de uma apólice">
        <p>
          Toda apólice tem três camadas:{" "}
          <strong>especificação particular</strong> (seu contrato — bem
          segurado, valor, prazo, beneficiário),{" "}
          <strong>condições gerais</strong> (regras válidas pra todos os
          seguros desse produto na seguradora) e{" "}
          <strong>condições especiais</strong> (regras específicas da
          cobertura contratada).
        </p>
        <p>
          A especificação é curta — duas a quatro páginas. As condições
          gerais e especiais são longas — 30 a 100 páginas. Onde mora o
          conteúdo importante: <strong>nas condições</strong>, não na
          especificação.
        </p>
      </GuideSection>

      <GuideSection id="coberturas" title="2. Coberturas e capital segurado">
        <p>
          Coberturas listam o que a seguradora paga. Cada cobertura tem um
          <strong> capital segurado</strong> — o teto. Você pode ter R$
          200.000 em cobertura básica e R$ 5.000 em cobertura adicional de
          equipamentos eletrônicos. O teto da equipamentos não some no
          capital total — limita só a equipamentos.
        </p>
        <p>
          Em apólice de auto, &quot;casco compreensivo&quot; (colisão +
          incêndio + roubo) é diferente de &quot;casco básico&quot; (só
          colisão). Em residencial, &quot;cobertura básica&quot; pode incluir
          ou não dano elétrico, dependendo da seguradora. Confira na sua
          apólice.
        </p>
      </GuideSection>

      <GuideSection id="exclusoes" title="3. Exclusões — onde ler com atenção">
        <p>
          Lista do que a seguradora <strong>não</strong> cobre. Costuma
          aparecer em &quot;riscos excluídos&quot; ou &quot;hipóteses de
          exclusão&quot;. Exemplos típicos:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Eventos por culpa grave do segurado (dirigir alcoolizado, deixar
            chave na ignição)
          </li>
          <li>
            Danos por desgaste natural, manutenção inadequada
          </li>
          <li>
            Eventos em região não declarada (carro cadastrado em SP usado
            regularmente em zona de risco em outro estado)
          </li>
          <li>
            Atos de guerra, terrorismo, perturbação política
          </li>
          <li>
            Em saúde: condição preexistente não declarada, procedimentos
            estéticos
          </li>
        </ul>
        <p>
          Antes de qualquer sinistro, vale ler a lista inteira de exclusões.
          É comum descobrir que algo que você presumia coberto não está.
        </p>
      </GuideSection>

      <GuideSection id="carencia-franquia" title="4. Carência e franquia">
        <p>
          <strong>Carência</strong> é o tempo entre a contratação e o início
          efetivo da cobertura. Em saúde é onde mais pega: 24 horas pra
          urgência/emergência, 30 dias pra consultas, 180 dias pra
          internações, 300 dias pra parto, 24 meses pra condições
          preexistentes. Cada produto tem o seu — leia a tabela.
        </p>
        <p>
          <strong>Franquia</strong> é o valor que você paga em caso de
          sinistro antes da seguradora cobrir. Em auto, franquia normal pode
          ser R$ 2.500 — sinistro abaixo disso, você banca. Há também{" "}
          <strong>franquia reduzida</strong> (paga prêmio maior, franquia
          menor) e <strong>participação obrigatória</strong> (% do dano que
          fica com você). Leia o tipo aplicável à sua apólice.
        </p>
      </GuideSection>

      <GuideSection id="sinistro" title="5. Como acionar em caso de sinistro">
        <p>
          Cada apólice tem um fluxo: canal oficial pra abrir aviso (app,
          telefone, e-mail), prazo máximo pra avisar (frequentemente 48 a 72
          horas), documentos exigidos (boletim de ocorrência, nota fiscal,
          documentos do bem, formulário próprio).
        </p>
        <p>
          Atraso no aviso é uma das causas comuns de negativa de
          indenização. Em alguns produtos (saúde de viagem, por exemplo) o
          aviso fora do prazo derruba a cobertura mesmo em evento incluso.
          Memorize o canal e o prazo no momento da contratação.
        </p>
        <GuideCallout tone="warn" title="Documente desde o primeiro minuto">
          Em sinistro, fotografe o estado do bem antes de qualquer reparo,
          guarde notas fiscais, peça boletim de ocorrência se aplicável.
          Seguradora boa pede; seguradora ruim usa documentação faltante
          como motivo pra negar.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="renovacao" title="6. Renovação e mudanças silenciosas">
        <p>
          Apólice renova com novo PDF — e com novas condições. Em geral, o
          que muda fica em destaque (&quot;principais alterações&quot;) na
          carta de renovação ou no aditivo. Mas vale comparar a versão nova
          com a anterior pra ter certeza: cobertura saiu, franquia subiu,
          exclusão apareceu.
        </p>
        <p>
          Em saúde, mudanças regulamentares (RN ANS) atingem todas as
          apólices ativas — então mudanças não são só da seguradora. Em auto,
          mudança de perfil (mudou de cidade, mudou condutor habitual) pode
          gerar diferença significativa de prêmio na renovação. Vale revisar
          os dados antes do vencimento.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
