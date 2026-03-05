/* ─────────────────────────────────────────────────────────────────────────────
   SLIDES DATA — lead4-vsl4
   Edite este arquivo para montar a apresentação.

   COMO ESCREVER O TEXTO:
   ─ p("texto")   → texto preto normal
   ─ t("texto")   → texto teal/verde (destaque positivo)
   ─ r("texto")   → texto vermelho (destaque negativo / dor)
   ─ o("texto")   → texto laranja

   VARIANTES DE SLIDE (campo `variant`):
   ─ (omitir)          → slide padrão, fundo claro
   ─ "dark"            → fundo azul-escuro, texto claro
   ─ "red-impact"      → fundo vermelho, fonte grande
   ─ "green-impact"    → fundo verde, fonte grande
   ─ "image"           → placeholder fullscreen de imagem
   ─ "cycle"           → fluxograma com cycleItems
   ─ "list-logos"      → pílulas com nomes (campo logos)
   ─ "table"           → tabela (campos tableTitle/tableHeader/tableRows)
   ─ "split"           → texto à esquerda + print à direita

   IMAGENS (pasta public/):
   ─ Coloque o arquivo em public/provas/ ou public/mockups/
   ─ Referencie como: "/provas/nome-do-arquivo.jpg"
─────────────────────────────────────────────────────────────────────────────── */

export type Color = "red" | "teal" | "orange";

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
  | "split";

export type TableRow = {
  cells: string[];
};

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
};

const p = (text: string): Part => ({ text });
const t = (text: string): Part => ({ text, color: "teal" });
const r = (text: string): Part => ({ text, color: "red" });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const o = (text: string): Part => ({ text, color: "orange" });

/* ══════════════════════════════════════════════════════════════════════════════
   ADICIONE OS SLIDES ABAIXO
   Cada slide é um objeto { id, variant?, parts?, ... }
   O id pode ser qualquer número único — só serve como chave interna.
══════════════════════════════════════════════════════════════════════════════ */
export const SLIDES: Slide[] = [

  /* Exemplo — apague e substitua pelo seu conteúdo: */
  {
    id: 1,
    parts: [p("Slide 1 — adicione seu texto aqui.")],
  },
  {
    id: 2,
    parts: [p("Slide 2 — "), t("destaque positivo"), p(" e "), r("destaque negativo.")],
  },

];
