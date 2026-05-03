import {
  GuideCallout,
  GuideLayout,
  GuideSection,
} from "@/components/marketing/GuideLayout";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDF protegido por senha — como abrir, processar e quando não dá",
  description:
    "Guia em PT-BR sobre PDF com senha: tipos de proteção, como remover quando você é o dono, o que ferramentas de IA conseguem ler, e o limite ético/legal.",
  path: "/guias/pdf-protegido-por-senha",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "Guias", path: "/guias" },
  { label: "PDF protegido por senha", path: "/guias/pdf-protegido-por-senha" },
];

const toc = [
  { id: "tipos", label: "1. Dois tipos de proteção" },
  { id: "abrir", label: "2. Como abrir um PDF que você tem direito" },
  { id: "remover", label: "3. Como remover a proteção (do seu próprio PDF)" },
  { id: "ia", label: "4. PDF com senha em ferramentas de IA" },
  { id: "limites", label: "5. O que NÃO dá pra fazer (e nem deve tentar)" },
  { id: "alternativas", label: "6. Alternativas quando não tem a senha" },
];

export default function GuiaPdfProtegidoPage() {
  return (
    <GuideLayout
      breadcrumbs={breadcrumbs}
      eyebrow="Guia técnico · ~8 min de leitura"
      title="PDF protegido por senha — o que dá pra fazer"
      intro="PDF com senha é situação comum: extrato bancário, boleto, contrato enviado pelo RH. Este guia explica os tipos de proteção, como abrir o que é seu, e por que ferramentas de IA não conseguem processar PDF com senha sem você passar a senha."
      tldrTitle="Senha é proteção, não paranoia"
      tldrBody="PDF com senha existe pra impedir leitura sem autorização — inclusive por ferramentas. Antes de processar, você precisa abrir o PDF com a senha e (em geral) salvá-lo sem senha pra que a ferramenta consiga ler. Não há atalho legítimo."
      toc={toc}
      primaryCta={{ href: "/resumir-pdf", label: "Resumir PDF agora" }}
      secondaryCta={{ href: "/guias/ocr-para-pdf", label: "Guia: OCR para PDF" }}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/guias/ocr-para-pdf", label: "OCR para PDF" },
        { href: "/guias/como-resumir-pdf-com-ia", label: "Como resumir PDF com IA" },
      ]}
    >
      <GuideSection id="tipos" title="1. Dois tipos de proteção">
        <p>
          A especificação PDF prevê duas proteções diferentes, frequentemente
          confundidas:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Senha de abertura</strong> (user password): você não
            consegue abrir o PDF sem digitar a senha. O conteúdo está
            criptografado.
          </li>
          <li>
            <strong>Senha de permissões</strong> (owner password): o PDF
            abre normalmente, mas certas ações (imprimir, copiar texto,
            editar) ficam bloqueadas até que a senha de owner seja
            fornecida.
          </li>
        </ul>
        <p>
          A primeira é proteção forte (criptografia AES). A segunda é
          basicamente um pedido — visualizadores honram, mas tecnicamente
          é fácil de remover. Importante: remover a segunda em documento
          que não é seu pode violar contrato ou política do emissor.
        </p>
      </GuideSection>

      <GuideSection id="abrir" title="2. Como abrir um PDF que você tem direito">
        <p>
          Casos comuns onde você tem a senha legítimamente:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Extrato bancário — senha é normalmente CPF, data de nascimento,
            ou senha definida no banco
          </li>
          <li>
            Boleto enviado pelo banco emissor — senha pode ser últimos
            dígitos do CNPJ ou data
          </li>
          <li>
            Contracheque — senha definida pela empresa, normalmente CPF
          </li>
          <li>
            Documento corporativo enviado a você — senha compartilhada por
            canal separado (e-mail diferente, mensageiro)
          </li>
        </ul>
        <p>
          Em todos os casos, você abre o PDF no visualizador (Adobe Acrobat
          Reader, Preview, Foxit), digita a senha e o documento abre
          normalmente. Daí, a maior parte dos visualizadores permite
          &quot;salvar como&quot; um novo PDF — geralmente sem a senha.
        </p>
      </GuideSection>

      <GuideSection id="remover" title="3. Como remover a proteção (do seu próprio PDF)">
        <p>
          Forma mais simples, sem ferramenta extra: abra com a senha,
          imprima como PDF (impressora virtual). O resultado é um novo PDF
          sem proteção. Funciona em qualquer sistema operacional moderno e
          em qualquer visualizador que aceita imprimir.
        </p>
        <p>
          Outras opções:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Adobe Acrobat Pro: Tools → Protect → Remove Security
          </li>
          <li>
            Preview (macOS): abrir com senha → File → Export as PDF (sem
            senha)
          </li>
          <li>
            Linha de comando (qpdf, pdftk): qpdf
            --decrypt --password=SUA-SENHA in.pdf out.pdf
          </li>
          <li>
            Serviços online: convenientes, mas atenção à privacidade —
            você está enviando o PDF pra terceiros
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="ia" title="4. PDF com senha em ferramentas de IA">
        <p>
          Quase nenhuma ferramenta de IA aceita PDF com senha de abertura
          diretamente — porque ela mesma não consegue abrir. O fluxo é:
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Você abre o PDF com a senha no seu visualizador</li>
          <li>Salva uma cópia sem senha (imprimir como PDF, ou exportar)</li>
          <li>Sobe a cópia sem senha pra ferramenta de IA</li>
        </ol>
        <p>
          Isso preserva sua privacidade: você decide o que sai do seu
          dispositivo. A alternativa de &quot;subir o PDF e a senha&quot;
          existe em algumas ferramentas, mas implica enviar a senha pra
          terceiro — geralmente não vale o atalho.
        </p>
        <GuideCallout tone="warn" title="Privacidade em documentos sensíveis">
          Se o PDF protegido contém dados sensíveis (financeiros, de saúde,
          contratuais), considere se vale processar em ferramenta cloud.
          Política de privacidade da ferramenta + sensibilidade do
          documento determinam a decisão. Para documentos altamente
          sensíveis, pode ser mais prudente ler manualmente.
        </GuideCallout>
      </GuideSection>

      <GuideSection id="limites" title="5. O que NÃO dá pra fazer (e nem deve tentar)">
        <p>
          Dois limites importantes:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Quebrar senha de abertura</strong> de PDF que não é seu:
            criptografia AES moderna não quebra com força bruta em tempo
            razoável. Ferramentas que prometem isso são fraude ou exigem
            recursos absurdos. Mais importante: pode ser ilegal a depender
            do contexto.
          </li>
          <li>
            <strong>Remover senha de permissões</strong> em documento de
            terceiros: tecnicamente fácil, mas pode violar termos de uso,
            contrato confidencial, ou direitos autorais. Se o emissor
            bloqueou cópia, há um motivo.
          </li>
        </ul>
        <p>
          Em ambiente corporativo, política da empresa costuma proibir
          explicitamente. Em consumo pessoal, vale o bom senso: você pediu
          a senha ao emissor? Sim → você tem direito. Não → procure outro
          caminho.
        </p>
      </GuideSection>

      <GuideSection id="alternativas" title="6. Alternativas quando não tem a senha">
        <p>
          Cenários comuns e o que fazer:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Esqueci a senha do meu próprio PDF</strong>: tente
            recuperá-la no emissor (banco, RH). PDFs antigos cuja senha foi
            perdida frequentemente não podem ser recuperados.
          </li>
          <li>
            <strong>Recebi PDF protegido sem senha junto</strong>: peça ao
            remetente. Senha enviada no mesmo e-mail, em texto claro, é
            prática insegura mas comum — peça por canal separado se for
            sensível.
          </li>
          <li>
            <strong>PDF de terceiros que preciso processar</strong>: peça a
            cópia desbloqueada ao emissor. Em ambiente jurídico, pedir a
            versão sem proteção é prática regular.
          </li>
        </ul>
        <p>
          Não há atalho legítimo pra contornar — a proteção existe pra
          proteger informação. O caminho correto é sempre voltar à fonte e
          obter acesso autorizado.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
