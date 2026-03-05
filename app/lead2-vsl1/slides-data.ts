/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA — lead2-vsl1
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

  /* ── HOOK ─────────────────────────────────────────────────────────────── */
  {
    id: 1,
    parts: [
      p("Todo mês, engenheiros e arquitetos autônomos espalhados pelo Brasil fecham "),
      t("2, 3 projetos novos."),
    ],
  },
  {
    id: 2,
    parts: [
      t("Sem depender de indicação."),
      p(" Sem agência. Sem gestor de tráfego."),
    ],
  },

  /* ── PROVAS SOCIAIS ────────────────────────────────────────────────────── */
  {
    id: 3,
    variant: "split",
    parts: [
      p("Uma delas era estagiária ganhando "),
      r("R$ 2.500."),
      p(" Hoje tem empresa própria. "),
      t("90% das vendas vêm do tráfego pago."),
    ],
  },
  {
    id: 4,
    variant: "split",
    parts: [
      p("Outro era CLT. Implementou um sistema depois do expediente. Juntou "),
      t("12 meses de salário"),
      p(" e pediu dispensa."),
    ],
  },

  /* ── NÚMERO + GANCHO ──────────────────────────────────────────────────── */
  {
    id: 5,
    parts: [
      p("Mais de "),
      t("645 profissionais"),
      p(" do setor de engenharia e arquitetura fizeram isso desde 2021."),
    ],
  },
  {
    id: 6,
    parts: [p("E todos eles tinham uma coisa em comum antes de começar:")],
  },
  {
    id: 7,
    variant: "dark",
    parts: [
      p("Eram bons tecnicamente. "),
      r("MAS invisíveis comercialmente."),
    ],
  },
  {
    id: 8,
    parts: [
      p("A pergunta é: "),
      t("o que eles descobriram que você ainda não sabe?"),
    ],
  },

  /* ── A RESPOSTA ───────────────────────────────────────────────────────── */
  {
    id: 9,
    parts: [p("A resposta não é talento. Não é sorte. Não é cidade grande.")],
  },
  {
    id: 10,
    parts: [
      p("É uma "),
      r("falha estrutural"),
      p(" que o sistema de formação criou em todo engenheiro e arquiteto do Brasil."),
    ],
  },
  {
    id: 11,
    parts: [
      p("E que, quando corrigida, transforma "),
      r("imprevisibilidade"),
      p(" em "),
      t("fluxo contínuo e controlado de clientes."),
    ],
  },

  /* ── A FACULDADE FALHOU ───────────────────────────────────────────────── */
  {
    id: 12,
    parts: [p("A faculdade passou 5 anos te ensinando a controlar variáveis técnicas.")],
  },
  {
    id: 13,
    parts: [p("Carga, tensão, resistência, coeficiente de segurança.")],
  },
  {
    id: 14,
    parts: [
      p("Mas nunca te ensinou a controlar a variável mais importante do seu negócio: "),
      r("a entrada de clientes."),
    ],
  },
  {
    id: 15,
    parts: [
      p("Não existe, na grade curricular de nenhuma engenharia do Brasil, uma disciplina que te ensine a atrair cliente, conduzir uma venda e cobrar o que você vale."),
    ],
  },
  {
    id: 16,
    variant: "red-impact",
    parts: [p("Zero.")],
  },

  /* ── CONSEQUÊNCIAS ────────────────────────────────────────────────────── */
  {
    id: 17,
    parts: [
      p("Então você saiu da faculdade com "),
      t("domínio técnico completo."),
      p(" E com "),
      r("zero sistema comercial."),
    ],
  },
  {
    id: 18,
    parts: [
      p("E sem sistema comercial, você depende de indicação. Que não controla. Que não sabe quando vem. Que não escolhe o cliente."),
    ],
  },
  {
    id: 19,
    variant: "dark",
    parts: [
      t("Mês com 15, 25 mil."),
      p(" "),
      r("Mês zerado."),
    ],
  },

  /* ── NÃO É CULPA SUA ──────────────────────────────────────────────────── */
  {
    id: 20,
    parts: [p("Isso não é fraqueza. Não é falta de esforço.")],
  },
  {
    id: 21,
    variant: "green-impact",
    parts: [p("É uma falha estrutural do sistema que te formou. E tem solução.")],
  },

  /* ── CTA ──────────────────────────────────────────────────────────────── */
  {
    id: 22,
    parts: [p("Me dá 18 minutos.")],
  },
  {
    id: 23,
    parts: [
      p("Vou te mostrar qual é essa causa raiz, por que tudo que você tentou até hoje não resolveu, e o sistema exato que esses "),
      t("645 engenheiros"),
      p(" usaram pra ter fluxo de clientes previsível — sem agência, sem gestor de tráfego, dependendo só do próprio braço."),
    ],
  },

];
