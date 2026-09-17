"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CoverCopy } from "@/i18n/cover";
import type { BookPageModel, BookSpread, Locale, Reflection } from "@/types";
import { PageContent } from "@/components/book/PageContent";
import { PageNav } from "@/components/ui/PageNav";

/**
 * Leaf-only timing. Geometry of the open book never animates —
 * only the turning sheet’s rotateY.
 */
const FLIP_MS = 640;
const FLIP_EASE = "transform 0.64s cubic-bezier(0.22, 0.61, 0.36, 1)";

interface FlipBookProps {
  reflections: Reflection[];
  spreads: BookSpread[];
  locale: Locale;
  copy: CoverCopy;
  spreadIndex: number;
  onSpreadChange: (index: number) => void;
  onSelectReflection: (id: string) => void;
  onOpenIndex: () => void;
  active: boolean;
  /** When true, hide fixed PageNav (3D-embedded interior). */
  embedded?: boolean;
}

export function FlipBook({
  reflections,
  spreads,
  locale,
  copy,
  spreadIndex,
  onSpreadChange,
  onSelectReflection,
  onOpenIndex,
  active,
  embedded: _embedded = false,
}: FlipBookProps) {
  const [flipAngle, setFlipAngle] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [mobileSide, setMobileSide] = useState<"left" | "right">("left");
  /** When set, next spreadIndex effect uses this side instead of defaulting to left. */
  const mobileSideIntent = useRef<"left" | "right" | null>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    locked: false,
  });
  const flipTimer = useRef<number | null>(null);
  /** Phone: one A5 leaf. Desktop: open book (two leaves). */
  const singlePage = useIsNarrow();

  const current = spreads[spreadIndex];
  const nextSpread = spreads[spreadIndex + 1];
  const prevSpread = spreads[spreadIndex - 1];
  const reflectionById = useMemo(
    () => new Map(reflections.map((r) => [r.id, r] as const)),
    [reflections],
  );

  /** Non-blank A5 leaves in reading order. */
  const leaves = useMemo(() => {
    const list: { spreadIndex: number; side: "left" | "right" }[] = [];
    spreads.forEach((spread, index) => {
      if (spread.left.kind !== "blank") {
        list.push({ spreadIndex: index, side: "left" });
      }
      if (spread.right.kind !== "blank") {
        list.push({ spreadIndex: index, side: "right" });
      }
    });
    return list;
  }, [spreads]);

  const leafIndexOf = useCallback(
    (sIndex: number, side: "left" | "right") => {
      const i = leaves.findIndex(
        (leaf) => leaf.spreadIndex === sIndex && leaf.side === side,
      );
      return i >= 0 ? i + 1 : null;
    },
    [leaves],
  );

  const formatFolio = useCallback(
    (n: number | null) => {
      if (n == null) return undefined;
      return `${String(n).padStart(2, "0")} / ${String(Math.max(1, leaves.length)).padStart(2, "0")}`;
    },
    [leaves.length],
  );

  const leafNumber = useMemo(() => {
    const i = leaves.findIndex(
      (leaf) => leaf.spreadIndex === spreadIndex && leaf.side === mobileSide,
    );
    return i >= 0 ? i + 1 : spreadIndex + 1;
  }, [leaves, mobileSide, spreadIndex]);

  const navCurrent = singlePage
    ? leafNumber
    : leafIndexOf(spreadIndex, "right") ??
      leafIndexOf(spreadIndex, "left") ??
      spreadIndex + 1;
  const pageLabel = formatFolio(navCurrent);

  useEffect(() => {
    if (mobileSideIntent.current) {
      setMobileSide(mobileSideIntent.current);
      mobileSideIntent.current = null;
      return;
    }
    setMobileSide(current?.left.kind === "blank" ? "right" : "left");
  }, [spreadIndex, current?.left.kind]);

  useEffect(
    () => () => {
      if (flipTimer.current) window.clearTimeout(flipTimer.current);
    },
    [],
  );

  /**
   * Consolidate destination only when the leaf has finished.
   * Index updates and sheet teardown happen in one React batch so there
   * is no mid-flip layout change and no end snap.
   */
  const finishFlip = useCallback(
    (dir: "next" | "prev") => {
      if (dir === "next" && spreadIndex < spreads.length - 1) {
        onSpreadChange(spreadIndex + 1);
      }
      if (dir === "prev" && spreadIndex > 0) {
        onSpreadChange(spreadIndex - 1);
      }
      setFlipAngle(0);
      setFlipping(false);
      setDirection(null);
      flipTimer.current = null;
    },
    [onSpreadChange, spreadIndex, spreads.length],
  );

  const animateNext = useCallback(() => {
    if (flipTimer.current) window.clearTimeout(flipTimer.current);
    setFlipping(true);
    setDirection("next");
    setFlipAngle(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlipAngle(-180));
    });
    flipTimer.current = window.setTimeout(() => finishFlip("next"), FLIP_MS);
  }, [finishFlip]);

  const animatePrev = useCallback(() => {
    if (flipTimer.current) window.clearTimeout(flipTimer.current);
    setFlipping(true);
    setDirection("prev");
    setFlipAngle(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlipAngle(180));
    });
    flipTimer.current = window.setTimeout(() => finishFlip("prev"), FLIP_MS);
  }, [finishFlip]);

  const goNext = useCallback(() => {
    if (flipping) return;

    if (singlePage && current) {
      if (mobileSide === "left" && current.right.kind !== "blank") {
        setMobileSide("right");
        return;
      }
      if (spreadIndex >= spreads.length - 1) return;
      const next = spreads[spreadIndex + 1];
      mobileSideIntent.current =
        next?.left.kind === "blank" ? "right" : "left";
      onSpreadChange(spreadIndex + 1);
      return;
    }

    if (spreadIndex >= spreads.length - 1) return;
    animateNext();
  }, [
    animateNext,
    current,
    flipping,
    singlePage,
    mobileSide,
    onSpreadChange,
    spreadIndex,
    spreads,
  ]);

  const goPrev = useCallback(() => {
    if (flipping) return;

    if (singlePage && current) {
      if (mobileSide === "right" && current.left.kind !== "blank") {
        setMobileSide("left");
        return;
      }
      if (spreadIndex <= 0) return;
      const prev = spreads[spreadIndex - 1];
      mobileSideIntent.current =
        prev && prev.right.kind !== "blank" ? "right" : "left";
      onSpreadChange(spreadIndex - 1);
      return;
    }

    if (spreadIndex <= 0) return;
    animatePrev();
  }, [
    animatePrev,
    current,
    flipping,
    singlePage,
    mobileSide,
    onSpreadChange,
    spreadIndex,
    spreads,
  ]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goNext, goPrev]);

  useEffect(() => {
    if (!active || !singlePage) return;
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const endY = e.changedTouches[0]?.clientY ?? 0;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext();
      else goPrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [active, goNext, goPrev, singlePage]);

  const onDragDown = (e: React.PointerEvent) => {
    if (flipping || singlePage || spreadIndex >= spreads.length - 1) return;
    drag.current = { active: true, startX: e.clientX, locked: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!drag.current.active || flipping) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.locked && dx < -8) {
      drag.current.locked = true;
      setDirection("next");
      setFlipping(true);
      setFlipAngle(0);
    }
    if (!drag.current.locked) return;
    const angle = Math.min(0, Math.max(-180, dx * 0.55));
    setFlipAngle(angle);
  };

  const onDragUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (!flipping || direction !== "next") return;
    if (flipAngle < -70 && spreadIndex < spreads.length - 1) {
      const remaining = Math.round(FLIP_MS * ((180 + flipAngle) / 180));
      setFlipAngle(-180);
      if (flipTimer.current) window.clearTimeout(flipTimer.current);
      flipTimer.current = window.setTimeout(
        () => finishFlip("next"),
        Math.max(220, remaining),
      );
    } else {
      setFlipAngle(0);
      window.setTimeout(() => {
        setFlipping(false);
        setDirection(null);
      }, 280);
    }
  };

  if (!current) return null;

  const turningNext = !singlePage && flipping && direction === "next";
  const turningPrev = !singlePage && flipping && direction === "prev";
  const showTurningSheet = turningNext || turningPrev;
  const atStart =
    spreadIndex <= 0 &&
    (!singlePage ||
      mobileSide === "left" ||
      current.left.kind === "blank");
  const atEnd =
    spreadIndex >= spreads.length - 1 &&
    (!singlePage ||
      mobileSide === "right" ||
      current.right.kind === "blank");

  /**
   * Stable under-layer for the whole turn (no mid-flip content swap).
   *
   * NEXT: lift current.right → under right is already next.right;
   *       sheet back carries next.left; left stays current.left.
   * PREV: lift current.left  → under left is already prev.left;
   *       sheet back carries prev.right; right stays current.right.
   *
   * Destination is prepared under the leaf from frame 0 so book width
   * never collapses toward the spine as the leaf foreshortens.
   */
  const leftPage =
    turningPrev && prevSpread ? prevSpread.left : current.left;
  const rightPage =
    turningNext && nextSpread ? nextSpread.right : current.right;

  /* Folios match the visible face — never show the under-leaf number through the turn */
  const underLeftSpread = turningPrev ? spreadIndex - 1 : spreadIndex;
  const underRightSpread = turningNext ? spreadIndex + 1 : spreadIndex;
  const sheetFrontFolio = turningPrev
    ? formatFolio(
        current.left.kind !== "blank"
          ? leafIndexOf(spreadIndex, "left")
          : null,
      )
    : formatFolio(
        current.right.kind !== "blank"
          ? leafIndexOf(spreadIndex, "right")
          : null,
      );
  const sheetBackFolio = turningNext
    ? formatFolio(
        nextSpread && nextSpread.left.kind !== "blank"
          ? leafIndexOf(spreadIndex + 1, "left")
          : null,
      )
    : formatFolio(
        prevSpread && prevSpread.right.kind !== "blank"
          ? leafIndexOf(spreadIndex - 1, "right")
          : null,
      );

  const leftLabel = singlePage
    ? mobileSide === "left"
      ? pageLabel
      : undefined
    : turningPrev
      ? undefined /* covered by turning sheet */
      : formatFolio(
          leftPage.kind !== "blank"
            ? leafIndexOf(underLeftSpread, "left")
            : null,
        );
  const rightLabel = singlePage
    ? mobileSide === "right"
      ? pageLabel
      : undefined
    : turningNext
      ? undefined /* covered by turning sheet */
      : formatFolio(
          rightPage.kind !== "blank"
            ? leafIndexOf(underRightSpread, "right")
            : null,
        );

  return (
    <>
      <div
        className={`flipbook${singlePage ? " is-single" : ""}`}
        aria-label="Llibre obert"
      >
        <div
          className={`flipbook__spread${showTurningSheet ? " is-turning" : ""}`}
        >
          <div
            className={`flipbook__page flipbook__page--left${
              singlePage && mobileSide !== "left" ? " is-hidden" : ""
            }`}
          >
            <PageFace
              page={leftPage}
              reflections={reflectionById}
              allReflections={reflections}
              locale={locale}
              onSelectReflection={onSelectReflection}
            />
            {leftLabel ? <p className="page-folio">{leftLabel}</p> : null}
          </div>
          <div
            className={`flipbook__page flipbook__page--right${
              singlePage && mobileSide !== "right" ? " is-hidden" : ""
            }`}
          >
            <PageFace
              page={rightPage}
              reflections={reflectionById}
              allReflections={reflections}
              locale={locale}
              onSelectReflection={onSelectReflection}
            />
            {rightLabel ? <p className="page-folio">{rightLabel}</p> : null}
          </div>

          <div className="flipbook__gutter" aria-hidden="true" />

          {showTurningSheet && (
            <div
              className={`flipbook__sheet is-flipping ${
                turningPrev ? "flipbook__sheet--prev" : "flipbook__sheet--next"
              }`}
              style={{
                transform: `rotateY(${flipAngle}deg)`,
                transition: drag.current.active ? "none" : FLIP_EASE,
              }}
            >
              <div
                className={`flipbook__sheet-face flipbook__sheet-face--front ${
                  turningPrev
                    ? "flipbook__sheet-face--left"
                    : "flipbook__sheet-face--right"
                }`}
              >
                <PageFace
                  page={turningPrev ? current.left : current.right}
                  reflections={reflectionById}
                  allReflections={reflections}
                  locale={locale}
                  onSelectReflection={onSelectReflection}
                />
                {sheetFrontFolio ? (
                  <p className="page-folio">{sheetFrontFolio}</p>
                ) : null}
              </div>
              <div
                className={`flipbook__sheet-face flipbook__sheet-face--back ${
                  turningNext
                    ? "flipbook__sheet-face--left"
                    : "flipbook__sheet-face--right"
                }`}
              >
                <div className="flipbook__sheet-face-content">
                  {turningNext && nextSpread ? (
                    <PageFace
                      page={nextSpread.left}
                      reflections={reflectionById}
                      allReflections={reflections}
                      locale={locale}
                      onSelectReflection={onSelectReflection}
                    />
                  ) : turningPrev && prevSpread ? (
                    <PageFace
                      page={prevSpread.right}
                      reflections={reflectionById}
                      allReflections={reflections}
                      locale={locale}
                      onSelectReflection={onSelectReflection}
                    />
                  ) : (
                    <div className="page-inner page-empty" />
                  )}
                </div>
                {sheetBackFolio ? (
                  <p className="page-folio">{sheetBackFolio}</p>
                ) : null}
              </div>
            </div>
          )}

          <button
            type="button"
            className="flipbook__hit flipbook__hit--prev"
            aria-label="Pàgina anterior"
            onClick={goPrev}
            disabled={atStart || flipping}
          />
          <button
            type="button"
            className="flipbook__hit flipbook__hit--next"
            aria-label="Pàgina següent"
            onClick={goNext}
            disabled={atEnd || flipping}
            onPointerDown={onDragDown}
            onPointerMove={onDragMove}
            onPointerUp={onDragUp}
            onPointerCancel={onDragUp}
          />
        </div>
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <PageNav
              previousLabel={copy.previous}
              nextLabel={copy.next}
              openIndexLabel={copy.openIndex}
              onPrev={goPrev}
              onNext={goNext}
              onOpenIndex={onOpenIndex}
              disablePrev={atStart || flipping}
              disableNext={atEnd || flipping}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function PageFace({
  page,
  reflections,
  allReflections,
  locale,
  onSelectReflection,
}: {
  page: BookPageModel;
  reflections: Map<string, Reflection>;
  allReflections: Reflection[];
  locale: Locale;
  onSelectReflection: (id: string) => void;
}) {
  return (
    <PageContent
      page={page}
      reflection={
        page.reflectionId ? reflections.get(page.reflectionId) : undefined
      }
      reflections={allReflections}
      locale={locale}
      onSelectReflection={onSelectReflection}
    />
  );
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 720px)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    setNarrow(mq.matches);
    const handler = () => setNarrow(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return narrow;
}
