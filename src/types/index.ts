export type Locale = "ca" | "es" | "en" | "fr";

export const LOCALES: Locale[] = ["ca", "es", "en", "fr"];

export type PageType =
  | "reflection"
  | "short"
  | "letter"
  | "quote"
  | "image"
  | "handwritten"
  | "fragment"
  | "moment"
  | "empty";

export type PublishStatus = "draft" | "published";

/**
 * Mirrors future Supabase `reflections` table.
 * created_at / updated_at are internal only — never render publicly.
 */
export interface ReflectionRecord {
  id: string;
  slug: string;
  order: number;
  type: PageType;
  status: PublishStatus;
  /** Chapter photo under the title — path under /public */
  image?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Mirrors future Supabase `reflection_translations` table.
 * One row per language — independent editorial texts, not auto-translated strings.
 */
export interface ReflectionTranslationRecord {
  id: string;
  reflection_id: string;
  language: Locale;
  title: string;
  content: string;
}

/** UI-facing reflection (joined). No public dates. */
export interface Reflection {
  id: string;
  slug: string;
  order: number;
  type: PageType;
  published: boolean;
  /** Chapter photo under the title (optional until all chapters have one) */
  image?: string;
  title: Partial<Record<Locale, string>>;
  content: Partial<Record<Locale, string>>;
  /** Which languages have title + content ready */
  translationStatus: Record<Locale, { title: boolean; content: boolean }>;
}

export type BookMoment =
  | "cover"
  | "opening"
  | "closing"
  | "reading"
  | "closed"
  | "open";

export interface BookPageModel {
  id: string;
  kind: "index" | "blank" | "content";
  reflectionId?: string;
  side: "left" | "right" | "full";
  role?:
    | "title"
    | "body"
    | "quote"
    | "image"
    | "letter"
    | "fragment"
    | "moment"
    | "beginning";
  /** Paragraph index when a reflection spans multiple body pages */
  bodyChunk?: number;
}

export interface BookSpread {
  id: string;
  left: BookPageModel;
  right: BookPageModel;
}
