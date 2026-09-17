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
