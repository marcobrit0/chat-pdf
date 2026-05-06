import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como entender laudo médico em português — guia pra paciente e família | PDFIA",
  description:
    "Pegou o laudo cheio de termo técnico e ficou perdido? Veja como ler com calma, quais perguntas levar pra consulta e quando vale uma segunda opinião. Sem virar dr. Google.",
  path: "/guias/como-entender-laudo-medico",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como entender laudo médico", path: "/guias/como-entender-laudo-medico" },
];

const toc = [
  { id: "calma", label: "1. Comece pela calma — não pela busca no Google" },
  { id: "estrutura", label: "2. Estrutura típica de um laudo" },
  { id: "termos", label: "3. Como decifrar termos técnicos" },
  { id: "perguntas", label: "4. Perguntas pra levar pra consulta" },
  { id: "segunda-opiniao", label: "5. Quando vale segunda opinião" },
  { id: "limites", label: "6. Limites do que IA pode te dizer" },
];

const howTo = howToSchema({
  name: "Como entender laudo médico em português",
  description:
    "Roteiro prático pra ler um laudo médico em PT-BR sem entrar em pânico — e pra preparar a próxima conversa com o(a) profissional.",
  steps: [
    { name: "Não pesquise sintomas no Google primeiro", text: "Comece lendo o laudo todo, não palavras isoladas. Contexto evita susto desnecessário." },
    { name: "Identifique a estrutura", text: "Identificação, motivo do exame, técnica, achados, impressão diagnóstica, recomendações." },
    { name: "Decifre termos técnicos", text: "Use IA ou glossários médicos confiáveis pra traduzir. Anote o que ainda não fez sentido." },
    { name: "Prepare perguntas pra consulta", text: "3-5 perguntas focadas — não 30. O(a) profissional tem tempo limitado." },
    { name: "Considere segunda opinião quando aplicável", text: "Diagnóstico grave ou incerto, conduta agressiva, dúvida — segunda opinião é direito do paciente." },
    { name: "Saiba o que a IA não substitui", text: "Diagnóstico, conduta clínica e empatia são humanas. Use a IA pra entender, não pra decidir." },
  ],
});

export default function GuiaComoEntenderLaudoPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~10 min de leitura"
      title="Como entender laudo médico em português"
      intro="Receber um laudo médico cheio de termos técnicos é estressante. Este guia mostra como ler com calma, traduzir o que importa e preparar a próxima conversa com o(a) profissional — sem virar paciente assustado(a) por causa de uma palavra fora de contexto."
      tldrTitle="O laudo é uma descrição, não uma sentença"
      tldrBody="A maioria dos laudos descreve achados sem afirmar diagnóstico. &quot;Imagem sugestiva de&quot;, &quot;não se pode descartar&quot;, &quot;compatível com&quot; são prudência clínica, não sinal de gravidade. Entenda o que está escrito antes de presumir o pior."
      toc={toc}
      primaryCta={{ href: "/entender-laudo-medico", label: "Analisar um laudo agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/entender-laudo-medico", label: "Entender laudo médico" },
        { href: "/laudo-medico-para-paciente", label: "Laudo médico — para paciente" },
        { href: "/laudo-medico-para-cuidador", label: "Laudo médico — para cuidador" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="calma" title="1. Comece pela calma — não pela busca no Google">
        <p>
          O reflexo é digitar o termo que não conhece numa busca. O problema:
          buscar &quot;nódulo&quot; ou &quot;hipoatenuação&quot; sem
          contexto leva a páginas que descrevem casos extremos. Você lê o
          pior cenário e entra em pânico antes de entender o seu.
        </p>
        <p>
          Estratégia melhor: leia o laudo inteiro primeiro, do começo ao
          fim, sem parar nas palavras desconhecidas. Numa segunda leitura,
          marque os termos que precisa traduzir. Em geral, a impressão
          diagnóstica e as recomendações no fim do laudo dão muito mais
          informação que termos isolados no meio.
        </p>
      </GuideSection>

      <GuideSection id="estrutura" title="2. Estrutura típica de um laudo">
        <p>
          Laudos seguem padrão razoavelmente fixo:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Identificação</strong>: paciente, data, profissional
            responsável, exame solicitado.
          </li>
          <li>
            <strong>Motivo do exame</strong>: o que o(a) médico(a)
            solicitante queria investigar.
          </li>
          <li>
            <strong>Técnica</strong>: como o exame foi feito (com ou sem
            contraste, sequências, cortes).
          </li>
          <li>
            <strong>Achados</strong>: descrição detalhada do que foi
            observado, órgão por órgão ou estrutura por estrutura.
          </li>
          <li>
            <strong>Impressão diagnóstica</strong>: a síntese do(a)
            radiologista (em exames de imagem) — onde mora a interpretação.
          </li>
          <li>
            <strong>Recomendações</strong>: condutas sugeridas — exames
            complementares, acompanhamento.
          </li>
        </ul>
        <p>
          Em exames laboratoriais, o padrão é diferente: tabela de resultados
          com valores de referência e marcação do que está fora do intervalo.
        </p>
      </GuideSection>

      <GuideSection id="termos" title="3. Como decifrar termos técnicos">
        <p>
          Termos médicos têm raízes que se repetem. Aprender meia dúzia
          ajuda mais do que decorar palavra por palavra:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>-ite</strong> = inflamação (apendicite, otite, tendinite)
          </li>
          <li>
            <strong>-oma</strong> = tumor (não necessariamente maligno —
            mioma, lipoma)
          </li>
          <li>
            <strong>-ectomia</strong> = remoção cirúrgica
            (apendicectomia)
          </li>
          <li>
            <strong>hiper-/hipo-</strong> = aumentado/diminuído
            (hipertensão, hipotireoidismo)
          </li>
          <li>
            <strong>iso-</strong> = igual (em imagem: mesma densidade que o
            tecido de referência)
          </li>
          <li>
            <strong>focal</strong> = localizado em um ponto;{" "}
            <strong>difuso</strong> = espalhado
          </li>
        </ul>
        <p>
          Para o resto, IA ou glossários médicos confiáveis (sociedades
          médicas, atlas de imagem em PT-BR) servem bem. A IA traduz com
          contexto — útil quando o termo aparece em frase complexa.
        </p>
      </GuideSection>

      <GuideSection id="perguntas" title="4. Perguntas pra levar pra consulta">
        <p>
          Consulta tem tempo limitado (10-30 minutos). Vale chegar com
          perguntas escritas, focadas, em ordem de prioridade. Modelo:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            &quot;O que este achado significa pro meu quadro?&quot;
          </li>
          <li>
            &quot;Preciso de algum tratamento agora ou apenas
            acompanhamento?&quot;
          </li>
          <li>
            &quot;Quais sinais devo observar entre consultas?&quot;
          </li>
          <li>
            &quot;Quando o próximo exame? Há urgência?&quot;
          </li>
          <li>
            &quot;Existe outra hipótese diagnóstica?&quot;
          </li>
        </ul>
        <p>
          Cinco perguntas é um bom limite. Se você chegar com 20, o(a)
          profissional vai responder rápido todas e nenhuma fica com o
          aprofundamento que importa.
        </p>
      </GuideSection>

      <GuideSection id="segunda-opiniao" title="5. Quando vale segunda opinião">
        <p>
          Direito do paciente, sempre disponível. Vale especialmente quando:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Diagnóstico grave (oncológico, neurológico) — segunda leitura
            de imagem é prática comum
          </li>
          <li>
            Conduta proposta é cirúrgica e há alternativas conservadoras
          </li>
          <li>
            Tratamento longo, caro ou com efeitos colaterais relevantes
          </li>
          <li>
            Você sente que não foi ouvido(a) ou as perguntas ficaram sem
            resposta
          </li>
        </ul>
        <p>
          Plano de saúde geralmente cobre segunda opinião quando solicitada
          dentro do contexto clínico. SUS prevê o direito; a operacionalização
          varia por região.
        </p>
      </GuideSection>

      <GuideSection id="limites" title="6. Limites do que IA pode te dizer">
        <p>
          A IA te ajuda a entender o que está escrito — traduzir, organizar,
          preparar perguntas. Ela <strong>não</strong>:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Dá diagnóstico</li>
          <li>Recomenda tratamento</li>
          <li>Substitui exame físico ou anamnese</li>
          <li>
            Considera seu histórico completo (a menos que você forneça)
          </li>
          <li>Tem responsabilidade clínica</li>
        </ul>
        <p>
          Use como ferramenta de leitura — como um(a) tradutor(a) que está
          ali pra ajudar você a participar melhor da própria consulta. A
          decisão clínica continua sendo entre você e o(a) profissional de
          saúde.
        </p>
        <GuideCallout tone="warn" title="Em emergência, procure atendimento">
          Sintomas de urgência (dor torácica intensa, dificuldade
          respiratória súbita, sinais de AVC) exigem atendimento presencial
          imediato. Nem laudo, nem IA, nem busca substituem pronto-socorro.
        </GuideCallout>
      </GuideSection>
    </GuideLayout>
  );
}
