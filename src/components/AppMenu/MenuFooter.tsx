// src/components/AppMenu/MenuFooter.tsx
import React from "react";

export default function MenuFooter() {
  return (
    <footer className="px-3 pb-3 flex items-center justify-between gap-2">
      <span
        className="text-[10px] tracking-wide uppercase opacity-45"
        style={{ color: "var(--color-text)" }}
      >
        MiPortafolio.0.0
      </span>

      <span
        className="text-[10px] flex items-center gap-[3px]"
        style={{ color: "color-mix(in oklab, var(--color-text) 85%, transparent)" }}
      >
        hecho con
        <span
          aria-label="corazón"
          className="inline-block text-xs leading-none"
          style={{
            color: "var(--color-primary)",
            textShadow: "0 0 8px color-mix(in oklab, var(--color-primary) 45%, transparent)",
          }}
        >
          ♥
        </span>
      </span>
    </footer>
  );
}
