// src/components/AppMenu/MenuHeader.tsx
import React from "react";
import { useUI } from "../../context/uiContext";

export default function MenuHeader() {
  const { lang } = useUI();

  const strings =
    lang === "es"
      ? {
          title: "Panel de control",
          subtitle: "Accesos rápidos, idioma y tema",
        }
      : {
          title: "Control panel",
          subtitle: "Quick access, language & theme",
        };

  return (
    <header
      className="flex items-center gap-3 px-4 pt-4 pb-3 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 80%, transparent) 0%, color-mix(in oklab, var(--color-accent) 80%, transparent) 60%, color-mix(in oklab, var(--color-bg) 95%, transparent) 100%)",
        borderBottom:
          "1px solid color-mix(in oklab, var(--color-primary) 30%, transparent)",
        boxShadow:
          "inset 0 0 20px color-mix(in oklab, var(--color-accent) 25%, transparent), 0 8px 25px rgba(0,0,0,.4)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Ícono central */}
      <div
        className="w-10 h-10 rounded-2xl grid place-items-center font-semibold text-base relative"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--color-primary) 65%, transparent), color-mix(in oklab, var(--color-surface) 85%, transparent))",
          color: "var(--color-text)",
          boxShadow:
            "0 0 12px color-mix(in oklab, var(--color-primary) 50%, transparent)",
        }}
      >
        ⚡
      </div>

      {/* Títulos */}
      <div className="flex-1">
        <p
          className="text-sm font-semibold tracking-tight"
          style={{
            color: "var(--color-text)",
            textShadow:
              "0 0 6px color-mix(in oklab, var(--color-primary) 40%, transparent)",
          }}
        >
          {strings.title}
        </p>
        <p
          className="text-[11px] font-medium opacity-80"
          style={{
            color: "color-mix(in oklab, var(--color-text) 75%, transparent)",
          }}
        >
          {strings.subtitle}
        </p>
      </div>

      {/* Brillo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in oklab, var(--color-accent) 15%, transparent), transparent 70%)",
          opacity: 0.7,
        }}
      />
    </header>
  );
}
