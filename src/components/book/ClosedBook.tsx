"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { CoverCopy } from "@/i18n/cover";
import {
  COVER_ZOOM_DEFAULT,
  COVER_ZOOM_MOBILE,
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
  const [zoom, setZoom] = useState(COVER_ZOOM_DEFAULT);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => {
      setZoom(mq.matches ? COVER_ZOOM_MOBILE : COVER_ZOOM_DEFAULT);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="book-hero book-hero--r3f">
      <BookScene copy={copy} onOpen={onOpen} zoom={zoom} />
    </div>
  );
}
