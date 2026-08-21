"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale, Reflection } from "@/types";
import {
  buildSpreads,
  findSpreadIndexForReflection,
} from "@/lib/book";
import { coverCopy } from "@/i18n/cover";
import { COVER_EXTRA_IMAGES } from "@/content/coverExtras";
import { ClosedBook } from "@/components/book/ClosedBook";
import { CoverPhotoField } from "@/components/book/CoverPhotoField";
import { OpenBook } from "@/components/book/OpenBook";
import { IndexOverlay } from "@/components/book/IndexOverlay";
import type { BookPhase } from "@/components/book/closed/bookPhases";

interface BookExperienceProps {
  reflections: Reflection[];
}

const LOCALES: Locale[] = ["ca", "es", "en", "fr"];

/**
 * Closed hardcover → open FlipBook on first spread (no cover hinge).
 * Close returns straight to the closed cover.
 */
export function BookExperience({ reflections }: BookExperienceProps) {
  const [phase, setPhase] = useState<BookPhase>("closed");
  const [locale, setLocale] = useState<Locale>("ca");
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);

  const copy = coverCopy[locale];

  const spreads = useMemo(
    () => buildSpreads(reflections, locale),
    [reflections, locale],
  );
  const published = useMemo(
    () =>
      [...reflections]
        .filter((r) => r.published)
        .sort((a, b) => a.order - b.order),
    [reflections],
  );

  const coverImages = useMemo(() => {
    const seen = new Set<string>();
    const images: string[] = [];
    for (const src of [
      ...published.map((r) => r.image).filter((s): s is string => Boolean(s)),
      ...COVER_EXTRA_IMAGES,
    ]) {
      if (seen.has(src)) continue;
      seen.add(src);
      images.push(src);
    }
    return images;
  }, [published]);

  const openBook = useCallback(() => {
    if (phase !== "closed") return;
    setSpreadIndex(0);
    setPhase("open");
  }, [phase]);

  const closeToCover = useCallback(() => {
    if (phase !== "open") return;
    setIndexOpen(false);
    setPhase("closed");
  }, [phase]);

  const changeLocale = useCallback(
    (code: Locale) => {
      if (code === locale) return;

      if (phase === "open") {
        const current = spreads[spreadIndex];
        const reflectionId =
          current?.left.reflectionId ?? current?.right.reflectionId;
        setLocale(code);
        if (reflectionId) {
          const nextSpreads = buildSpreads(reflections, code);
          const nextIndex = findSpreadIndexForReflection(
            nextSpreads,
            reflectionId,
          );
          if (nextIndex >= 0) setSpreadIndex(nextIndex);
        }
        return;
      }

      setLocale(code);
    },
    [locale, phase, reflections, spreadIndex, spreads],
  );

  const goToReflection = useCallback(
    (reflectionId: string) => {
      const index = findSpreadIndexForReflection(spreads, reflectionId);
      if (index >= 0) {
        setSpreadIndex(index);
        setIndexOpen(false);
      }
    },
    [spreads],
  );

  const isClosed = phase === "closed";
  const isOpen = phase === "open";

  return (
    <div
      className={`arxiu-stage${
        isOpen ? " arxiu-stage--reading" : " arxiu-stage--cover"
      }`}
    >
      <nav
        className={`arxiu-lang${isOpen ? " arxiu-lang--reading" : ""}`}
        aria-label="Idioma"
      >
        {LOCALES.map((code, i) => (
          <span key={code}>
            {i > 0 && <span aria-hidden="true"> · </span>}
            <button
              type="button"
              className={locale === code ? "is-active" : undefined}
              aria-current={locale === code ? "true" : undefined}
              onClick={() => changeLocale(code)}
            >
              {copy.languageNames[code]}
            </button>
          </span>
        ))}
      </nav>

      {isClosed && (
        <>
          <CoverPhotoField images={coverImages} />

          <div className="arxiu-hero">
            <ClosedBook copy={copy} onOpen={openBook} />
          </div>

          <p className="arxiu-drag-hint">{copy.dragHint}</p>
        </>
      )}

      {isOpen && (
        <div className="arxiu-center arxiu-center--open-fixed">
          <OpenBook
            visible
            interactive
            reflections={published}
            spreads={spreads}
            locale={locale}
            copy={copy}
            spreadIndex={spreadIndex}
            onSpreadChange={setSpreadIndex}
            onSelectReflection={goToReflection}
            onOpenIndex={() => setIndexOpen(true)}
          />
        </div>
      )}

      {isOpen && (
        <>
          <button
            type="button"
            className="close-cover"
            onClick={closeToCover}
            aria-label={copy.closeCover}
          >
            {copy.closeCover}
          </button>

          {indexOpen && (
            <IndexOverlay
              reflections={published}
              locale={locale}
              copy={copy}
              onSelect={goToReflection}
              onClose={() => setIndexOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
