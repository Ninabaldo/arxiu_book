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
  ca: `Aquest llibre neix d’un moment de molts canvis.
D’una etapa en què tot el que coneixia es va moure, i jo també.
Vaig sentir la necessitat d’escriure per entendre, per ordenar,
per no perdre’m enmig del soroll.

No és un manual ni una història perfecta. És la meva història.
Una mirada honesta, a vegades caòtica, sovint vulnerable,
però sempre real. Aquí hi trobaràs reflexions, anècdotes, decisions,
dubtes i aprenentatges que m’han anat construint.

Escric com parlo, tal com penso. Sense filtres innecessaris,
amb la voluntat de compartir el que he viscut i el que he après
en aquest camí cap a una vida més meva: més lliure, més conscient,
més alineada amb el que vull.

No tinc totes les respostes, i està bé.
Però si alguna de les meves paraules et fa sentir menys sola,
et fa reflexionar o et dona un petit impuls, aleshores ja haurà valgut
la pena compartir-les.

Gràcies per ser aquí.
Benvinguda al meu món.

Violeta Mayer`,

  es: `Este libro nace de un momento de muchos cambios.
De una etapa en la que todo lo que conocía se movió, y yo también.
Sentí la necesidad de escribir para entender, para ordenar,
para no perderme en medio del ruido.

No es un manual ni una historia perfecta. Es mi historia.
Una mirada honesta, a veces caótica, a menudo vulnerable,
pero siempre real. Aquí encontrarás reflexiones, anécdotas, decisiones,
dudas y aprendizajes que me han ido construyendo.

Escribo como hablo, tal como pienso. Sin filtros innecesarios,
con la voluntad de compartir lo que he vivido y lo que he aprendido
en este camino hacia una vida más mía: más libre, más consciente,
más alineada con lo que quiero.

No tengo todas las respuestas, y está bien.
Pero si alguna de mis palabras te hace sentir menos sola,
te hace reflexionar o te da un pequeño impulso, entonces ya habrá valido
la pena compartirlas.

Gracias por estar aquí.
Bienvenida a mi mundo.

Violeta Mayer`,

  en: `This book was born from a moment of many changes.
From a stage when everything I knew shifted, and so did I.
I felt the need to write in order to understand, to put things in order,
so I wouldn’t lose myself in the noise.

It isn’t a manual or a perfect story. It’s my story.
An honest look, sometimes chaotic, often vulnerable,
but always real. Here you’ll find reflections, anecdotes, decisions,
doubts and lessons that have been shaping me.

I write the way I speak, the way I think. Without unnecessary filters,
with the wish to share what I’ve lived and what I’ve learned
on this path toward a life that feels more mine: freer, more conscious,
more aligned with what I want.

I don’t have all the answers, and that’s fine.
But if any of my words make you feel less alone,
make you reflect, or give you a small push, then sharing them
will already have been worth it.

Thank you for being here.
Welcome to my world.

Violeta Mayer`,

  fr: `Ce livre naît d’un moment de nombreux changements.
D’une étape où tout ce que je connaissais a bougé, et moi aussi.
J’ai senti le besoin d’écrire pour comprendre, pour mettre de l’ordre,
pour ne pas me perdre au milieu du bruit.

Ce n’est ni un manuel ni une histoire parfaite. C’est mon histoire.
Un regard honnête, parfois chaotique, souvent vulnérable,
mais toujours réel. Tu y trouveras des réflexions, des anecdotes, des décisions,
des doutes et des apprentissages qui m’ont construite.

J’écris comme je parle, comme je pense. Sans filtres inutiles,
avec la volonté de partager ce que j’ai vécu et ce que j’ai appris
sur ce chemin vers une vie plus mienne : plus libre, plus consciente,
plus alignée avec ce que je veux.

Je n’ai pas toutes les réponses, et c’est bien ainsi.
Mais si l’une de mes paroles te fait te sentir moins seule,
te fait réfléchir ou te donne une petite impulsion, alors les avoir partagées
aura déjà valu la peine.

Merci d’être là.
Bienvenue dans mon monde.

Violeta Mayer`,
};
