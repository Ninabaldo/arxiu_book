"use client";

import dynamic from "next/dynamic";
import type { CoverCopy } from "@/i18n/cover";
import { COVER_ZOOM_DEFAULT } from "@/hooks/useBookZoom";

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
  return (
    <div className="book-hero book-hero--r3f">
      <BookScene copy={copy} onOpen={onOpen} zoom={COVER_ZOOM_DEFAULT} />
    </div>
  );
}
