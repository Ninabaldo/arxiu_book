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

Aquestes són algunes de les reflexions que m'he anat fent al llarg del temps. Algunes tenen més fons que d'altres, però totes parteixen de coses que he viscut, pensat o sentit.

No hi ha un ordre concret, perquè els pensaments tampoc en tenen. Són idees que he anat ordenant amb el temps i que, en algun moment, m'han semblat prou interessants per voler-les compartir.

No pretenen ser veritats absolutes ni consells per a ningú. Són simplement coses que he anat entenent a la meva manera, a partir de la meva experiència.

Si alguna d'aquestes reflexions et remou alguna cosa, ja haurà valgut la pena compartir-les.

Nina`,

  es: `Cuando escribo, ordeno mis pensamientos.
Cuando los leo, todo toma forma.

Estas son algunas de las reflexiones que me he ido haciendo a lo largo del tiempo. Algunas tienen más fondo que otras, pero todas parten de cosas que he vivido, pensado o sentido.

No hay un orden concreto, porque los pensamientos tampoco lo tienen. Son ideas que he ido ordenando con el tiempo y que, en algún momento, me han parecido lo bastante interesantes como para querer compartirlas.

No pretenden ser verdades absolutas ni consejos para nadie. Son simplemente cosas que he ido entendiendo a mi manera, a partir de mi experiencia.

Si alguna de estas reflexiones te remueve algo, ya habrá valido la pena compartirlas.

Nina`,

  en: `When I write, I order my thoughts.
When I read them, everything takes shape.

These are some of the reflections I have been making over time. Some have more depth than others, but all come from things I have lived, thought or felt.

There is no set order, because thoughts do not have one either. They are ideas I have been putting in place over time and that, at some point, seemed interesting enough to want to share.

They do not claim to be absolute truths or advice for anyone. They are simply things I have come to understand in my own way, from my own experience.

If any of these reflections moves something in you, sharing them will already have been worth it.

Nina`,

  fr: `Quand j'écris, j'ordonne mes pensées.
Quand je les lis, tout prend forme.

Voici quelques-unes des réflexions que je me suis faites au fil du temps. Certaines ont plus de fond que d'autres, mais toutes partent de choses que j'ai vécues, pensées ou ressenties.

Il n'y a pas d'ordre précis, parce que les pensées n'en ont pas non plus. Ce sont des idées que j'ai ordonnées avec le temps et qui, à un moment donné, m'ont semblé assez intéressantes pour vouloir les partager.

Elles ne prétendent pas être des vérités absolues ni des conseils pour quiconque. Ce sont simplement des choses que j'ai fini par comprendre à ma manière, à partir de mon expérience.

Si l'une de ces réflexions remue quelque chose en toi, les avoir partagées aura déjà valu la peine.

Nina`,
};
