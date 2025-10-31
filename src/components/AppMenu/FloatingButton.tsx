//src/components/AppMenu/FloatingButton.tsx

import React from "react";

export default function FloatingButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-[999] w-12 h-12 rounded-2xl grid place-items-center transition-transform hover:-translate-y-[2px] focus-visible:outline-none"
      style={{
        background:
          "radial-gradient(circle at 10% 10%, color-mix(in oklab, var(--color-primary) 50%, transparent) 0%, color-mix(in oklab, var(--color-surface) 100%, transparent) 45%)",
        border: "1px solid color-mix(in oklab, var(--color-primary) 25%, transparent)",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.25), 0 0 16px color-mix(in oklab, var(--color-primary) 35%, transparent)",
        color: "var(--color-text)",
      }}
      aria-label={open ? "Cerrar menú flotante" : "Abrir menú flotante"}
      aria-expanded={open}
    >
      {!open ? (
        <span className="inline-block w-5 h-[14px] relative" aria-hidden>
          <span
            className="absolute left-0 top-0 w-5 h-[2px] rounded-full"
            style={{ background: "var(--color-text)" }}
          />
          <span
            className="absolute left-0 top-[6px] w-4 h-[2px] rounded-full"
            style={{ background: "var(--color-text)", opacity: 0.75 }}
          />
          <span
            className="absolute left-0 bottom-0 w-3 h-[2px] rounded-full"
            style={{ background: "var(--color-text)", opacity: 0.55 }}
          />
        </span>
      ) : (
        <span className="text-xl leading-none">✕</span>
      )}
    </button>
  );
}
