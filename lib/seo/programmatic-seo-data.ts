/**
 * Curated persona × document-type combinations for the dynamic
 * `app/(marketing)/[slug]/page.tsx` route.
 *
 * Each entry must carry persona-specific intro, extraction fields, and FAQ —
 * Google penalizes templated paraphrases. If you're tempted to copy/paste
 * between entries, write nothing instead.
 *
 * Adding a new entry:
 *   1) Push to `programmaticEntries` below
 *   2) Add the slug to `app/sitemap.ts`
 *   3) Add a sibling link from the canonical use-case page to the new slug
 */

export type ProgrammaticEntry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  docTypeLabel: string;
  personaLabel: string;
  contractIntent?: boolean;
  fields: Array<{ label: string; note: string }>;
  faqs: Array<{ q: string; a: string }>;
  canonicalUseCase: { href: string; label: string };
  siblings: Array<{ href: string; label: string }>;
};

const cltSiblings = [
  { href: "/contrato-clt-para-rh", label: "Para RH" },
  { href: "/contrato-clt-para-juridico", label: "Para jurídico" },
  { href: "/contrato-clt-para-empresa-pequena", label: "Para empresa pequena" },
  { href: "/contrato-clt-para-trabalhador", label: "Para o(a) trabalhador(a)" },
];

const servicosSiblings = [
  { href: "/contrato-de-prestacao-de-servicos-para-freelancer", label: "Para freelancer" },
  { href: "/contrato-de-prestacao-de-servicos-para-pj", label: "Para PJ" },
  { href: "/contrato-de-prestacao-de-servicos-para-empresa-pequena", label: "Para empresa pequena" },
  { href: "/contrato-de-prestacao-de-servicos-para-juridico", label: "Para jurídico" },
];

const editalSiblings = [
  { href: "/edital-para-empresa-pequena", label: "Para empresa pequena" },
  { href: "/edital-para-construtora", label: "Para construtora" },
  { href: "/edital-para-gestor-de-licitacao", label: "Para gestor de licitação" },
  { href: "/edital-para-fornecedor-publico", label: "Para fornecedor público" },
];

const apoliceSiblings = [
  { href: "/apolice-de-seguro-para-segurado", label: "Para o(a) segurado(a)" },
  { href: "/apolice-de-seguro-para-corretor", label: "Para corretor(a)" },
];

const laudoSiblings = [
  { href: "/laudo-medico-para-paciente", label: "Para paciente" },
  { href: "/laudo-medico-para-cuidador", label: "Para cuidador(a)" },
  { href: "/laudo-medico-para-medico", label: "Para médico(a)" },
];

const propostaSiblings = [
  { href: "/proposta-comercial-para-comprador", label: "Para comprador(a)" },
  { href: "/proposta-comercial-para-vendas", label: "Para vendas" },
];

const relatorioSiblings = [
  { href: "/relatorio-para-gestor", label: "Para gestor(a)" },
  { href: "/relatorio-para-investidor", label: "Para investidor(a)" },
];

const boletoSiblings = [
  { href: "/boleto-para-pessoa-fisica", label: "Para pessoa física" },
  { href: "/boleto-para-empresa", label: "Para empresa" },
];

export const programmaticEntries: ProgrammaticEntry[] = [
  /* —— CLT × persona —— */
  {
    slug: "contrato-clt-para-rh",
    docTypeLabel: "contrato CLT",
    personaLabel: "RH",
    title: "Analisar contrato CLT para RH",
    metaTitle: "Analisar contrato CLT para RH com IA",
    metaDescription:
      "RH revisando contratos CLT: extraia jornada, FGTS, benefícios, aviso prévio e cláusulas sensíveis em segundos antes de homologar a admissão.",
    intro:
      "Quem cuida de pessoas em tempo integral lê contratos CLT em volume — admissão, transferência, alteração contratual, desligamento. A IA aqui é triagem antes da homologação: pega jornada, salário, FGTS, benefícios e aviso prévio para você bater contra a folha e a política da casa antes de assinar.",
    contractIntent: true,
    fields: [
      { label: "Jornada e regime", note: "Carga horária semanal, escala, banco de horas, regime de horas extras" },
      { label: "Remuneração", note: "Salário base, adicionais, comissões, periodicidade de pagamento" },
      { label: "Benefícios listados", note: "VT, VR, plano de saúde, plano odontológico, seguro de vida" },
      { label: "FGTS e INSS", note: "Indicação de recolhimento e referências às alíquotas vigentes" },
      { label: "Aviso prévio e rescisão", note: "Prazo de aviso, multa rescisória, condições de desligamento" },
      { label: "Cláusulas sensíveis", note: "Não-concorrência, confidencialidade, exclusividade, cessão de direitos" },
    ],
    faqs: [
      {
        q: "A IA homologa o contrato CLT pra mim?",
        a: "Não. A IA lê e organiza o que está escrito — homologação cabe ao(à) profissional de RH e, em caso de dúvida, a um(a) advogado(a) trabalhista. O ganho é triar dezenas de contratos por dia sem perder o radar nas cláusulas que importam.",
      },
      {
        q: "Como verifico se o contrato é compatível com o sindicato?",
        a: "A IA não consulta convenções coletivas. Use a saída para identificar piso, benefícios e jornada e bate contra a CCT vigente no sindicato. Para empresas com muitas categorias, esse fluxo costuma cair de horas para minutos.",
      },
      {
        q: "Posso usar para revisar contratos que vou enviar pra equipe?",
        a: "Sim. Antes de mandar para o(a) candidato(a), suba o PDF, confira se as cláusulas estão completas e se nada foge da política. Funciona como um par de olhos extra antes da assinatura.",
      },
      {
        q: "E se o contrato vier digitalizado (escaneado)?",
        a: "PDFs digitalizados precisam de OCR para que a IA leia o texto. O Premium aplica OCR automaticamente. No fluxo gratuito, o contrato precisa ter texto selecionável.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-clt",
      label: "Visão geral: analisar contrato CLT",
    },
    siblings: cltSiblings.filter((s) => s.href !== "/contrato-clt-para-rh"),
  },
  {
    slug: "contrato-clt-para-juridico",
    docTypeLabel: "contrato CLT",
    personaLabel: "jurídico",
    title: "Analisar contrato CLT para o jurídico",
    metaTitle: "Analisar contrato CLT — apoio para o jurídico",
    metaDescription:
      "Triagem de contratos CLT para advogado(a) interno(a) ou externo(a): cláusulas atípicas, riscos trabalhistas e pontos de auditoria em segundos.",
    intro:
      "Para advogado(a) trabalhista — interno(a) ou consultor(a) — o gargalo é o tempo até identificar a cláusula que pode virar passivo. A IA aqui não emite parecer; ela triagem cláusulas atípicas (não-concorrência sem contrapartida, exclusividade ampla, foro fora da regra geral) e ordena o que vale revisar primeiro.",
    contractIntent: true,
    fields: [
      { label: "Cláusulas atípicas", note: "Não-concorrência, exclusividade, cessão de direitos autorais, foro" },
      { label: "Compatibilidade com a CLT", note: "Apontamento de pontos para auditoria — não substitui análise jurídica" },
      { label: "Multa rescisória e aviso", note: "Valor, base de cálculo, prazo e condições" },
      { label: "Riscos trabalhistas", note: "Pejotização indireta, jornada incompatível, sobreaviso disfarçado" },
      { label: "Vigência e prorrogação", note: "Prazo, renovação automática, condições de denúncia" },
      { label: "Confidencialidade e PI", note: "Escopo do dever de sigilo e regime de propriedade intelectual" },
    ],
    faqs: [
      {
        q: "A IA pode identificar nulidades?",
        a: "Não com a confiança que um parecer exige. A IA pode sinalizar cláusulas que costumam ser problemáticas (não-concorrência sem contrapartida, foro indevido), mas a decisão final cabe ao(à) advogado(a). Use como apoio à triagem.",
      },
      {
        q: "Funciona para revisar contratos em massa?",
        a: "No Premium, sim — você sobe vários e pergunta direto ao texto. Cada resposta cita a página de origem, o que facilita a auditoria posterior e a montagem de relatórios.",
      },
      {
        q: "Cobre contratos de experiência, intermitente e temporário?",
        a: "Sim. A ferramenta lê qualquer contrato CLT em PDF com texto selecionável. O modelo extrai os mesmos pontos (jornada, salário, vigência, rescisão) ajustando ao tipo do vínculo declarado no documento.",
      },
      {
        q: "Como a IA lida com cláusulas em letra miúda ou rodapés?",
        a: "Se está extraível como texto, a IA lê normalmente. PDFs digitalizados precisam de OCR (automático no Premium). Para cláusulas que dependem de tabelas anexas, confira se o anexo veio no mesmo arquivo.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-clt",
      label: "Visão geral: analisar contrato CLT",
    },
    siblings: cltSiblings.filter((s) => s.href !== "/contrato-clt-para-juridico"),
  },
  {
    slug: "contrato-clt-para-empresa-pequena",
    docTypeLabel: "contrato CLT",
    personaLabel: "empresa pequena",
    title: "Analisar contrato CLT para empresa pequena",
    metaTitle: "Analisar contrato CLT para empresa pequena",
    metaDescription:
      "Empresa pequena sem RH dedicado revisando contratos CLT: cheque jornada, FGTS, benefícios e aviso prévio antes de assinar — sem precisar contratar parecer pra cada admissão.",
    intro:
      "Empresa pequena raramente tem RH ou jurídico em tempo integral, mas precisa contratar dentro da CLT. Esta página foca no básico bem feito: o que costuma faltar em modelo de internet (período de experiência, aviso prévio escalonado, FGTS, benefícios), com FAQ pensado para quem decide a contratação direto.",
    contractIntent: true,
    fields: [
      { label: "Período de experiência", note: "Prazo (até 90 dias), prorrogação e condições de efetivação" },
      { label: "Jornada e horas extras", note: "Carga semanal, banco de horas, regime de compensação" },
      { label: "Remuneração e benefícios", note: "Salário, VT, VR, plano de saúde — só inclua o que efetivamente paga" },
      { label: "FGTS e INSS", note: "Confirmação de recolhimento e indicação no contrato" },
      { label: "Aviso prévio", note: "Prazo conforme tempo de casa (30 dias + 3 por ano até 90)" },
      { label: "Cláusula de sigilo", note: "Quando e como aplicá-la sem virar restrição genérica" },
    ],
    faqs: [
      {
        q: "Posso pegar um modelo de internet e adaptar?",
        a: "Pode, mas a maior parte dos passivos vem de cláusulas que ficaram da empresa original e não fazem sentido na sua. Use a IA pra cruzar o modelo com a sua realidade e identificar o que deveria sair (multa de R$X mil sem contrapartida, foro fora da sede, etc.).",
      },
      {
        q: "Preciso de advogado pra cada contratação?",
        a: "Para o primeiro modelo aprovado pela empresa, sim, vale o investimento. Para as contratações seguintes do mesmo modelo, a triagem por IA economiza horas. Quando o contrato fugir do padrão, volte ao(à) advogado(a).",
      },
      {
        q: "Qual a diferença entre experiência e contrato por prazo determinado?",
        a: "Experiência é até 90 dias com finalidade de avaliação; prazo determinado tem hipóteses específicas (obra, safra, atividade transitória). A IA aponta o tipo declarado no contrato — confira se bate com a realidade.",
      },
      {
        q: "Funciona pra contratos PJ disfarçados de CLT?",
        a: "A ferramenta lê o que está escrito. Se um contrato PJ contém indícios de CLT (jornada fixa, exclusividade, subordinação), a IA pode apontar — mas o enquadramento final é decisão jurídica, não automática.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-clt",
      label: "Visão geral: analisar contrato CLT",
    },
    siblings: cltSiblings.filter((s) => s.href !== "/contrato-clt-para-empresa-pequena"),
  },
  {
    slug: "contrato-clt-para-trabalhador",
    docTypeLabel: "contrato CLT",
    personaLabel: "trabalhador(a)",
    title: "Analisar contrato CLT antes de assinar",
    metaTitle: "Antes de assinar: analise seu contrato CLT com IA",
    metaDescription:
      "Recebeu o contrato CLT pra assinar? Em minutos, veja salário, jornada, benefícios, aviso prévio e cláusulas que costumam pegar o(a) trabalhador(a) de surpresa.",
    intro:
      "Antes de assinar uma CLT vale ler o contrato com cuidado — o RH explicou só o essencial e cláusulas como não-concorrência, exclusividade ou multa por desligamento podem aparecer no rodapé. Esta página foca no que o(a) trabalhador(a) precisa entender: salário, jornada, benefícios e o que muda se decidir sair antes do esperado.",
    contractIntent: true,
    fields: [
      { label: "Salário e adicionais", note: "Valor base, horas extras, periculosidade, insalubridade, comissões" },
      { label: "Jornada e folgas", note: "Carga semanal, escala, descanso, possibilidade de home office" },
      { label: "Benefícios", note: "VT, VR, plano de saúde, plano odontológico — confira se estão na proposta" },
      { label: "Aviso prévio", note: "Prazo de saída, dispensa do aviso, eventual desconto" },
      { label: "Restrições pós-contrato", note: "Não-concorrência, confidencialidade, multa por descumprimento" },
      { label: "Vínculo e regime", note: "CLT, experiência, prazo determinado — entenda o que assinou" },
    ],
    faqs: [
      {
        q: "Vale ler o contrato inteiro? É só um modelo padrão.",
        a: "Vale. Modelos &apos;padrão&apos; mudam de empresa pra empresa, e o que pega é justamente o parágrafo escondido. A IA destaca o que costuma surpreender (não-concorrência, multas, exclusividade) — leve em consideração antes de assinar.",
      },
      {
        q: "Posso negociar o que está escrito?",
        a: "Em CLT padrão, alguns pontos são da convenção coletiva e não dependem do RH (piso, benefícios mínimos). Outros são negociáveis (cláusula de exclusividade, banco de horas, home office). Use o resumo da IA pra identificar o que vale puxar.",
      },
      {
        q: "O contrato fala em &apos;cessão de direitos autorais&apos; — devo me preocupar?",
        a: "Em funções criativas (design, dev, conteúdo), sim. Vale checar se a cessão é só do que você produz para a empresa ou se inclui projetos pessoais. A IA aponta a cláusula; a interpretação fina vale conferir com um(a) advogado(a) ou pelo sindicato.",
      },
      {
        q: "E se a IA disser uma coisa diferente do que o RH explicou?",
        a: "A IA lê o que está escrito; o RH conta a leitura prática. Quando divergem, o que vale é o contrato assinado. Pergunte ao RH para alinhar o que vai ser realmente pago/cumprido — e exija que conste por escrito se for relevante.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-clt",
      label: "Visão geral: analisar contrato CLT",
    },
    siblings: cltSiblings.filter((s) => s.href !== "/contrato-clt-para-trabalhador"),
  },

  /* —— Prestação de serviços × persona —— */
  {
    slug: "contrato-de-prestacao-de-servicos-para-freelancer",
    docTypeLabel: "contrato de prestação de serviços",
    personaLabel: "freelancer",
    title: "Contrato de prestação de serviços para freelancer",
    metaTitle: "Contrato de prestação de serviços para freelancer",
    metaDescription:
      "Antes de aceitar o projeto, revise o contrato: escopo, prazo, valor, propriedade intelectual e cláusulas de cancelamento — em minutos, sem advogado pra cada job.",
    intro:
      "Freelancer recebe contrato &apos;padrão da empresa&apos; e tem pouco tempo pra ler antes de aceitar o projeto. As armadilhas costumam estar fora do quadrado: cessão total de direitos autorais (sem a possibilidade de usar no portfólio), cláusula de exclusividade ampla, multa desbalanceada, foro distante. Esta página foca no que importa pra você antes de assinar.",
    contractIntent: true,
    fields: [
      { label: "Escopo e entregas", note: "O que está incluído, número de revisões, formato de entrega" },
      { label: "Prazo e cronograma", note: "Datas, atrasos por dependência do cliente, multa por atraso" },
      { label: "Pagamento", note: "Valor, parcelas, prazo de pagamento, multa por atraso de pagamento" },
      { label: "Propriedade intelectual", note: "Cessão total ou licença de uso, direito de portfólio" },
      { label: "Confidencialidade", note: "Escopo, prazo, abrangência (uso interno, fornecedores, terceiros)" },
      { label: "Cancelamento", note: "Por quem, com qual aviso, com qual valor já pago" },
    ],
    faqs: [
      {
        q: "A cláusula de PI sempre cede tudo pro cliente?",
        a: "Em contratos &apos;padrão&apos;, normalmente sim. Mas é razoável negociar uma licença de uso pelo cliente + direito de portfólio para você. A IA aponta a cláusula; a negociação cabe a você.",
      },
      {
        q: "Devo aceitar o foro do contratante?",
        a: "Foro distante encarece muito o caso de cobrança. Vale tentar negociar pra um lugar neutro ou para sua cidade. A IA destaca o foro de eleição — fique atento(a) se for em outro estado.",
      },
      {
        q: "O que vale a pena exigir por escrito antes de começar?",
        a: "Escopo detalhado, número de revisões, prazo de pagamento. Tudo que está só &apos;combinado verbalmente&apos; some na hora do conflito. A IA identifica o que falta.",
      },
      {
        q: "Posso usar pra revisar contratos repetidos com o mesmo cliente?",
        a: "Pode. Compare o contrato novo com o anterior — se há diferenças (prazo de pagamento mudou, multa apareceu, escopo aumentou sem ajuste de valor), você vê em segundos.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-de-prestacao-de-servicos",
      label: "Visão geral: contrato de prestação de serviços",
    },
    siblings: servicosSiblings.filter(
      (s) => s.href !== "/contrato-de-prestacao-de-servicos-para-freelancer",
    ),
  },
  {
    slug: "contrato-de-prestacao-de-servicos-para-pj",
    docTypeLabel: "contrato de prestação de serviços",
    personaLabel: "PJ",
    title: "Contrato de prestação de serviços para PJ",
    metaTitle: "Contrato de prestação de serviços para PJ",
    metaDescription:
      "PJ recebendo contrato de cliente: revise escopo, exclusividade, jornada disfarçada e propriedade intelectual antes de assinar — proteja seu CNPJ.",
    intro:
      "Trabalhar como PJ exige cuidado com contratos que parecem CLT na prática. Cláusulas de exclusividade, jornada fixa, subordinação e multa por desligamento podem caracterizar pejotização — risco fiscal e trabalhista pra ambos os lados. Esta página foca em revisar o contrato antes de virar problema.",
    contractIntent: true,
    fields: [
      { label: "Indícios de pejotização", note: "Exclusividade, jornada fixa, subordinação, multa por desligamento" },
      { label: "Escopo e entrega", note: "Como está descrito o serviço — escopo aberto vs entregas fechadas" },
      { label: "Forma de pagamento", note: "Por entrega ou por hora — &apos;por hora&apos; com jornada fixa puxa pra CLT" },
      { label: "Propriedade intelectual", note: "Cessão de código/design e direito de uso pra portfólio" },
      { label: "Vigência e renovação", note: "Prazo, renovação automática, denúncia e multa" },
      { label: "Cláusula de não-concorrência", note: "Escopo, prazo, contrapartida financeira (sem contrapartida vira nulo)" },
    ],
    faqs: [
      {
        q: "Como sei se o contrato me coloca em risco de pejotização?",
        a: "Combinação de jornada fixa + exclusividade + subordinação + pagamento mensal &apos;igual a CLT&apos; é sinal forte. A IA aponta as cláusulas que costumam ser problemáticas; a análise final cabe a um(a) advogado(a) trabalhista.",
      },
      {
        q: "Vale aceitar exclusividade?",
        a: "Em PJ é raramente bom pra você. Sem contrapartida (multa proporcional ao bloqueio de mercado), vira restrição com pouco retorno. A IA destaca essa cláusula — vale negociar limite de escopo (só concorrentes diretos).",
      },
      {
        q: "Quem deve emitir nota fiscal — eu ou o cliente?",
        a: "Você emite — é da natureza da PJ. O contrato deve indicar prazo de pagamento, periodicidade e o que considerar &apos;dia útil&apos;. A IA verifica se isso está claro.",
      },
      {
        q: "Posso usar pra renovação anual?",
        a: "Sim. Compare a versão nova com a anterior; renovação automática às vezes vem com mudança silenciosa de cláusula (multa apareceu, escopo aumentou). A IA mostra o delta.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-de-prestacao-de-servicos",
      label: "Visão geral: contrato de prestação de serviços",
    },
    siblings: servicosSiblings.filter(
      (s) => s.href !== "/contrato-de-prestacao-de-servicos-para-pj",
    ),
  },
  {
    slug: "contrato-de-prestacao-de-servicos-para-empresa-pequena",
    docTypeLabel: "contrato de prestação de serviços",
    personaLabel: "empresa pequena",
    title: "Contrato de prestação de serviços para empresa pequena",
    metaTitle: "Contrato de prestação de serviços para empresa pequena",
    metaDescription:
      "Contratando fornecedor PJ ou agência? Revise escopo, prazo, propriedade intelectual e cláusulas de cancelamento antes de assinar — sem precisar de jurídico próprio.",
    intro:
      "Empresa pequena contratando fornecedor (agência, freela, prestador) precisa cobrir o básico bem feito: escopo aberto vira reclamação depois, prazo sem multa vira atraso impune, PI sem cessão vira disputa quando o site precisar ser refeito por outra agência. Esta página foca em fechar contratos enxutos e claros.",
    contractIntent: true,
    fields: [
      { label: "Escopo (com exemplos)", note: "Entregas listadas, número de revisões, definição do &apos;done&apos;" },
      { label: "Prazo e penalidade por atraso", note: "Datas-chave, multa proporcional, condições de prorrogação" },
      { label: "Propriedade intelectual", note: "Cessão à empresa contratante, direito de evolução, restrições" },
      { label: "Forma de pagamento", note: "Parcelas, condições, antecipação possível, multa por inadimplência" },
      { label: "Confidencialidade", note: "Quem tem acesso ao quê, prazo de sigilo após o fim do contrato" },
      { label: "Saída", note: "Como cancelar, com qual aviso, com qual reembolso/valor a faturar" },
    ],
    faqs: [
      {
        q: "Vale a pena ter um modelo único de contrato pra todos os fornecedores?",
        a: "Sim, com adaptações por categoria. Use a IA pra comparar contratos antigos com novos e identificar onde o modelo precisa evoluir (pagamento, multa, PI). Reduz tempo de fechamento na próxima contratação.",
      },
      {
        q: "Posso pular cláusula de PI quando o serviço é &apos;invisível&apos; (assessoria, consultoria)?",
        a: "Mesmo em consultoria há entregas (relatórios, apresentações, estudos). Sem cessão, o(a) consultor(a) pode reusar com outro cliente. Decida o nível de exclusividade — a IA aponta a redação atual.",
      },
      {
        q: "Quanto detalhar o escopo? Preciso listar tudo?",
        a: "Liste o suficiente pra que &apos;feito&apos; signifique a mesma coisa pros dois lados. Use exemplos sempre que possível. Escopo de mais trava o trabalho; escopo de menos vira disputa.",
      },
      {
        q: "Funciona pra revisar contratos de SaaS recebidos?",
        a: "Sim. Cláusulas como SLA, limitação de responsabilidade, foro internacional e renovação automática costumam estar fora do padrão brasileiro. A IA destaca o que vale conferir.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-de-prestacao-de-servicos",
      label: "Visão geral: contrato de prestação de serviços",
    },
    siblings: servicosSiblings.filter(
      (s) => s.href !== "/contrato-de-prestacao-de-servicos-para-empresa-pequena",
    ),
  },
  {
    slug: "contrato-de-prestacao-de-servicos-para-juridico",
    docTypeLabel: "contrato de prestação de serviços",
    personaLabel: "jurídico",
    title: "Contrato de prestação de serviços — apoio para o jurídico",
    metaTitle: "Contrato de prestação de serviços — para o jurídico",
    metaDescription:
      "Triagem de contratos de prestação para advogado(a): cláusulas atípicas, riscos de pejotização e desbalanceamento de obrigações em segundos.",
    intro:
      "Para o(a) advogado(a) que faz revisão em série, o gargalo é o tempo até pegar o ponto crítico. A IA aqui marca cláusulas atípicas, sinaliza riscos de pejotização e destaca obrigações desbalanceadas (multa só pra um lado, prazo de pagamento sem contrapartida). Você decide a manobra; a IA economiza a leitura linha-a-linha.",
    contractIntent: true,
    fields: [
      { label: "Cláusulas atípicas", note: "Não-concorrência, exclusividade, foro internacional, lei estrangeira" },
      { label: "Risco de pejotização", note: "Combinação de exclusividade, subordinação, jornada e pagamento fixo" },
      { label: "Equilíbrio de obrigações", note: "Multa unilateral, garantia desproporcional, limite de responsabilidade" },
      { label: "Propriedade intelectual", note: "Escopo da cessão, regime de obras derivadas, software customizado" },
      { label: "SLA e penalidades", note: "Critérios objetivos, base de cálculo, teto e exclusões" },
      { label: "Lei aplicável e foro", note: "Compatibilidade com a operação local, custo de litigar fora" },
    ],
    faqs: [
      {
        q: "A IA pode emitir parecer?",
        a: "Não. A IA é apoio à triagem — destaca o que costuma virar passivo e ordena prioridades de revisão. O parecer é responsabilidade do(a) advogado(a) e exige análise das circunstâncias do caso.",
      },
      {
        q: "Identifica cláusulas em contratos em inglês ou espanhol?",
        a: "Sim, com qualidade próxima ao PT-BR. Para contratos cross-border, vale rodar dois modos: estrutura geral em PT-BR e checagem fina no idioma original.",
      },
      {
        q: "Cobre M&A ou contratos complexos?",
        a: "A ferramenta foi desenhada para contratos do dia-a-dia (prestação, CLT, locação). Em M&A com cadeia de sub-anexos, o ganho é menor — a IA lê o documento principal, não a documentação de due diligence inteira.",
      },
      {
        q: "Posso comparar duas versões do mesmo contrato?",
        a: "No Premium, sim. Suba a v1 e a v2; a IA aponta as diferenças. Útil em renegociação, alteração contratual e para auditar mudanças entre minuta e versão final.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-contrato-de-prestacao-de-servicos",
      label: "Visão geral: contrato de prestação de serviços",
    },
    siblings: servicosSiblings.filter(
      (s) => s.href !== "/contrato-de-prestacao-de-servicos-para-juridico",
    ),
  },

  /* —— Edital × persona —— */
  {
    slug: "edital-para-empresa-pequena",
    docTypeLabel: "edital de licitação",
    personaLabel: "empresa pequena",
    title: "Ler edital de licitação para empresa pequena",
    metaTitle: "Ler edital de licitação — empresa pequena",
    metaDescription:
      "Empresa pequena quer participar de licitação? Em minutos, identifique objeto, prazo, exigências de habilitação e penalidades — antes de gastar tempo montando proposta.",
    intro:
      "Empresa pequena raramente tem time dedicado a licitações. Antes de gastar dias preparando proposta, vale uma triagem rápida: objeto compatível, prazo factível, exigências de habilitação que você consegue cumprir. Esta página foca em entrar (ou desistir) com clareza nas primeiras horas após o edital.",
    fields: [
      { label: "Objeto", note: "O que está sendo contratado, escopo, quantidades, lote(s)" },
      { label: "Prazo de envio", note: "Data limite da proposta, formato de entrega, dúvidas e impugnação" },
      { label: "Habilitação", note: "Documentação fiscal, técnica, jurídica — checagem de viabilidade" },
      { label: "Critério de julgamento", note: "Menor preço, melhor técnica, técnica e preço, maior desconto" },
      { label: "Penalidades", note: "Multa por descumprimento, suspensão, declaração de inidoneidade" },
      { label: "Garantia exigida", note: "Tipo (caução, seguro, fiança), percentual, prazo de validade" },
    ],
    faqs: [
      {
        q: "Vale a pena para empresa pequena?",
        a: "Depende do objeto. Editais com lote único e exigência de patrimônio mínimo costumam excluir empresa pequena. Editais com cota reservada para ME/EPP (Lei 123/06) são onde vale focar — a IA aponta se há essa previsão.",
      },
      {
        q: "Como cumpro a exigência de comprovação de capacidade técnica?",
        a: "A IA destaca quais atestados são exigidos e em que quantidade. Se você não tem o histórico, dá pra avaliar se vale aliança com outra empresa via consórcio ou subcontratação — depende do que o edital permite.",
      },
      {
        q: "E se o edital tiver erro ou cláusula restritiva?",
        a: "Há prazo de impugnação previsto no próprio edital (normalmente 3 a 5 dias úteis). A IA aponta o prazo. A manobra de impugnar é jurídica, mas saber que existe é o primeiro passo.",
      },
      {
        q: "Posso usar pra editais antigos como referência?",
        a: "Sim. Estudar como editais anteriores foram redigidos no mesmo órgão ajuda a antecipar exigências em editais futuros. Use a IA pra comparar critérios e identificar padrão.",
      },
    ],
    canonicalUseCase: {
      href: "/ler-edital-com-ia",
      label: "Visão geral: ler edital com IA",
    },
    siblings: editalSiblings.filter((s) => s.href !== "/edital-para-empresa-pequena"),
  },
  {
    slug: "edital-para-construtora",
    docTypeLabel: "edital de licitação",
    personaLabel: "construtora",
    title: "Ler edital de licitação para construtora",
    metaTitle: "Ler edital de licitação — construtora",
    metaDescription:
      "Construtora avaliando edital: objeto, ART/RRT, atestados de obra, garantia, cronograma físico-financeiro e penalidades em minutos.",
    intro:
      "Em obra pública o edital é o briefing mais detalhado que você vai receber — e o que mais punição traz se algo for ignorado. Esta página foca no que construtora costuma errar: subdimensionar atestado de obra exigido, não ter ART/RRT pronto, atrapalhar a programação por não ler o cronograma físico-financeiro com cuidado.",
    fields: [
      { label: "Objeto e quantitativos", note: "Tipo da obra, m², serviços inclusos, cota de BDI" },
      { label: "Cronograma físico-financeiro", note: "Marcos de execução, etapas de medição, condições de pagamento" },
      { label: "Atestados de capacidade técnica", note: "Quais obras prévias contam, em que volume, com qual ART/RRT" },
      { label: "ART/RRT e responsável técnico", note: "Exigência por etapa, prazo de apresentação" },
      { label: "Garantia de execução", note: "Caução, seguro-garantia, fiança bancária — percentual e validade" },
      { label: "Penalidades por atraso", note: "Multa diária, base de cálculo, retenção, declaração de inidoneidade" },
    ],
    faqs: [
      {
        q: "Como sei se meu acervo técnico atende o edital?",
        a: "A IA extrai a exigência (tipo de obra + quantidade) e você cruza com seu acervo no CREA/CAU. Se vier algo como &apos;obra de pavimentação asfáltica de 5.000 m²&apos;, é direto. Use a saída pra triar antes de pedir cópia dos atestados.",
      },
      {
        q: "Atestado de subcontratada vale?",
        a: "Em geral não — o atestado precisa estar em nome da construtora que vai executar. A IA aponta a redação exata; vale ler com cuidado se houver alguma exceção declarada.",
      },
      {
        q: "Como avaliar o cronograma físico-financeiro antes da proposta?",
        a: "Veja se as etapas de medição batem com seu fluxo de caixa típico. Etapa de fundação no primeiro mês com pagamento só no terceiro pode quebrar o caixa. A IA destaca os marcos; o ajuste de proposta cabe ao orçamento.",
      },
      {
        q: "Garantia de execução em seguro vale a pena vs caução?",
        a: "Seguro libera capital de giro; caução imobiliza. Para obra de valor alto e prazo longo, seguro costuma ganhar. A IA mostra o percentual e tipo aceito; a decisão é financeira.",
      },
    ],
    canonicalUseCase: {
      href: "/ler-edital-com-ia",
      label: "Visão geral: ler edital com IA",
    },
    siblings: editalSiblings.filter((s) => s.href !== "/edital-para-construtora"),
  },
  {
    slug: "edital-para-gestor-de-licitacao",
    docTypeLabel: "edital de licitação",
    personaLabel: "gestor de licitação",
    title: "Análise de edital para gestor de licitação",
    metaTitle: "Análise de edital — gestor de licitação",
    metaDescription:
      "Gestor de licitação triando vários editais por semana: extraia objeto, prazos, exigências e penalidades padronizadamente — ganhe tempo na decisão de participar.",
    intro:
      "Gestor de licitação precisa decidir &apos;participar ou não&apos; em até 24h depois do edital aberto. A IA aqui é triagem em volume: roda dezenas de editais, normaliza saída (objeto, prazo, habilitação, julgamento, penalidades) e gera um quadro comparável. Decisão fica com você; o tempo de leitura cai pra minutos.",
    fields: [
      { label: "Objeto e modalidade", note: "Pregão eletrônico/presencial, concorrência, RDC; lote único ou multi-lote" },
      { label: "Prazos críticos", note: "Impugnação, dúvidas, envio da proposta, abertura, recurso" },
      { label: "Critério de julgamento", note: "Menor preço por item, por lote, melhor técnica, técnica e preço" },
      { label: "Habilitação", note: "Jurídica, fiscal, econômica e técnica — sumário das exigências" },
      { label: "Cota ME/EPP", note: "Reserva legal, possibilidade de ampla participação" },
      { label: "Penalidades", note: "Tabela de multas, base de cálculo, hipóteses de inidoneidade" },
    ],
    faqs: [
      {
        q: "Posso comparar 5 editais ao mesmo tempo?",
        a: "Não numa única chamada. Mas no Premium você sobe cada edital, salva o documento, e usa as mesmas perguntas em todos — a saída padronizada vira um quadro comparativo natural.",
      },
      {
        q: "Como triar editais &apos;dirigidos&apos; a um fornecedor específico?",
        a: "A IA aponta cláusulas restritivas (especificação de marca, limite mínimo de patrimônio fora de proporção, quantitativo amarrado). Sinais de direcionamento exigem análise jurídica antes de impugnar.",
      },
      {
        q: "Funciona pra editais com anexos múltiplos?",
        a: "Funciona melhor quando o edital principal e os anexos vêm num único PDF. Se vierem separados, processe cada um — depois use o chat (Premium) pra fazer perguntas que cruzam os arquivos via histórico.",
      },
      {
        q: "A IA acompanha mudanças de legislação (NLLC etc.)?",
        a: "A IA lê o que está no edital — não consulta lei vigente. Para alinhamento normativo (Nova Lei de Licitações, Lei 14.133/21), consulte sua assessoria. A ferramenta acelera a leitura, não substitui o normativo.",
      },
    ],
    canonicalUseCase: {
      href: "/ler-edital-com-ia",
      label: "Visão geral: ler edital com IA",
    },
    siblings: editalSiblings.filter((s) => s.href !== "/edital-para-gestor-de-licitacao"),
  },
  {
    slug: "edital-para-fornecedor-publico",
    docTypeLabel: "edital de licitação",
    personaLabel: "fornecedor público",
    title: "Edital de licitação para fornecedor público",
    metaTitle: "Edital de licitação para fornecedor público",
    metaDescription:
      "Fornecedor recorrente do setor público: leia o edital com IA, identifique o que mudou em relação ao anterior e prepare proposta sem reler o documento inteiro.",
    intro:
      "Fornecedor que ganha vários certames do mesmo órgão acaba lendo editais quase iguais ao longo do ano — mas cada palavra mudada importa. A IA aqui é especialmente útil pra triar &apos;o que mudou&apos; entre o edital novo e o anterior, sem precisar reler 80 páginas. Você foca o tempo na proposta, não na leitura repetitiva.",
    fields: [
      { label: "Objeto e quantitativos", note: "Confirmação do escopo e quantidades vs edital anterior" },
      { label: "Habilitação", note: "Quais documentos a mais ou a menos vs o último certame" },
      { label: "Critério de julgamento", note: "Mudanças de critério (lote único vs item, técnica e preço)" },
      { label: "Cota ME/EPP", note: "Reserva legal preservada, ajustada ou não aplicada" },
      { label: "Garantia exigida", note: "Variação no percentual ou no tipo (caução, seguro, fiança)" },
      { label: "Penalidades", note: "Eventual ampliação de hipóteses ou agravamento de multas" },
    ],
    faqs: [
      {
        q: "Dá pra comparar este edital com o do ano passado?",
        a: "No Premium você sobe os dois e pergunta o que mudou. A IA aponta diferenças por seção. Útil pra fornecedor recorrente que precisa atualizar a proposta sem refazer toda a leitura.",
      },
      {
        q: "Posso usar pra revisar editais de órgãos diferentes?",
        a: "Pode. A estrutura de extração é padronizada (objeto, prazo, habilitação, julgamento), mas a interpretação do que &apos;a mais&apos; ou &apos;a menos&apos; significa pra você depende do conhecimento que você acumulou no setor.",
      },
      {
        q: "E se o órgão alterar o edital depois (errata)?",
        a: "Suba a versão alterada — a IA lê do zero. Compare com a versão anterior pra ver o que mudou. Em órgãos com erratas frequentes, esse fluxo evita surpresa na hora de enviar a proposta.",
      },
      {
        q: "Funciona pra editais de pregão eletrônico no Comprasnet?",
        a: "Funciona com qualquer edital em PDF com texto selecionável. Anexos em planilha (XLS) precisam ser convertidos em PDF separadamente — ou usar o chat com vários documentos no Premium.",
      },
    ],
    canonicalUseCase: {
      href: "/ler-edital-com-ia",
      label: "Visão geral: ler edital com IA",
    },
    siblings: editalSiblings.filter((s) => s.href !== "/edital-para-fornecedor-publico"),
  },

  /* —— Apólice × persona —— */
  {
    slug: "apolice-de-seguro-para-segurado",
    docTypeLabel: "apólice de seguro",
    personaLabel: "segurado(a)",
    title: "Entender a apólice de seguro como segurado",
    metaTitle: "Entender a apólice de seguro — guia para segurado",
    metaDescription:
      "Recebeu a apólice e não sabe o que está coberto? Em minutos, veja coberturas, exclusões, carência, franquia e como acionar — em PT-BR, sem jargão.",
    intro:
      "Apólice de seguro é o documento que ninguém lê até precisar — e quando precisa, descobre que aquela cobertura &apos;que parecia incluída&apos; estava na lista de exclusões. Esta página foca em ler a apólice antes de usar: o que está coberto, o que está fora, qual a franquia e o que fazer se algo acontecer.",
    fields: [
      { label: "Coberturas contratadas", note: "Lista das coberturas com capital segurado de cada uma" },
      { label: "Exclusões", note: "Hipóteses em que a seguradora não paga (atenção especial)" },
      { label: "Carência", note: "Prazo até a cobertura entrar em vigor por tipo de evento" },
      { label: "Franquia", note: "Valor que você paga antes da seguradora cobrir" },
      { label: "Como acionar", note: "Documentos exigidos, prazo de aviso, canais oficiais" },
      { label: "Vigência e renovação", note: "Início, fim, condições de renovação automática, reajuste" },
    ],
    faqs: [
      {
        q: "A apólice diz &apos;cobertura básica&apos; — o que isso inclui?",
        a: "Cobertura básica é um conjunto definido pela seguradora; cada produto tem o seu. A IA extrai o conteúdo exato listado na sua apólice. Não confie em &apos;o nome diz&apos;.",
      },
      {
        q: "Tive um sinistro — como ler a apólice antes de acionar?",
        a: "Confira: 1) se o evento está nas coberturas; 2) se não está nas exclusões; 3) se a carência foi vencida; 4) qual o prazo pra avisar a seguradora (normalmente curto). A IA destaca cada item.",
      },
      {
        q: "Por que a seguradora pode negar pagamento?",
        a: "Causas comuns: evento não coberto, exclusão aplicável, carência não cumprida, falta de aviso no prazo, declaração inicial divergente. A IA não prevê negação, mas mostra os pontos onde ela pode ocorrer.",
      },
      {
        q: "Vale a pena ler antes da renovação?",
        a: "Vale. Apólices renovam mudando coberturas, franquias e exclusões — tudo isso aparece nas &quot;Condições Gerais&quot; ou no aditivo. Compare com a apólice anterior pra ver o delta.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-apolice-de-seguro",
      label: "Visão geral: analisar apólice de seguro",
    },
    siblings: apoliceSiblings.filter(
      (s) => s.href !== "/apolice-de-seguro-para-segurado",
    ),
  },
  {
    slug: "apolice-de-seguro-para-corretor",
    docTypeLabel: "apólice de seguro",
    personaLabel: "corretor(a)",
    title: "Apólice de seguro — apoio para corretor",
    metaTitle: "Apólice de seguro — apoio para corretor(a)",
    metaDescription:
      "Corretor(a) revisando apólices em volume: extraia coberturas, exclusões, franquia e diferenciais entre produtos pra explicar pro cliente em segundos.",
    intro:
      "Corretor(a) lê dezenas de apólices por semana — propostas, renovações, comparativos pro cliente. A IA aqui é triagem em volume: extrai coberturas, exclusões, carência e franquia em formato comparável, ajudando a montar quadro comparativo entre seguradoras com economia real de tempo.",
    fields: [
      { label: "Coberturas e capitais", note: "Lista padronizada com valores, útil pra comparar produtos" },
      { label: "Exclusões críticas", note: "Aquelas que costumam pegar o cliente — destaque pra venda" },
      { label: "Carência por tipo", note: "Quadro de carências (mais relevante em vida e saúde)" },
      { label: "Franquia", note: "Valor e modelo (fixa, percentual, dedutível)" },
      { label: "Reajuste", note: "Periodicidade, índice (sinistralidade, IPCA, etário) e regra" },
      { label: "Diferencial vs concorrentes", note: "Itens que esta apólice tem e a concorrência costuma não ter" },
    ],
    faqs: [
      {
        q: "Posso comparar duas apólices de seguradoras diferentes?",
        a: "No Premium, sim. Suba as duas e pergunte o que diverge em coberturas, exclusões e franquia. Útil pra montar quadro comparativo do cliente sem precisar de planilha cruzada.",
      },
      {
        q: "Funciona com apólice empresarial / multirrisco?",
        a: "Funciona, mas apólices empresariais costumam ter dezenas de coberturas e anexos com tabelas. Verifique a saída com cuidado — em produtos complexos, a IA é apoio, não substitui leitura técnica.",
      },
      {
        q: "Posso usar pra simular respostas pro cliente?",
        a: "Pode. No Premium, faça perguntas que o cliente costuma fazer (&quot;cobre dano por queda de raio?&quot;, &quot;quantos dias de carência pra cirurgia?&quot;) e use a saída pra atendimento mais ágil — sempre confirmando no documento original.",
      },
      {
        q: "A IA fica desatualizada quando a seguradora muda condições?",
        a: "A IA lê a apólice que você sobe. Se a seguradora alterou condições gerais, suba a versão atual; a IA não consulta atualizações fora do PDF. Para mudanças regulatórias amplas (SUSEP), use as comunicações oficiais.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-apolice-de-seguro",
      label: "Visão geral: analisar apólice de seguro",
    },
    siblings: apoliceSiblings.filter(
      (s) => s.href !== "/apolice-de-seguro-para-corretor",
    ),
  },

  /* —— Laudo médico × persona —— */
  {
    slug: "laudo-medico-para-paciente",
    docTypeLabel: "laudo médico",
    personaLabel: "paciente",
    title: "Entender o laudo médico — guia para paciente",
    metaTitle: "Entender o laudo médico — guia para paciente",
    metaDescription:
      "Recebeu um laudo cheio de termos técnicos? Em minutos, veja tradução em PT-BR, achados destacados e o que perguntar na próxima consulta — sem substituir o(a) médico(a).",
    intro:
      "Receber um laudo médico cheio de termos técnicos é estressante. A IA aqui não substitui o(a) médico(a) — ela traduz o que está escrito pra português comum, destaca os achados e sugere perguntas pra você levar pra consulta. Use como apoio à conversa, não como diagnóstico.",
    fields: [
      { label: "Diagnóstico ou hipótese", note: "Tradução do termo técnico, com sinônimos comuns" },
      { label: "Achados destacados", note: "O que o(a) profissional registrou como relevante" },
      { label: "Termos técnicos", note: "Glossário em PT-BR dos termos que aparecem no laudo" },
      { label: "Recomendações", note: "Próximos passos sugeridos pelo(a) profissional no laudo" },
      { label: "Perguntas pra consulta", note: "Lista pronta pra levar — clareia o que ainda precisa de resposta" },
      { label: "O que NÃO consta", note: "Pontos onde o laudo não se compromete (típico em exames de imagem)" },
    ],
    faqs: [
      {
        q: "A IA pode me dizer se eu tenho a doença X?",
        a: "Não. A IA traduz o que está no laudo — se o(a) médico(a) não escreveu &apos;doença X&apos;, a IA não infere. Para diagnóstico, fale com o(a) profissional que pediu o exame ou com o(a) clínico(a) geral.",
      },
      {
        q: "Posso usar pra explicar o laudo pra alguém da família?",
        a: "Pode, com cuidado. A tradução em PT-BR ajuda a comunicar; mas evite tomar decisões com base só na saída da IA. Use como ponto de partida pra conversa com o(a) profissional.",
      },
      {
        q: "Funciona pra laudo de exame de imagem (RM, TC, US)?",
        a: "Sim, e é onde a IA ajuda mais — laudos de imagem têm muito termo técnico (hipersinal, isodensidade, hipoecogênico) que a IA traduz pra linguagem comum.",
      },
      {
        q: "E se o laudo for à mão (escrito pelo(a) médico(a) na consulta)?",
        a: "Precisa ser texto digital ou laudo digitalizado com OCR. Letra de médico(a) à mão raramente passa em OCR. Pra esses casos, peça uma versão digitada ou tire o laudo no portal do paciente da clínica/laboratório.",
      },
    ],
    canonicalUseCase: {
      href: "/entender-laudo-medico",
      label: "Visão geral: entender laudo médico",
    },
    siblings: laudoSiblings.filter((s) => s.href !== "/laudo-medico-para-paciente"),
  },
  {
    slug: "laudo-medico-para-cuidador",
    docTypeLabel: "laudo médico",
    personaLabel: "cuidador(a)",
    title: "Entender o laudo médico — guia para cuidador",
    metaTitle: "Entender o laudo médico — guia para cuidador(a)",
    metaDescription:
      "Cuidando de alguém: traduza o laudo em PT-BR, organize achados, prepare perguntas pra equipe médica e acompanhe evolução entre consultas.",
    intro:
      "Quem cuida de outra pessoa lida com laudos em série — exames, retornos, segundas opiniões. A IA aqui ajuda a traduzir cada laudo, organizar a evolução (o que mudou em relação ao anterior) e levar pra consulta uma lista de perguntas focada. Não substitui equipe médica; libera você pra focar no cuidado.",
    fields: [
      { label: "Diagnóstico atual", note: "O que o laudo registra agora, traduzido" },
      { label: "Mudança vs laudo anterior", note: "O que está diferente em relação ao último exame" },
      { label: "Achados em evolução", note: "Itens que o(a) profissional sinaliza como evolutivos" },
      { label: "Recomendações", note: "Conduta sugerida no próprio laudo" },
      { label: "Perguntas pra equipe", note: "Lista priorizada pra próxima consulta" },
      { label: "Riscos a observar", note: "Sinais que o cuidador deve monitorar entre consultas" },
    ],
    faqs: [
      {
        q: "Posso comparar laudos ao longo do tempo?",
        a: "No Premium, sim. Suba laudos sequenciais e pergunte &apos;o que mudou&apos;. Útil pra acompanhar evolução em condição crônica entre consultas, sem depender só de memória.",
      },
      {
        q: "A IA me diz quando levar pra emergência?",
        a: "Não. A IA não tomografia urgência — para isso, oriente-se pelos sinais que a equipe médica indicou e pelos protocolos da condição. Use a IA pra entender o laudo, não pra substituir avaliação clínica.",
      },
      {
        q: "Funciona pra laudos de saúde mental?",
        a: "Funciona, mas o cuidado redobra: laudos psicológicos e psiquiátricos têm nuances importantes. Use a IA pra esclarecer termos; decisões cabem ao(à) profissional.",
      },
      {
        q: "Vale assinar o Premium pra cuidar de uma pessoa?",
        a: "Se você lida com 1-2 laudos por mês, o gratuito atende. Se tem múltiplos exames recorrentes (oncologia, cardiologia em acompanhamento), o Premium permite salvar histórico e comparar — economiza tempo entre consultas.",
      },
    ],
    canonicalUseCase: {
      href: "/entender-laudo-medico",
      label: "Visão geral: entender laudo médico",
    },
    siblings: laudoSiblings.filter((s) => s.href !== "/laudo-medico-para-cuidador"),
  },
  {
    slug: "laudo-medico-para-medico",
    docTypeLabel: "laudo médico",
    personaLabel: "médico(a)",
    title: "Apoio para médico revisando laudos",
    metaTitle: "Apoio para médico(a) — laudos em série",
    metaDescription:
      "Médico(a) recebendo laudos de imagem ou exames laboratoriais em volume: triagem, comparação com exames anteriores e organização de achados pra discussão clínica.",
    intro:
      "Médico(a) que revisa laudos antes de consulta tem o gargalo no tempo de leitura — especialmente em pacientes com exames recorrentes. A IA aqui não emite parecer nem substitui leitura crítica; ela organiza achados, compara com exames anteriores e ajuda a focar a consulta no que mudou.",
    fields: [
      { label: "Achados estruturados", note: "Resumo padronizado dos achados — útil pra cruzar com prontuário" },
      { label: "Comparação com prévio", note: "Diferenças entre o laudo atual e o anterior" },
      { label: "Termos críticos sinalizados", note: "Termos que costumam exigir leitura cuidadosa do laudo completo" },
      { label: "Conduta sugerida no laudo", note: "Recomendação registrada pelo(a) profissional emissor" },
      { label: "Limitações do exame", note: "O que o exame não permite concluir, conforme o laudo" },
      { label: "Pontos de atenção", note: "Itens que valem ler diretamente no laudo, não na saída da IA" },
    ],
    faqs: [
      {
        q: "Substitui a leitura do laudo original?",
        a: "Não. A IA é apoio à organização — leitura clínica continua sendo do(a) médico(a). A saída ajuda a focar a leitura: você lê o laudo inteiro, mas com radar no que importa pro caso específico.",
      },
      {
        q: "Posso integrar com prontuário eletrônico?",
        a: "A ferramenta atual não integra com prontuário. Use no fluxo de pré-consulta: extraia o que importa, traga pra discussão e registre no prontuário pelo seu sistema habitual.",
      },
      {
        q: "Funciona pra laudos em PDF muito longos (oncologia, cardiologia)?",
        a: "Funciona com PDFs até 100 páginas no Premium. Para casos com múltiplos anexos, considere subir cada exame em separado e usar o chat pra cruzar achados.",
      },
      {
        q: "Cobre interpretação de imagem?",
        a: "Não — a IA lê o texto do laudo (descrição feita pelo(a) radiologista), não a imagem em si. Para interpretação visual, sua leitura clínica continua sendo a fonte.",
      },
    ],
    canonicalUseCase: {
      href: "/entender-laudo-medico",
      label: "Visão geral: entender laudo médico",
    },
    siblings: laudoSiblings.filter((s) => s.href !== "/laudo-medico-para-medico"),
  },

  /* —— Proposta comercial × persona —— */
  {
    slug: "proposta-comercial-para-comprador",
    docTypeLabel: "proposta comercial",
    personaLabel: "comprador(a)",
    title: "Analisar proposta comercial como comprador",
    metaTitle: "Analisar proposta comercial — comprador(a)",
    metaDescription:
      "Recebendo propostas de fornecedores: extraia preço, prazo, escopo, garantias e exclusões pra comparar maçãs com maçãs em segundos.",
    intro:
      "Comprador recebe propostas redigidas por cada fornecedor à sua maneira — moldura diferente, preços fragmentados, escopo com nuances. A IA aqui é normalização: extrai preço, prazo, escopo, condições de pagamento e exclusões em formato comparável. Você decide a melhor; o tempo de leitura por proposta cai pra minutos.",
    fields: [
      { label: "Preço total e composição", note: "Subtotal por item, BDI, impostos, frete, total" },
      { label: "Prazo de entrega", note: "Data limite, condicionantes (após pedido, após pagamento)" },
      { label: "Escopo incluído", note: "Lista do que está dentro da proposta" },
      { label: "Exclusões", note: "O que NÃO está incluído — frequentemente onde mora a diferença" },
      { label: "Condições de pagamento", note: "Parcelas, antecipação, multa por atraso, desconto à vista" },
      { label: "Garantias", note: "Prazo, escopo (peças, mão de obra), condições" },
    ],
    faqs: [
      {
        q: "Como comparar 5 propostas com layouts diferentes?",
        a: "No Premium, suba todas e pergunte os mesmos pontos pra cada uma (&quot;qual preço total?&quot;, &quot;qual prazo?&quot;, &quot;o que está fora?&quot;). A saída padronizada vira tabela comparativa natural — sem planilha manual.",
      },
      {
        q: "Posso usar pra detectar &apos;preço quebrado&apos; em proposta?",
        a: "A IA aponta a estrutura de preço, mas comparação fina (BDI, imposto sobre serviço, encargos sociais) precisa de visão de mercado que a IA não tem. Use como apoio à triagem; o julgamento é seu.",
      },
      {
        q: "Funciona pra propostas de fornecedor estrangeiro?",
        a: "Sim, especialmente em inglês. Para câmbio, condições Incoterms (CIF, FOB, EXW) e impostos de importação, a IA aponta o que está escrito; o cálculo de custo total cabe ao(à) comprador(a).",
      },
      {
        q: "Pra contratos de longo prazo (TI, telecom, serviços continuados), serve?",
        a: "Serve com cuidado: nesses contratos, SLA, indexador, reajuste e cláusula de saída pesam mais que preço inicial. A IA destaca; você prioriza.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-proposta-comercial",
      label: "Visão geral: analisar proposta comercial",
    },
    siblings: propostaSiblings.filter(
      (s) => s.href !== "/proposta-comercial-para-comprador",
    ),
  },
  {
    slug: "proposta-comercial-para-vendas",
    docTypeLabel: "proposta comercial",
    personaLabel: "vendas",
    title: "Analisar proposta comercial — perspectiva de vendas",
    metaTitle: "Analisar proposta comercial — vendas",
    metaDescription:
      "Time comercial revisando contraproposta do cliente ou proposta concorrente: extraia preço, prazo, escopo e diferenciais pra ajustar a sua oferta.",
    intro:
      "Time comercial usa a IA num cenário diferente: revisar contraproposta do cliente, ler proposta concorrente que vazou ou auditar a própria proposta antes de mandar. Em todos os casos, o ponto é extrair preço, escopo, prazo e diferenciais pra ajustar o pitch ou a oferta com agilidade.",
    fields: [
      { label: "Preço e estrutura", note: "Como o concorrente (ou você) montou — itens, descontos, condicionantes" },
      { label: "Prazo prometido", note: "Datas e condicionantes — útil pra checar se você consegue bater" },
      { label: "Escopo e exclusões", note: "Pra identificar onde a sua proposta cobre mais (ou menos)" },
      { label: "Diferenciais técnicos", note: "Itens que o cliente valoriza e podem virar argumento de venda" },
      { label: "Risco da contraproposta", note: "O que o cliente está pedindo e o impacto na margem" },
      { label: "Pontos pra negociar", note: "Lista priorizada — onde ceder, onde segurar" },
    ],
    faqs: [
      {
        q: "Posso usar pra revisar minha própria proposta antes de enviar?",
        a: "Pode e deve. Suba antes de mandar — verifica se preços, prazos e escopo estão consistentes, e se a apresentação está clara. A IA pega erros que &apos;ler de novo&apos; deixa passar.",
      },
      {
        q: "Funciona pra comparar minha proposta com a do concorrente?",
        a: "Funciona quando você tem acesso à proposta concorrente. No Premium, suba ambas e peça pra IA destacar diferenças — útil pra ajustar a sua oferta na próxima rodada.",
      },
      {
        q: "Cobre proposta em formato de slide (PPTX)?",
        a: "A ferramenta lê PDF. Exporte a proposta como PDF antes de subir — funciona com slides convertidos. PPTX nativo não é suportado.",
      },
      {
        q: "Posso usar pra treinar SDR ou novos vendedores?",
        a: "Pode. Use a IA pra mostrar como destrinchar uma proposta complexa — ajuda a calibrar o que olhar primeiro. Combine com role-play depois.",
      },
    ],
    canonicalUseCase: {
      href: "/analisar-proposta-comercial",
      label: "Visão geral: analisar proposta comercial",
    },
    siblings: propostaSiblings.filter(
      (s) => s.href !== "/proposta-comercial-para-vendas",
    ),
  },

  /* —— Relatório × persona —— */
  {
    slug: "relatorio-para-gestor",
    docTypeLabel: "relatório",
    personaLabel: "gestor(a)",
    title: "Resumir relatório para gestor",
    metaTitle: "Resumir relatório longo — para gestor(a)",
    metaDescription:
      "Relatório de 50 páginas pra ler antes da reunião: visão geral, métricas-chave e perguntas críticas em minutos — leia o que importa, na ordem certa.",
    intro:
      "Gestor(a) recebe relatório de 30-100 páginas e tem 30 minutos antes da reunião. A IA aqui é triagem em alta velocidade: extrai visão geral, métricas-chave, recomendações e — mais importante — destaca os 3-5 pontos que costumam virar pergunta na reunião. Você lê o que importa, na ordem que importa.",
    fields: [
      { label: "Visão geral em 3 frases", note: "Tese central do relatório, sem rodeios" },
      { label: "Métricas-chave", note: "Números citados (com tendência: alta, queda, estável)" },
      { label: "Recomendações", note: "Conduta sugerida, em ordem de prioridade" },
      { label: "Pontos críticos", note: "Onde o relatório se compromete vs onde fica vago" },
      { label: "Perguntas pra reunião", note: "3-5 perguntas que costumam aparecer no comitê" },
      { label: "Páginas pra ler na íntegra", note: "Quais seções valem leitura completa, quais valem só o gráfico" },
    ],
    faqs: [
      {
        q: "Funciona pra relatório anual de 200 páginas?",
        a: "No Premium, sim — limite de 100 páginas por documento. Em relatórios maiores, divida por seção (sumário executivo, financeiro, operacional) e processe cada um separadamente.",
      },
      {
        q: "A IA destaca o que vai virar pergunta no comitê?",
        a: "A IA não prevê comitê — ela aponta onde o relatório está vago, onde os números mudaram bastante e onde as recomendações conflitam. Esses pontos costumam virar pergunta. Calibre com sua experiência da casa.",
      },
      {
        q: "Cobre relatório financeiro com tabelas e anexos?",
        a: "Cobre o texto. Tabelas em PDF são lidas como sequência de números — a interpretação fina depende da qualidade do PDF. Para anexos extensos, processe-os separadamente.",
      },
      {
        q: "Posso usar pra revisar relatórios que minha equipe escreveu?",
        a: "Pode. Antes de mandar pra liderança, suba e peça pra IA listar &quot;pontos vagos&quot; ou &quot;contradições&quot;. Funciona como par de olhos extra antes da circulação.",
      },
    ],
    canonicalUseCase: {
      href: "/resumir-relatorio-pdf",
      label: "Visão geral: resumir relatório PDF",
    },
    siblings: relatorioSiblings.filter(
      (s) => s.href !== "/relatorio-para-gestor",
    ),
  },
  {
    slug: "relatorio-para-investidor",
    docTypeLabel: "relatório",
    personaLabel: "investidor(a)",
    title: "Resumir relatório para investidor",
    metaTitle: "Resumir relatório financeiro — para investidor(a)",
    metaDescription:
      "Investidor lendo release trimestral, RAO ou prospecto: extraia números-chave, comentário da gestão, riscos declarados e variação vs trimestre anterior em minutos.",
    intro:
      "Investidor(a) lê dezenas de releases por trimestre — cada empresa redige à sua maneira, mas as perguntas são as mesmas (margem, receita, dívida, comentário do CFO). A IA aqui padroniza a leitura: extrai os mesmos campos pra cada relatório e ajuda a focar a análise em o que mudou.",
    fields: [
      { label: "Receita e crescimento", note: "Receita do período, variação vs trimestre anterior e mesmo período do ano anterior" },
      { label: "Margem", note: "Bruta, EBITDA, líquida — variações e drivers citados" },
      { label: "Dívida e caixa", note: "Posição financeira líquida, alavancagem, prazo médio" },
      { label: "Comentário da gestão", note: "Pontos destacados pelo(a) CEO/CFO no release" },
      { label: "Riscos declarados", note: "Itens listados na seção de riscos do relatório" },
      { label: "Guidance / projeções", note: "Eventual guidance pro próximo período e revisões" },
    ],
    faqs: [
      {
        q: "Posso comparar releases de empresas diferentes?",
        a: "No Premium, sim. Suba 2-3 releases (mesmo setor, mesmo trimestre) e peça pra IA destacar diferenças em margem, dívida e comentário da gestão. Útil pra screening rápido.",
      },
      {
        q: "Funciona pra prospecto de IPO ou follow-on?",
        a: "Funciona, com cuidado. Prospectos têm 200-500 páginas; processe a parte que interessa (sumário, riscos, condições da oferta) separadamente. Não use IA pra decidir — use pra triar antes de leitura aprofundada.",
      },
      {
        q: "Pega indicador não-GAAP (EBITDA ajustado, margem normalizada)?",
        a: "Pega o que está escrito. Se a empresa publicou EBITDA ajustado com cálculo, a IA extrai. Se quer cruzar com GAAP, peça os dois — a IA mostra ambos.",
      },
      {
        q: "Cobre relatório de fundos (lâmina, RI, carta do gestor)?",
        a: "Cobre. Cartas de gestores costumam ter narrativa importante (tese, posições, mudanças); a IA extrai os pontos. Para análise de portfólio, use a saída como ponto de partida.",
      },
    ],
    canonicalUseCase: {
      href: "/resumir-relatorio-pdf",
      label: "Visão geral: resumir relatório PDF",
    },
    siblings: relatorioSiblings.filter(
      (s) => s.href !== "/relatorio-para-investidor",
    ),
  },

  /* —— Boleto / fatura × persona —— */
  {
    slug: "boleto-para-pessoa-fisica",
    docTypeLabel: "boleto / fatura",
    personaLabel: "pessoa física",
    title: "Entender boleto ou fatura — pessoa física",
    metaTitle: "Entender boleto ou fatura — pessoa física",
    metaDescription:
      "Recebeu um boleto e não sabe o que é? Em minutos, veja vencimento, valor, beneficiário, juros e multa em caso de atraso — confirme antes de pagar.",
    intro:
      "Boleto suspeito chega no e-mail, no app, no banco — e nem sempre dá pra confiar. Esta página foca em ler antes de pagar: quem é o beneficiário, qual o valor, qual o vencimento real e o que acontece se você atrasar. Não substitui consulta ao emissor; ajuda a confirmar que o boleto faz sentido.",
    fields: [
      { label: "Beneficiário", note: "Nome e CNPJ de quem recebe — confira se bate com o esperado" },
      { label: "Valor", note: "Valor principal, eventuais descontos por antecipação" },
      { label: "Vencimento", note: "Data limite, se cai em dia útil ou final de semana" },
      { label: "Juros e multa", note: "Percentuais aplicáveis em caso de atraso" },
      { label: "Código de barras", note: "Confirmação de que o código bate com a linha digitável" },
      { label: "Instruções", note: "Mensagens do beneficiário — &quot;não receber após Y dias&quot; etc." },
    ],
    faqs: [
      {
        q: "Como sei se o boleto é falso?",
        a: "Sinais: beneficiário não esperado, valor diferente do contratado, link de download fora do canal oficial, código de barras que não bate com a linha digitável. A IA aponta o beneficiário e o valor; o cruzamento com o esperado é seu.",
      },
      {
        q: "Posso pagar boleto após o vencimento?",
        a: "Em geral sim, com juros e multa proporcionais. Em alguns casos, a instrução diz &quot;não receber após Y dias&quot; — aí o boleto fica inválido e você precisa de um novo. A IA destaca essas instruções.",
      },
      {
        q: "Multa de 2% sempre é o limite?",
        a: "Em relação de consumo (CDC) o teto é 2% do valor da prestação. Em outros tipos (cobrança trabalhista, locação), pode variar. A IA mostra o que está escrito — vale checar o contrato base.",
      },
      {
        q: "E fatura de cartão? Funciona?",
        a: "Sim. A IA extrai valor total, vencimento, valor mínimo e composição. Útil pra entender por que a fatura veio mais alta que o esperado (juros, IOF, anuidade).",
      },
    ],
    canonicalUseCase: {
      href: "/resumir-boleto-ou-fatura",
      label: "Visão geral: resumir boleto ou fatura",
    },
    siblings: boletoSiblings.filter((s) => s.href !== "/boleto-para-pessoa-fisica"),
  },
  {
    slug: "boleto-para-empresa",
    docTypeLabel: "boleto / fatura",
    personaLabel: "empresa",
    title: "Conferir boleto ou fatura — empresa",
    metaTitle: "Conferir boleto ou fatura — empresa",
    metaDescription:
      "Empresa recebendo boletos de fornecedores em volume: extraia beneficiário, valor, vencimento e diferenças vs nota fiscal antes de aprovar pagamento.",
    intro:
      "Empresa recebe boletos por fornecedor, conta de consumo (energia, telecom), assinaturas SaaS e tributos. Triagem em volume pega: beneficiário inesperado, divergência entre boleto e NF, vencimento que cai antes do esperado, multa por atraso desproporcional. A IA aqui é apoio à conferência antes do aprovador final.",
    fields: [
      { label: "Beneficiário e CNPJ", note: "Cruzamento com cadastro de fornecedores aprovados" },
      { label: "Valor e composição", note: "Principal + adicionais (juros, multa, frete) — bate com NF?" },
      { label: "Vencimento", note: "Data, dia útil, antecipação possível com desconto" },
      { label: "Tributos retidos", note: "ISS, IRRF, INSS, CSRF — confirmação de retenção quando aplicável" },
      { label: "Identificação do contrato", note: "Número do pedido, contrato ou centro de custo" },
      { label: "Conformidade", note: "Sinais de boleto fora do padrão do fornecedor" },
    ],
    faqs: [
      {
        q: "Posso usar pra conferir boletos antes do pagamento em lote?",
        a: "Pode. Suba os boletos um a um (ou via chat no Premium) e cruze com a planilha de pagamentos. Útil em time de contas a pagar com volume alto e prazo apertado.",
      },
      {
        q: "Detecta fraude (boleto adulterado)?",
        a: "Detecta sinais (beneficiário inesperado, código de barras incoerente com a linha digitável). Detecção definitiva exige cruzamento com sistema bancário — use a IA como camada de triagem, não como anti-fraude final.",
      },
      {
        q: "Funciona pra DDA (Débito Direto Autorizado)?",
        a: "A ferramenta lê o boleto em PDF. Para DDA via banco, a conferência é no extrato bancário. Use a IA pro PDF que o fornecedor mandou; o pagamento via DDA é fluxo separado.",
      },
      {
        q: "E em conta de consumo (energia, telecom)?",
        a: "Funciona. Extrai consumo, valor por bandeira, impostos, valor total. Útil pra conferir aumento atípico antes de pagar e pra rastrear consumo entre filiais.",
      },
    ],
    canonicalUseCase: {
      href: "/resumir-boleto-ou-fatura",
      label: "Visão geral: resumir boleto ou fatura",
    },
    siblings: boletoSiblings.filter((s) => s.href !== "/boleto-para-empresa"),
  },
];

/**
 * Lookup table for the dynamic route — keyed by slug for O(1) lookup
 * during request handling.
 */
export const programmaticBySlug = new Map<string, ProgrammaticEntry>(
  programmaticEntries.map((entry) => [entry.slug, entry]),
);

/** Sitemap-friendly list of slugs. */
export const programmaticSlugs: readonly string[] = programmaticEntries.map(
  (entry) => entry.slug,
);

/**
 * Sibling lookup by canonical doc-type — used by canonical use-case pages
 * to render the "Para sua função" section linking to all persona variants.
 */
export const personaVariantsByCanonical: Record<
  string,
  Array<{ href: string; label: string }>
> = {
  "/analisar-contrato-clt": cltSiblings,
  "/analisar-contrato-de-prestacao-de-servicos": servicosSiblings,
  "/ler-edital-com-ia": editalSiblings,
  "/analisar-apolice-de-seguro": apoliceSiblings,
  "/entender-laudo-medico": laudoSiblings,
  "/analisar-proposta-comercial": propostaSiblings,
  "/resumir-relatorio-pdf": relatorioSiblings,
  "/resumir-boleto-ou-fatura": boletoSiblings,
};
