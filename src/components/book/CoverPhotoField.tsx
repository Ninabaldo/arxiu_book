"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  COVER_LAYOUT_FALLBACK,
  COVER_OPENING_LAYOUT,
  type CoverPhotoSlot,
} from "@/content/coverLayout";

interface CoverPhotoFieldProps {
  images: string[];
}

type PlacedPhoto = CoverPhotoSlot & { src: string };

function buildOpeningLayout(images: string[]): PlacedPhoto[] {
  if (images.length === 0) return [];

  let fallbackIndex = 0;
  return images.map((src) => {
    const slot = COVER_OPENING_LAYOUT[src];
    if (slot) return { src, ...slot };
    const fb =
      COVER_LAYOUT_FALLBACK[fallbackIndex % COVER_LAYOUT_FALLBACK.length];
    fallbackIndex += 1;
    return { src, ...fb };
  });
}

/**
 * Cover polaroids: fixed opening layout from the approved screenshot.
 * User can drag any photo freely — including over the book.
 */
export function CoverPhotoField({ images }: CoverPhotoFieldProps) {
  const imageKey = images.join("|");
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    src: string;
    pointerId: number;
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
  } | null>(null);

  const [placed, setPlaced] = useState<PlacedPhoto[]>(() =>
    buildOpeningLayout(images),
  );
  const [draggingSrc, setDraggingSrc] = useState<string | null>(null);

  useEffect(() => {
    setPlaced(buildOpeningLayout(images));
  }, [images, imageKey]);

  const onPointerDown = useCallback(
    (src: string, e: ReactPointerEvent<HTMLElement>) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const item = placed.find((p) => p.src === src);
      if (!item) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        src,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originLeft: item.left,
        originTop: item.top,
      };
      setPlaced((prev) => {
        const rest = prev.filter((p) => p.src !== src);
        const current = prev.find((p) => p.src === src);
        return current ? [...rest, current] : prev;
      });
      setDraggingSrc(src);
    },
    [placed],
  );

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const field = fieldRef.current;
    if (!field) return;

    const rect = field.getBoundingClientRect();
    const dx = ((e.clientX - drag.startX) / rect.width) * 100;
    const dy = ((e.clientY - drag.startY) / rect.height) * 100;
    const left = Math.min(98, Math.max(2, drag.originLeft + dx));
    const top = Math.min(98, Math.max(2, drag.originTop + dy));

    setPlaced((prev) =>
      prev.map((p) => (p.src === drag.src ? { ...p, left, top } : p)),
    );
  }, []);

  const endDrag = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    dragRef.current = null;
    setDraggingSrc(null);
  }, []);

  if (placed.length === 0) return null;

  return (
    <div
      ref={fieldRef}
      className={`cover-photos${draggingSrc ? " is-dragging" : ""}`}
      aria-hidden="true"
    >
      {placed.map((item) => {
        const isDrag = draggingSrc === item.src;
        return (
          <figure
            key={item.src}
            className={`cover-photos__item${isDrag ? " is-dragging" : ""}`}
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              width: item.width,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            }}
            onPointerDown={(e) => onPointerDown(item.src, e)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="cover-photos__motion">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" draggable={false} />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
