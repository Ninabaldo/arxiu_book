"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Locale, Reflection } from "@/types";
import {
  buildSpreads,
  chunkContent,
  findSpreadIndexForReflection,
  getLocalized,
  type ChunkMap,
} from "@/lib/book";
import { chunkContentMeasured } from "@/lib/paginate";
import { coverCopy } from "@/i18n/cover";
import { ClosedBook } from "@/components/book/ClosedBook";
import { OpenBook } from "@/components/book/OpenBook";
import { IndexOverlay } from "@/components/book/IndexOverlay";
import { ChunkMapProvider } from "@/components/book/ChunkMapContext";
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
  const [chunkMap, setChunkMap] = useState<ChunkMap | null>(null);
  const [measureKey, setMeasureKey] = useState(0);
  const measureBodyRef = useRef<HTMLDivElement>(null);

  const copy = coverCopy[locale];

  const published = useMemo(
    () =>
      [...reflections]
        .filter((r) => r.published)
        .sort((a, b) => a.order - b.order),
    [reflections],
  );

  const spreads = useMemo(
    () => buildSpreads(reflections, locale, chunkMap),
    [reflections, locale, chunkMap],
  );

  const remasure = useCallback(() => {
    setMeasureKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onResize = () => remasure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [remasure]);

  useLayoutEffect(() => {
    const body = measureBodyRef.current;
    if (!body) return;

    let cancelled = false;
    let attempts = 0;

    const run = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        /* ignore */
      }
      if (cancelled || !measureBodyRef.current) return;

      const el = measureBodyRef.current;
      // Force layout read after fonts
      void el.offsetHeight;
      const h = el.getBoundingClientRect().height;
      if (h < 40 && attempts < 8) {
        attempts += 1;
        window.setTimeout(() => {
          if (!cancelled) void run();
        }, 50);
        return;
      }

      const next: ChunkMap = {};
      for (const reflection of published) {
        const text = getLocalized(reflection.content, locale);
        el.replaceChildren();
        let chunks = chunkContentMeasured(text, el);
        // Collapsed probe or runaway pagination → safe heuristic
        if (chunks.length === 0) {
          chunks = chunkContent(text);
        }
        next[reflection.id] = chunks;
      }
      if (!cancelled) setChunkMap(next);
    };

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void run();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [published, locale, measureKey, phase]);

  const openBook = useCallback(() => {
    if (phase !== "closed") return;
    setSpreadIndex(0);
    setPhase("open");
    remasure();
  }, [phase, remasure]);

  const closeToCover = useCallback(() => {
    if (phase !== "open") return;
    setIndexOpen(false);
    setPhase("closed");
  }, [phase]);

  const [pendingReflectionId, setPendingReflectionId] = useState<string | null>(
    null,
  );

  const changeLocale = useCallback(
    (code: Locale) => {
      if (code === locale) return;

      if (phase === "open") {
        const current = spreads[spreadIndex];
        const reflectionId =
          current?.left.reflectionId ?? current?.right.reflectionId ?? null;
        if (reflectionId) setPendingReflectionId(reflectionId);
      }

      setLocale(code);
      remasure();
    },
    [locale, phase, remasure, spreadIndex, spreads],
  );

  // Re-resolve chapter after locale/pagination changes
  useEffect(() => {
    if (!pendingReflectionId || !chunkMap) return;
    const index = findSpreadIndexForReflection(spreads, pendingReflectionId);
    if (index >= 0) setSpreadIndex(index);
    setPendingReflectionId(null);
  }, [chunkMap, pendingReflectionId, spreads]);

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

  // Keep spread index in range when pagination changes
  useEffect(() => {
    if (spreadIndex >= spreads.length) {
      setSpreadIndex(Math.max(0, spreads.length - 1));
    }
  }, [spreads.length, spreadIndex]);

  const isClosed = phase === "closed";
  const isOpen = phase === "open";

  return (
    <ChunkMapProvider value={chunkMap}>
      <div
        className={`arxiu-stage${
          isOpen ? " arxiu-stage--reading" : " arxiu-stage--cover"
        }`}
      >
        {/* Off-screen page probe — same geometry/type as a real body page */}
        <div className="page-measure-probe" aria-hidden="true">
          <div className="page-measure-probe__leaf">
            <div className="page-inner page-body-spread">
              <div className="page-body" ref={measureBodyRef} />
            </div>
          </div>
        </div>

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
    </ChunkMapProvider>
  );
}
