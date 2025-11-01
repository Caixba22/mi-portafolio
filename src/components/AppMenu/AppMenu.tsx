// src/components/AppMenu/AppMenu.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FloatingButton from "./FloatingButton";
import MenuPanel from "./MenuPanel";
import { useUI } from "../../context/uiContext";

// Definir los temas como un tipo constante para mejor tipado
const THEMES = ["ocean", "sunset", "forest"] as const;
type ThemeType = (typeof THEMES)[number];

// Se recomienda usar el tipo React.CSSProperties para el objeto style
const GLASS_STYLE_MENU: React.CSSProperties = {
  background:
    "color-mix(in oklab, var(--color-bg) 25%, transparent)",
  border:
    "1px solid color-mix(in oklab, var(--color-border) 40%, transparent)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,.4), inset 0 0 12px rgba(255,255,255,.05)",
  backdropFilter: "blur(18px) saturate(160%)",
};

const GLASS_STYLE_BUTTON_WRAPPER: React.CSSProperties = {
  background:
    "color-mix(in oklab, var(--color-surface) 50%, transparent)",
  borderRadius: "9999px",
  backdropFilter: "blur(16px) saturate(160%)",
  boxShadow:
    "0 4px 20px rgba(0,0,0,.35), inset 0 0 8px rgba(255,255,255,.05)",
};


export default function AppMenu() {
  // Tipado explícito para 'theme' de useUI()
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Detección de la sección visible (uso de IntersectionObserver)
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Solo actualiza si la sección interceptada está realmente visible
          if (entry.isIntersecting) {
             // Si hay múltiples, el observador debería encargarse de cuál está más visible.
             // Aquí se prioriza la última encontrada, lo cual suele ser aceptable.
             setActiveSection(entry.target.id);
          }
        });
      },
      // Un threshold más bajo (e.g., 0.2 o 0.3) podría ser más reactivo.
      { threshold: 0.4 }
    );
    
    sections.forEach((section) => observer.observe(section));
    
    // Función de limpieza de useEffect
    return () => observer.disconnect();
  }, []);

  const labels = useMemo(
    () =>
      lang === "es"
        ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
        : { about: "About", projects: "Projects", contact: "Contact" },
    [lang]
  );

  // Usa useCallback para que 'goTo' sea estable a través de los renders
  const goTo = useCallback((id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []); // Sin dependencias, solo usa document y setOpen

  // Manejador del toggle del menú con useCallback
  const handleToggleMenu = useCallback(() => setOpen((v) => !v), []);

  return (
    // Aplicamos los estilos de Glassmorphism a través de la constante
    <div
      className="fixed bottom-4 right-4 z-[997] rounded-3xl backdrop-blur-xl"
      style={GLASS_STYLE_MENU}
    >
      {/* Botón flotante con mismo efecto de cristal */}
      <div
        className="relative"
        style={GLASS_STYLE_BUTTON_WRAPPER} // Aplicamos los estilos del wrapper
      >
        {/* Uso del manejador de toggle refactorizado */}
        <FloatingButton open={open} onToggle={handleToggleMenu} />
      </div>

      {/* Panel flotante */}
      <MenuPanel
        open={open}
        onClose={() => setOpen(false)}
        labels={labels}
        onGoTo={goTo}
        lang={lang}
        setLang={setLang}
        // Eliminación de aserciones de tipo innecesarias al tipar ThemeType
        theme={theme as ThemeType}
        setTheme={setTheme as (t: ThemeType) => void}
        themes={THEMES}
        activeSection={activeSection}
      />
    </div>
  );
}