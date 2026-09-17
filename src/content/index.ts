import type {
  Locale,
  Reflection,
  ReflectionRecord,
  ReflectionTranslationRecord,
} from "@/types";
import { LOCALES } from "@/types";
import { reflectionRecords, reflectionTranslations } from "@/content/seed";
import { getSupabase, hasSupabaseEnv } from "@/lib/supabase";

/**
 * Content access layer.
 * Prefers local Supabase when env is set; falls back to seed on miss/error.
 */

function joinReflection(
  record: ReflectionRecord,
  translations: ReflectionTranslationRecord[],
): Reflection {
  const title: Reflection["title"] = {};
  const content: Reflection["content"] = {};
  const translationStatus = {} as Reflection["translationStatus"];

  for (const locale of LOCALES) {
    const row = translations.find(
      (t) => t.reflection_id === record.id && t.language === locale,
    );
    title[locale] = row?.title ?? "";
    content[locale] = row?.content ?? "";
    translationStatus[locale] = {
      title: Boolean(row?.title?.trim()),
      content: Boolean(row?.content?.trim()),
    };
  }

  return {
    id: record.id,
    slug: record.slug,
    order: record.order,
    type: record.type,
    published: record.status === "published",
    image: record.image,
    title,
    content,
    translationStatus,
  };
}

function joinAll(
  records: ReflectionRecord[],
  translations: ReflectionTranslationRecord[],
): Reflection[] {
  return records
    .map((record) =>
      joinReflection(
        record,
        translations.filter((t) => t.reflection_id === record.id),
      ),
    )
    .sort((a, b) => a.order - b.order);
}

function getSeedReflections(): Reflection[] {
  return joinAll(reflectionRecords, reflectionTranslations);
}

type ReflectionRow = {
  id: string;
  slug: string;
  order: number;
  type: ReflectionRecord["type"];
  status: ReflectionRecord["status"];
  image: string | null;
};

type TranslationRow = {
  id: string;
  reflection_id: string;
  language: Locale;
  title: string;
  content: string;
};

async function fetchFromSupabase(): Promise<Reflection[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: reflections, error: reflectionsError } = await supabase
    .from("reflections")
    .select("id, slug, order, type, status, image")
    .order("order", { ascending: true });

  if (reflectionsError || !reflections?.length) {
    if (reflectionsError) {
      console.warn("[content] Supabase reflections failed:", reflectionsError.message);
    }
    return null;
  }

  const { data: translations, error: translationsError } = await supabase
    .from("reflection_translations")
    .select("id, reflection_id, language, title, content");

  if (translationsError) {
    console.warn(
      "[content] Supabase translations failed:",
      translationsError.message,
    );
    return null;
  }

  const records: ReflectionRecord[] = (reflections as ReflectionRow[]).map(
    (row) => ({
      id: row.id,
      slug: row.slug,
      order: row.order,
      type: row.type,
      status: row.status,
      image: row.image ?? undefined,
    }),
  );

  const translationRecords: ReflectionTranslationRecord[] = (
    (translations ?? []) as TranslationRow[]
  ).map((row) => ({
    id: row.id,
    reflection_id: row.reflection_id,
    language: row.language,
    title: row.title,
    content: row.content,
  }));

  return joinAll(records, translationRecords);
}

/** Sync seed path — used when Supabase is unavailable. */
export function getAllReflections(): Reflection[] {
  return getSeedReflections();
}

export function getPublishedReflections(): Reflection[] {
  return getAllReflections().filter((r) => r.published);
}

export function getReflectionById(id: string): Reflection | undefined {
  return getAllReflections().find((r) => r.id === id);
}

/**
 * Async loader for Server Components / route handlers.
 * Uses the local seed (chapter txt files) as source of truth.
 * Set NEXT_PUBLIC_CONTENT_SOURCE=supabase to read from Supabase instead.
 */
export async function loadPublishedReflections(): Promise<Reflection[]> {
  const useSupabase =
    process.env.NEXT_PUBLIC_CONTENT_SOURCE === "supabase" && hasSupabaseEnv();

  if (useSupabase) {
    try {
      const fromDb = await fetchFromSupabase();
      if (fromDb?.length) {
        return fromDb.filter((r) => r.published);
      }
    } catch (err) {
      console.warn("[content] Supabase load error, using seed:", err);
    }
  }
  return getPublishedReflections();
}

export function getLocalizedField(
  value: Partial<Record<Locale, string>> | undefined,
  locale: Locale,
  fallback: Locale = "ca",
): string {
  if (!value) return "";
  return (
    value[locale] ||
    value[fallback] ||
    value.ca ||
    value.es ||
    value.en ||
    value.fr ||
    ""
  );
}

/** Languages missing title or content — useful for future admin publish checks. */
export function getMissingTranslations(reflection: Reflection): Locale[] {
  return LOCALES.filter(
    (locale) =>
      !reflection.translationStatus[locale].title ||
      !reflection.translationStatus[locale].content,
  );
}
