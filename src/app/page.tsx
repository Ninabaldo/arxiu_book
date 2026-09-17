import { AccessGate } from "@/components/AccessGate";
import { BookExperience } from "@/components/book/BookExperience";
import { loadPublishedReflections } from "@/content";

export default async function HomePage() {
  const reflections = await loadPublishedReflections();
  return (
    <AccessGate>
      <BookExperience reflections={reflections} />
    </AccessGate>
  );
}
