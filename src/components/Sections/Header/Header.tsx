// src/components/Sections/Header/Header.tsx

import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <div className="h-[64px] flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-3 shrink-0">
            <span
              className="inline-grid place-items-center w-9 h-9 rounded-lg"
              style={{
                color: "var(--color-primary)",
                border: "1px solid var(--color-border)",
                background:
                  "color-mix(in oklab, var(--color-primary) 14%, transparent)",
              }}
            >
              <Logo />
            </span>
            <span
              className="font-semibold tracking-wide text-[clamp(1.05rem,1.2vw,1.15rem)]"
              style={{ color: "var(--color-text)" }}
            >
              Mi Portafolio
            </span>
          </a>

          {/* aquí metes lo que le pases como children, por ejemplo <AppMenu /> */}
          <div className="ml-auto flex items-center gap-2">
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 4L4 12L9 20" stroke="currentColor" strokeWidth="2" />
      <path d="M15 4L20 12L15 20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
