// src/components/AppMenu/AppMenu.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FloatingButton from "./FloatingButton";
import MenuPanel from "./MenuPanel";
import { useUI } from "../../context/uiContext";
import { themes } from "../../styles/theme.config"; // ✅ Usa los temas globales
import type { ThemeName } from "../../styles/theme.config"; // ✅ Tipo centralizado

// 💅 Estilos de Glassmorphism
const GLASS_STYLE_MENU: React.CSSProperties = {
  background: "color-mix(in oklab, var(--color-bg) 25%, transparent)",
  border: "1px solid color-mix(in oklab, var(--color-border) 40%, transparent)",
  boxShadow: "0 8px 32px rgba(0,0,0,.4), inset 0 0 12px rgba(255,255,255,.05)",
  backdropFilter: "blur(18px) saturate(160%)",
};

const GLASS_STYLE_BUTTON_WRAPPER: React.CSSProperties = {
  background: "color-mix(in oklab, var(--color-surface) 50%, transparent)",
  borderRadius: "9999px",
  backdropFilter: "blur(16px) saturate(160%)",
  boxShadow: "0 4px 20px rgba(0,0,0,.35), inset 0 0 8px rgba(255,255,255,.05)",
};

export default function AppMenu() {
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  /* ==============================
     📡 Detección de la sección visible
     ============================== */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ==============================
     🌐 Etiquetas multilenguaje
     ============================== */
  const labels = useMemo(
    () =>
      lang === "es"
        ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
        : { about: "About", projects: "Projects", contact: "Contact" },
    [lang]
  );

  /* ==============================
     🧭 Función de navegación suave
     ============================== */
  const goTo = useCallback((id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  /* ==============================
     🧩 Alternar visibilidad del menú
     ============================== */
  const handleToggleMenu = useCallback(() => setOpen((v) => !v), []);

  /* ==============================
     🎨 Render principal
     ============================== */
  return (
    <div
      className="fixed bottom-4 right-4 z-[997] rounded-3xl backdrop-blur-xl"
      style={GLASS_STYLE_MENU}
    >
      {/* Botón flotante */}
      <div className="relative" style={GLASS_STYLE_BUTTON_WRAPPER}>
        <FloatingButton open={open} onToggle={handleToggleMenu} />
      </div>

      {/* Panel de menú */}
      <MenuPanel
        open={open}
        onClose={() => setOpen(false)}
        labels={labels}
        onGoTo={goTo}
        lang={lang}
        setLang={setLang}
        theme={theme as ThemeName} // ✅ Usa el tipo global
        setTheme={setTheme as (t: ThemeName) => void}
        themes={themes} // ✅ Lista global de temas
        activeSection={activeSection}
      />
    </div>
  );
}
