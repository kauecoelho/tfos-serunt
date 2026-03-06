/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA — edite este arquivo para alterar o conteúdo dos slides
   sem precisar mexer no componente React.

   COMO EDITAR O TEXTO:
   ─ Texto simples:         p("texto aqui")
   ─ Texto teal (positivo): t("texto bom")
   ─ Texto vermelho (neg.): r("texto ruim")
   ─ Texto laranja:         o("texto neutro/contraste")

   VARIANTES DE SLIDE (campo `variant`):
   ─ (omitir)           → fundo claro, fonte padrão
   ─ "dark"             → fundo azul-escuro, texto claro
   ─ "red-impact"       → fundo vermelho, fonte grande — para frases de impacto
   ─ "green-impact"     → fundo verde/teal, fonte grande — para frases positivas
   ─ "image"            → placeholder fullscreen de imagem
   ─ "cycle"            → fluxograma B→E→T→A (usar campo cycleItems)
   ─ "list-logos"       → pílulas com nomes de empresas (usar campo `logos`)
   ─ "table"            → tabela de dados (usar campos tableTitle/tableHeader/tableRows)
   ─ "split"            → texto à esquerda + placeholder de print à direita
─────────────────────────────────────────────────────────────────────────────── */

export type Color = "red" | "teal" | "orange";

/** Um trecho de texto, opcionalmente colorido. */
export type Part = {
  text:   string;
  color?: Color;
};

export type SlideVariant =
  | "phrase"
  | "dark"
  | "red-impact"
  | "green-impact"
  | "image"
  | "cycle"
  | "list-logos"
  | "table"
  | "split"
  | "offer";

export type TableRow = {
  cells: string[];
};

export type Slide = {
  id:           number;
  variant?:     SlideVariant;
  /** Label do pilar exibido como chip no canto superior esquerdo (ex: "T — Tráfego") */
  label?:       string;
  parts?:       Part[];
  logos?:       string[];
  tableTitle?:  string;
  tableHeader?: string[];
  tableRows?:   TableRow[];
  /** Itens para o fluxograma B→E→T→A (variante "cycle") */
  cycleItems?:  { letter: string; name: string; description: string }[];
  /** Caminho da imagem em /public (ex: "/provas/foto.jpg"). Se omitido, exibe placeholder. */
  imageSrc?:    string;
};

/* ── Atalhos internos (não exportados) ─────────────────────────────────────── */
const p = (text: string): Part => ({ text });
const t = (text: string): Part => ({ text, color: "teal" });
const r = (text: string): Part => ({ text, color: "red" });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const o = (text: string): Part => ({ text, color: "orange" });

/* ══════════════════════════════════════════════════════════════════════════════
   SLIDES  (230 slides totais — copy exata do roteiro)
══════════════════════════════════════════════════════════════════════════════ */
export const SLIDES: Slide[] = [

  /* ── LEAD ──────────────────────────────────────────────────────────────── */
  {
    id: 1,
    parts: [
      p("O maior setor da economia brasileira é o da "),
      t("indústria"),
      p(" e da "),
      t("construção civil."),
    ],
  },
  {
    id: 2,
    parts: [t("Bilhões de reais"), p(" em movimento todo ano.")],
  },
  {
    id: 3,
    parts: [
      p("E se você é engenheiro ou arquiteto autônomo, você deveria estar "),
      t("recolhendo uma parte desse dinheiro."),
    ],
  },
  {
    id: 4,
    parts: [
      p("Deveria ter "),
      t("agenda cheia."),
      p(" "),
      t("Fluxo de clientes previsível."),
      p(" Saber exatamente quanto vai entrar no mês."),
    ],
  },

  /* ── SLIDE 5: RED IMPACT ─────────────────────────────────────────────── */
  {
    id: 5,
    variant: "red-impact",
    parts: [p("Mas a sua realidade é outra, né?")],
  },

  /* ── DOR ─────────────────────────────────────────────────────────────── */
  {
    id: 6,
    parts: [
      p("Você é bom tecnicamente. Estudou anos. Tem responsabilidade técnica nas costas, e pode até ser preso se errar."),
    ],
  },
  {
    id: 7,
    parts: [
      p("Mas mesmo assim: você "),
      r("não sabe quando vai fechar o próximo projeto."),
    ],
  },
  {
    id: 8,
    parts: [
      p("Você vive numa "),
      r("montanha-russa."),
      p(" Mês com 20 mil. "),
      r("Mês zerado."),
      p(" Trabalha que nem condenado e no final "),
      r("não sobra nada."),
    ],
  },
  {
    id: 9,
    parts: [
      r("Depende de indicação"),
      p(" que não controla. "),
      r("Perde projeto pra recém-formado"),
      p(" que cobra metade do seu preço."),
    ],
  },
  {
    id: 10,
    parts: [
      p("E ainda tem cliente, \"amigo\" ou familiar te pedindo proposta de graça."),
    ],
  },
  {
    id: 11,
    parts: [
      p("Um dos maiores mercados do Brasil. E você "),
      r("sobrevivendo de migalha."),
    ],
  },

  /* ── SLIDE 12: RED IMPACT ────────────────────────────────────────────── */
  {
    id: 12,
    variant: "red-impact",
    parts: [p("Isso não faz sentido.")],
  },

  /* ── TRANSIÇÃO ───────────────────────────────────────────────────────── */
  {
    id: 13,
    parts: [p("E eu vou te explicar exatamente por que isso acontece.")],
  },
  {
    id: 14,
    parts: [p("Me dá 18 minutos.")],
  },
  {
    id: 15,
    parts: [
      p("Nos próximos minutos você vai descobrir o sistema exato que mais de "),
      t("600 engenheiros e arquitetos"),
      p(" usaram pra acabar com a montanha-russa de faturamento."),
    ],
  },

  /* ── SLIDE 1001: IMAGE — Provas Sociais (entre 15 e 16) ─────────────── */
  /* Coloque o arquivo em: public/provas/Provas Sociais (Imagens).png       */
  { id: 1001, variant: "image", imageSrc: "/provas/Provas Sociais (Imagens).png" },

  {
    id: 16,
    parts: [
      p("Tendo "),
      t("fluxo de clientes previsível,"),
      p(" projetos todo mês, cobrando mais caro, sem depender de indicação."),
    ],
  },
  {
    id: 17,
    parts: [
      p("E o porquê tudo o que você tentou até hoje "),
      r("não funcionou."),
    ],
  },

  /* ── CONEXÃO PESSOAL ─────────────────────────────────────────────────── */
  {
    id: 18,
    parts: [p("Meu nome é Paulo Bastos. Sou engenheiro há 15 anos.")],
  },
  {
    id: 19,
    parts: [
      p("Passei 11 anos na CLT vendendo projetos e obras B2B. Meta de "),
      t("400 mil por mês."),
      p(" Rodei o Brasil vendendo no sapato."),
    ],
  },

  /* ── SLIDE 20: LIST-LOGOS ────────────────────────────────────────────── */
  {
    id: 20,
    variant: "list-logos",
    logos: [
      "Fiat",
      "Unimed",
      "Esmaltec",
      "Wilson Sons",
      "Aeris Energy",
      "Caixa Econômica",
      "Fresenius Kabi",
      "30+ construtoras e parques eólicos",
    ],
  },

  /* ── O EMPREGO QUE MUDOU TUDO ────────────────────────────────────────── */
  {
    id: 21,
    parts: [p("Mas teve um emprego que mudou tudo.")],
  },
  {
    id: 22,
    parts: [p("Eu trabalhei pra um cara que nem engenheiro era.")],
  },
  {
    id: 23,
    parts: [p("Ele entendia de obra, sabia vender. Mas não tinha diploma.")],
  },
  {
    id: 24,
    parts: [
      p("Sabe quanto ele faturava? Mais de "),
      t("R$ 200 mil por mês."),
    ],
  },
  {
    id: 25,
    parts: [
      p("Eu, que sabia calcular viga, que tinha diploma, que era o vendedor técnico responsável por metade dessa receita... ganhava "),
      r("5, 6 mil."),
    ],
  },
  {
    id: 26,
    parts: [
      p("Ali eu entendi: se eu não aprendesse a vender, "),
      r("comeria na mão de outro homem pra sempre."),
    ],
  },
  {
    id: 27,
    parts: [p("Então decidi agir. Sem largar o emprego, abri meu primeiro CNPJ.")],
  },
  {
    id: 28,
    parts: [r("Quebrou."), p(" Vendeu pouco.")],
  },
  {
    id: 29,
    parts: [p("Abri outro.")],
  },
  {
    id: 30,
    parts: [
      r("Quebrou também."),
      p(" Dessa vez o problema foi o oposto: vendeu demais e não consegui entregar."),
    ],
  },
  {
    id: 31,
    parts: [p("Voltei pra CLT. Fiz mestrado em machine learning. Subi na carreira. Fui parar numa multinacional.")],
  },
  {
    id: 32,
    parts: [p("Carreira firme pela frente. Muitos benefícios. Emprego dos sonhos pra muitos.")],
  },
  {
    id: 33,
    parts: [p("Mas eu sabia que um dia ia tentar de novo.")],
  },
  {
    id: 34,
    parts: [p("Até que veio a Pandemia.")],
  },

  /* ── SLIDE 35: DARK ──────────────────────────────────────────────────── */
  {
    id: 35,
    variant: "dark",
    parts: [p("Minha mãe descobriu câncer.")],
  },

  /* ── HISTÓRIA: HOSPITAL ──────────────────────────────────────────────── */
  {
    id: 36,
    parts: [p("Fui morar com ela dentro do hospital.")],
  },
  {
    id: 37,
    parts: [
      p("Meu pai quebrou. Tinha bens, mas "),
      r("sem liquidez."),
    ],
  },
  {
    id: 38,
    parts: [
      r("Carro financiado. Zero renda. Ilhado."),
      p(" Não podia sair, não podia trabalhar."),
    ],
  },
  {
    id: 39,
    parts: [
      p("Eu olhava pro lado e via minha mãe "),
      r("lutando pela vida."),
      p(" Olhava pro celular e via as "),
      r("contas vencendo."),
    ],
  },
  {
    id: 40,
    parts: [
      p("E pensei: eu tô prestes a "),
      r("desistir de tudo."),
    ],
  },

  /* ── SLIDES 41–42: DIVIDIDOS (Mudanças #2 e #3) ─────────────────────── */
  {
    id: 41,
    parts: [
      p("Foi numa madrugada. Todo mundo dormindo na enfermaria."),
    ],
  },
  {
    id: 1002,
    parts: [
      p("Eu sentado numa poltrona de acompanhante, com um notebook ruim nas pernas."),
    ],
  },
  {
    id: 42,
    parts: [
      p("E eu pensei: minha mãe tem escritório de contabilidade. Os clientes tão indo embora."),
    ],
  },
  {
    id: 1003,
    parts: [
      t("Se eu conseguir clientes pra ela, a gente sobrevive."),
    ],
  },

  {
    id: 43,
    parts: [p("Foi aí que descobri que existia tráfego pago.")],
  },
  {
    id: 44,
    parts: [
      p("Depois de "),
      r("11 anos vendendo,"),
      p(" eu não sabia que isso existia."),
    ],
  },
  {
    id: 45,
    parts: [
      t("Fiz site. Fiz perfil. Subi campanha."),
      p(" E fechei clientes de contabilidade. Dali de dentro do hospital."),
    ],
  },
  {
    id: 46,
    parts: [p("E acendeu uma luz.")],
  },
  {
    id: 47,
    parts: [
      p("Contabilidade também é venda consultiva. Cliente não compra por impulso. Demora pra decidir. Precisa de confiança."),
    ],
  },
  {
    id: 48,
    parts: [t("Igualzinho à engenharia.")],
  },
  {
    id: 49,
    parts: [
      p("Peguei tudo que aprendi nos 11 anos vendendo na CLT e juntei com o que descobri naquela madrugada. "),
      t("Montei um sistema."),
    ],
  },
  {
    id: 50,
    parts: [
      p("Desde 2021, já foram "),
      t("645 engenheiros e arquitetos"),
      p(" atendidos individualmente. Mais de "),
      t("2 mil alunos"),
      p(" em treinamentos."),
    ],
  },

  /* ── SLIDE 51: DIVIDIDO (Mudança #4) ─────────────────────────────────── */
  {
    id: 51,
    parts: [
      p("O resultado médio? "),
      t("2 a 3 projetos fechados todo mês."),
    ],
  },
  {
    id: 1004,
    parts: [
      p("Com estrutura enxuta. Sem agência. Sem gestor de tráfego. Sem mensalidade cara."),
    ],
  },

  {
    id: 52,
    parts: [p("E até hoje eu aplico o método no meu próprio negócio. Se não funcionasse, eu estaria ferrado.")],
  },

  /* ── O INIMIGO / GRANDE PROBLEMA ─────────────────────────────────────── */
  {
    id: 53,
    parts: [p("Agora eu preciso te fazer uma pergunta.")],
  },
  {
    id: 54,
    parts: [p("Você já tentou resolver isso antes, né?")],
  },
  {
    id: 55,
    parts: [
      p("Você saiu da faculdade tecnicamente preparado. Mas "),
      r("comercialmente vulnerável."),
    ],
  },
  {
    id: 56,
    parts: [
      p("E o que você fez? Tentou aprender sozinho. Assistiu vídeo no YouTube. Tentou fazer Instagram. "),
      r("Não conseguiu resultado."),
    ],
  },
  {
    id: 57,
    parts: [p("Aí contratou quem \"sabe\" do assunto.")],
  },
  {
    id: 58,
    parts: [p("Gestor de tráfego. Agência. Social media.")],
  },
  {
    id: 59,
    parts: [p("Te prometeram lead quente. Sistema automático. Funil que vende sozinho.")],
  },
  {
    id: 60,
    parts: [
      p("Você pagou "),
      r("2, 3, 4 mil por mês."),
      p(" Mais o investimento em tráfego."),
    ],
  },
  {
    id: 61,
    parts: [p("E o que aconteceu?")],
  },
  {
    id: 62,
    parts: [
      p("Você trabalhou um mês inteiro como "),
      r("atendente de SAC do seu próprio negócio."),
    ],
  },
  {
    id: 63,
    parts: [
      p("Marcou 8 reuniões. "),
      r("5 não apareceram."),
      p(" 2 disseram que vão pensar. 1 fechou um projeto de "),
      r("3.500 reais."),
    ],
  },
  {
    id: 64,
    parts: [
      r("Gastou 3 mil de agência. Faturou 3.500."),
      p(" Lucro líquido: "),
      r("500 reais."),
      p(" Menos que estagiário."),
    ],
  },
  {
    id: 65,
    parts: [p("E ainda teve cliente te pedindo proposta de graça.")],
  },
  {
    id: 66,
    parts: [p("Ou então te convenceram a viralizar.")],
  },
  {
    id: 67,
    parts: [p("Você fez Reels todo dia. Viralizou. 50 mil views.")],
  },
  {
    id: 68,
    parts: [
      p("Sabe quantos viraram cliente? "),
      r("Zero."),
    ],
  },

  /* ── SLIDE 69: DIVIDIDO (Mudança #5) ─────────────────────────────────── */
  {
    id: 69,
    parts: [
      p("Porque quem viraliza com dancinha atrai plateia de curioso."),
    ],
  },
  {
    id: 1005,
    parts: [
      p("Não atrai incorporadora que precisa de compatibilização. Não atrai dono de obra com "),
      t("400 mil"),
      p(" pra gastar."),
    ],
  },

  {
    id: 70,
    parts: [p("E você ficou pensando: será que o problema é comigo? Com o meu mercado? Com a minha cidade?")],
  },
  {
    id: 71,
    parts: [p("Não.")],
  },
  {
    id: 72,
    parts: [
      p("O problema tem nome: "),
      r("Marketing de Prateleira."),
    ],
  },

  /* ── SLIDE 73: TABELA ────────────────────────────────────────────────── */
  {
    id: 73,
    variant: "table",
    tableTitle: "Por que o marketing convencional não funciona pra engenharia?",
    tableHeader: ["", "Produto de Prateleira", "Engenharia Consultiva"],
    tableRows: [
      { cells: ["Como o cliente decide", "Por impulso",               "Por confiança"]          },
      { cells: ["Ticket médio",          "R$50 a R$1.000",            "R$15k a R$100k"]         },
      { cells: ["Entregável",            "Padrão para todos",         "Único por projeto"]      },
      { cells: ["Ciclo de decisão",      "Minutos",                   "20 a 80 dias"]           },
      { cells: ["Como se vende",         "Dancinha e gatilho mental", "Autoridade técnica"]     },
    ],
  },

  /* ── EXPLICAÇÃO DO PROBLEMA ───────────────────────────────────────────── */
  {
    id: 74,
    parts: [
      r("Marketing de Prateleira"),
      p(" foi criado pra produto barato, com baixa fricção, decisão rápida."),
    ],
  },
  {
    id: 75,
    parts: [r("Venda de engenharia não funciona assim.")],
  },
  {
    id: 76,
    parts: [p("O seu cliente vai financiar a obra. Vai envolver a família. Vai dormir pensando nisso por meses.")],
  },
  {
    id: 77,
    parts: [p("Ele não clica no botão e compra. Ele pesquisa. Compara. Questiona. Negocia.")],
  },
  {
    id: 78,
    parts: [
      p("Por isso que quando você usa Marketing de Prateleira, você só atrai "),
      r("lead curioso, que quer preço, que te compara com recém-formado."),
    ],
  },
  {
    id: 79,
    parts: [
      p("E afasta exatamente o cliente que você quer. Aquele que "),
      t("paga bem."),
      p(" Que não discute preço porque valoriza qualidade."),
    ],
  },
  {
    id: 80,
    parts: [p("Não foi culpa sua.")],
  },
  {
    id: 81,
    parts: [
      p("A faculdade te ensinou a calcular viga. "),
      r("Não te ensinou a vender."),
    ],
  },
  {
    id: 82,
    parts: [
      p("E o mercado te vendeu a "),
      r("ferramenta errada."),
    ],
  },
  {
    id: 83,
    parts: [p("Engenheiro sério não vende assim. E cliente que paga bem não compra assim.")],
  },
  {
    id: 84,
    parts: [p("Então qual é o método certo?")],
  },

  /* ── SOLUÇÃO ─────────────────────────────────────────────────────────── */
  {
    id: 85,
    parts: [p("A solução não é fazer marketing genérico.")],
  },
  {
    id: 86,
    parts: [p("Não é viralizar. Não é terceirizar.")],
  },
  {
    id: 87,
    parts: [
      p("É você "),
      t("dominar o comercial"),
      p(" como dominou o técnico."),
    ],
  },
  {
    id: 88,
    parts: [p("Mas como fazer isso sem virar blogueiro? Sem aparecer todo dia no Instagram? Sem gastar 4 mil por mês em agência?")],
  },
  {
    id: 89,
    parts: [
      p("É aqui que entra o "),
      t("Método BETA."),
    ],
  },
  {
    id: 90,
    parts: [
      t("BETA não é curso. É sistema."),
      p(" Quatro pilares que se conectam e funcionam como uma máquina comercial específica pra venda consultiva de engenharia."),
    ],
  },

  /* ── B — BUSINESS ────────────────────────────────────────────────────── */
  {
    id: 91,
    label: "B — Business",
    parts: [
      t("B — Business."),
      p(" Clareza de modelo de negócio, fluxo de caixa e meta."),
    ],
  },

  /* ── SLIDE 92: DIVIDIDO + LAYOUT MELHORADO (Mudança #6) ─────────────── */
  {
    id: 92,
    label: "B — Business",
    parts: [
      p("PSV: "),
      t("Precificação Saudável de Vendas."),
    ],
  },
  {
    id: 1006,
    label: "B — Business",
    parts: [
      p("Não é tabela SINAPI. SINAPI te dá o custo técnico. PSV te dá o preço de venda que garante dinheiro no bolso, não só no papel."),
    ],
  },

  {
    id: 93,
    label: "B — Business",
    parts: [
      p("Engenharia tem "),
      r("ciclo longo."),
      p(" Às vezes você trabalha seis meses pra receber lá na frente. Fazer tráfego sem entender isso é pedir pra quebrar."),
    ],
  },

  /* ── E — ESTRATÉGIA ──────────────────────────────────────────────────── */
  {
    id: 94,
    label: "E — Estratégia",
    parts: [
      t("E — Estratégia."),
      p(" Dois métodos aqui."),
    ],
  },

  /* ── SLIDE 95: DIVIDIDO + LAYOUT MELHORADO (Mudança #7) ─────────────── */
  {
    id: 95,
    label: "E — Estratégia",
    parts: [
      p("Primeiro: "),
      t("Micro-Autoridade."),
    ],
  },
  {
    id: 1007,
    label: "E — Estratégia",
    parts: [
      p("Em vez de ser engenheiro genérico que faz de tudo, você vira especialista."),
    ],
  },

  {
    id: 96,
    label: "E — Estratégia",
    parts: [
      p("Cliente paga "),
      t("40% mais caro"),
      p(" por especialista. E você para de competir com recém-formado que cobra qualquer preço."),
    ],
  },
  {
    id: 97,
    label: "E — Estratégia",
    parts: [
      p("\"Mas vou perder cliente assim.\" Não. Você vai "),
      t("filtrar cliente ruim"),
      p(" e atrair cliente que paga bem."),
    ],
  },

  /* ── SLIDE 98: DIVIDIDO + LAYOUT MELHORADO (Mudança #8) ─────────────── */
  {
    id: 98,
    label: "E — Estratégia",
    parts: [
      p("Segundo: "),
      t("Conteúdo LED."),
    ],
  },
  {
    id: 1008,
    label: "E — Estratégia",
    parts: [
      p("Linha Editorial Direcionada. Não é dancinha. Não é viral. Basta alguns conteúdos técnicos, sóbrios, direcionados pro cliente certo."),
    ],
  },

  {
    id: 99,
    label: "E — Estratégia",
    parts: [
      p("Quando ele chega pra conversar com você, já foi educado pelos seus posts. A venda fica "),
      t("70% mais fácil."),
    ],
  },
  {
    id: 100,
    label: "E — Estratégia",
    parts: [
      p("O Hélio faturou "),
      t("R$ 100 mil por mês"),
      p(" com perfil dark. Sem foto. Sem nome no perfil."),
    ],
  },

  /* ── T — TRÁFEGO ─────────────────────────────────────────────────────── */
  {
    id: 101,
    label: "T — Tráfego",
    parts: [t("T — Tráfego. Anúncio HCC. Alta Conversão Consultiva.")],
  },
  {
    id: 102,
    label: "T — Tráfego",
    parts: [
      p("Anúncio HCC não é aquele anúncio genérico \"faça seu projeto comigo\". É um anúncio que educa e filtra."),
    ],
  },
  {
    id: 103,
    label: "T — Tráfego",
    parts: [
      p("Só chega na sua DM quem já entendeu que "),
      r("projeto barato é problema caro."),
      p(" Quem quer preço nem te procura."),
    ],
  },
  {
    id: 104,
    label: "T — Tráfego",
    parts: [
      p("Quem te procura já sabe que você cobra certo e tá disposto a pagar."),
    ],
  },
  {
    id: 105,
    label: "T — Tráfego",
    parts: [
      p("Como por exemplo a Luiza, minha aluna, que me disse que pela primeira vez não precisou convencer o cliente a fechar com ela um projeto estrutural COMPLETO."),
    ],
  },
  {
    id: 106,
    label: "T — Tráfego",
    parts: [
      r("\"Mas se eu filtrar muito, vou ter poucos leads.\""),
      p(" Melhor 5 leads qualificados que fecham 2 projetos do que 50 leads ruins que gastam 40 horas do seu tempo e não fecham nenhum."),
    ],
  },
  {
    id: 107,
    label: "T — Tráfego",
    parts: [
      t("Investindo R$ 15 a 30 por dia."),
      p(" Menos que uma refeição de obra."),
    ],
  },

  /* ── A — ATENDIMENTO ─────────────────────────────────────────────────── */

  /* ── SLIDE 108: "Autoridade, Lógica..." em preto (Mudança #9) ─────────── */
  {
    id: 108,
    label: "A — Atendimento",
    parts: [
      t("A — Atendimento com Roteiro ALAN: "),
      p("Autoridade, Lógica, Ancoragem e Negociação."),
    ],
  },
  {
    id: 109,
    label: "A — Atendimento",
    parts: [
      p("Não vou te ensinar só a gerar a oportunidade de negócio e te largar sozinho, e dizer pra se virar e atender de qualquer jeito."),
    ],
  },

  /* ── SLIDE 110: DIVIDIDO (Mudança #10) ───────────────────────────────── */
  {
    id: 110,
    label: "A — Atendimento",
    parts: [
      p("Agora que o cliente chegou no teu CRM, vou pegar pela tua mão e te ensinar"),
    ],
  },
  {
    id: 1009,
    label: "A — Atendimento",
    parts: [
      p("como conduzir o cliente, ancorar preço e fechar projeto sem parecer vendedor e sem dar desconto pra não perder."),
    ],
  },

  /* ── OS 4 PILARES INTEGRADOS ─────────────────────────────────────────── */
  {
    id: 111,
    parts: [p("Os quatro pilares se conectam assim:")],
  },

  /* ── SLIDE 112: FLUXOGRAMA CYCLE (Mudança #11) ───────────────────────── */
  {
    id: 112,
    variant: "cycle",
    cycleItems: [
      { letter: "B", name: "Business",     description: "Clareza de meta"                         },
      { letter: "E", name: "Estratégia",   description: "Educa o cliente antes de ele chegar"     },
      { letter: "T", name: "Tráfego",      description: "Filtra e atrai quem tá disposto a pagar" },
      { letter: "A", name: "Atendimento",  description: "Fecha."                                  },
    ],
  },

  {
    id: 113,
    parts: [p("Não são módulos isolados. São um sistema integrado.")],
  },
  {
    id: 114,
    parts: [
      p("E foi criado por quem entende de engenharia. "),
      r("Não por coach. Não por marqueteiro genérico."),
    ],
  },

  /* ── SLIDE 115: COM DESTAQUES (Mudança #12) ──────────────────────────── */
  {
    id: 115,
    parts: [
      p("Por mim. Que "),
      t("calculei viga"),
      p(" E "),
      t("fechou contrato."),
      p(" Que vendeu pra "),
      t("Fiat e Unimed."),
      p(" E que até hoje aplica o método no próprio negócio."),
    ],
  },

  /* ── SLIDE 116: DIVIDIDO (Mudança #13) ───────────────────────────────── */
  {
    id: 116,
    parts: [
      p("E olha, eu não saí da engenharia pra virar guru. Até hoje eu vendo serviços de engenharia."),
    ],
  },
  {
    id: 1010,
    parts: [
      p("Se o método não funcionasse no meu próprio negócio, eu estaria ferrado."),
    ],
  },

  {
    id: 117,
    parts: [t("Desde 2021, 633 engenheiros e arquitetos atendidos.")],
  },
  {
    id: 118,
    parts: [p("Vou te mostrar três deles.")],
  },

  /* ── CASES REAIS (split: texto + foto de prova social) ──────────────── */
  {
    id: 119,
    variant: "split",
    imageSrc: "/provas/helio.png",
    parts: [
      t("Hélio."),
      p(" Arquiteto. Faturava "),
      r("5 a 6 mil por mês."),
      p(" Queria atender o Brasil todo de casa, sem aparecer. Hoje bate "),
      t("R$ 100 mil de faturamento."),
      p(" Com perfil dark. Sem nome no perfil. Sem dancinha. Sem aparecer."),
    ],
  },
  {
    id: 120,
    variant: "split",
    imageSrc: "/provas/antonio.png",
    parts: [
      t("Antônio."),
      p(" Engenheiro no Paraná. CLT. Vendiam o projeto dele por "),
      r("12 mil"),
      p(" e pagavam "),
      r("4 pra ele."),
      p(" Implementou o método depois do expediente. Sem gastar, sem mudar padrão de vida. Juntou 12 meses de salário. Pediu dispensa. Hoje vende por conta própria."),
    ],
  },
  {
    id: 121,
    variant: "split",
    imageSrc: "/provas/alao.png",
    parts: [
      p("Ou então o "),
      t("Alao,"),
      p(" que fechou seu primeiro projeto de "),
      t("R$ 16.000,00"),
      p(" pelo tráfego."),
    ],
  },
  {
    id: 122,
    parts: [
      p("Engenheiro estrutural. Arquiteto residencial. Engenheiro Eletrecista. Cada um no seu nicho. Cada um fechando "),
      t("2 a 3 projetos por mês."),
    ],
  },
  {
    id: 123,
    parts: [
      p("Porque o sistema não é sobre o que você vende. É sobre "),
      t("como você vende."),
    ],
  },
  {
    id: 124,
    parts: [p("Muda o cliente, muda o projeto. O processo é o mesmo.")],
  },
  {
    id: 125,
    parts: [
      p("Agora deixa eu te mostrar como você pode implementar isso ainda essa semana e transformar o teu negócio e a tua carreira com engenheiro"),
    ],
  },

  /* ── TRANSIÇÃO PARA OFERTA ───────────────────────────────────────────── */

  /* ── SLIDE 126: DIVIDIDO (Mudança #14) ───────────────────────────────── */
  {
    id: 126,
    parts: [
      p("Talvez você esteja olhando pra tudo isso e pensando:"),
    ],
  },
  {
    id: 1011,
    parts: [
      p("\"Paulo, são muitas coisas. Parece complexo demais. Parece que vou ter que virar outra pessoa pra fazer isso funcionar.\""),
    ],
  },

  {
    id: 127,
    parts: [p("Eu entendo.")],
  },
  {
    id: 128,
    parts: [p("Mas deixa eu te lembrar de uma coisa.")],
  },
  {
    id: 129,
    parts: [
      p("Você aprendeu cálculo estrutural. Aprendeu a interpretar NBR. Aprendeu a dimensionar, compatibilizar, executar."),
    ],
  },
  {
    id: 130,
    parts: [t("Você já dominou coisas muito mais difíceis do que vender.")],
  },

  /* ── SLIDE 131: DIVIDIDO (Mudança #15) ───────────────────────────────── */
  {
    id: 131,
    parts: [
      p("O que faltava era o método certo."),
    ],
  },
  {
    id: 1012,
    parts: [
      p("Específico pra engenharia. Estruturado do jeito que engenheiro pensa."),
    ],
  },

  {
    id: 132,
    parts: [
      p("E é exatamente isso que o "),
      t("Setup BETA"),
      p(" entrega."),
    ],
  },

  /* ── ENCRUZILHADA DE ABERTURA ────────────────────────────────────────── */
  {
    id: 133,
    parts: [p("Deixa eu ser direto com você.")],
  },
  {
    id: 134,
    parts: [p("Você chegou até aqui porque reconheceu a sua realidade nesse vídeo.")],
  },
  {
    id: 135,
    parts: [p("E agora você tá numa escolha.")],
  },

  /* ── SLIDE 136: MENOS VERMELHO (Mudança #16) ─────────────────────────── */
  {
    id: 136,
    parts: [
      p("Continua do jeito que tá: dependendo de indicação, "),
      r("montanha-russa de faturamento"),
      p(", perdendo projeto pra concorrente barato."),
    ],
  },

  {
    id: 137,
    variant: "red-impact",
    parts: [p("Ou muda.")],
  },
  {
    id: 138,
    parts: [p("Se você quer mudar, deixa eu te mostrar como.")],
  },

  /* ── APRESENTAÇÃO DO PRODUTO ─────────────────────────────────────────── */
  {
    id: 139,
    parts: [t("O Setup BETA completo.")],
  },
  {
    id: 140,
    parts: [r("Não é curso pra você assistir passivo no sofá tipo Netflix.")],
  },
  {
    id: 141,
    parts: [
      p("São aulas tela a tela, feitas pra você dividir a tela do computador e ir fazendo junto comigo."),
    ],
  },
  {
    id: 142,
    parts: [p("Cada módulo tem o exato conteúdo que você precisa aplicar naquela semana.")],
  },
  {
    id: 143,
    parts: [
      p("O formato é de "),
      t("sprints diários. 30 minutos por dia."),
      p(" Enquanto você continua projetando."),
    ],
  },
  {
    id: 144,
    parts: [r("Sem enrolação. Sem aula de 2 horas enchendo linguiça. Sem teoria que você assiste e nunca aplica.")],
  },
  {
    id: 145,
    parts: [
      p("Você assiste 10 minutos. Para o vídeo. Aplica 30 minutos. "),
      t("Sprint do dia feito."),
    ],
  },

  /* ── SLIDE 146: DIVIDIDO (Mudança #17) ───────────────────────────────── */
  {
    id: 146,
    parts: [
      p("Engenheiro é prático, é autodidata, e não tem tempo pra perder."),
    ],
  },
  {
    id: 1013,
    parts: [
      p("Por isso as aulas são diretas. Eu vou direto no que você precisa fazer. Você executa."),
    ],
  },

  /* ── EMPILHAMENTO DE BÔNUS ───────────────────────────────────────────── */
  {
    id: 147,
    parts: [p("Junto com o setup, você recebe:")],
  },

  /* ── SLIDES 148–151: APENAS O NOME DO BÔNUS (Mudanças #18–21) ────────── */
  {
    id: 148,
    parts: [t("O Roadmap de Sprints Impresso.")],
  },
  {
    id: 149,
    parts: [t("O Agente de IA para Anúncios.")],
  },
  {
    id: 150,
    parts: [t("Agente Auxiliar de Implementação.")],
  },
  {
    id: 151,
    parts: [t("A Comunidade WhatsApp do Núcleo Beta.")],
  },

  /* ── ANCORAGEM E PREÇO ───────────────────────────────────────────────── */
  {
    id: 152,
    parts: [p("Agora o investimento.")],
  },
  {
    id: 153,
    parts: [p("Deixa eu te mostrar o que você tá recebendo e quanto cada coisa vale.")],
  },

  /* ── SLIDE 154: TABELA 3 COLUNAS (Mudança #22) ───────────────────────── */
  {
    id: 154,
    variant: "table",
    tableTitle: "O que você está recebendo",
    tableHeader: ["Item", "O que inclui", "Valor"],
    tableRows: [
      {
        cells: [
          "O Sistema BETA Completo",
          "4 módulos (B·E·T·A) em sprints diários. Aulas tela a tela — você aplica junto.",
          "R$ 3.000",
        ],
      },
      {
        cells: [
          "O Roadmap de Sprints Impresso",
          "Mapa visual dia a dia. Cola na parede, risca conforme executa. Você nunca fica perdido.",
          "R$ 97",
        ],
      },
      {
        cells: [
          "O Agente de IA para Anúncios",
          "Responda 5 perguntas. Receba 3 variações de anúncio HCC prontas pra subir no Meta.",
          "R$ 197",
        ],
      },
      {
        cells: [
          "Agente Auxiliar de Implementação",
          "Assistente 24h. Travou numa etapa? O agente destrava.",
          "R$ 197",
        ],
      },
      {
        cells: [
          "Comunidade WhatsApp do Núcleo Beta",
          "Comunidade ativa. Equipe responde dúvidas técnicas em tempo real.",
          "R$ 97",
        ],
      },
      {
        cells: [
          "O Certificado de Conclusão",
          "Certificado digital ao concluir todos os módulos.",
          "R$ 97",
        ],
      },
    ],
  },

  {
    id: 155,
    parts: [p("Some tudo isso.")],
  },
  {
    id: 156,
    variant: "red-impact",
    parts: [p("R$ 3.685.")],
  },
  {
    id: 157,
    parts: [p("Esse é o valor real do que você tá recebendo.")],
  },
  {
    id: 158,
    parts: [
      p("Mas você não vai pagar "),
      r("R$ 3.685."),
    ],
  },
  {
    id: 159,
    parts: [r("Não vai pagar R$ 1.000.")],
  },
  {
    id: 160,
    parts: [r("Não vai pagar R$ 500.")],
  },

  /* ── SLIDE 161: OFERTA (texto verde topo + imagem bundle 2/3 baixo) ──── */
  {
    id: 161,
    variant: "offer",
    imageSrc: "/provas/Bundle Stup.png",
    parts: [t("R$ 197,00 à vista.")],
  },

  {
    id: 162,
    parts: [
      p("Ou "),
      t("12 vezes de R$ 16,42 no cartão."),
    ],
  },
  {
    id: 163,
    parts: [t("R$ 16,42 por mês.")],
  },
  {
    id: 164,
    parts: [p("Menos que um almoço de obra.")],
  },
  {
    id: 165,
    parts: [
      p("Menos que uma hora de qualquer gestor de tráfego que já te prometeu lead quente e não entregou nada."),
    ],
  },
  {
    id: 166,
    parts: [p("E por que tão acessível assim?")],
  },

  /* ── SLIDE 167: DIVIDIDO (Mudança #24) ───────────────────────────────── */
  {
    id: 167,
    parts: [
      p("Porque o meu objetivo é colocar o máximo de engenheiros bons dentro desse sistema."),
    ],
  },
  {
    id: 1014,
    parts: [
      p("Engenheiro que implementa gera resultado. Engenheiro que gera resultado indica. E isso faz o método crescer."),
    ],
  },

  {
    id: 168,
    parts: [p("Não é filantropia. É estratégia. E você se beneficia disso hoje.")],
  },

  /* ── GARANTIA ────────────────────────────────────────────────────────── */
  {
    id: 169,
    parts: [
      p("E tem mais: você tem "),
      t("7 dias de garantia incondicional."),
    ],
  },
  {
    id: 170,
    parts: [
      p("Se você entrar, aplicar os primeiros sprints e sentir que não é pra você, me manda uma mensagem e eu devolvo cada centavo. Sem perguntas. Sem burocracia."),
    ],
  },
  {
    id: 171,
    parts: [p("Eu não quero seu dinheiro se o método não fizer sentido pra você.")],
  },

  /* ── PRIMEIRO CTA ────────────────────────────────────────────────────── */
  {
    id: 172,
    parts: [p("Se tudo que eu te mostrei fez sentido, o botão já tá disponível aqui abaixo.")],
  },
  {
    id: 173,
    parts: [t("Clica, garante seu acesso e começa hoje.")],
  },

  /* ── QUEBRA DE OBJEÇÕES ──────────────────────────────────────────────── */
  {
    id: 174,
    parts: [p("Bom.")],
  },
  {
    id: 175,
    parts: [p("Se você ainda tá aqui, pode ser que ainda tenha alguma dúvida.")],
  },
  {
    id: 176,
    parts: [p("Normal. Deixa eu responder as principais.")],
  },
  {
    id: 177,
    parts: [r("\"Paulo, já tentei tráfego antes e não funcionou.\"")],
  },
  {
    id: 178,
    parts: [p("Eu sei. Provavelmente não foi culpa sua.")],
  },
  {
    id: 179,
    parts: [
      p("Foi culpa da ferramenta errada. Gestor genérico, anúncio genérico, resultado genérico — que no caso de engenharia significa "),
      r("zero."),
    ],
  },
  {
    id: 180,
    parts: [
      p("O Anúncio HCC é diferente. Foi criado especificamente pra venda consultiva. Pra filtrar antes de chegar na sua DM. Você não tá repetindo o que não funcionou. "),
      t("Tá fazendo diferente."),
    ],
  },
  {
    id: 181,
    parts: [r("\"Não tenho tempo. Trabalho o dia todo.\"")],
  },
  {
    id: 182,
    parts: [
      t("30 minutos por dia."),
      p(" Formato de sprints diários"),
    ],
  },
  {
    id: 183,
    parts: [
      p("O Antônio implementou o método depois do expediente. Sem mudar padrão de vida. Sem pausar a carreira. Juntou 12 meses de salário e pediu dispensa."),
    ],
  },
  {
    id: 184,
    parts: [
      p("Se ele conseguiu depois de um dia inteiro de trabalho CLT, "),
      t("você consegue."),
    ],
  },
  {
    id: 185,
    parts: [r("\"Sou engenheiro, não vendedor. Não tenho perfil pra isso.\"")],
  },
  {
    id: 186,
    parts: [p("Você não vai virar vendedor.")],
  },
  {
    id: 187,
    parts: [
      p("Você vai dominar o comercial como dominou o técnico. Com método, com processo, com lógica."),
    ],
  },
  {
    id: 188,
    parts: [
      p("Engenheiro aprende por sistema. O BETA é um sistema. É exatamente o que você já sabe fazer — só aplicado no comercial."),
    ],
  },
  {
    id: 189,
    parts: [r("\"Minha cidade é pequena. Aqui todo mundo se conhece, o mercado é diferente.\"")],
  },
  {
    id: 190,
    parts: [p("O Hélio atende o Brasil todo. De casa. Com perfil dark. Sem aparecer.")],
  },
  {
    id: 191,
    parts: [
      p("Cidade pequena não é limitação. É "),
      t("ausência de concorrente qualificado."),
      p(" Você entra como referência num mercado que não tem nenhuma."),
    ],
  },
  {
    id: 192,
    parts: [r("\"E se eu entrar e não funcionar pra mim?\"")],
  },
  {
    id: 193,
    parts: [t("Sete dias de garantia incondicional.")],
  },
  {
    id: 194,
    parts: [
      p("Você entra, aplica os primeiros sprints, e se sentir que não é pra você, me manda mensagem e eu devolvo cada centavo."),
    ],
  },
  {
    id: 195,
    parts: [t("Sem perguntas. Sem burocracia.")],
  },
  {
    id: 196,
    parts: [
      p("O risco é "),
      t("zero."),
      p(" O único risco real é continuar do jeito que tá."),
    ],
  },

  /* ── SEGUNDO CTA ─────────────────────────────────────────────────────── */
  {
    id: 197,
    parts: [p("O botão ainda tá aqui abaixo.")],
  },
  {
    id: 198,
    parts: [
      p("R$ 197 à vista ou "),
      t("12 vezes de R$ 16,42."),
    ],
  },
  {
    id: 199,
    parts: [t("Clica e garanta seu acesso agora.")],
  },

  /* ── ARREMATE EMOCIONAL ──────────────────────────────────────────────── */
  {
    id: 200,
    parts: [p("Deixa eu te contar uma coisa antes de fechar.")],
  },
  {
    id: 201,
    variant: "dark",
    parts: [
      p("Naquela madrugada no hospital, notebook ruim nas pernas, minha mãe do lado lutando pela vida, as contas vencendo no celular..."),
    ],
  },
  {
    id: 202,
    variant: "dark",
    parts: [p("Eu pensei em desistir.")],
  },
  {
    id: 203,
    variant: "dark",
    parts: [r("De tudo.")],
  },
  {
    id: 204,
    variant: "dark",
    parts: [t("Mas não desisti.")],
  },
  {
    id: 205,
    parts: [
      p("E o que me salvou não foi sorte. Não foi talento. Foi um sistema. Uma descoberta. Uma decisão de aprender o que a faculdade não me ensinou."),
    ],
  },
  {
    id: 206,
    parts: [p("Você tá aqui porque também não desistiu.")],
  },
  {
    id: 207,
    parts: [
      p("Você ainda acredita que dá pra ter controle. Que dá pra ter previsibilidade. Que dá pra cobrar o que você vale."),
    ],
  },

  /* ── SLIDE 208: FUNDO VERDE (Mudança #25) ────────────────────────────── */
  {
    id: 208,
    variant: "green-impact",
    parts: [p("E dá.")],
  },

  {
    id: 209,
    parts: [
      p("Mas continuar esperando indicação que não vem, continuar perdendo projeto pra recém-formado que cobra metade, continuar sem saber o que vai entrar no mês que vem..."),
    ],
  },
  {
    id: 210,
    parts: [r("Isso tem um custo. Todo mês.")],
  },
  {
    id: 211,
    parts: [p("Eu não sei se você vai entrar. E tá tudo bem.")],
  },
  {
    id: 212,
    parts: [p("Meu negócio continua. O método continua funcionando.")],
  },
  {
    id: 213,
    parts: [
      p("Mas se você fechar esse vídeo e nada mudar, daqui a seis meses você vai estar no mesmo lugar."),
    ],
  },
  {
    id: 214,
    parts: [p("Ou você clica no botão agora e começa a construir algo diferente.")],
  },
  {
    id: 215,
    variant: "dark",
    parts: [p("A decisão é sua.")],
  },
  {
    id: 216,
    variant: "dark",
    parts: [p("Até dentro do Setup.")],
  },
];
