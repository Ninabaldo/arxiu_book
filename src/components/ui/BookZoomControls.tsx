"use client";

interface BookZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomInLabel: string;
  zoomOutLabel: string;
  zoomResetLabel: string;
  /** cover | reading — placement only */
  placement?: "cover" | "reading";
}

export function BookZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  canZoomIn,
  canZoomOut,
  zoomInLabel,
  zoomOutLabel,
  zoomResetLabel,
  placement = "cover",
}: BookZoomControlsProps) {
  return (
    <div
      className={`book-zoom book-zoom--${placement}`}
      role="group"
      aria-label="Zoom"
    >
      <button
        type="button"
        className="book-zoom__btn"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label={zoomOutLabel}
      >
        −
      </button>
      <button
        type="button"
        className="book-zoom__value"
        onClick={onReset}
        aria-label={zoomResetLabel}
        title={zoomResetLabel}
      >
        {Math.round(zoom * 100)}%
      </button>
      <button
        type="button"
        className="book-zoom__btn"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label={zoomInLabel}
      >
        +
      </button>
    </div>
  );
}
