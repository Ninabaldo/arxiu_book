/**
 * Measure-based pagination: fill each page down to the shared bottom margin
 * without overflowing. Remaining space is filled word-by-word; overflow
 * continues on the next leaf.
 */

function splitParagraphs(content: string): string[] {
  return content
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function renderParagraph(text: string): HTMLParagraphElement {
  const p = document.createElement("p");
  p.className = "page-body__text";
  p.textContent = text;
  return p;
}

/**
 * True inked height of children (top of first → bottom of last),
 * not scrollHeight — avoids flex/box quirks that pack one line too many.
 */
function usedHeight(body: HTMLElement): number {
  const kids = body.children;
  if (kids.length === 0) return 0;
  const first = (kids[0] as HTMLElement).getBoundingClientRect();
  const last = (kids[kids.length - 1] as HTMLElement).getBoundingClientRect();
  return last.bottom - first.top;
}

function fits(body: HTMLElement, maxHeight: number): boolean {
  return usedHeight(body) <= maxHeight + 0.01;
}

/**
 * How many leading words of `text` fit into `body`
 * (which may already contain prior paragraphs).
 */
function fitWords(
  body: HTMLElement,
  text: string,
  maxHeight: number,
): { taken: string; rest: string } {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return { taken: "", rest: "" };

  // Fast path: whole text fits
  const full = renderParagraph(words.join(" "));
  body.appendChild(full);
  const fullOk = fits(body, maxHeight);
  body.removeChild(full);
  if (fullOk) return { taken: words.join(" "), rest: "" };

  let lo = 1;
  let hi = words.length - 1;
  let best = 0;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const probe = renderParagraph(words.slice(0, mid).join(" "));
    body.appendChild(probe);
    const ok = fits(body, maxHeight);
    body.removeChild(probe);
    if (ok) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (best === 0) {
    // Nothing fits on this page — leave for the next one
    return { taken: "", rest: words.join(" ") };
  }

  return {
    taken: words.slice(0, best).join(" "),
    rest: words.slice(best).join(" "),
  };
}

/**
 * Paginate `content` into page-sized chunks using a live `.page-body` element
 * as the measure root (same typography / width / height as a real page).
 */
export function chunkContentMeasured(
  content: string,
  body: HTMLElement,
): string[] {
  // Prefer content-box height (excludes padding) so we don't pack into the pad
  const clientH = body.clientHeight;
  const style = window.getComputedStyle(body);
  const padY =
    (parseFloat(style.paddingTop) || 0) +
    (parseFloat(style.paddingBottom) || 0);
  const contentBoxH = Math.max(0, clientH - padY);
  const rawWidth = Math.floor(body.getBoundingClientRect().width);

  // Guard against collapsed probe (was producing ~1 word per page → thousands of pages)
  if (contentBoxH < 120 || rawWidth < 140) {
    return [];
  }

  const sample = renderParagraph("Mg");
  body.appendChild(sample);
  const sampleStyles = window.getComputedStyle(sample);
  const fontSize = parseFloat(sampleStyles.fontSize) || 10.5;
  const lineHeightRaw = sampleStyles.lineHeight;
  const lineHeight =
    lineHeightRaw === "normal"
      ? fontSize * 1.42
      : parseFloat(lineHeightRaw) || fontSize * 1.42;
  body.removeChild(sample);

  // Keep the last line fully clear of the clip edge (folio zone + descenders)
  const isNarrow =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 720px)").matches;
  const reserveLines = isNarrow ? 3 : 2;
  const maxHeight = Math.max(
    80,
    Math.floor(contentBoxH - lineHeight * reserveLines - 4),
  );

  const paragraphs = splitParagraphs(content);
  if (paragraphs.length === 0) return [""];

  const chunks: string[] = [];
  let current: string[] = [];

  const flush = () => {
    if (current.length === 0) return;
    chunks.push(current.join("\n\n"));
    current = [];
    body.replaceChildren();
  };

  const queue = [...paragraphs];

  while (queue.length > 0) {
    const paragraph = queue.shift()!;
    const node = renderParagraph(paragraph);
    body.appendChild(node);

    if (fits(body, maxHeight)) {
      current.push(paragraph);
      continue;
    }

    body.removeChild(node);

    const { taken, rest } = fitWords(body, paragraph, maxHeight);

    if (taken) {
      body.appendChild(renderParagraph(taken));
      current.push(taken);
      flush();
      if (rest) queue.unshift(rest);
      continue;
    }

    if (current.length > 0) {
      flush();
      queue.unshift(paragraph);
      continue;
    }

    // Empty page and nothing fits — abort to heuristic fallback
    body.replaceChildren();
    return [];
  }

  flush();

  // Sanity: a single chapter should never need hundreds of pages
  if (chunks.length > 120) {
    return [];
  }

  return chunks.length > 0 ? chunks : [""];
}
