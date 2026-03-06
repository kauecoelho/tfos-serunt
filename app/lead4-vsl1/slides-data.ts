/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA — lead4-vsl1
─────────────────────────────────────────────────────────────────────────────── */

export type Color = "red" | "teal" | "orange";
export type Part = { text: string; color?: Color; };

export type SlideVariant =
  | "phrase" | "dark" | "red-impact" | "green-impact"
  | "image" | "cycle" | "list-logos" | "table" | "split";

export type TableRow = { cells: string[]; };

export type Slide = {
  id:           number;
  variant?:     SlideVariant;
  label?:       string;
  parts?:       Part[];
  logos?:       string[];
  tableTitle?:  string;
  tableHeader?: string[];
  tableRows?:   TableRow[];
  cycleItems?:  { letter: string; name: string; description: string }[];
  imageSrc?:    string;
};

const p = (text: string): Part => ({ text });
const t = (text: string): Part => ({ text, color: "teal" });
const r = (text: string): Part => ({ text, color: "red" });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const o = (text: string): Part => ({ text, color: "orange" });

export const SLIDES: Slide[] = [

  /* ── ABERTURA ─────────────────────────────────────────────────────────── */
  {
    id: 1,
    variant: "dark",
    parts: [p("Engenheiro,")],
  },
  {
    id: 2,
    variant: "red-impact",
    parts: [p("Você não perde projeto por preço.")],
  },
  {
    id: 3,
    parts: [
      p("Você perde porque o mercado não consegue enxergar "),
      r("o que você vale."),
    ],
  },
  {
    id: 4,
    parts: [p("E isso é completamente diferente.")],
  },

  /* ── A JÓIA ───────────────────────────────────────────────────────────── */
  {
    id: 5,
    parts: [p("Você é o cara que estudou quando os outros não estudaram.")],
  },
  {
    id: 6,
    parts: [
      p("Que fez especialização. Que acumula acervo técnico. Que assina ART e dorme sabendo o peso disso."),
    ],
  },
  {
    id: 7,
    parts: [p("Você domina o que a maioria nem entende que existe.")],
  },
  {
    id: 8,
    variant: "green-impact",
    parts: [p("Você é a jóia.")],
  },

  /* ── A GAVETA ─────────────────────────────────────────────────────────── */
  {
    id: 9,
    variant: "dark",
    parts: [p("Mas você tá guardado numa gaveta empoeirada.")],
  },
  {
    id: 10,
    parts: [
      p("Enquanto isso, "),
      r("pedras falsas estão na vitrine."),
      p(" Aparecendo. Sendo escolhidas. Fechando projeto."),
    ],
  },
  {
    id: 11,
    parts: [p("Não porque são melhores. Você sabe que não são.")],
  },
  {
    id: 12,
    parts: [p("Mas porque o cliente só compra o que consegue ver.")],
  },
  {
    id: 13,
    parts: [p("E ninguém te ensinou a abrir essa gaveta.")],
  },
  {
    id: 14,
    parts: [
      p("Ninguém te ensinou a fazer o mercado enxergar o que você realmente vale "),
      r("antes da conversa de preço."),
    ],
  },

  /* ── A MAIOR INJUSTIÇA ────────────────────────────────────────────────── */
  {
    id: 15,
    variant: "red-impact",
    parts: [p("A maior injustiça da engenharia brasileira.")],
  },
  {
    id: 16,
    parts: [
      p("Você — que tem o preparo técnico, a experiência, a responsabilidade — "),
      r("perde pro recém-formado que cobra metade."),
    ],
  },
  {
    id: 17,
    parts: [p("Não porque o mercado é burro.")],
  },
  {
    id: 18,
    parts: [p("Porque o mercado só enxerga o que é colocado na frente dele.")],
  },

  /* ── DOIS TIPOS DE CLIENTE ────────────────────────────────────────────── */
  {
    id: 19,
    variant: "dark",
    parts: [p("Existem dois tipos de cliente de engenharia no Brasil.")],
  },

  /* Tipo 1 */
  {
    id: 20,
    variant: "red-impact",
    parts: [p("O primeiro compra por preço.")],
  },
  {
    id: 21,
    parts: [
      p("Pega 5 orçamentos, escolhe o menor, ainda tenta negociar desconto. "),
      r("Reclama de tudo."),
    ],
  },
  {
    id: 22,
    parts: [p("Some depois que você manda a proposta. E quando fecha, fecha um projeto que mal paga o seu tempo.")],
  },
  {
    id: 23,
    variant: "dark",
    parts: [
      r("Esse cliente é uma armadilha."),
      p(" Você nunca ganha dele. E quando ganha, paga pra trabalhar."),
    ],
  },

  /* Tipo 2 */
  {
    id: 24,
    variant: "green-impact",
    parts: [p("O segundo compra por confiança.")],
  },
  {
    id: 25,
    parts: [
      p("Ele não quer o mais barato. "),
      t("Ele quer o mais seguro."),
    ],
  },
  {
    id: 26,
    parts: [p("Ele vai financiar a obra. Vai envolver a família. Vai dormir pensando nisso por semanas.")],
  },
  {
    id: 27,
    parts: [
      p("E ele sabe — no fundo — que errar na escolha do profissional vai sair "),
      r("muito mais caro"),
      p(" do que pagar bem."),
    ],
  },
  {
    id: 28,
    parts: [
      p("Esse cliente não discute "),
      r("preço."),
      p(" Ele discute "),
      t("competência."),
    ],
  },
  {
    id: 29,
    parts: [
      p("E quando ele encontra um profissional que demonstra domínio técnico, que fala a linguagem certa, que transmite segurança antes mesmo de mandar o orçamento..."),
    ],
  },
  {
    id: 30,
    variant: "green-impact",
    parts: [p("Ele fecha. Sem pechinchar. Sem sumir. Sem te comparar com recém-formado.")],
  },

  /* ── EXISTE — MAS NÃO CHEGOU ATÉ VOCÊ ────────────────────────────────── */
  {
    id: 31,
    parts: [
      t("Esse segundo cliente existe. Em abundância."),
      p(" Em qualquer cidade do Brasil. Em qualquer nicho da engenharia."),
    ],
  },
  {
    id: 32,
    parts: [p("E ele pagaria bem pelo seu nível técnico.")],
  },
  {
    id: 33,
    variant: "dark",
    parts: [r("O problema é que ele nunca chegou até você.")],
  },
  {
    id: 34,
    parts: [p("Mas existe um caminho pra mudar isso.")],
  },
  {
    id: 35,
    parts: [
      p("Mais de "),
      t("600 engenheiros e arquitetos"),
      p(" descobriram que quando você aprende a se colocar na vitrine certa — do jeito certo, pra pessoa certa — o cliente que paga bem "),
      t("para de ser exceção e vira rotina."),
    ],
  },

  /* ── CASES ────────────────────────────────────────────────────────────── */
  {
    id: 35,
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
    id: 36,
    variant: "split",
    imageSrc: "/provas/antonio.png",
    label: "Antônio — CLT no Paraná",
    parts: [
      p("Vendia projeto por "),
      r("R$ 4 mil"),
      p(" enquanto a construtora revendia por "),
      t("R$ 12 mil."),
      p(" Achava que era o mercado dele. Que era regional. Que era assim mesmo."),
    ],
  },
  {
    id: 37,
    parts: [
      r("Não era o mercado. Era invisibilidade."),
    ],
  },
  {
    id: 38,
    parts: [
      p("Implementou um sistema depois do expediente. "),
      t("Juntou 12 meses de salário. Pediu dispensa."),
      p(" Hoje vende por conta própria."),
    ],
  },
  {
    id: 39,
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
    id: 40,
    parts: [
      r("Não era preço. Era invisibilidade."),
    ],
  },
  {
    id: 41,
    parts: [
      t("Fechou. Sem negociar preço. Sem sumir. Sem perder pra concorrente barato."),
    ],
  },

  /* ── RESULTADO + CTA ──────────────────────────────────────────────────── */
  {
    id: 42,
    parts: [
      p("A média entre eles? "),
      t("2 a 3 projetos fechados todo mês. Cobrando 40% mais caro."),
      p(" Sem perder pra concorrente barato."),
    ],
  },
  {
    id: 43,
    parts: [p("Vou te mostrar como fazer o mercado enxergar o que você realmente vale.")],
  },
  {
    id: 44,
    variant: "dark",
    parts: [
      p("E o sistema exato pra atrair o cliente que "),
      t("já entende isso"),
      p(" antes mesmo de falar com você."),
    ],
  },

];