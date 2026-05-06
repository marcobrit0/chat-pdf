import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como comparar duas versões de PDF — manual, ferramenta ou IA | PDFIA",
  description:
    "Contrato renegociado, edital corrigido, apólice renovada: como identificar o que mudou entre v1 e v2 do mesmo PDF — quando vale na mão, quando vale ferramenta de diff, quando vale IA.",
  path: "/guias/comparar-versoes-de-pdf",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Comparar versões de PDF", path: "/guias/comparar-versoes-de-pdf" },
];

const toc = [
  { id: "quando", label: "1. Quando você precisa comparar versões" },
  { id: "manual", label: "2. Comparação manual — vale ou não vale" },
  { id: "ferramentas", label: "3. Ferramentas de diff em PDF" },
  { id: "ia", label: "4. Comparação com IA — como pedir bem" },
  { id: "armadilhas", label: "5. Armadilhas comuns" },
  { id: "checklist", label: "6. Checklist por tipo de documento" },
];

const howTo = howToSchema({
  name: "Como comparar duas versões de um PDF",
  description:
    "Roteiro pra identificar o que mudou entre duas versões de um mesmo documento — contrato, edital, apólice, relatório.",
  steps: [
    { name: "Identifique o que importa olhar", text: "Cláusulas críticas, valores, prazos. Não tente comparar tudo — foque." },
    { name: "Decida entre manual ou ferramenta", text: "Diferenças pequenas: manual. Documentos longos: ferramenta de diff ou IA." },
    { name: "Use ferramenta de diff", text: "Adobe Acrobat Pro, Draftable, ferramentas online — destacam mudanças visualmente." },
    { name: "Use IA pra comparar conteúdo", text: "Suba ambas as versões e pergunte 'o que mudou em X?' — útil em documentos longos." },
    { name: "Cuide das armadilhas", text: "Reformatação cosmética sem mudança de conteúdo, anexos diferentes, números renumerados." },
    { name: "Aplique checklist por tipo", text: "Cada tipo de documento tem pontos onde mudança importa mais. Use checklist." },
  ],
});

export default function GuiaCompararVersoesPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~9 min de leitura"
      title="Como comparar duas versões de um PDF"
      intro="Contrato voltou da rodada de revisão, edital teve errata, apólice renovou. Em todos os casos, a pergunta é a mesma: o que mudou? Este guia mostra três caminhos (manual, ferramenta dedicada, IA) e quando usar cada um."
      tldrTitle="Não compare tudo — compare o que importa"
      tldrBody="Documentos longos têm centenas de mudanças cosméticas (espaçamento, fonte, paginação) que não importam. Foque nas cláusulas críticas pro seu caso. A pergunta certa é &apos;o que mudou em X?&apos;, não &apos;o que mudou no documento inteiro?&apos;."
      toc={toc}
      primaryCta={{ href: "/comparar-pdfs", label: "Comparar dois PDFs agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/comparar-pdfs", label: "Comparar PDFs" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
        { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
        { href: "/analisar-apolice-de-seguro", label: "Analisar apólice" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="quando" title="1. Quando você precisa comparar versões">
        <p>
          Os cenários típicos:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Contrato em rodada de negociação</strong>: a outra parte
            mandou v2 — o que ela aceitou, o que ela mudou, o que ela
            ignorou
          </li>
          <li>
            <strong>Edital com errata</strong>: o órgão republicou —
            confirmar prazo, exigência ou valor que mudou
          </li>
          <li>
            <strong>Apólice na renovação</strong>: cobertura, franquia,
            exclusão podem ter mudado em relação à apólice anterior
          </li>
          <li>
            <strong>Relatório periódico</strong>: comparar trimestre a
            trimestre, mês a mês
          </li>
          <li>
            <strong>Política interna atualizada</strong>: o que muda na
            prática pra equipe
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="manual" title="2. Comparação manual — vale ou não vale">
        <p>
          Comparação manual lado a lado funciona bem quando:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>O documento tem até 10-15 páginas</li>
          <li>Você sabe onde olhar (cláusula 4, item 7, página 12)</li>
          <li>Diferenças são pontuais, não dispersas</li>
        </ul>
        <p>
          Não funciona quando o documento é longo e mudanças podem estar
          espalhadas — você cansa, atenção cai, mudança importante passa
          despercebida. Para documentos &gt;15 páginas com mudanças
          dispersas, use ferramenta dedicada ou IA.
        </p>
      </GuideSection>

      <GuideSection id="ferramentas" title="3. Ferramentas de diff em PDF">
        <p>
          Opções consolidadas:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Adobe Acrobat Pro</strong> (Compare Files): destaca
            visualmente mudanças entre dois PDFs. Pago, sólido, bom pra
            documentos com mudança visual relevante.
          </li>
          <li>
            <strong>Draftable</strong> (web e desktop): diff de PDFs em
            colunas paralelas, com destaque de mudanças. Boa qualidade.
          </li>
          <li>
            <strong>diffpdf</strong> (open source): comparação visual e
            textual, gratuito.
          </li>
          <li>
            <strong>Microsoft Word</strong> (se o original é Word):
            converter PDFs em Word e usar &quot;Comparar documentos&quot;
            funciona quando ambos vêm de Word.
          </li>
        </ul>
        <p>
          O ponto fraco de todas as ferramentas de diff puro: elas dizem o
          que mudou, não o que isso significa. Texto que mudou de &quot;30
          dias&quot; pra &quot;60 dias&quot; aparece destacado, mas não vem
          interpretação. Pra entender impacto, é leitura humana — ou IA.
        </p>
      </GuideSection>

      <GuideSection id="ia" title="4. Comparação com IA — como pedir bem">
        <p>
          IA é especialmente útil quando você sabe o que importa. Suba as
          duas versões (no Premium do ChatPDF Brasil isso fica em uma
          biblioteca da sua conta) e pergunte com foco:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            &quot;O que mudou na cláusula de rescisão entre as duas
            versões?&quot;
          </li>
          <li>
            &quot;O prazo de pagamento mudou?&quot;
          </li>
          <li>
            &quot;Apareceu alguma cláusula nova de não-concorrência?&quot;
          </li>
          <li>
            &quot;A franquia mudou em relação à apólice anterior?&quot;
          </li>
        </ul>
        <p>
          Pergunta ampla (&quot;o que mudou no documento?&quot;) tende a
          devolver resposta ampla e genérica. Pergunta focada devolve
          comparação útil. Em documentos críticos, complemente com leitura
          dirigida no original.
        </p>
        <GuideCallout tone="info" title="Citação por página ajuda">
          Ferramentas de IA com citação por página (modo Premium) facilitam
          a verificação: a resposta cita &quot;p. 4, cláusula 6.2&quot; e
          você abre o trecho no original em segundos pra confirmar.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="armadilhas" title="5. Armadilhas comuns">
        <p>
          Coisas que parecem mudança mas não são, e vice-versa:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Reformatação cosmética</strong>: fonte mudou,
            espaçamento mudou, mas o texto é idêntico — ferramenta de diff
            visual marca como mudança
          </li>
          <li>
            <strong>Numeração renumerada</strong>: cláusula 7.2 virou 8.1
            sem mudança de conteúdo — ferramenta de diff fica confusa
          </li>
          <li>
            <strong>Anexos diferentes</strong>: a versão nova traz anexo
            atualizado que o diff do corpo principal não pega
          </li>
          <li>
            <strong>Erros silenciosos</strong>: data digitada errada (2026
            virou 2025) é mudança importante que pode passar como
            tipográfica
          </li>
          <li>
            <strong>Cláusula movida</strong>: o conteúdo está lá, mas em
            outro lugar — diff tradicional marca como remoção + inserção
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="checklist" title="6. Checklist por tipo de documento">
        <p>
          O que olhar primeiro em cada tipo:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Contrato em rodada</strong>: cláusulas que você pediu
            pra mudar (a outra parte aceitou? mudou parcialmente?), valor,
            prazo, multas, foro
          </li>
          <li>
            <strong>Edital com errata</strong>: prazo de envio (mudou?),
            objeto/quantitativo, exigências de habilitação, critério de
            julgamento
          </li>
          <li>
            <strong>Apólice renovada</strong>: lista de coberturas (alguma
            saiu?), franquia, carência, exclusões novas, valor do prêmio
          </li>
          <li>
            <strong>Política interna v2</strong>: o que muda no
            procedimento prático, quem é responsável, quando entra em
            vigor
          </li>
          <li>
            <strong>Relatório periódico</strong>: métricas-chave (delta vs
            anterior), recomendações, riscos novos, riscos resolvidos
          </li>
        </ul>
        <p>
          Em todos os casos, o objetivo é o mesmo: identificar o que
          importa pra sua decisão, não o que mudou em geral.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
