import { BookExperience } from "@/components/book/BookExperience";
import { getPublishedReflections } from "@/content";

export default function HomePage() {
  const reflections = getPublishedReflections();
  return <BookExperience reflections={reflections} />;
}
