// src/components/AppMenu.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useUI } from "../context/uiContext";

const THEMES = ["ocean", "sunset", "forest"] as const;

/* =========================================================
   ESTILO 1 (mejorado): glass, gradiente, icono simple
   ========================================================= */
export default function AppMenu() {
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);

  // cerrar con ESC
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

  function goTo(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  return (
    <>
      {/* FAB (botón flotante) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[999] w-12 h-12 rounded-2xl grid place-items-center transition-transform hover:-translate-y-[2px] focus-visible:outline-none"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, color-mix(in oklab, var(--color-primary) 50%, transparent) 0%, color-mix(in oklab, var(--color-surface) 100%, transparent) 45%)",
          border:
            "1px solid color-mix(in oklab, var(--color-primary) 25%, transparent)",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.25), 0 0 16px color-mix(in oklab, var(--color-primary) 35%, transparent)",
          color: "var(--color-text)",
        }}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {!open ? (
          // icono más sobrio: 3 líneas
          <span
            className="inline-block w-5 h-[14px] relative"
            aria-hidden
          >
            <span
              className="absolute left-0 top-0 w-5 h-[2px] rounded-full"
              style={{ background: "var(--color-text)" }}
            />
            <span
              className="absolute left-0 top-[6px] w-4 h-[2px] rounded-full"
              style={{ background: "var(--color-text)", opacity: 0.75 }}
            />
            <span
              className="absolute left-0 bottom-0 w-3 h-[2px] rounded-full"
              style={{ background: "var(--color-text)", opacity: 0.55 }}
            />
          </span>
        ) : (
          <span className="text-xl leading-none">✕</span>
        )}
      </button>

      {/* backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[998] animate-fadeIn"
          style={{ background: "rgba(0,0,0,.03)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* panel */}
      {open && (
        <aside
          className="fixed bottom-[5rem] right-5 z-[999] w-[280px] rounded-3xl overflow-hidden animate-slideUp"
          style={{
            border:
              "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
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
              {/* iconito simple */}
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
            {/* sección navegación */}
            <SectionTitle label="Navegación" />
            <div className="px-3 flex flex-col gap-2">
              <MenuItem
                icon="👤"
                label={labels.about}
                hint="About"
                onClick={() => goTo("#about")}
              />
              <MenuItem
                icon="📁"
                label={labels.projects}
                hint="Projects"
                onClick={() => goTo("#projects")}
              />
              <MenuItem
                icon="✉️"
                label={labels.contact}
                hint="Contact"
                onClick={() => goTo("#contact")}
              />
            </div>

            {/* línea */}
            <div
              className="h-px my-3 mx-3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-border), transparent)",
              }}
            />

            {/* sección idioma + tema */}
            <SectionTitle label="Preferencias" />

            <div className="px-3 flex items-center gap-2 mb-3">
              <LangPill
                label="ES"
                active={lang === "es"}
                onClick={() => setLang("es")}
              />
              <LangPill
                label="EN"
                active={lang === "en"}
                onClick={() => setLang("en")}
              />

              <div className="ml-auto relative">
                <select
                  className="appearance-none pl-8 pr-6 py-[6px] rounded-xl text-xs font-medium"
                  style={{
                    background:
                      "color-mix(in oklab, var(--color-bg-soft) 60%, transparent)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  value={theme}
                  onChange={(e) =>
                    setTheme(e.target.value as (typeof THEMES)[number])
                  }
                  aria-label="Tema"
                >
                  {THEMES.map((t) => (
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
      )}
    </>
  );
}

/* -------- subcomponentes del estilo 1 -------- */
function SectionTitle({ label }: { label: string }) {
  return (
    <p
      className="px-3 pb-2 text-[10px] tracking-[.18em] uppercase"
      style={{
        color: "color-mix(in oklab, var(--color-text) 45%, transparent)",
      }}
    >
      {label}
    </p>
  );
}

function MenuItem({
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
      style={{
        background: "transparent",
      }}
    >
      <span
        className="w-8 h-8 rounded-xl grid place-items-center text-base"
        style={{
          background:
            "color-mix(in oklab, var(--color-bg-soft) 40%, transparent)",
        }}
      >
        {icon}
      </span>
      <span className="flex-1 text-left text-sm">{label}</span>
      {hint ? (
        <span
          className="text-[10px] px-2 py-[2px] rounded-full"
          style={{
            background:
              "color-mix(in oklab, var(--color-surface) 40%, transparent)",
            color: "color-mix(in oklab, var(--color-text) 75%, transparent)",
          }}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

function LangPill({
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
        boxShadow: active
          ? "0 4px 16px color-mix(in oklab, var(--color-primary) 25%, transparent)"
          : "none",
      }}
    >
      {label}
    </button>
  );
}

/* =========================================================
   ESTILO 2 (neo): plano, neumorphism, más minimal
   úsalo así: <AppMenuNeo />
   ========================================================= */
export function AppMenuNeo() {
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      lang === "es"
        ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
        : { about: "About", projects: "Projects", contact: "Contact" },
    [lang]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full grid place-items-center shadow-lg transition hover:scale-[1.02]"
        style={{
          background: "var(--color-surface)",
          border: "1px solid rgba(255,255,255,.05)",
          boxShadow: "0 16px 30px rgba(0,0,0,.25)",
          color: "var(--color-text)",
        }}
      >
        {open ? "–" : "⋯"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[998]"
          style={{ background: "transparent" }}
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          className="fixed bottom-[5.3rem] right-6 z-[999] w-[230px] rounded-2xl p-3 space-y-2 animate-slideUp"
          style={{
            background: "color-mix(in oklab, var(--color-bg) 92%, transparent)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 16px 30px rgba(0,0,0,.25)",
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            Quick Actions
          </p>
          <button
            onClick={() => go("#about")}
            className="w-full text-left text-sm px-2 py-2 rounded-lg hover:bg-white/5"
            style={{ color: "var(--color-text)" }}
          >
            {labels.about}
          </button>
          <button
            onClick={() => go("#projects")}
            className="w-full text-left text-sm px-2 py-2 rounded-lg hover:bg-white/5"
            style={{ color: "var(--color-text)" }}
          >
            {labels.projects}
          </button>
          <button
            onClick={() => go("#contact")}
            className="w-full text-left text-sm px-2 py-2 rounded-lg hover:bg-white/5"
            style={{ color: "var(--color-text)" }}
          >
            {labels.contact}
          </button>

          <div
            className="h-px"
            style={{ background: "var(--color-border)" }}
          />

          <div className="flex items-center gap-2">
            <LangPill
              label="ES"
              active={lang === "es"}
              onClick={() => setLang("es")}
            />
            <LangPill
              label="EN"
              active={lang === "en"}
              onClick={() => setLang("en")}
            />
            <select
              className="ml-auto text-xs rounded-lg px-2 py-[3px]"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              value={theme}
              onChange={e =>
                setTheme(e.target.value as (typeof THEMES)[number])
              }
            >
              {THEMES.map(t => (
                <option key={t} value={t}>
                  {t[0].toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}
