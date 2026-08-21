"use client";

import { useCallback, useRef, useState } from "react";

export const ZOOM_MIN = 0.72;
export const ZOOM_MAX = 1.28;
export const ZOOM_STEP = 0.06;
/** Reading default — cover passes its own initial (82%). */
export const ZOOM_DEFAULT = 1;
/** Closed cover — fixed at max zoom (no controls on landing). */
export const COVER_ZOOM_DEFAULT = ZOOM_MAX;

function clampZoom(value: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));
}

export function useBookZoom(initial = ZOOM_DEFAULT) {
  const [zoom, setZoom] = useState(initial);
  const initialRef = useRef(initial);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const zoomIn = useCallback(() => {
    setZoom((z) => clampZoom(z + ZOOM_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => clampZoom(z - ZOOM_STEP));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(initialRef.current);
  }, []);

  const onWheel = useCallback((event: WheelEvent | React.WheelEvent) => {
    event.preventDefault();
    const delta = "deltaY" in event ? event.deltaY : 0;
    const next = clampZoom(zoom - delta * 0.00055);
    setZoom(next);
  }, [zoom]);

  /** Attach to a container for trackpad/mouse wheel zoom */
  const wheelProps = {
    onWheel: (e: React.WheelEvent) => {
      e.preventDefault();
      setZoom((z) => clampZoom(z - e.deltaY * 0.00055));
    },
  };

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2) {
      pinchRef.current = null;
      return;
    }
    const a = e.touches[0];
    const b = e.touches[1];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    pinchRef.current = { dist, zoom };
  }, [zoom]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2 || !pinchRef.current) return;
    e.preventDefault();
    const a = e.touches[0];
    const b = e.touches[1];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const ratio = dist / pinchRef.current.dist;
    setZoom(clampZoom(pinchRef.current.zoom * ratio));
  }, []);

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
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoom < ZOOM_MAX - 0.001,
    canZoomOut: zoom > ZOOM_MIN + 0.001,
    wheelProps,
    pinchProps,
    onWheel,
  };
}
