//src/components/AppMenu/MenuPanel.tsximport React from "react";

import React from "react";

type Labels = {
  about: string;
  projects: string;
  contact: string;
};

type ThemeName = "ocean" | "sunset" | "forest";

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
  labels: Labels;
  onGoTo: (id: string) => void;
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  // 👇 AQUÍ estaba el problema: antes era ThemeName[]
  themes: readonly ThemeName[];
}

export default function MenuPanel({
  open,
  onClose,
  labels,
  onGoTo,
  lang,
  setLang,
  theme,
  setTheme,
  themes,
}: MenuPanelProps) {
  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-[998] animate-fadeIn"
        style={{ background: "rgba(0,0,0,.03)" }}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className="fixed bottom-[5rem] right-5 z-[999] w-[280px] rounded-3xl overflow-hidden animate-slideUp"
        style={{
          border: "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
          background:
            "radial-gradient(circle at top, color-mix(in oklab, var(--color-surface) 70%, transparent), color-mix(in oklab, var(--color-bg) 95%, transparent))",
          backdropFilter: "blur(14px)",
          boxShadow: "0 12px 30px rgba(0,0,0,.35), 0 0 20px rgba(0,0,0,.12)",
        }}
        role="menu"
        aria-label="Menú flotante"
      >
        {/* header */}
        <header
          className="px-4 pt-4 pb-3 flex items-start gap-3"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 90%, transparent) 0%, color-mix(in oklab, var(--color-accent) 90%, transparent) 60%, transparent 100%)",
          }}
        >
          <div
            className="w-9 h-9 rounded-2xl grid place-items-center text-base font-semibold shadow-inner"
            style={{ background: "rgba(0,0,0,.16)", color: "var(--color-text)" }}
          >
            <span className="text-sm tracking-tight">UI</span>
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-semibold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Command Panel
            </p>
            <p
              className="text-[11px]"
              style={{
                color: "color-mix(in oklab, var(--color-text) 70%, transparent)",
              }}
            >
              Accesos rápidos, idioma y tema
            </p>
          </div>
        </header>

        {/* contenido */}
        <div className="py-3" style={{ color: "var(--color-text)" }}>
          {/* NAV */}
          <p
            className="px-3 pb-2 text-[10px] tracking-[.18em] uppercase"
            style={{
              color: "color-mix(in oklab, var(--color-text) 45%, transparent)",
            }}
          >
            Navegación
          </p>
          <div className="px-3 flex flex-col gap-2">
            <NavItem icon="👤" label={labels.about} hint="About" onClick={() => onGoTo("#about")} />
            <NavItem
              icon="📁"
              label={labels.projects}
              hint="Projects"
              onClick={() => onGoTo("#projects")}
            />
            <NavItem
              icon="✉️"
              label={labels.contact}
              hint="Contact"
              onClick={() => onGoTo("#contact")}
            />
          </div>

          {/* divider */}
          <div
            className="h-px my-3 mx-3"
            style={{
              background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
            }}
          />

          {/* PREFS */}
          <p
            className="px-3 pb-2 text-[10px] tracking-[.18em] uppercase"
            style={{
              color: "color-mix(in oklab, var(--color-text) 45%, transparent)",
            }}
          >
            Preferencias
          </p>

          <div className="px-3 flex items-center gap-2 mb-3">
            <LangButton
              label="ES"
              active={lang === "es"}
              onClick={() => setLang("es")}
            />
            <LangButton
              label="EN"
              active={lang === "en"}
              onClick={() => setLang("en")}
            />

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
              {/* bolita de color del tema */}
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                style={{
                  background: "var(--color-primary)",
                  boxShadow:
                    "0 0 12px color-mix(in oklab, var(--color-primary) 60%, transparent)",
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

          {/* footer */}
          <footer className="px-3 pb-3 flex items-center justify-between">
            <span
              className="text-[10px] tracking-wide uppercase opacity-40"
              style={{ color: "var(--color-text)" }}
            >
              floating ui
            </span>
            <span
              className="text-[10px] opacity-60"
              style={{ color: "var(--color-text)" }}
            >
              made by you
            </span>
          </footer>
        </div>
      </aside>
    </>
  );
}

/* --- subcomponentes chicos dentro del mismo archivo --- */

function NavItem({
  icon,
  label,
  hint,
  onClick,
}: {
  icon: string;
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-2 py-[6px] rounded-xl transition hover:bg-white/5"
    >
      <span
        className="w-8 h-8 rounded-xl grid place-items-center text-base"
        style={{
          background: "color-mix(in oklab, var(--color-bg-soft) 40%, transparent)",
        }}
      >
        {icon}
      </span>
      <span className="flex-1 text-left text-sm">{label}</span>
      {hint ? (
        <span
          className="text-[10px] px-2 py-[2px] rounded-full"
          style={{
            background: "color-mix(in oklab, var(--color-surface) 40%, transparent)",
            color: "color-mix(in oklab, var(--color-text) 75%, transparent)",
          }}
        >
          {hint}
        </span>
      ) : null}
    </button>
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
