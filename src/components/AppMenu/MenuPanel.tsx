// src/components/AppMenu/MenuPanel.tsx
import React from "react";
import MenuHeader from "./MenuHeader";
import MenuNav from "./MenuNav";
import MenuPrefs from "./MenuPrefs";
import MenuFooter from "./MenuFooter";

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
  // readonly porque viene de const
  themes: readonly ThemeName[];
  // 👇 añadimos el prop que causaba el error
  activeSection?: string | null;
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
  activeSection,
}: MenuPanelProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998] animate-fadeIn"
        style={{ background: "rgba(0,0,0,.03)" }}
        onClick={onClose}
      />

      {/* Panel flotante */}
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
        {/* Header con gradiente */}
        <MenuHeader />

        {/* Contenido */}
        <div className="py-3" style={{ color: "var(--color-text)" }}>
          {/* Sección de navegación */}
          <MenuNav labels={labels} onGoTo={onGoTo} activeSection={activeSection} />

          {/* Divider */}
          <div
            className="h-px my-3 mx-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-border), transparent)",
            }}
          />

          {/* Preferencias: idioma + tema */}
          <MenuPrefs
            lang={lang}
            setLang={setLang}
            theme={theme}
            setTheme={setTheme}
            themes={themes}
          />

          {/* Footer con ❤️ */}
          <MenuFooter />
        </div>
      </aside>
    </>
  );
}
