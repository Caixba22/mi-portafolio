// src/Sections/Header.tsx
import { useEffect, useMemo, useState } from "react";

type HeaderProps = {
  onLanguageChange?: (lang: "es" | "en") => void;
  onThemeChange?: (theme: "light" | "dark") => void;
  initialLang?: "es" | "en";
  initialTheme?: "light" | "dark";
};

export default function Header({
  onLanguageChange,
  onThemeChange,
  initialLang = "es",
  initialTheme = "dark",
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">(initialLang);
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  // 🌗 Aplica el tema globalmente
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  // 🌐 Notifica cambio de idioma
  useEffect(() => {
    onLanguageChange?.(lang);
  }, [lang, onLanguageChange]);

  const labels = useMemo(
    () =>
      lang === "es"
        ? {
            about: "Sobre mí",
            projects: "Proyectos",
            contact: "Contacto",
            theme: "Tema",
            light: "Claro",
            dark: "Oscuro",
            language: "Idioma",
          }
        : {
            about: "About",
            projects: "Projects",
            contact: "Contact",
            theme: "Theme",
            light: "Light",
            dark: "Dark",
            language: "Language",
          },
    [lang]
  );

  const styles = {
    bar: {
      position: "sticky" as const,
      top: 0,
      zIndex: 50,
      width: "100%",
      backdropFilter: "blur(8px)",
      background:
        "linear-gradient(180deg, rgba(10,14,21,0.85) 0%, rgba(10,14,21,0.60) 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    },
    container: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0.75rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: 700,
      letterSpacing: 0.2,
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    link: {
      color: "white",
      textDecoration: "none",
      opacity: 0.9,
    },
    btn: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "white",
      padding: "0.5rem 0.9rem",
      borderRadius: 10,
      cursor: "pointer",
    },
    iconBtn: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "white",
      padding: "0.4rem 0.6rem",
      borderRadius: 10,
      cursor: "pointer",
      minWidth: 42,
    },
  };

  // Responsivo: cerrar panel si se agranda ventana
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header style={styles.bar} aria-label="main header">
      <div style={styles.container}>
        {/* Brand */}
        <a href="#hero" style={styles.brand} aria-label="Ir al inicio">
          <Logo />
          <span>Mi Portafolio</span>
        </a>

        {/* Menú escritorio */}
        <nav
          aria-label="main navigation"
          style={{
            ...styles.nav,
            display: window.innerWidth >= 900 ? "flex" : "none",
          }}
        >
          <a href="#about" style={styles.link}>
            {labels.about}
          </a>
          <a href="#projects" style={styles.link}>
            {labels.projects}
          </a>
          <a href="#contact" style={styles.link}>
            {labels.contact}
          </a>

          {/* Idioma */}
          <div
            style={{ display: "flex", gap: 6, alignItems: "center" }}
            aria-label={labels.language}
          >
            <button
              style={styles.iconBtn}
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
              title="ES"
            >
              ES
            </button>
            <button
              style={styles.iconBtn}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              title="EN"
            >
              EN
            </button>
          </div>

          {/* Tema */}
          <button
            style={styles.btn}
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={`${labels.theme}: ${
              theme === "dark" ? labels.dark : labels.light
            }`}
            title={`${labels.theme}: ${
              theme === "dark" ? labels.dark : labels.light
            }`}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </nav>

        {/* Toggler móvil */}
        <button
          style={styles.iconBtn}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* Panel móvil */}
      {open && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(10,14,21,0.95)",
            padding: "0.75rem 1rem",
            display: "grid",
            gap: "0.75rem",
          }}
          role="dialog"
          aria-modal="true"
        >
          <a href="#about" style={styles.link} onClick={() => setOpen(false)}>
            {labels.about}
          </a>
          <a href="#projects" style={styles.link} onClick={() => setOpen(false)}>
            {labels.projects}
          </a>
          <a href="#contact" style={styles.link} onClick={() => setOpen(false)}>
            {labels.contact}
          </a>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={styles.iconBtn}
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <button
              style={styles.iconBtn}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              style={styles.iconBtn}
              onClick={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke="white"
        strokeOpacity="0.8"
      />
      <path
        d="M7 14l3-4 3 3 4-6"
        stroke="#62D0FF"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
