//src/components/AppMenu/MenuPrefs.tsx

import React from "react";

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
        <LangButton label="ES" active={lang === "es"} onClick={() => setLang("es")} />
        <LangButton label="EN" active={lang === "en"} onClick={() => setLang("en")} />

        <div className="ml-auto relative">
          <select
            className="appearance-none pl-8 pr-6 py-[6px] rounded-xl text-xs font-medium"
            style={{
              background: "color-mix(in oklab, var(--color-bg-soft) 60%, transparent)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            aria-label="Tema"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t[0].toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <span
            className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: "var(--color-primary)",
              boxShadow: "0 0 12px color-mix(in oklab, var(--color-primary) 60%, transparent)",
            }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-55"
            style={{ color: "var(--color-text)" }}
          >
            ▼
          </span>
        </div>
      </div>
    </>
  );
}

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
