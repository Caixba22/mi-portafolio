// src/components/Sections/Header/Header.tsx
import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b
        backdrop-blur-md
        transition-all duration-300
        shadow-[0_6px_18px_rgba(0,0,0,0.1)]
      "
      style={{
        /* 🧠 Fondo y borde ahora se adaptan al modo */
        borderColor: "var(--color-border)",
        background:
          "color-mix(in oklab, var(--color-bg-soft) 80%, transparent)",
      }}
    >
      {/* ✨ Halo dinámico detrás del header */}
      <div
        className="
          absolute inset-0
          bg-[var(--color-primary)]
          opacity-10 blur-2xl
          pointer-events-none
        "
      />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <div className="h-[64px] flex items-center gap-3 relative z-10">
          {/* 🔷 Logo + Nombre */}
          <a
            href="#hero"
            className="flex items-center gap-3 shrink-0 group transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Logo cuadrado con borde dinámico */}
            <span
              className="
                inline-grid place-items-center w-9 h-9 rounded-lg
                border transition-all duration-200
                group-hover:shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_60%,transparent)]
              "
              style={{
                color: "var(--color-primary)",
                border: "1px solid var(--color-border)",
                background:
                  "color-mix(in oklab, var(--color-primary) 12%, transparent)",
              }}
            >
              <Logo />
            </span>

            {/* 🩶 Texto visible y contrastante */}
            <span
              className="
                font-semibold tracking-wide
                text-[clamp(1.05rem,1.2vw,1.15rem)]
                transition-colors duration-200
              "
              style={{
                color: "var(--color-text)",
                textShadow:
                  "0 1px 2px color-mix(in oklab, var(--color-bg) 40%, transparent)",
              }}
            >
              Mi Portafolio
            </span>
          </a>

          {/* 🧭 Children (menú, botones, idioma, etc.) */}
          <div className="ml-auto flex items-center gap-2">{children}</div>
        </div>
      </div>
    </header>
  );
}

/* =============================
   Ícono del logo
   ============================= */
function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 4L4 12L9 20" stroke="currentColor" strokeWidth="2" />
      <path d="M15 4L20 12L15 20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
