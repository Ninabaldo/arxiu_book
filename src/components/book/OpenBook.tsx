"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { CoverCopy } from "@/i18n/cover";
import type { BookSpread, Locale, Reflection } from "@/types";
import { FlipBook } from "@/components/book/FlipBook";
import { BookZoomControls } from "@/components/ui/BookZoomControls";
import { useBookZoom } from "@/hooks/useBookZoom";

interface OpenBookProps {
  visible: boolean;
  /** When false, page-turn controls stay disabled */
  interactive?: boolean;
  reflections: Reflection[];
  spreads: BookSpread[];
  locale: Locale;
  copy: CoverCopy;
  spreadIndex: number;
  onSpreadChange: (index: number) => void;
  onSelectReflection: (id: string) => void;
  onOpenIndex: () => void;
}

export function OpenBook({
  visible,
  interactive = true,
  reflections,
  spreads,
  locale,
  copy,
  spreadIndex,
  onSpreadChange,
  onSelectReflection,
  onOpenIndex,
}: OpenBookProps) {
  const {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn,
    canZoomOut,
    wheelProps,
    pinchProps,
  } = useBookZoom();

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!visible) {
      setReady(false);
      return;
    }
    /* Appear at full opacity/scale — no soft-enter breathing. */
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  const showChrome = interactive && ready;

  return (
    <div
      className="open-book-shell"
      {...(interactive ? wheelProps : {})}
      {...(interactive ? pinchProps : {})}
    >
      <div
        className={`open-book${ready ? " is-visible" : ""}`}
        aria-hidden={!ready || !interactive}
        style={
          {
            "--book-zoom": zoom,
          } as CSSProperties
        }
      >
        <FlipBook
          reflections={reflections}
          spreads={spreads}
          locale={locale}
          copy={copy}
          spreadIndex={spreadIndex}
          onSpreadChange={onSpreadChange}
          onSelectReflection={onSelectReflection}
          onOpenIndex={onOpenIndex}
          active={interactive && ready}
        />
      </div>
      {showChrome && (
        <BookZoomControls
          placement="reading"
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetZoom}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          zoomInLabel={copy.zoomIn}
          zoomOutLabel={copy.zoomOut}
          zoomResetLabel={copy.zoomReset}
        />
      )}
    </div>
  );
}
