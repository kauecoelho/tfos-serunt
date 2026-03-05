/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA — lead3-vsl1
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

  /* ── PARADOXO DE ABERTURA ─────────────────────────────────────────────── */
  {
    id: 1,
    variant: "dark",
    parts: [p("Engenheiro e arquiteto autônomo no Brasil vive um paradoxo.")],
  },
  {
    id: 2,
    parts: [
      p("Você é um dos profissionais mais qualificados do país. Assina ART. Tem responsabilidade técnica nas costas. Domina cálculo, NBR, projeto executivo."),
    ],
  },
  {
    id: 3,
    parts: [
      p("Mas toda segunda-feira, você abre o WhatsApp esperando uma mensagem que "),
      r("não sabe se vem."),
    ],
  },
  {
    id: 4,
    parts: [p("E começa a fazer as contas na cabeça.")],
  },

  /* ── DOR ──────────────────────────────────────────────────────────────── */
  {
    id: 5,
    parts: [
      t("Mês com 20, mês com 30 mil."),
      p(" "),
      r("Mês zerado."),
      p(" Trabalhando que nem condenado e no final ainda sente que trabalhou de graça."),
    ],
  },
  {
    id: 6,
    variant: "red-impact",
    parts: [p("E o pior: você não consegue entender por quê.")],
  },
  {
    id: 7,
    parts: [p("Você não é ruim no que faz. Você sabe disso.")],
  },
  {
    id: 8,
    parts: [p("Então qual é o problema?")],
  },
  {
    id: 9,
    parts: [p("Eu vou te dizer. E provavelmente ninguém nunca te falou isso de forma direta.")],
  },

  /* ── A FACULDADE FALHOU ───────────────────────────────────────────────── */
  {
    id: 10,
    parts: [p("A faculdade passou 5 anos te ensinando a controlar variáveis técnicas.")],
  },
  {
    id: 11,
    parts: [p("Carga, tensão, resistência, coeficiente de segurança.")],
  },
  {
    id: 12,
    parts: [
      p("Te formaram pra eliminar imprevisibilidade "),
      t("dentro do projeto."),
    ],
  },
  {
    id: 13,
    parts: [p("Mas nunca te ensinaram a controlar a variável mais importante do seu negócio:")],
  },
  {
    id: 14,
    variant: "red-impact",
    parts: [p("A entrada de clientes.")],
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
      p("Você saiu da faculdade com "),
      t("domínio técnico completo."),
      p(" E "),
      r("comercialmente vulnerável."),
    ],
  },
  {
    id: 18,
    parts: [
      p("E sem sistema comercial, você faz o quê? "),
      r("Depende de indicação."),
    ],
  },
  {
    id: 19,
    parts: [p("Indicação que não controla. Que não sabe quando vem. Que não escolhe o cliente.")],
  },
  {
    id: 20,
    variant: "dark",
    parts: [r("Você virou refém de uma variável que nunca foi ensinado a controlar.")],
  },

  /* ── NÃO É CULPA SUA ──────────────────────────────────────────────────── */
  {
    id: 21,
    parts: [p("Isso não é fraqueza. Não é falta de esforço. Não é o seu mercado.")],
  },
  {
    id: 22,
    parts: [
      p("É uma "),
      r("falha estrutural"),
      p(" do sistema que te formou."),
    ],
  },
  {
    id: 23,
    variant: "dark",
    parts: [
      p("E quando o engenheiro descobre isso — e aprende a corrigir — "),
      t("tudo muda."),
    ],
  },

  /* ── PROVA SOCIAL + RESULTADO ─────────────────────────────────────────── */
  {
    id: 24,
    parts: [
      p("Mais de "),
      t("645 engenheiros e arquitetos"),
      p(" descobriram essa causa raiz desde 2021. A média de resultado?"),
    ],
  },
  {
    id: 25,
    parts: [
      t("2 a 3 projetos fechados todo mês."),
      p(" Cobrando "),
      t("40% mais caro."),
      p(" Sem agência. Sem gestor de tráfego. Dependendo só do próprio braço."),
    ],
  },

  /* ── CTA ──────────────────────────────────────────────────────────────── */
  {
    id: 26,
    parts: [p("Vou te mostrar por que tudo que você tentou até hoje não resolveu isso.")],
  },
  {
    id: 27,
    parts: [
      p("E o sistema exato pra transformar "),
      r("imprevisibilidade"),
      p(" em "),
      t("fluxo de clientes contínuo e controlado."),
    ],
  },
  {
    id: 28,
    variant: "dark",
    parts: [p("Se fizer sentido pra você, você decide. Se não fizer, continuamos amigos.")],
  },

];
