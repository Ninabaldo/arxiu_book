import { BookExperience } from "@/components/book/BookExperience";
import { loadPublishedReflections } from "@/content";

export default async function HomePage() {
  const reflections = await loadPublishedReflections();
  return <BookExperience reflections={reflections} />;
}
