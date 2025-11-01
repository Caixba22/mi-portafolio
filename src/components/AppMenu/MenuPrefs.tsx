//src/components/AppMenu/MenuPrefs.tsx
import React, { useState } from "react";
import { createPortal } from "react-dom";

type ThemeName = "ocean" | "sunset" | "forest";

export default function MenuPrefs({
  lang,
  setLang,
  theme,
  setTheme,
  themes,
}: {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  themes: readonly ThemeName[];
}) {
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

        {/* Selector de tema personalizado */}
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
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Botón principal */}
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

      {/* Renderizar menú fuera del panel usando Portal */}
      {open && buttonRect &&
        createPortal(
          <div
            className="fixed z-[2000] rounded-xl border shadow-lg overflow-hidden"
            style={{
              top: buttonRect.bottom + 4 + "px",
              left: buttonRect.right - 128 + "px", // ajusta ancho (128px = w-32)
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
