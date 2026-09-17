import { AccessGate } from "@/components/AccessGate";
import { BookExperience } from "@/components/book/BookExperience";
import { loadPublishedReflections } from "@/content";

/** Always read fresh seed after manuscript syncs during local editing. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const reflections = await loadPublishedReflections();
  return (
    <AccessGate>
      <BookExperience reflections={reflections} />
    </AccessGate>
  );
}
