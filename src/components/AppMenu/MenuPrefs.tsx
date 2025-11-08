// src/components/AppMenu/MenuPrefs.tsx
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useUI } from "../../context/uiContext";
import { themes } from "../../styles/theme.config"; // ✅ centralizado
import type { ThemeName } from "../../styles/theme.config"; // ✅ type-only import

export default function MenuPrefs() {
  const { lang, setLang, theme, setTheme } = useUI();

  return (
    <>
      <p
        className="px-3 pb-2 text-[10px] tracking-[.18em] uppercase"
        style={{
          color: "color-mix(in oklab, var(--color-text) 45%, transparent)",
        }}
      >
        Preferencias
      </p>

      <div className="px-3 flex items-center gap-2 mb-3">
        {/* Botones de idioma */}
        <LangButton label="ES" active={lang === "es"} onClick={() => setLang("es")} />
        <LangButton label="EN" active={lang === "en"} onClick={() => setLang("en")} />

        {/* Selector de tema */}
        <div className="ml-auto">
          <ThemeSelect theme={theme} setTheme={setTheme} themes={themes} />
        </div>
      </div>
    </>
  );
}

/* ==============================
   COMPONENTE: Botón de idioma
   ============================== */
function LangButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-[5px] rounded-lg text-xs font-medium transition"
      style={{
        border: "1px solid var(--color-border)",
        background: active
          ? "color-mix(in oklab, var(--color-primary) 32%, transparent)"
          : "color-mix(in oklab, var(--color-bg-soft) 35%, transparent)",
        color: "var(--color-text)",
      }}
    >
      {label}
    </button>
  );
}

/* ==============================
   COMPONENTE: Selector de tema
   ============================== */
function ThemeSelect({
  theme,
  setTheme,
  themes,
}: {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  themes: readonly ThemeName[];
}) {
  const [open, setOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<"up" | "down">("down");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);

      // 📏 Verifica espacio disponible en pantalla
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = themes.length * 32 + 16; // altura estimada
      setPosition(spaceBelow < dropdownHeight ? "up" : "down");
    }
    setOpen(!open);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition relative z-[10]"
        style={{
          background: "color-mix(in oklab, var(--color-bg-soft) 60%, transparent)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text)",
        }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{
            background: "var(--color-primary)",
            boxShadow:
              "0 0 8px color-mix(in oklab, var(--color-primary) 60%, transparent)",
          }}
        />
        {theme[0].toUpperCase() + theme.slice(1)}
        <span className="ml-auto text-[10px] opacity-55">▼</span>
      </button>

      {open && buttonRect &&
        createPortal(
          <div
            className={`fixed z-[2000] rounded-xl border shadow-lg overflow-auto max-h-[50vh] 
              transition-all duration-200 ease-out
              ${position === "up" ? "animate-slideUp" : "animate-slideDown"}`}
            style={{
              top:
                position === "down"
                  ? buttonRect.bottom + 4
                  : buttonRect.top - (themes.length * 32 + 16),
              left: buttonRect.right - 128,
              width: "128px",
              background:
                "color-mix(in oklab, var(--color-bg-soft) 70%, transparent)",
              border: "1px solid var(--color-border)",
            }}
          >
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs transition hover:bg-[color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
                style={{
                  color: t === theme ? "var(--color-primary)" : "var(--color-text)",
                }}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
