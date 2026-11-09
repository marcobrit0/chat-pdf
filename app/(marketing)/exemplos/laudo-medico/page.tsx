import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Exemplo de laudo médico com IA: resumo e perguntas | PDFIA",
  description:
    "Exemplo fictício de laudo médico explicado com o PDFIA: resumo, termos técnicos em linguagem simples e perguntas pra consulta. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/laudo-medico",
});

const faqs = [
  {
    q: "O resumo substitui a conversa com meu médico?",
    a: "Não. O resumo ajuda você a entender o que está escrito no laudo e a chegar na consulta com perguntas certas, mas não substitui o médico, nunca. Decisões de tratamento são do profissional de saúde.",
  },
  {
    q: "A IA dá diagnóstico ou recomenda tratamento?",
    a: "Não. A ferramenta traduz termos médicos para linguagem acessível e ajuda a preparar perguntas para o seu médico. Diagnóstico e conduta clínica são exclusivos do profissional de saúde.",
  },
  {
    q: "Funciona com laudo de exame de imagem?",
    a: "Sim, desde que o laudo esteja em PDF com texto selecionável (não a imagem do exame em si). Para PDFs digitalizados, é preciso OCR primeiro.",
  },
  {
    q: "E se o laudo for escaneado ou uma foto?",
    a: "Ele precisa passar por OCR antes — o PDFIA não faz OCR. Hoje o PDFIA só lê PDF com texto selecionável, seja laudo de imagem ou de laboratório.",
  },
  {
    q: "O exemplo desta página cabe no plano grátis?",
    a: "Sim. O exemplo tem 6 páginas e o plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas. O chat com citação de página é Premium e custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Meu laudo fica salvo?",
    a: "No plano gratuito o arquivo é processado e descartado. No Premium fica salvo na sua conta, criptografado em repouso. Não vendemos seus dados pessoais.",
  },
];

export default function ExemploLaudoMedicoPage() {
  return (
    <SeoPageTemplate
      title="Exemplo de laudo médico explicado com IA"
      intro="Um laudo médico registra o que um exame encontrou — mas vem cheio de termo técnico que pouca gente entende na primeira leitura. O modo laudo do PDFIA traduz esses termos pra linguagem simples, organiza o resumo por tópicos e ajuda você a montar perguntas pra consulta. É apoio pra entender o papel — não substitui médico, nunca."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: laudo médico", path: "/exemplos/laudo-medico" },
      ]}
      faqs={faqs}
      related={[
        { href: "/entender-laudo-medico", label: "Entender laudo médico com IA" },
        { href: "/guias/como-entender-laudo-medico", label: "Como entender um laudo médico" },
        { href: "/laudo-medico-para-paciente", label: "Laudo médico para paciente" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é um laudo médico
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          O laudo é o documento que registra o que um exame encontrou. Ele
          costuma trazer identificação, motivo do exame, técnica usada,
          achados, impressão diagnóstica e recomendações. Em exame de imagem,
          como a ultrassonografia, os achados descrevem o que foi visto nas
          imagens; em exame laboratorial, o laudo traz uma tabela de
          resultados com valores de referência.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O PDFIA analisa o texto do laudo: ele resume e traduz os termos,
          mas não dá diagnóstico, não recomenda tratamento e não substitui o
          médico. Para dúvidas sobre o que o laudo significa para você,
          leve o documento original e as suas perguntas para o médico. Em
          emergência, procure atendimento presencial ou serviço de urgência.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com um laudo médico
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF do laudo e o PDFIA devolve um resumo com tópicos,
          datas, valores e nomes em destaque, com os termos técnicos
          traduzidos pra linguagem simples e perguntas sugeridas para levar
          à consulta. No plano Premium, você ainda pode conversar com o
          documento: cada resposta do chat cita a página exata de onde a
          informação saiu, para você conferir no original antes de falar com
          o médico.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em um laudo médico:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Identificação:</strong> quem fez o exame, onde e quando,
            e qual exame foi realizado.
          </li>
          <li>
            <strong>Técnica:</strong> como o exame foi feito e o que foi
            avaliado.
          </li>
          <li>
            <strong>Achados:</strong> o que o exame encontrou, órgão por
            órgão, com os termos traduzidos.
          </li>
          <li>
            <strong>Impressão diagnóstica:</strong> a conclusão do
            profissional que assinou o laudo, nas palavras dele.
          </li>
          <li>
            <strong>Recomendações:</strong> o que o próprio laudo sugere
            como próximo passo, quando sugere.
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
            Não corresponde a nenhum laudo real, clínica real ou pessoa real.
            Os achados, datas e nomes foram inventados apenas para mostrar o
            formato do resumo. Este exemplo é inventado; nada aqui descreve
            uma pessoa real nem se aplica ao seu caso. O resumo real do seu
            laudo vai depender do conteúdo do PDF que você enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> laudo de
          ultrassonografia abdominal total de 6 páginas da clínica fictícia
          “Clínica Exemplo S.A.”, para o paciente fictício “Paciente Exemplo
          (nome fictício)”, com data fictícia de 10/10/2026. Chamamos aqui de
          “Laudo Exemplo nº 000/2026” apenas para identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para esse laudo fictício:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Identificação (exemplo):</strong> ultrassonografia
            abdominal total, realizada em 10/10/2026 na Clínica Exemplo
            S.A., para o Paciente Exemplo.
          </li>
          <li>
            <strong>Técnica (exemplo):</strong> exame realizado com
            transdutor convexo, avaliando fígado, vesícula biliar, pâncreas,
            baço e rins.
          </li>
          <li>
            <strong>Achados (exemplo):</strong> fígado com esteatose
            hepática leve; vesícula biliar sem cálculos; rins de dimensões
            normais, sem dilatação descrita.
          </li>
          <li>
            <strong>Impressão diagnóstica (exemplo):</strong> esteatose
            hepática leve, sem outros achados relevantes descritos no laudo
            fictício.
          </li>
          <li>
            <strong>Recomendações (exemplo):</strong> o laudo fictício sugere
            acompanhamento com o médico assistente — a decisão sobre o que
            fazer a partir do laudo é do médico, não do resumo.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>O que significa “esteatose hepática leve” neste laudo? (página 3)</li>
          <li>O que o laudo diz sobre a vesícula? (página 4)</li>
          <li>Qual foi a impressão diagnóstica do radiologista? (página 5)</li>
          <li>O laudo pede algum exame complementar ou retorno? (páginas 5–6)</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata do
          laudo citada, para você abrir o PDF no ponto certo e conferir. No
          plano grátis, não há chat com o documento: você recebe o resumo, e
          o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para um laudo médico
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Um laudo curto como o do exemplo (6 páginas)
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
            laudo for um PDF escaneado (foto/imagem das páginas), o PDFIA não
            o lê hoje. O PDF precisa passar por OCR antes, e o PDFIA não faz
            OCR.
          </li>
          <li>
            <strong>O resumo não substitui a conversa com o médico.</strong>{" "}
            Antes de decidir qualquer coisa a partir do laudo, confira o
            documento original e leve suas dúvidas ao médico. O resumo pode
            ajudar a entender o texto, mas a decisão deve se basear no laudo
            original e na avaliação do profissional de saúde.
          </li>
          <li>
            <strong>A IA pode errar em termos, valores ou recomendações.</strong>{" "}
            Confira sempre o laudo original e pergunte ao seu médico sobre
            qualquer ponto que não tenha ficado claro.
          </li>
          <li>
            <strong>O PDFIA não dá diagnóstico nem recomenda tratamento.</strong>{" "}
            Ele resume e traduz o que está escrito no documento; não interpreta
            o seu caso, não diz o que você tem nem o que você deve fazer. Em
            emergência, procure atendimento presencial ou serviço de urgência.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            no laudo enviado.
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
