import type { BookPageModel, BookSpread, Locale, Reflection } from "@/types";
import { getLocalizedField } from "@/content";
import { BEGINNING_ID } from "@/content/beginning";

/** Precomputed body chunks per reflection id. */
export type ChunkMap = Record<string, string[]>;

export function getLocalized(
  value: Partial<Record<Locale, string>> | undefined,
  locale: Locale,
  fallback: Locale = "ca",
): string {
  return getLocalizedField(value, locale, fallback);
}

export function padOrder(order: number): string {
  return String(order).padStart(2, "0");
}

/**
 * Split body into page-sized chunks by estimated vertical space
 * (not raw character count), so full pages end at a similar height.
 * Short dialogue lines count almost like long prose lines.
 * Overflow continues on the next leaf — no on-page scroll.
 */
export function chunkContent(content: string): string[] {
  const trimmed = content.trim();
  if (!trimmed) return [""];

  const paragraphs = trimmed
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return [""];

  const queue = paragraphs.flatMap((paragraph) =>
    splitToPageUnits(paragraph, PAGE_LINE_BUDGET),
  );

  const chunks: string[] = [];
  let current: string[] = [];
  let used = 0;

  const flush = () => {
    if (current.length === 0) return;
    chunks.push(current.join("\n\n"));
    current = [];
    used = 0;
  };

  while (queue.length > 0) {
    const unit = queue.shift()!;
    const cost = estimateUnitLines(unit);

    if (current.length > 0 && used + cost > PAGE_LINE_BUDGET) {
      const remaining = PAGE_LINE_BUDGET - used;
      // Top up an under-filled page with a carved piece of the next unit
      if (remaining >= 4) {
        const carved = carveFit(unit, remaining);
        if (carved.taken) {
          current.push(carved.taken);
          queue.unshift(...carved.rest);
          flush();
          continue;
        }
      }
      flush();
      queue.unshift(unit);
      continue;
    }

    if (cost > PAGE_LINE_BUDGET) {
      queue.unshift(...splitToPageUnits(unit, PAGE_LINE_BUDGET));
      continue;
    }

    current.push(unit);
    used += cost;
  }

  flush();
  return chunks.length > 0 ? chunks : [""];
}

/** ~chars per wrapped line in the shared ~380px Baskerville column */
const CHARS_PER_LINE = 48;
/**
 * Vertical budget for one body page (text lines + paragraph gaps).
 * One line short of the physical bottom so text never sits on the edge.
 */
const PAGE_LINE_BUDGET = 40;
/** Extra cost per paragraph ≈ margin-bottom 0.7em / line-height 1.42 */
const PARA_GAP = 0.5;

function estimateUnitLines(text: string): number {
  const lines = Math.max(1, Math.ceil(text.length / CHARS_PER_LINE));
  return lines + PARA_GAP;
}

/** Take as much of `text` as fits in `lineBudget`; return the rest. */
function carveFit(
  text: string,
  lineBudget: number,
): { taken: string | null; rest: string[] } {
  const maxChars = Math.max(
    24,
    Math.floor((lineBudget - PARA_GAP) * CHARS_PER_LINE),
  );
  if (text.length <= maxChars) {
    return { taken: text, rest: [] };
  }

  // Prefer breaking on a sentence end inside the budget
  const window = text.slice(0, maxChars + 1);
  const sentenceBreak = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? "),
    window.lastIndexOf("… "),
  );
  let cut = sentenceBreak > maxChars * 0.35 ? sentenceBreak + 1 : -1;

  if (cut < 0) {
    const space = window.lastIndexOf(" ");
    cut = space > maxChars * 0.4 ? space : maxChars;
  }

  const taken = text.slice(0, cut).trim();
  const restText = text.slice(cut).trim();
  if (!taken) return { taken: null, rest: [text] };
  return { taken, rest: restText ? [restText] : [] };
}

/** Break a paragraph into pieces that each fit within a page budget. */
function splitToPageUnits(paragraph: string, budget: number): string[] {
  if (estimateUnitLines(paragraph) <= budget) return [paragraph];

  const maxChars = Math.max(40, Math.floor((budget - PARA_GAP) * CHARS_PER_LINE));
  const sentences = paragraph
    .split(/(?<=[.!?…»"”])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return hardWrap(paragraph, maxChars);
  }

  const parts: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (estimateUnitLines(sentence) > budget) {
      if (current) {
        parts.push(current);
        current = "";
      }
      parts.push(...hardWrap(sentence, maxChars));
      continue;
    }
    const next = current ? `${current} ${sentence}` : sentence;
    if (estimateUnitLines(next) > budget && current) {
      parts.push(current);
      current = sentence;
    } else {
      current = next;
    }
  }
  if (current) parts.push(current);
  return parts;
}

function hardWrap(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const parts: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      parts.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) parts.push(current);
  return parts.length > 0 ? parts : [text];
}

function bodyPage(
  reflection: Reflection,
  chunkIndex: number,
  side: "left" | "right",
): BookPageModel {
  return {
    id: `${reflection.id}-body-${chunkIndex}`,
    kind: "content",
    reflectionId: reflection.id,
    side,
    role:
      reflection.type === "letter"
        ? "letter"
        : reflection.type === "fragment"
          ? "fragment"
          : "body",
    bodyChunk: chunkIndex,
  };
}

function blankPage(
  reflectionId: string,
  index: number,
  side: "left" | "right" = "right",
): BookPageModel {
  return {
    id: `${reflectionId}-blank-${index}`,
    kind: "blank",
    side,
  };
}

function beginningSpread(): BookSpread {
  return {
    id: "spread-beginning",
    left: {
      id: "beginning-blank",
      kind: "blank",
      side: "left",
    },
    right: {
      id: "beginning-page",
      kind: "content",
      side: "right",
      role: "beginning",
      reflectionId: BEGINNING_ID,
    },
  };
}

/**
 * Builds book spreads from published reflections.
 *
 * Front matter:
 *   [ blank | beginning text ]
 *
 * Double-page sheet:
 *   [ title | body ]           ← first open spread
 *   [ continuation | … ]       ← verso of the turned leaf (“la del darrere”)
 *
 * Overflow fills the back of the sheet (next left), then the following right, etc.
 *
 * @param chunkMap Optional measure-based chunks keyed by reflection id.
 *                 Falls back to heuristic `chunkContent` when missing.
 */
export function buildSpreads(
  reflections: Reflection[],
  locale: Locale,
  chunkMap?: ChunkMap | null,
): BookSpread[] {
  const published = [...reflections]
    .filter((r) => r.published)
    .sort((a, b) => a.order - b.order);

  const spreads: BookSpread[] = [beginningSpread()];

  for (const reflection of published) {
    const body = getLocalized(reflection.content, locale);
    const chunks =
      chunkMap?.[reflection.id]?.length
        ? chunkMap[reflection.id]
        : chunkContent(body);

    spreads.push({
      id: `spread-${reflection.id}-0`,
      left: {
        id: `${reflection.id}-title`,
        kind: "content",
        reflectionId: reflection.id,
        side: "left",
        role: reflection.type === "quote" ? "quote" : "title",
      },
      right: bodyPage(reflection, 0, "right"),
    });

    // Remaining chunks ride on subsequent sheets:
    // left = back of previous right leaf, right = next front.
    let overflowIndex = 0;
    for (let i = 1; i < chunks.length; i += 2) {
      overflowIndex += 1;
      const leftChunk = i;
      const rightChunk = i + 1;

      spreads.push({
        id: `spread-${reflection.id}-${overflowIndex}`,
        left: bodyPage(reflection, leftChunk, "left"),
        right:
          rightChunk < chunks.length
            ? bodyPage(reflection, rightChunk, "right")
            : blankPage(reflection.id, overflowIndex),
      });
    }
  }

  return spreads;
}

export function findSpreadIndexForReflection(
  spreads: BookSpread[],
  reflectionId: string,
): number {
  if (reflectionId === BEGINNING_ID) {
    return spreads.findIndex((s) => s.id === "spread-beginning");
  }
  return spreads.findIndex(
    (s) =>
      s.left.reflectionId === reflectionId ||
      s.right.reflectionId === reflectionId,
  );
}
