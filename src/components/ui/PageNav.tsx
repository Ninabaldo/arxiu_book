interface PageNavProps {
  previousLabel: string;
  nextLabel: string;
  openIndexLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export function PageNav({
  previousLabel,
  nextLabel,
  openIndexLabel,
  onPrev,
  onNext,
  onOpenIndex,
  disablePrev,
  disableNext,
}: PageNavProps) {
  return (
    <nav className="page-nav" aria-label="Navegació del llibre">
      <button
        type="button"
        className="page-nav__index"
        onClick={onOpenIndex}
        aria-label={openIndexLabel}
      >
        <span className="page-nav__list" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      <div className="page-nav__pager">
        <button
          type="button"
          onClick={onPrev}
          disabled={disablePrev}
          aria-label={previousLabel}
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          aria-label={nextLabel}
        >
          →
        </button>
      </div>

      <span className="page-nav__spacer" aria-hidden="true" />
    </nav>
  );
}
