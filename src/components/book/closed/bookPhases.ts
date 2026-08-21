import type { CoverCopy } from "@/i18n/cover";
import type { BookSpread, Locale, Reflection } from "@/types";

/** Interior reading surface mounted inside the same 3D book as the cover. */
export interface InteriorBookProps {
  reflections: Reflection[];
  spreads: BookSpread[];
  locale: Locale;
  copy: CoverCopy;
  spreadIndex: number;
  onSpreadChange: (index: number) => void;
  onSelectReflection: (id: string) => void;
  onOpenIndex: () => void;
}

export type BookPhase = "closed" | "open";
