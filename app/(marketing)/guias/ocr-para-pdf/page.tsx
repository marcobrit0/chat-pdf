import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "OCR para PDF — quando precisa, como saber se funcionou",
  description:
    "Guia técnico em PT-BR sobre OCR (reconhecimento óptico de caracteres) para PDF: quando precisa, como testar se seu PDF tem texto, ferramentas e limitações.",
  path: "/guias/ocr-para-pdf",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "OCR para PDF", path: "/guias/ocr-para-pdf" },
];

const toc = [
  { id: "o-que-e", label: "1. O que é OCR" },
  { id: "precisa", label: "2. Como saber se seu PDF precisa de OCR" },
  { id: "ferramentas", label: "3. Ferramentas de OCR pra PDF" },
  { id: "qualidade", label: "4. Como julgar a qualidade do OCR" },
  { id: "casos", label: "5. Casos onde OCR sempre falha" },
  { id: "ia", label: "6. OCR + IA: cuidados" },
];

export default function GuiaOcrParaPdfPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia técnico · ~9 min de leitura"
      title="OCR para PDF — quando precisa, como saber se funcionou"
      intro="OCR (reconhecimento óptico de caracteres) é o que transforma uma imagem de texto em texto pesquisável. PDFs digitalizados precisam — e sem isso, ferramentas de IA leem o documento como se fosse uma foto em branco. Este guia cobre o essencial em ~9 minutos."
      tldrTitle="Tente selecionar uma frase no seu PDF"
      tldrBody="Abra o PDF, tente selecionar uma palavra com o cursor. Se a palavra fica destacada, o PDF tem texto — não precisa de OCR. Se só a página inteira fica selecionada (como uma imagem), você precisa de OCR antes de qualquer ferramenta de IA dar resultado."
      toc={toc}
      primaryCta={{ href: "/resumir-pdf", label: "Tentar com seu PDF agora" }}
      secondaryCta={{ href: "/precos", label: "Premium aplica OCR automático" }}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/pdf-ia", label: "PDF + IA (como funciona)" },
        { href: "/guias/como-resumir-pdf-com-ia", label: "Como resumir PDF com IA" },
      ]}
    >
      <GuideSection id="o-que-e" title="1. O que é OCR">
        <p>
          OCR — <em>Optical Character Recognition</em> — é a tecnologia que
          olha uma imagem de texto e devolve o texto em formato editável.
          Funciona com regras (forma de cada letra) ou, hoje em dia,
          principalmente com modelos de visão computacional treinados em
          milhões de imagens de texto.
        </p>
        <p>
          PDFs vêm de duas origens: <strong>nativos</strong> (gerados por
          software — Word salvo como PDF, exportação de sistema) e{" "}
          <strong>digitalizados</strong> (foto, scanner, &quot;imprimir como
          PDF&quot; a partir de uma foto). Os primeiros têm texto
          selecionável; os segundos são imagens dentro de um container PDF
          até passarem por OCR.
        </p>
      </GuideSection>

      <GuideSection id="precisa" title="2. Como saber se seu PDF precisa de OCR">
        <p>
          Teste em 5 segundos: abra o PDF no seu visualizador padrão
          (Preview no Mac, Acrobat Reader, Chrome) e tente selecionar uma
          palavra com o cursor. Três cenários:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>A palavra fica destacada e copiável</strong> → PDF tem
            texto. Pode usar IA direto.
          </li>
          <li>
            <strong>Só a página inteira fica selecionada (caixa
            azul)</strong> → PDF é imagem. Precisa de OCR.
          </li>
          <li>
            <strong>Algumas páginas têm texto, outras não</strong> → PDF
            misto (digitalizado em alguma etapa). Precisa de OCR seletivo.
          </li>
        </ul>
        <p>
          Outro sinal: copie um trecho e cole num editor. Texto verdadeiro
          cola legível; OCR ruim cola com caracteres trocados (l vs 1, O vs
          0, espaços fora de lugar).
        </p>
      </GuideSection>

      <GuideSection id="ferramentas" title="3. Ferramentas de OCR pra PDF">
        <p>
          Opções comuns, do mais simples ao mais profissional:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Adobe Acrobat Pro</strong>: OCR embutido (Tools →
            Enhance Scans → Recognize Text). Pago, qualidade alta.
          </li>
          <li>
            <strong>Google Drive</strong>: faz upload do PDF e abre como
            Google Docs — extrai texto automaticamente. Grátis, qualidade
            razoável pra docs simples.
          </li>
          <li>
            <strong>Tesseract</strong> (open source) + interface como
            OCRmyPDF: linha de comando, qualidade sólida em PT-BR, gratuito.
          </li>
          <li>
            <strong>Serviços online</strong> (smallpdf, ilovepdf etc.):
            práticos, mas atenção à privacidade — você está enviando o
            documento pra terceiros.
          </li>
          <li>
            <strong>Ferramentas de IA com OCR integrado</strong>: o ChatPDF
            Brasil Premium aplica OCR automaticamente quando detecta PDF
            digitalizado.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="qualidade" title="4. Como julgar a qualidade do OCR">
        <p>
          OCR perfeito é raro fora de documentos limpos e bem digitalizados.
          Sinais de OCR ruim:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Caracteres trocados sistematicamente (rn → m, cl → d, ii → n)
          </li>
          <li>
            Espaçamento errático (palavrasjuntas ou s e p a r a d a s)
          </li>
          <li>
            Acentos perdidos (Sao Paulo no lugar de São Paulo)
          </li>
          <li>
            Tabelas viraram texto corrido sem colunas
          </li>
          <li>
            Letras especiais (€, ç, ã, ñ) viraram caracteres aleatórios
          </li>
        </ul>
        <p>
          Pra IA, OCR ruim é venenoso: o modelo recebe texto cheio de erros
          e tira conclusões erradas — sem indicação de que a fonte estava
          comprometida. Quanto pior o OCR, menos confiável a saída.
        </p>
      </GuideSection>

      <GuideSection id="casos" title="5. Casos onde OCR sempre falha">
        <p>
          Mesmo a ferramenta de OCR mais sofisticada tem limites. Casos onde
          o resultado vai ser ruim independente do que você tente:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Letra de médico(a) à mão</strong> — escrita cursiva
            personalizada raramente passa em OCR comercial
          </li>
          <li>
            <strong>Documentos manuscritos sem padrão</strong> (formulários
            preenchidos à mão, carta antiga)
          </li>
          <li>
            <strong>PDF com qualidade de imagem muito baixa</strong> (foto
            de tela, screenshot recortado)
          </li>
          <li>
            <strong>Documentos com fundo decorado ou marca-d&apos;água
            forte</strong>
          </li>
          <li>
            <strong>Papel amassado, com sombra, fora de foco</strong>
          </li>
        </ul>
        <p>
          Pra esses casos, OCR não resolve. Soluções: pedir uma versão
          digital, redigitar manualmente, ou (em médico) usar o portal do
          paciente da clínica/laboratório que costuma ter PDF digitado.
        </p>
      </GuideSection>

      <GuideSection id="ia" title="6. OCR + IA: cuidados">
        <p>
          Quando o pipeline é OCR → IA, dois erros se compõem: o OCR pode
          errar uma palavra, e a IA pode interpretar o erro como se fosse
          intencional. O resultado: confiança maior do que merece em
          conteúdo derivado de fonte ruim.
        </p>
        <p>
          Boas práticas:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Antes de confiar na IA, abra o PDF e leia 2-3 trechos extraídos
            por OCR — se já tem erro óbvio, a saída inteira vai ter
          </li>
          <li>
            Em decisões críticas (jurídicas, financeiras, médicas), volte
            sempre ao documento original
          </li>
          <li>
            Para volume grande, prefira ferramentas que tenham OCR
            integrado e validem qualidade automaticamente
          </li>
        </ul>
        <GuideCallout tone="info" title="No ChatPDF Brasil">
          O Premium detecta PDF digitalizado e aplica OCR automaticamente
          antes da análise. No fluxo gratuito, o PDF precisa ter texto
          selecionável — se não tem, o resultado vai ser pobre porque a IA
          não vai ter conteúdo extraível.
        </GuideCallout>
      </GuideSection>
    </GuideLayout>
  );
}
