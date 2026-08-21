/**
 * Closed landing hero format switch.
 *
 * - `"hardcover"`: classic oatmeal linen book (under `./hardcover/`)
 * - `"binder"`: informal burgundy arxivador with silver 4-ring mechanism
 *
 * Active format is the hardcover linen book. Set to `"binder"` for the arxivador.
 */
export type ClosedFormat = "hardcover" | "binder";

export const CLOSED_FORMAT: ClosedFormat = "hardcover";
