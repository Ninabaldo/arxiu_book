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
    coverTitle: "ARXIU",
    coverSubtitle: "reflexions escrites al llarg dels dies",
    coverDedication: "Nina Baldó",
    coverYear: "2026",
    intro: "Notes sobre la vida,\nescrites abans de saber\nqui les llegiria.",
    dragHint: "Toca el llibre per interaccionar amb ell i llegir el seu interior",
    spine: "ARXIU",
    spineAuthor: "Nina Baldó",
    bookAria: "Llibre ARXIU. Arrossega per girar en 3D. Fes clic per obrir.",
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
    coverTitle: "ARCHIVO",
    coverSubtitle: "reflexiones escritas a lo largo de los días",
    coverDedication: "Nina Baldó",
    coverYear: "2026",
    intro: "Notas sobre la vida,\nescritas antes de saber\nquién las leería.",
    dragHint: "Toca el libro para interactuar con él y leer su interior",
    spine: "ARCHIVO",
    spineAuthor: "Nina Baldó",
    bookAria: "Libro ARCHIVO. Arrastra para girar en 3D. Haz clic para abrir.",
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
    coverTitle: "ARCHIVE",
    coverSubtitle: "reflections written over the days",
    coverDedication: "Nina Baldó",
    coverYear: "2026",
    intro: "Notes on life,\nwritten before knowing\nwho would read them.",
    dragHint: "Touch the book to interact with it and read inside",
    spine: "ARCHIVE",
    spineAuthor: "Nina Baldó",
    bookAria: "ARCHIVE book. Drag to rotate in 3D. Click to open.",
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
    coverTitle: "ARCHIVE",
    coverSubtitle: "réflexions écrites au fil des jours",
    coverDedication: "Nina Baldó",
    coverYear: "2026",
    intro: "Notes sur la vie,\nécrites avant de savoir\nqui les lirait.",
    dragHint: "Touchez le livre pour interagir avec lui et lire son intérieur",
    spine: "ARCHIVE",
    spineAuthor: "Nina Baldó",
    bookAria: "Livre ARCHIVE. Faites glisser pour tourner en 3D. Cliquez pour ouvrir.",
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
