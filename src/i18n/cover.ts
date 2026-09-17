import type { Locale } from "@/types";

export interface CoverCopy {
  wordmarkTitle: string;
  wordmarkSubtitle: string;
  coverTitle: string;
  coverSubtitle: string;
  /** Author line on the cover (replaces former dedication) */
  coverDedication: string;
  /** Year mark on the cover, e.g. "2026" */
  coverYear: string;
  /** Written back-cover blurb (paragraphs; use \\n for forced breaks) */
  backCoverParagraphs: string[];
  intro: string;
  dragHint: string;
  spine: string;
  spineAuthor: string;
  bookAria: string;
  closeCover: string;
  previous: string;
  next: string;
  indexLabel: string;
  backToBook: string;
  openIndex: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  languageNames: Record<Locale, string>;
}

export const coverCopy: Record<Locale, CoverCopy> = {
  ca: {
    wordmarkTitle: "ARXIU",
    wordmarkSubtitle: "reflexions escrites\nal llarg dels dies",
    coverTitle: "No sé que estic fent, però estic bé.",
    coverSubtitle: "",
    coverDedication: "Violeta Mayer",
    coverYear: "2026",
    backCoverParagraphs: [
      "Hi ha moments en què la vida que havies imaginat deixa de tenir sentit.",
      "I llavors no saps gaire bé què fer.",
      "No sé què estic fent, però estic bé és la història d’una noia de 30 anys que, enmig d’una etapa de canvis, pèrdues, decisions i moltes preguntes, es veu obligada a començar de nou.",
      "Sense tenir-ho tot clar.\nSense saber exactament cap a on va.\nI sense esperar que algú li doni les respostes.",
      "Aquest llibre neix d’aquell lloc incòmode entre el que ja no és i el que encara no sap què serà.",
      "Parla de deixar anar, de tornar a casa, de sentir-se perduda, de reconstruir-se, de les persones que ens sostenen i de les que ens ensenyen a deixar de sostenir-nos-hi.",
    ],
    intro: "Notes sobre la vida,\nescrites abans de saber\nqui les llegiria.",
    dragHint: "Toca el llibre per interaccionar amb ell i llegir el seu interior",
    spine: "No sé que estic fent…",
    spineAuthor: "Violeta Mayer",
    bookAria: "Llibre. Arrossega per girar en 3D. Fes clic per obrir.",
    closeCover: "Portada",
    previous: "ANTERIOR",
    next: "SEGÜENT",
    indexLabel: "ÍNDEX",
    backToBook: "TORNAR AL LLIBRE",
    openIndex: "Obrir l’índex",
    zoomIn: "Ampliar",
    zoomOut: "Reduir",
    zoomReset: "Restablir zoom",
    languageNames: {
      ca: "CA",
      es: "ES",
      en: "EN",
      fr: "FR",
    },
  },
  es: {
    wordmarkTitle: "ARCHIVO",
    wordmarkSubtitle: "reflexiones escritas\na lo largo de los días",
    coverTitle: "No sé qué estoy haciendo, pero estoy bien.",
    coverSubtitle: "",
    coverDedication: "Violeta Mayer",
    coverYear: "2026",
    backCoverParagraphs: [
      "Hay momentos en los que la vida que habías imaginado deja de tener sentido.",
      "Y entonces no sabes muy bien qué hacer.",
      "No sé qué estoy haciendo, pero estoy bien es la historia de una chica de 30 años que, en medio de una etapa de cambios, pérdidas, decisiones y muchas preguntas, se ve obligada a empezar de nuevo.",
      "Sin tenerlo todo claro.\nSin saber exactamente hacia dónde va.\nY sin esperar que alguien le dé las respuestas.",
      "Este libro nace de aquel lugar incómodo entre lo que ya no es y lo que todavía no sabe qué será.",
      "Habla de soltar, de volver a casa, de sentirse perdida, de reconstruirse, de las personas que nos sostienen y de las que nos enseñan a dejar de sostenernos en ellas.",
    ],
    intro: "Notas sobre la vida,\nescritas antes de saber\nquién las leería.",
    dragHint: "Toca el libro para interactuar con él y leer su interior",
    spine: "No sé qué estoy haciendo…",
    spineAuthor: "Violeta Mayer",
    bookAria: "Libro. Arrastra para girar en 3D. Haz clic para abrir.",
    closeCover: "Portada",
    previous: "ANTERIOR",
    next: "SIGUIENTE",
    indexLabel: "ÍNDICE",
    backToBook: "VOLVER AL LIBRO",
    openIndex: "Abrir el índice",
    zoomIn: "Ampliar",
    zoomOut: "Reducir",
    zoomReset: "Restablecer zoom",
    languageNames: {
      ca: "CA",
      es: "ES",
      en: "EN",
      fr: "FR",
    },
  },
  en: {
    wordmarkTitle: "ARCHIVE",
    wordmarkSubtitle: "reflections written\nover the days",
    coverTitle: "I don’t know what I’m doing, but I’m fine.",
    coverSubtitle: "",
    coverDedication: "Violeta Mayer",
    coverYear: "2026",
    backCoverParagraphs: [
      "There are moments when the life you had imagined stops making sense.",
      "And then you don’t quite know what to do.",
      "I don’t know what I’m doing, but I’m fine is the story of a thirty-year-old woman who, in the middle of a season of change, loss, decisions and many questions, finds herself having to begin again.",
      "Without having it all figured out.\nWithout knowing exactly where she’s going.\nAnd without waiting for someone else to give her the answers.",
      "This book comes from that uncomfortable place between what no longer is and what still doesn’t know what it will become.",
      "It is about letting go, about going home, about feeling lost, about rebuilding yourself, about the people who hold us up and about those who teach us to stop holding on to them.",
    ],
    intro: "Notes on life,\nwritten before knowing\nwho would read them.",
    dragHint: "Touch the book to interact with it and read inside",
    spine: "I don’t know what I’m doing…",
    spineAuthor: "Violeta Mayer",
    bookAria: "Book. Drag to rotate in 3D. Click to open.",
    closeCover: "Cover",
    previous: "PREVIOUS",
    next: "NEXT",
    indexLabel: "INDEX",
    backToBook: "BACK TO THE BOOK",
    openIndex: "Open index",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    zoomReset: "Reset zoom",
    languageNames: {
      ca: "CA",
      es: "ES",
      en: "EN",
      fr: "FR",
    },
  },
  fr: {
    wordmarkTitle: "ARCHIVE",
    wordmarkSubtitle: "réflexions écrites\nau fil des jours",
    coverTitle: "Je ne sais pas ce que je fais, mais ça va.",
    coverSubtitle: "",
    coverDedication: "Violeta Mayer",
    coverYear: "2026",
    backCoverParagraphs: [
      "Il y a des moments où la vie que tu avais imaginée cesse d’avoir un sens.",
      "Et alors tu ne sais plus très bien quoi faire.",
      "Je ne sais pas ce que je fais, mais ça va est l’histoire d’une femme de 30 ans qui, au milieu d’une période de changements, de pertes, de décisions et de bien des questions, se retrouve contrainte de recommencer.",
      "Sans tout avoir clair.\nSans savoir exactement où elle va.\nEt sans attendre que quelqu’un lui donne les réponses.",
      "Ce livre naît de cet endroit inconfortable entre ce qui n’est plus et ce qui ne sait pas encore ce qu’il sera.",
      "Il parle de lâcher prise, de rentrer chez soi, de se sentir perdue, de se reconstruire, des personnes qui nous soutiennent et de celles qui nous apprennent à cesser de nous y accrocher.",
    ],
    intro: "Notes sur la vie,\nécrites avant de savoir\nqui les lirait.",
    dragHint: "Touchez le livre pour interagir avec lui et lire son intérieur",
    spine: "Je ne sais pas ce que je fais…",
    spineAuthor: "Violeta Mayer",
    bookAria: "Livre. Faites glisser pour tourner en 3D. Cliquez pour ouvrir.",
    closeCover: "Couverture",
    previous: "PRÉCÉDENT",
    next: "SUIVANT",
    indexLabel: "INDEX",
    backToBook: "RETOUR AU LIVRE",
    openIndex: "Ouvrir l’index",
    zoomIn: "Agrandir",
    zoomOut: "Réduire",
    zoomReset: "Réinitialiser le zoom",
    languageNames: {
      ca: "CA",
      es: "ES",
      en: "EN",
      fr: "FR",
    },
  },
};
