import type { BookPageModel, BookSpread, Locale, Reflection } from "@/types";
import { getLocalizedField } from "@/content";
import { BEGINNING_ID } from "@/content/beginning";

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
 * Split body into page-sized chunks.
 * Prefer a single page (right leaf of the title spread).
 * Only overflow when content clearly exceeds one page — never shrink type.
 *
 * ~14px Georgia / lh 1.3 / 410px column on ~620px page height.
 */
export function chunkContent(content: string, maxChars = 1400): string[] {
  const trimmed = content.trim();
  if (!trimmed) return [""];

  const paragraphs = trimmed
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return [""];

  // Short / medium texts stay on one page.
  if (trimmed.length <= maxChars) return [trimmed];

  const chunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const next = current ? `${current}\n\n${paragraph}` : paragraph;
    if (next.length > maxChars && current) {
      chunks.push(current);
      current = paragraph;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [""];
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
      id: "beginning-image",
      kind: "content",
      side: "left",
      role: "beginning-image",
      reflectionId: BEGINNING_ID,
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
 *   [ image | beginning text ]
 *
 * Double-page sheet:
 *   [ title | body ]           ← first open spread
 *   [ continuation | … ]       ← verso of the turned leaf (“la del darrere”)
 *
 * Overflow fills the back of the sheet (next left), then the following right, etc.
 */
export function buildSpreads(
  reflections: Reflection[],
  locale: Locale,
): BookSpread[] {
  const published = [...reflections]
    .filter((r) => r.published)
    .sort((a, b) => a.order - b.order);

  const spreads: BookSpread[] = [beginningSpread()];

  for (const reflection of published) {
    const body = getLocalized(reflection.content, locale);
    const chunks = chunkContent(body);

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
