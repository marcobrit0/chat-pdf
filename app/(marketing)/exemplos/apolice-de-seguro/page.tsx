import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Exemplo de apólice de seguro resumida com o PDFIA — passo a passo | PDFIA",
  description:
    "Exemplo fictício de apólice de seguro auto resumida com o PDFIA: coberturas, exclusões, franquia, carência e aviso de sinistro. Grátis até 10 páginas, sem cadastro.",
  path: "/exemplos/apolice-de-seguro",
});

const faqs = [
  {
    q: "O PDFIA resume apólice de seguro?",
    a: "Sim. O modo apólice é um dos modos prontos do PDFIA, ao lado de contrato CLT, edital e laudo. Ele organiza o resumo por coberturas, exclusões, franquia, carência, vigência, prêmio e aviso de sinistro, com datas, valores e nomes em destaque. Vale para seguro auto, residencial, vida, viagem, saúde e empresarial, desde que o PDF tenha texto selecionável.",
  },
  {
    q: "Preciso pagar para resumir uma apólice?",
    a: "Não, para começar. O plano grátis custa R$0, não pede cadastro e resume 1 PDF por dia de até 10 páginas — o exemplo desta página tem 8 páginas, então caberia no grátis. Para PDFs de até 100 páginas, com chat com citação de página, biblioteca salva e exportação, o Premium custa R$29/mês ou R$290/ano.",
  },
  {
    q: "Como confiro se o resumo está certo?",
    a: "No Premium, o chat cita a página exata de cada resposta, para você abrir a apólice no ponto certo e conferir. No plano grátis não há chat, então confira os trechos principais diretamente no PDF original. A IA pode errar em valores, vigência ou condições especiais — confira sempre a apólice original e consulte seu corretor ou seguradora.",
  },
  {
    q: "Funciona com apólice escaneada?",
    a: "Não, ainda não. Hoje o PDFIA só funciona com PDF com texto selecionável. Se o PDF é uma foto ou imagem escaneada, ele precisa passar por OCR antes. O OCR automático no Premium está previsto, mas ainda não está disponível.",
  },
  {
    q: "O resumo do PDFIA substitui a leitura da apólice?",
    a: "Não. O documento original é o que vale — use o resumo para entender e localizar informações, e baseie qualquer decisão no texto da apólice. O PDFIA resume e localiza informações; ele não diz se um caso está coberto nem dá conselho sobre contratar, renovar ou acionar o seguro. A decisão final sobre cobertura é da seguradora.",
  },
  {
    q: "Minha apólice fica salva?",
    a: "No plano grátis, não — o arquivo não fica guardado depois do resumo. No Premium, o documento fica na biblioteca salva, e você pode voltar a ele depois. Se cancelar o Premium, os arquivos ficam arquivados por 30 dias para baixar antes da exclusão definitiva.",
  },
];

export default function ExemploApoliceDeSeguroPage() {
  return (
    <SeoPageTemplate
      title="Apólice de seguro: exemplo de resumo com o PDFIA"
      intro="Uma apólice de seguro parece simples até você precisar achar uma cláusula no meio dela: o que está coberto, o que está excluído, qual é a franquia, quanto tempo dura a carência, qual o prazo para avisar um sinistro. É para isso que serve o modo apólice do PDFIA: ele lê o PDF e devolve um resumo organizado por esses pontos, em português, sem você precisar caçar cada informação página por página."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Exemplo: apólice de seguro", path: "/exemplos/apolice-de-seguro" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-apolice-de-seguro", label: "Analisar apólice com IA" },
        { href: "/guias/como-entender-apolice-de-seguro", label: "Como entender uma apólice de seguro" },
        { href: "/precos", label: "Preços do PDFIA" },
      ]}
    >
      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que é uma apólice de seguro
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          A apólice é o contrato entre o segurado e a seguradora: ela registra
          o que está coberto, o que está excluído, a franquia, a carência, a
          vigência, o prêmio e o prazo para avisar um sinistro. É o documento
          que vale — qualquer resumo é um atalho para entender a apólice, não
          um substituto dela.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O PDFIA analisa o texto da apólice: ele resume e localiza
          informações, mas não aconselha se você deve contratar, renovar ou
          acionar o seguro. Para dúvidas sobre cobertura, sinistro ou
          renovação, consulte seu corretor ou a seguradora — a decisão final
          sobre cobertura é da seguradora.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          O que o PDFIA faz com uma apólice de seguro
        </h2>
        <p className="mt-4 text-body text-charcoal-text">
          Você envia o PDF da apólice e o PDFIA devolve um resumo com
          tópicos, datas, valores e nomes em destaque, além de perguntas
          sugeridas para aprofundar nos pontos que importam para você. No
          plano Premium, você ainda pode conversar com o documento: cada
          resposta do chat cita a página exata de onde a informação saiu,
          para você conferir no original antes de tomar qualquer decisão.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          O que o resumo costuma destacar em uma apólice de seguro:
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Coberturas:</strong> o que o seguro cobre, como colisão,
            roubo e furto, danos a terceiros e assistência 24 horas, quando
            contratadas.
          </li>
          <li>
            <strong>Exclusões:</strong> o que o seguro não cobre, com as
            condições em que a cobertura não vale.
          </li>
          <li>
            <strong>Franquia:</strong> o valor que o segurado paga em caso
            de sinistro, e em quais sinistros ela vale.
          </li>
          <li>
            <strong>Carência:</strong> o prazo que precisa passar antes de
            certas coberturas valerem, quando a apólice prevê carência.
          </li>
          <li>
            <strong>Vigência:</strong> o período em que a apólice vale, com
            as datas de início e fim.
          </li>
          <li>
            <strong>Prêmio:</strong> o valor do seguro e como ele é pago.
          </li>
          <li>
            <strong>Aviso de sinistro:</strong> o prazo e o procedimento
            para comunicar um sinistro à seguradora.
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
            Não corresponde a nenhuma apólice real, seguradora real ou pessoa
            real. Os valores, datas e nomes foram inventados apenas para
            mostrar o formato do resumo. O resumo real da sua apólice vai
            depender do conteúdo do PDF que você enviar.
          </p>
        </div>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Documento do exemplo (fictício):</strong> apólice de seguro
          auto de 8 páginas entre a seguradora fictícia “Seguradora Exemplo
          S.A.” e o segurado fictício “João da Silva (nome fictício)”, para um
          automóvel fictício. Chamamos aqui de “Apólice Exemplo nº 000/2026”
          apenas para identificar o exemplo.
        </p>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Resumo que o PDFIA devolveria para essa apólice fictícia:</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Coberturas (exemplo):</strong> colisão, roubo e furto,
            danos a terceiros e assistência 24 horas.
          </li>
          <li>
            <strong>Exclusões (exemplo):</strong> uso do veículo em
            competições, desgaste natural e danos já existentes antes da
            contratação.
          </li>
          <li>
            <strong>Franquia (exemplo):</strong> R$ 1.800,00 em caso de
            sinistro de colisão.
          </li>
          <li>
            <strong>Carência (exemplo):</strong> 30 dias para as coberturas
            adicionais contratadas; sem carência para colisão e roubo.
          </li>
          <li>
            <strong>Vigência (exemplo):</strong> 12 meses, de 1º de janeiro a
            31 de dezembro de 2026.
          </li>
          <li>
            <strong>Prêmio (exemplo):</strong> R$ 2.400,00 por ano, em 12
            parcelas de R$ 200,00.
          </li>
          <li>
            <strong>Aviso de sinistro (exemplo):</strong> comunicar à
            seguradora em até 30 dias após o sinistro.
          </li>
          <li>
            <strong>Ponto de atenção (exemplo):</strong> a apólice fictícia
            exige boletim de ocorrência em caso de roubo ou furto.
          </li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          <strong>Perguntas sugeridas depois do resumo (exemplo):</strong>
        </p>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>Qual é a franquia e quando ela vale? (página 3)</li>
          <li>O que está excluído da cobertura? (página 4)</li>
          <li>Qual é o prazo para avisar um sinistro? (página 5)</li>
        </ul>
        <p className="mt-4 text-body text-charcoal-text">
          No Premium, cada uma dessas respostas viria com a página exata da
          apólice citada, para você abrir o PDF no ponto certo e conferir.
          No plano grátis, não há chat com o documento: você recebe o
          resumo, e o arquivo não fica salvo depois.
        </p>
      </section>

      <section>
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Quanto custa usar o PDFIA para uma apólice de seguro
        </h2>
        <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
          <li>
            <strong>Grátis:</strong> R$0, sem cadastro. Resume 1 PDF por dia, de
            até 10 páginas. Uma apólice curta como a do exemplo (8 páginas)
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
            <strong>Só funciona com PDF com texto selecionável.</strong> Se a
            apólice for um PDF escaneado (foto/imagem das páginas), o PDFIA não
            o lê hoje. O PDF precisa passar por OCR antes, e o OCR automático
            no Premium ainda não está disponível.
          </li>
          <li>
            <strong>O resumo não substitui a leitura da apólice.</strong> Antes
            de contratar, renovar ou acionar o seguro, confira coberturas,
            exclusões, franquia, carência e vigência no documento original. O
            resumo pode ajudar a encontrar a informação, mas a decisão deve se
            basear no texto original.
          </li>
          <li>
            <strong>A IA pode errar em valores, vigência ou condições especiais.</strong>{" "}
            Confira sempre a apólice original e consulte seu corretor ou
            seguradora para dúvidas sobre cobertura, sinistro ou renovação.
          </li>
          <li>
            <strong>O PDFIA não dá conselho sobre seguro nem garante cobertura.</strong>{" "}
            Ele resume e localiza informações do documento; não diz se um caso
            está coberto, nem se você deve contratar, renovar ou acionar o
            seguro. A decisão final sobre cobertura é da seguradora.
          </li>
          <li>
            <strong>Se a informação não estiver no PDF, o PDFIA avisa em vez
            de inventar.</strong>{" "}
            Se um dado não aparecer no resumo, verifique se ele realmente consta
            na apólice enviada.
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
