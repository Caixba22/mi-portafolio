// src/components/Sections/Header/Header.tsx
import { useEffect, useMemo, useState } from "react";
import { useUI } from "../../../context/uiContext";

const THEMES = ["ocean", "sunset", "forest"] as const;

export default function Header() {
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const labels = useMemo(
    () =>
      lang === "es"
        ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
        : { about: "About", projects: "Projects", contact: "Contact" },
    [lang]
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <div className="h-[64px] flex items-center gap-4">
          <a href="#hero" className="flex items-center gap-3 shrink-0">
            <span
              className="inline-grid place-items-center w-9 h-9 rounded-lg"
              style={{
                color: "var(--color-primary)",
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--color-primary) 14%, transparent)",
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

          <div className="flex-1" />

          <nav className="hidden md:flex items-center gap-6">
            {Object.entries(labels).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative font-medium whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-text)" }}
              >
                {value}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LangButton active={lang === "es"} onClick={() => setLang("es")} label="ES" />
            <LangButton active={lang === "en"} onClick={() => setLang("en")} label="EN" />

            <select
              className="px-3 py-2 rounded-lg text-sm"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--color-surface) 92%, transparent)",
              }}
              value={theme}
              onChange={(e) => setTheme(e.target.value as (typeof THEMES)[number])}
              aria-label="Tema"
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t[0].toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden ml-auto inline-grid place-items-center w-9 h-9 rounded-lg text-xl"
            style={{
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              background: "color-mix(in oklab, var(--color-surface) 92%, transparent)",
            }}
            aria-expanded={open}
            aria-label="Abrir menú"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="md:hidden">
            <div
              className="flex flex-col gap-3 py-3 mb-3 rounded-xl"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--color-surface) 92%, transparent)",
              }}
            >
              <div className="flex items-center gap-3 px-3">
                <LangButton active={lang === "es"} onClick={() => setLang("es")} label="ES" />
                <LangButton active={lang === "en"} onClick={() => setLang("en")} label="EN" />
                <select
                  className="ml-auto px-3 py-2 rounded-lg text-sm"
                  style={{
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                    background: "color-mix(in oklab, var(--color-surface) 96%, transparent)",
                  }}
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as (typeof THEMES)[number])}
                  aria-label="Tema"
                >
                  {THEMES.map((t) => (
                    <option key={t} value={t}>
                      {t[0].toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <nav className="flex flex-col px-2">
                {Object.entries(labels).map(([key, value]) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {value}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
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
      className="px-3 py-2 rounded-lg text-sm font-medium"
      style={{
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
        background: active
          ? "color-mix(in oklab, var(--color-primary) 35%, transparent)"
          : "color-mix(in oklab, var(--color-surface) 92%, transparent)",
      }}
    >
      {label}
    </button>
  );
}

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 4L4 12L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 4L20 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
