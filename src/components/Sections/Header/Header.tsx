// src/components/Sections/Header/Header.tsx
import { useEffect, useMemo, useState } from "react";

type ThemeName = "ocean" | "sunset" | "forest";
type HeaderProps = { onLanguageChange?: (lang: "es" | "en") => void; initialLang?: "es" | "en" };

export default function Header({ onLanguageChange, initialLang = "es" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">(initialLang);
  const [theme, setTheme] = useState<ThemeName>(() => {
    const a = document.documentElement.getAttribute("data-theme") as ThemeName | null;
    const s = localStorage.getItem("theme") as ThemeName | null;
    return a ?? s ?? "ocean";
  });

  // aplica tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // notifica idioma
  useEffect(() => { onLanguageChange?.(lang); }, [lang, onLanguageChange]);

  // cierra panel al pasar a md+
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // cierra con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const labels = useMemo(
    () => (lang === "es"
      ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
      : { about: "About", projects: "Projects", contact: "Contact" }),
    [lang]
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
    >
      {/* contenedor local */}
      <div className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        {/* barra principal */}
        <div className="h-[64px] flex items-center gap-4">
          {/* marca */}
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
            <span className="font-semibold tracking-wide text-[clamp(1.05rem,1.2vw,1.15rem)]"
                  style={{ color: "var(--color-text)" }}>
              Mi Portafolio
            </span>
          </a>

          {/* separador */}
          <div className="flex-1" />

          {/* nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {Object.entries(labels).map(([k, v]) => (
              <a
                key={k}
                href={`#${k}`}
                className="relative font-medium whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-text)" }}
              >
                {v}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 transition-all duration-300"
                      style={{ background: "var(--color-primary)" }} />
              </a>
            ))}
          </nav>

          {/* controles desktop */}
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
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              aria-label="Tema"
            >
              <option value="ocean">Ocean</option>
              <option value="sunset">Sunset</option>
              <option value="forest">Forest</option>
            </select>
          </div>

          {/* botón móvil */}
          <button
            onClick={() => setOpen(v => !v)}
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

        {/* panel móvil (oculto en md+) */}
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
                  onChange={(e) => setTheme(e.target.value as ThemeName)}
                  aria-label="Tema"
                >
                  <option value="ocean">Ocean</option>
                  <option value="sunset">Sunset</option>
                  <option value="forest">Forest</option>
                </select>
              </div>

              <nav className="flex flex-col px-2">
                {Object.entries(labels).map(([k, v]) => (
                  <a
                    key={k}
                    href={`#${k}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {v}
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
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void; }) {
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

    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* Bracket izquierdo */}

      <path d="M9 4L4 12L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      

      {/* Bracket derecho */}

      <path d="M15 4L20 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

    </svg>

  );

}