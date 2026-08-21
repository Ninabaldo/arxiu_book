import type {
  Locale,
  Reflection,
  ReflectionRecord,
  ReflectionTranslationRecord,
} from "@/types";
import { LOCALES } from "@/types";
import { reflectionRecords, reflectionTranslations } from "@/content/seed";

/**
 * Content access layer.
 * Today: local seed. Tomorrow: swap for Supabase queries without changing UI.
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

export function getAllReflections(): Reflection[] {
  return reflectionRecords
    .map((record) =>
      joinReflection(
        record,
        reflectionTranslations.filter((t) => t.reflection_id === record.id),
      ),
    )
    .sort((a, b) => a.order - b.order);
}

export function getPublishedReflections(): Reflection[] {
  return getAllReflections().filter((r) => r.published);
}

export function getReflectionById(id: string): Reflection | undefined {
  return getAllReflections().find((r) => r.id === id);
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
