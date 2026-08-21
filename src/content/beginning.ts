import type { Locale } from "@/types";

/** Front matter before chapters — right leaf only, no on-page title. */
export const BEGINNING_ID = "beginning";

export const BEGINNING_IMAGE = "/chapters/beginning.jpg";

export const beginningIndexTitle: Record<Locale, string> = {
  ca: "Començament",
  es: "Comienzo",
  en: "Beginning",
  fr: "Commencement",
};

/** Opening page body — hand typography (chapter-number face). */
export const beginningBody: Record<Locale, string> = {
  ca: `Quan escric, ordeno els meus pensaments.
Quan els llegeixo, tot pren forma.

Aquestes són algunes de les reflexions que m'he fet i he conclòs al llarg dels dies. Algunes amb més fons que d'altres, però totes escrites des de la pura humilitat de la meva pròpia experiència.

No pretenen ser veritats absolutes, ni consells per a ningú. Només són el que he anat entenent, a la meva manera, en el meu propi camí.

Si alguna cosa d'aquí et remou, m'alegro. Si no, potser simplement encara no és el moment.

Nina`,

  es: `Cuando escribo, ordeno mis pensamientos.
Cuando los leo, todo toma forma.

Estas son algunas de las reflexiones que me he hecho y he concluido a lo largo de los días. Algunas con más fondo que otras, pero todas escritas desde la pura humildad de mi propia experiencia.

No pretenden ser verdades absolutas, ni consejos para nadie. Solo son lo que he ido entendiendo, a mi manera, en mi propio camino.

Si algo de aquí te remueve, me alegro. Si no, quizá simplemente aún no es el momento.

Nina`,

  en: `When I write, I order my thoughts.
When I read them, everything takes shape.

These are some of the reflections I have made and concluded over the days. Some with more depth than others, but all written from the pure humility of my own experience.

They do not claim to be absolute truths, nor advice for anyone. They are only what I have come to understand, in my own way, on my own path.

If something here moves you, I am glad. If not, perhaps it simply is not the time yet.

Nina`,

  fr: `Quand j'écris, j'ordonne mes pensées.
Quand je les lis, tout prend forme.

Voici quelques-unes des réflexions que je me suis faites et que j'ai conclues au fil des jours. Certaines avec plus de fond que d'autres, mais toutes écrites depuis la pure humilité de ma propre expérience.

Elles ne prétendent pas être des vérités absolues, ni des conseils pour quiconque. Elles sont seulement ce que j'ai fini par comprendre, à ma manière, sur mon propre chemin.

Si quelque chose ici te remue, j'en suis heureuse. Sinon, ce n'est peut-être simplement pas encore le moment.

Nina`,
};
