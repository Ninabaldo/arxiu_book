"use client";

import { useCallback, useRef, useState } from "react";

export const ZOOM_MIN = 0.72;
export const ZOOM_MAX = 1.28;
export const ZOOM_STEP = 0.06;
/** Reading default — cover passes its own initial (82%). */
export const ZOOM_DEFAULT = 1;
/** Closed cover — desktop framing; can zoom further to read the blurb. */
export const COVER_ZOOM_DEFAULT = 1.28;
/** Closed cover on narrow screens — leave room around the book */
export const COVER_ZOOM_MOBILE = 0.78;
/** Allow zooming into the written back cover */
export const COVER_ZOOM_MAX = 2;
export const COVER_ZOOM_MIN = ZOOM_MIN;

type ZoomRange = {
  min?: number;
  max?: number;
};

function clampZoom(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useBookZoom(initial = ZOOM_DEFAULT, range?: ZoomRange) {
  const min = range?.min ?? ZOOM_MIN;
  const max = range?.max ?? ZOOM_MAX;
  const [zoom, setZoom] = useState(initial);
  const initialRef = useRef(initial);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const setInitialZoom = useCallback((value: number) => {
    initialRef.current = value;
    setZoom(clampZoom(value, min, max));
  }, [min, max]);

  const setClampedZoom = useCallback(
    (value: number | ((prev: number) => number)) => {
      if (typeof value === "function") {
        setZoom((z) => clampZoom(value(z), min, max));
      } else {
        setZoom(clampZoom(value, min, max));
      }
    },
    [min, max],
  );

  const zoomIn = useCallback(() => {
    setZoom((z) => clampZoom(z + ZOOM_STEP, min, max));
  }, [min, max]);

  const zoomOut = useCallback(() => {
    setZoom((z) => clampZoom(z - ZOOM_STEP, min, max));
  }, [min, max]);

  const resetZoom = useCallback(() => {
    setZoom(initialRef.current);
  }, []);

  const onWheel = useCallback(
    (event: WheelEvent | React.WheelEvent) => {
      event.preventDefault();
      const delta = "deltaY" in event ? event.deltaY : 0;
      setZoom((z) => clampZoom(z - delta * 0.00055, min, max));
    },
    [min, max],
  );

  /** Attach to a container for trackpad/mouse wheel zoom */
  const wheelProps = {
    onWheel: (e: React.WheelEvent) => {
      e.preventDefault();
      setZoom((z) => clampZoom(z - e.deltaY * 0.00055, min, max));
    },
  };

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2) {
        pinchRef.current = null;
        return;
      }
      const a = e.touches[0];
      const b = e.touches[1];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchRef.current = { dist, zoom };
    },
    [zoom],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2 || !pinchRef.current) return;
      e.preventDefault();
      const a = e.touches[0];
      const b = e.touches[1];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const ratio = dist / pinchRef.current.dist;
      setZoom(clampZoom(pinchRef.current.zoom * ratio, min, max));
    },
    [min, max],
  );

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  const pinchProps = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: onTouchEnd,
  };

  return {
    zoom,
    setZoom: setClampedZoom,
    setInitialZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoom < max - 0.001,
    canZoomOut: zoom > min + 0.001,
    wheelProps,
    pinchProps,
    onWheel,
  };
}
