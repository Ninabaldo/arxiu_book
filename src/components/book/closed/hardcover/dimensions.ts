/**
 * Slim premium hardcover (~16 × 22 cm literary book).
 * Previous R3F pass was ~3× too thick — keep page block modest.
 */
export const BOOK = {
  width: 1.62,
  height: 2.22,
  /** Board thickness */
  coverThickness: 0.016,
  /** Visible paper block depth (thin art-book signature) */
  pageDepth: 0.085,
  pageInsetX: 0.014,
  pageInsetY: 0.016,
  spineInset: 0.01,
  /** Subtle manufactured corners — not pill-soft */
  cornerRadius: 0.006,
} as const;

export function bookTotalDepth() {
  return BOOK.coverThickness * 2 + BOOK.pageDepth;
}
