import type {
  ReflectionRecord,
  ReflectionTranslationRecord,
} from "@/types";
import { seedTranslations } from "./seedTranslations.generated";

/**
 * Narrative chapters (Violeta Mayer).
 *
 * Edit Catalan text in: src/content/manuscript/ca.md
 * Then (with npm run dev) it syncs automatically to chapters + this seed.
 * Manual sync: npm run content:sync
 */

export const reflectionRecords: ReflectionRecord[] = [
  {
    id: "1",
    slug: "no-perque-et-necessiti",
    order: 1,
    type: "reflection",
    status: "published",
    image: "/chapters/01.jpg",
  },
  {
    id: "2",
    slug: "entre-el-si-i-el-no",
    order: 2,
    type: "reflection",
    status: "published",
    image: "/chapters/02.jpg",
  },
  {
    id: "3",
    slug: "deixar-una-porta-oberta",
    order: 3,
    type: "reflection",
    status: "published",
    image: "/chapters/03.jpg",
  },
  {
    id: "4",
    slug: "quan-baixes-la-guardia",
    order: 4,
    type: "reflection",
    status: "published",
    image: "/chapters/04.jpg",
  },
  {
    id: "5",
    slug: "qui-porta-el-volant",
    order: 5,
    type: "reflection",
    status: "published",
    image: "/chapters/05.jpg",
  },
  {
    id: "6",
    slug: "passar-del-mobil",
    order: 6,
    type: "reflection",
    status: "published",
    image: "/chapters/06.jpg",
  },
  {
    id: "7",
    slug: "bidireccionalitat",
    order: 7,
    type: "reflection",
    status: "published",
    image: "/chapters/07.jpg",
  },
];

export const reflectionTranslations: ReflectionTranslationRecord[] =
  seedTranslations.map((row, index) => ({
    id: `tr-${index + 1}`,
    reflection_id: row.reflection_id,
    language: row.language,
    title: row.title,
    content: row.content,
  }));
