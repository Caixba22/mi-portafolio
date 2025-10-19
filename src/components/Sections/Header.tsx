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

  // 🌗 Tema global
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  // 🌐 Cambio idioma
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
            language: "Idioma",
          }
        : {
            about: "About",
            projects: "Projects",
            contact: "Contact",
            theme: "Theme",
            language: "Language",
          },
    [lang]
  );

  // 🔧 Cierra el menú móvil si se agranda la ventana
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backdropFilter: "blur(12px)",
        background:
          theme === "dark"
            ? "rgba(15, 20, 30, 0.85)"
            : "rgba(250, 250, 250, 0.8)",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.9rem clamp(1rem, 5vw, 2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: theme === "dark" ? "white" : "#111",
        }}
      >
        {/* 🔷 Marca */}
        <a
          href="#hero"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 700,
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            textDecoration: "none",
            color: theme === "dark" ? "#00b4ff" : "#0070f3",
            letterSpacing: "0.3px",
          }}
        >
          <Logo />
          <span>Mi Portafolio</span>
        </a>

        {/* 🌐 Menú de escritorio */}
        <nav
          style={{
            display: window.innerWidth >= 900 ? "flex" : "none",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          {["about", "projects", "contact"].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                opacity: 0.9,
                transition: "opacity 0.2s, color 0.3s",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
            >
              {labels[key as keyof typeof labels]}
            </a>
          ))}

          {/* Idioma y tema */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LangButton
              active={lang === "es"}
              onClick={() => setLang("es")}
              label="ES"
            />
            <LangButton
              active={lang === "en"}
              onClick={() => setLang("en")}
              label="EN"
            />
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "inherit",
                transition: "all 0.3s ease",
              }}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>

        {/* 📱 Menú móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            fontSize: "1.6rem",
            cursor: "pointer",
            display: window.innerWidth < 900 ? "block" : "none",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Panel móvil elegante */}
      {open && (
        <div
          style={{
            background:
              theme === "dark"
                ? "rgba(10,14,21,0.98)"
                : "rgba(255,255,255,0.98)",
            color: theme === "dark" ? "white" : "#111",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            padding: "1.2rem 0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
          }}
        >
          {["about", "projects", "contact"].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setOpen(false)}
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "1.1rem",
                opacity: 0.9,
              }}
            >
              {labels[key as keyof typeof labels]}
            </a>
          ))}

          <div style={{ display: "flex", gap: "0.8rem" }}>
            <LangButton
              active={lang === "es"}
              onClick={() => setLang("es")}
              label="ES"
            />
            <LangButton
              active={lang === "en"}
              onClick={() => setLang("en")}
              label="EN"
            />
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "inherit",
              }}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/** 🔹 Botón de idioma minimalista */
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
      style={{
        border: active
          ? "1px solid #00b4ff"
          : "1px solid rgba(255,255,255,0.2)",
        background: active ? "rgba(0,180,255,0.1)" : "transparent",
        color: "inherit",
        padding: "0.3rem 0.7rem",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      {label}
    </button>
  );
}

/** 🔷 Logo simple y elegante */
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
        stroke="#00b4ff"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <path
        d="M7 14l3-4 3 3 4-6"
        stroke="#00b4ff"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
