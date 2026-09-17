"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type TransitionEvent,
} from "react";

const STORAGE_KEY = "arxiu-access";
const ACCESS_PIN = "9669";
const PIN_LENGTH = 4;

type GatePhase = "boot" | "locked" | "revealing" | "open";

function readUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeUnlocked() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode / blocked storage */
  }
}

interface AccessGateProps {
  children: React.ReactNode;
}

/**
 * Soft 4-digit gate before the book. Session-scoped once unlocked.
 * Correct PIN fades the gate out while the book fades in underneath.
 */
export function AccessGate({ children }: AccessGateProps) {
  const [phase, setPhase] = useState<GatePhase>("boot");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [bookVisible, setBookVisible] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (readUnlocked()) {
      setPhase("open");
      setBookVisible(true);
      return;
    }
    setPhase("locked");
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    const id = requestAnimationFrame(() => setBookVisible(true));
    /* Fallback if transitionend is skipped (reduced motion / tab switch) */
    const t = window.setTimeout(() => setPhase("open"), 1000);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [phase]);

  const finishReveal = useCallback(() => {
    setPhase("open");
  }, []);

  const onGateTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (phase === "revealing") finishReveal();
  };

  const tryUnlock = useCallback((next: string[]) => {
    const code = next.join("");
    if (code.length < PIN_LENGTH) return;
    if (code === ACCESS_PIN) {
      writeUnlocked();
      setError(false);
      setPhase("revealing");
      return;
    }
    setError(true);
    setDigits(["", "", "", ""]);
    requestAnimationFrame(() => inputsRef.current[0]?.focus());
  }, []);

  const onDigitChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    if (cleaned.length === 0) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      setError(false);
      return;
    }

    if (cleaned.length >= PIN_LENGTH) {
      const next = cleaned.slice(0, PIN_LENGTH).split("");
      setDigits(next);
      setError(false);
      tryUnlock(next);
      return;
    }

    const digit = cleaned.slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(false);

    if (index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.every((d) => d.length === 1)) {
      tryUnlock(next);
    }
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    tryUnlock(digits);
  };

  if (phase === "boot") {
    return <div className="access-gate access-gate--boot" aria-hidden />;
  }

  const showBook = phase === "revealing" || phase === "open";
  const showGate = phase === "locked" || phase === "revealing";

  return (
    <>
      {showBook ? (
        <div
          className={`access-reveal${bookVisible ? " is-visible" : ""}${
            phase === "open" ? " is-settled" : ""
          }`}
        >
          {children}
        </div>
      ) : null}

      {showGate ? (
        <div
          className={`access-gate${phase === "revealing" ? " is-leaving" : ""}`}
          onTransitionEnd={onGateTransitionEnd}
        >
          <form className="access-gate__panel" onSubmit={onSubmit}>
            <p className="access-gate__mark">ARXIU</p>
            <p className="access-gate__hint">
              Introdueix el codi per obrir el llibre
            </p>
            <div
              className={`access-gate__pin${error ? " is-error" : ""}`}
              role="group"
              aria-label="Codi d’accés de 4 xifres"
            >
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  className="access-gate__digit"
                  type="text"
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  pattern="[0-9]*"
                  maxLength={4}
                  value={digit}
                  aria-label={`Xifra ${i + 1}`}
                  onChange={(e) => onDigitChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  autoFocus={i === 0}
                  disabled={phase === "revealing"}
                />
              ))}
            </div>
            {error ? (
              <p className="access-gate__error" role="alert">
                Codi incorrecte
              </p>
            ) : (
              <p className="access-gate__spacer" aria-hidden>
                &nbsp;
              </p>
            )}
          </form>
        </div>
      ) : null}
    </>
  );
}
