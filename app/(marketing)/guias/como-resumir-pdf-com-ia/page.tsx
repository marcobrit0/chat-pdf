import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import {
  JsonLd,
  breadcrumbSchema,
  howToSchema,
} from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como resumir PDF com IA: guia completo em português | PDFIA",
  description:
    "Guia direto em PT-BR: como escolher o PDF certo, o que esperar do resumo, quais perguntas fazer ao documento e quando vale assinar Premium. 10 min de leitura, sem encheção.",
  path: "/guias/como-resumir-pdf-com-ia",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como resumir PDF com IA", path: "/guias/como-resumir-pdf-com-ia" },
];

const toc = [
  { id: "envio", label: "1. Envio: o PDF certo" },
  { id: "leitura", label: "2. Leitura: o que esperar do resumo" },
  { id: "perguntas", label: "3. Perguntas para fazer ao texto" },
  { id: "premium", label: "4. Quando vale subir para o Premium" },
  { id: "checklist", label: "5. Checklist por tipo de documento" },
];

const checklist = [
  {
    type: "Contratos",
    points: [
      "Quem são as partes e qual o objeto",
      "Valor total e forma de pagamento",
      "Multa por rescisão antecipada",
      "Prazo de aviso para denúncia",
      "Foro de eleição",
    ],
  },
  {
    type: "Editais de licitação",
    points: [
      "Objeto e modalidade",
      "Prazo final de envio das propostas",
      "Critério de julgamento (menor preço, técnica, etc.)",
      "Documentos de habilitação exigidos",
      "Penalidades e prazos recursais",
    ],
  },
  {
    type: "Apólices de seguro",
    points: [
      "Coberturas contratadas e valores de capital segurado",
      "Exclusões",
      "Prazo de carência",
      "Franquia e participação obrigatória",
      "Como acionar em caso de sinistro",
    ],
  },
  {
    type: "Laudos médicos",
    points: [
      "Diagnóstico ou hipótese diagnóstica",
      "Achados clínicos relevantes",
      "Termos técnicos traduzidos",
      "Recomendações registradas pelo profissional",
      "Próximos passos sugeridos no laudo",
    ],
  },
];

export default function GuiaResumirPdfPage() {
  const howToData = howToSchema({
    name: "Como resumir um PDF com IA em português",
    description:
      "Cinco etapas para tirar mais valor de uma ferramenta de IA para PDF, do envio à decisão de subir para o Premium.",
    steps: [
      {
        name: "Envie o PDF certo",
        text: "Use um PDF com texto selecionável, idealmente até 10 páginas no nível gratuito.",
      },
      {
        name: "Leia o resumo estruturado",
        text: "A saída traz visão geral, tópicos, datas, entidades e valores. Trate como triagem.",
      },
      {
        name: "Faça perguntas ao texto",
        text: "No Premium, pergunte direto ao documento. Cada resposta cita a página de origem.",
      },
      {
        name: "Decida pelo Premium quando precisar de profundidade",
        text: "PDFs longos, modos específicos (CLT, edital, apólice) e histórico exigem assinatura.",
      },
      {
        name: "Use o checklist por tipo de documento",
        text: "Para cada tipo, há um conjunto de pontos críticos que valem a verificação manual.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={howToData} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 border-b border-subtle-gray pb-8">
          <p className="eyebrow text-faded-stone">
            Guia · ~10 min de leitura
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05]  text-midnight-ink">
            Como resumir PDF com IA
          </h1>
          <p className="mt-5 text-body  text-charcoal-text sm:text-body-lg">
            Guia direto pra você tirar mais de uma ferramenta de IA pra PDF —
            do envio até decidir se vale assinar o Premium. Em português, com
            exemplos brasileiros (contrato CLT, edital, apólice, laudo).
          </p>
        </header>

        <aside className="mt-10 rounded-lg border border-midnight-ink bg-canvas p-6">
          <p className="eyebrow text-faded-stone">
            TL;DR
          </p>
          <p className="mt-2 font-display text-subheading font-semibold leading-snug text-midnight-ink">
            IA pra triar, gente pra decidir
          </p>
          <p className="mt-3 text-body-sm  text-charcoal-text">
            A IA acelera a leitura de PDF longo tirando o que costuma importar
            (datas, valores, partes, prazos). Trata o resumo como primeiro
            passe — vai no texto original antes de qualquer decisão jurídica,
            médica ou financeira.
          </p>
        </aside>

        <nav
          aria-label="Sumário"
          className="mt-10 rounded-lg bg-crisp-white p-5"
        >
          <p className="eyebrow text-faded-stone">
            Neste guia
          </p>
          <ol className="mt-3 space-y-2 text-body-sm text-charcoal-text">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-midnight-ink underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section
          id="envio"
          className="mt-14 space-y-4 text-body  text-graphite"
        >
          <h2 className="font-display text-heading font-semibold text-midnight-ink">
            1. Envio: o PDF certo
          </h2>
          <p>
            A IA precisa de texto. Se o seu PDF é uma foto digitalizada de um
            documento (escaneado), o passo zero é o OCR — reconhecimento óptico
            de caracteres. Sem texto extraível, qualquer ferramenta de IA fica
            vendo o documento como uma imagem.
          </p>
          <p>
            Para o fluxo gratuito, prefira PDFs até 10 páginas com texto
            selecionável. Você pode testar abrindo o PDF e tentando selecionar
            uma frase com o cursor — se o texto fica destacado, está bom. Se
            só seleciona o quadrado da página, é uma imagem.
          </p>
          <p>
            PDFs longos (acima de 10 páginas) e digitalizados são fluxo
            Premium. O Premium aplica OCR automaticamente e processa até 100
            páginas por documento.
          </p>
        </section>

        <section
          id="leitura"
          className="mt-14 space-y-4 text-body  text-graphite"
        >
          <h2 className="font-display text-heading font-semibold text-midnight-ink">
            2. Leitura: o que esperar do resumo
          </h2>
          <p>
            A saída não é um parágrafo livre. É uma estrutura: visão geral em
            2–3 frases, lista de tópicos principais, datas e prazos
            identificados, entidades (pessoas, empresas, órgãos), valores
            monetários e — em contratos e editais — cláusulas-chave.
          </p>
          <p>
            Boa leitura de resumo de IA é uma leitura crítica: ao bater os
            olhos nos tópicos, você decide quais merecem ir ao documento
            original. Em PDFs de 30+ páginas, esse filtro economiza horas. Em
            PDFs de 5 páginas, talvez não economize tanto — vale ler de uma
            vez.
          </p>
          <p>
            Se a saída parecer rasa ou genérica demais, normalmente é porque o
            PDF tem pouca densidade textual (slides com muita imagem, por
            exemplo). Nesse caso, a IA tem pouco material para resumir.
          </p>
        </section>

        <section
          id="perguntas"
          className="mt-14 space-y-4 text-body  text-graphite"
        >
          <h2 className="font-display text-heading font-semibold text-midnight-ink">
            3. Perguntas para fazer ao texto
          </h2>
          <p>
            No Premium, em vez de só ler o resumo, você conversa com o
            documento. Cada resposta cita a página de origem — então é fácil
            verificar antes de agir.
          </p>
          <p>
            Boas perguntas começam pelo que o resumo não respondeu. Em
            contratos: &quot;qual a multa em caso de rescisão pela contratante
            no sexto mês?&quot;. Em editais: &quot;a habilitação exige certidão
            de regularidade trabalhista? em quanto tempo?&quot;. Em apólices:
            &quot;esta cobertura inclui dano elétrico em equipamento dentro de
            casa?&quot;.
          </p>
          <p>
            Evite perguntas sem resposta no texto: a IA ou inventa, ou diz
            &quot;não consta&quot; — e o segundo é mais útil. Se receber uma
            resposta que não cita página, trate como hipótese, não como fato.
          </p>
        </section>

        <section
          id="premium"
          className="mt-14 space-y-4 text-body  text-graphite"
        >
          <h2 className="font-display text-heading font-semibold text-midnight-ink">
            4. Quando vale subir para o Premium
          </h2>
          <p>Vale subir quando você se vê fazendo uma destas coisas:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Lendo o mesmo documento mais de uma vez (precisa de histórico
              salvo)
            </li>
            <li>
              Trabalhando com PDFs acima de 10 páginas regularmente (limite
              gratuito)
            </li>
            <li>
              Triando contratos, editais ou apólices em volume (modos
              específicos extraem o que costuma importar)
            </li>
            <li>
              Precisando citar a página em parecer interno ou para um cliente
              (modo chat com citações)
            </li>
            <li>Lidando com documentos digitalizados que precisam de OCR</li>
          </ul>
          <p>
            R$29/mês ou R$290/ano (economia de R$58). Cancela quando quiser,
            sem taxa.{" "}
            <Link
              href="/precos"
              className="text-midnight-ink underline underline-offset-4"
            >
              Ver detalhes do plano
            </Link>
            .
          </p>
        </section>

        <section
          id="checklist"
          className="mt-14 space-y-4 text-body  text-graphite"
        >
          <h2 className="font-display text-heading font-semibold text-midnight-ink">
            5. Checklist por tipo de documento
          </h2>
          <p>
            Para cada tipo abaixo, são os pontos que valem a leitura no texto
            original — depois que o resumo da IA pôs o radar no lugar certo.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {checklist.map((c) => (
              <div
                key={c.type}
                className="rounded-lg border border-subtle-gray bg-crisp-white p-5"
              >
                <p className="font-display text-body font-semibold text-midnight-ink">
                  {c.type}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-body-sm text-charcoal-text">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-subtle-gray pt-8">
          <p className="eyebrow text-faded-stone">
            Próximo passo
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
            >
              Resumir um PDF agora
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
            >
              Ver planos Premium
            </Link>
          </div>
        </section>

        <section className="mt-12 border-t border-subtle-gray pt-8">
          <p className="eyebrow text-faded-stone">
            Veja também
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
            <li>
              <Link
                href="/analisar-contrato-clt"
                className="text-midnight-ink underline underline-offset-4"
              >
                Analisar contrato CLT
              </Link>
            </li>
            <li>
              <Link
                href="/ler-edital-com-ia"
                className="text-midnight-ink underline underline-offset-4"
              >
                Ler edital com IA
              </Link>
            </li>
            <li>
              <Link
                href="/analisar-apolice-de-seguro"
                className="text-midnight-ink underline underline-offset-4"
              >
                Analisar apólice de seguro
              </Link>
            </li>
            <li>
              <Link
                href="/entender-laudo-medico"
                className="text-midnight-ink underline underline-offset-4"
              >
                Entender laudo médico
              </Link>
            </li>
            <li>
              <Link
                href="/pdf-ia"
                className="text-midnight-ink underline underline-offset-4"
              >
                PDF + IA (como funciona)
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
