"use client";

import type { CoverCopy } from "@/i18n/cover";
import type { Locale, Reflection } from "@/types";
import {
  BEGINNING_ID,
  beginningIndexTitle,
} from "@/content/beginning";
import { getLocalized, padOrder } from "@/lib/book";

interface IndexOverlayProps {
  reflections: Reflection[];
  locale: Locale;
  copy: CoverCopy;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function IndexOverlay({
  reflections,
  locale,
  copy,
  onSelect,
  onClose,
}: IndexOverlayProps) {
  return (
    <div className="index-overlay" role="dialog" aria-label={copy.indexLabel}>
      <div className="index-overlay__panel">
        <p className="index-overlay__label">{copy.indexLabel}</p>
        <ol className="index-overlay__list">
          <li>
            <button
              type="button"
              className="index-overlay__item index-overlay__item--beginning"
              onClick={() => onSelect(BEGINNING_ID)}
            >
              <span className="index-overlay__num" aria-hidden="true">
                ·
              </span>
              <span className="index-overlay__title">
                {beginningIndexTitle[locale]}
              </span>
            </button>
          </li>
          {reflections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="index-overlay__item"
                onClick={() => onSelect(item.id)}
              >
                <span className="index-overlay__num">{padOrder(item.order)}</span>
                <span className="index-overlay__title">
                  {getLocalized(item.title, locale)}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="index-overlay__back" onClick={onClose}>
          ← {copy.backToBook}
        </button>
      </div>
    </div>
  );
}
