"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { CoverCopy } from "@/i18n/cover";
import { BookZoomControls } from "@/components/ui/BookZoomControls";
import {
  COVER_ZOOM_DEFAULT,
  COVER_ZOOM_MAX,
  COVER_ZOOM_MIN,
  COVER_ZOOM_MOBILE,
  useBookZoom,
} from "@/hooks/useBookZoom";

interface ClosedBookProps {
  copy: CoverCopy;
  onOpen: () => void;
}

const BookScene = dynamic(
  () =>
    import("@/components/book/closed/BookScene").then((m) => m.BookScene),
  {
    ssr: false,
    loading: () => (
      <div className="closed-book-canvas closed-book-canvas--loading" />
    ),
  },
);

/** Closed landing object — R3F hardcover. Click opens FlipBook. */
export function ClosedBook({ copy, onOpen }: ClosedBookProps) {
  const {
    zoom,
    setZoom,
    setInitialZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn,
    canZoomOut,
  } = useBookZoom(COVER_ZOOM_DEFAULT, {
    min: COVER_ZOOM_MIN,
    max: COVER_ZOOM_MAX,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => {
      setInitialZoom(mq.matches ? COVER_ZOOM_MOBILE : COVER_ZOOM_DEFAULT);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setInitialZoom]);

  return (
    <div className="book-hero book-hero--r3f">
      <BookScene
        copy={copy}
        onOpen={onOpen}
        zoom={zoom}
        onZoomChange={setZoom}
      />
      <BookZoomControls
        placement="cover"
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
    </div>
  );
}
