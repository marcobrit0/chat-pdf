import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { howToSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como conferir um boleto antes de pagar — checklist anti-fraude",
  description:
    "Boleto chegou no e-mail e você desconfia? Este guia em PT-BR mostra como conferir beneficiário, valor, código de barras e linha digitável antes de pagar.",
  path: "/guias/como-conferir-boleto-antes-de-pagar",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "Como conferir um boleto", path: "/guias/como-conferir-boleto-antes-de-pagar" },
];

const toc = [
  { id: "alerta", label: "1. Sinais de alerta antes de qualquer coisa" },
  { id: "beneficiario", label: "2. Confira o beneficiário" },
  { id: "linha", label: "3. Linha digitável vs código de barras" },
  { id: "valor", label: "4. Valor, juros e multa" },
  { id: "vencimento", label: "5. Vencimento e instruções" },
  { id: "duvida", label: "6. Em caso de dúvida — não pague" },
];

const howTo = howToSchema({
  name: "Como conferir um boleto antes de pagar",
  description:
    "Checklist de 6 passos pra confirmar que um boleto é legítimo antes de efetuar o pagamento.",
  steps: [
    { name: "Verifique sinais de alerta", text: "Boleto inesperado, valor diferente do contratado, link fora do canal oficial — desconfie." },
    { name: "Confirme o beneficiário", text: "Nome e CNPJ do beneficiário devem bater com o fornecedor que você espera." },
    { name: "Cruze linha digitável e código de barras", text: "Os dois precisam representar a mesma informação. Divergência = boleto adulterado." },
    { name: "Confira valor, juros e multa", text: "Valor principal bate com o esperado? Multa proporcional? Em CDC, teto é 2%." },
    { name: "Verifique vencimento e instruções", text: "Data de vencimento, instruções de não-recebimento após X dias, eventual desconto à vista." },
    { name: "Em dúvida, não pague", text: "Confirme com o beneficiário pelo canal oficial (telefone do site, não o do boleto)." },
  ],
});

export default function GuiaComoConferirBoletoPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia · ~8 min de leitura"
      title="Como conferir um boleto antes de pagar"
      intro="Fraude com boleto é uma das mais comuns no Brasil — e a vítima é frequentemente quem confia demais no PDF que chegou no e-mail. Este guia é o checklist que evita o prejuízo: 6 conferências antes de digitar a linha digitável."
      tldrTitle="Confirme o beneficiário antes do valor"
      tldrBody="A fraude clássica troca o beneficiário e mantém a aparência. Antes de pagar, cheque CNPJ do beneficiário no boleto e compare com o cadastro do fornecedor que você espera. Valor diferente é mais óbvio; beneficiário diferente engana mais."
      toc={toc}
      primaryCta={{ href: "/resumir-boleto-ou-fatura", label: "Conferir um boleto agora" }}
      secondaryCta={{ href: "/precos", label: "Ver planos Premium" }}
      related={[
        { href: "/resumir-boleto-ou-fatura", label: "Resumir boleto ou fatura" },
        { href: "/boleto-para-pessoa-fisica", label: "Boleto — pessoa física" },
        { href: "/boleto-para-empresa", label: "Boleto — empresa" },
      ]}
      extraSchema={howTo}
    >
      <GuideSection id="alerta" title="1. Sinais de alerta antes de qualquer coisa">
        <p>
          Antes de abrir o boleto, vale checar o contexto:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Boleto chegou inesperadamente — você não contratou nada com esse
            fornecedor
          </li>
          <li>
            Valor é maior ou menor do que o contratado, sem explicação
          </li>
          <li>
            E-mail do remetente está em domínio estranho (joaosilva@gmail.com
            no lugar de fornecedor@empresa.com.br)
          </li>
          <li>
            Link de download fora do portal oficial do fornecedor
          </li>
          <li>
            Solicitação de urgência (&quot;pagar até hoje senão sua linha
            será cortada&quot;)
          </li>
        </ul>
        <p>
          Qualquer um desses sinais não confirma fraude — mas exige
          conferência mais cuidadosa antes de pagar.
        </p>
      </GuideSection>

      <GuideSection id="beneficiario" title="2. Confira o beneficiário">
        <p>
          O beneficiário é quem vai receber o dinheiro. No boleto, vem como
          <strong> nome + CNPJ</strong>. Pegue o CNPJ e compare com:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>O cadastro do fornecedor no seu sistema, se for empresa</li>
          <li>O CNPJ no site oficial do fornecedor (rodapé, &quot;quem somos&quot;)</li>
          <li>Boletos anteriores do mesmo fornecedor</li>
        </ul>
        <p>
          Se o beneficiário for diferente do esperado, pare. Mesmo se o nome
          parecer parecido (variação de razão social, &quot;LTDA&quot; vs
          &quot;ME&quot;) — diferença de CNPJ é sinal grave.
        </p>
        <GuideCallout tone="info" title="Cessão de crédito é caso à parte">
          Em alguns casos legítimos (cessão de crédito, factoring), o
          beneficiário muda — uma empresa cobra em nome de outra. Quando isso
          acontece, há aviso prévio do fornecedor original. Cessão sem aviso
          é suspeita.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="linha" title="3. Linha digitável vs código de barras">
        <p>
          O boleto traz duas representações da mesma informação: o{" "}
          <strong>código de barras</strong> (gráfico) e a <strong>linha
          digitável</strong> (números no topo). Os dois precisam representar
          os mesmos dados — divergência indica adulteração.
        </p>
        <p>
          Conferência manual é difícil (a estrutura tem dígitos verificadores
          internos). Forma prática:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Use o app do banco — ao escanear o código de barras, ele
            apresenta beneficiário + valor + vencimento extraídos
          </li>
          <li>
            Se você digitar a linha e o app trouxer beneficiário/valor
            diferentes da face do boleto, o boleto foi adulterado
          </li>
          <li>
            DDA (Débito Direto Autorizado) ajuda — boleto cadastrado pelo
            fornecedor real chega no banco com dados oficiais
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="valor" title="4. Valor, juros e multa">
        <p>
          Valor principal do boleto é o que está combinado. Valor com juros e
          multa aparece quando você paga após o vencimento — em geral o
          banco calcula automaticamente. Em relação de consumo (CDC), o teto
          de multa por atraso é 2% do valor da prestação. Em outros tipos
          (cobrança trabalhista, locação), o teto pode variar.
        </p>
        <p>
          Boleto que vem com juros e multa antes do vencimento original é
          suspeito — não há motivo pra cobrar acréscimos antes do prazo.
          Confira o vencimento na própria face do boleto.
        </p>
      </GuideSection>

      <GuideSection id="vencimento" title="5. Vencimento e instruções">
        <p>
          Vencimento real é o que vale — não &quot;data limite pra evitar
          juros&quot; em letras pequenas. Verifique também as instruções
          (campo na face do boleto): &quot;não receber após Y dias&quot;{" "}
          significa que depois desse prazo o boleto fica inválido e você
          precisa de um novo.
        </p>
        <p>
          Eventual desconto por antecipação aparece em &quot;instruções&quot;
          ou em campo próprio. Vale confirmar a data limite — desconto
          informado verbalmente que não consta do boleto não vai ser aplicado
          automaticamente.
        </p>
      </GuideSection>

      <GuideSection id="duvida" title="6. Em caso de dúvida — não pague">
        <p>
          Regra de ouro: se algo está estranho, não pague antes de confirmar.
          E confirme pelo canal oficial — telefone que está no site do
          fornecedor, não o que está no e-mail ou no próprio boleto. Fraude
          competente clona o canal de contato também.
        </p>
        <p>
          Bancos têm centrais antifraude que podem reverter pagamento em casos
          específicos (especialmente PIX), mas a janela é curta (horas, não
          dias). Quanto mais cedo você acionar, maior a chance de
          recuperação.
        </p>
        <GuideCallout tone="warn" title="Já pagou e desconfia agora?">
          Acione o banco imediatamente — central de fraudes funciona 24/7.
          Reúna documentação (boleto, e-mail recebido, comprovante de
          pagamento) e registre boletim de ocorrência. Para PIX, há mecanismo
          de devolução com janela curta (até 80 dias em alguns casos, mas
          quanto mais cedo, melhor).
        </GuideCallout>
      </GuideSection>
    </GuideLayout>
  );
}
