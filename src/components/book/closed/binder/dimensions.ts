/**
 * Informal ring binder / arxivador (~same footprint as the hardcover for camera framing).
 * Slightly thicker page block so rings read clearly between boards.
 */
export const BINDER = {
  width: 1.62,
  height: 2.22,
  coverThickness: 0.018,
  pageDepth: 0.1,
  pageInsetX: 0.02,
  pageInsetY: 0.02,
  /** Left margin for ring mechanism + punched edge */
  ringInset: 0.11,
  cornerRadius: 0.01,
  /** Vertical silver rail */
  railWidth: 0.028,
  railDepth: 0.022,
  ringCount: 4,
  ringRadius: 0.055,
  ringTube: 0.0075,
} as const;

export function binderTotalDepth() {
  return BINDER.coverThickness * 2 + BINDER.pageDepth;
}
