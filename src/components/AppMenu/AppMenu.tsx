// src/components/AppMenu/AppMenu.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useUI } from "../../context/uiContext";
import FloatingButton from "./FloatingButton";
import MenuPanel from "./MenuPanel";

const THEMES = ["ocean", "sunset", "forest"] as const;

export default function AppMenu() {
  const { lang, setLang, theme, setTheme } = useUI();
  const [open, setOpen] = useState(false);

  // para que TS sepa que setTheme acepta solo uno de los temas
  const typedSetTheme = setTheme as (t: (typeof THEMES)[number]) => void;

  // cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // textos según idioma
  const labels = useMemo(
    () =>
      lang === "es"
        ? { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" }
        : { about: "About", projects: "Projects", contact: "Contact" },
    [lang]
  );

  // scroll y cerrar
  const goTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <FloatingButton open={open} onToggle={() => setOpen((v) => !v)} />
      <MenuPanel
        open={open}
        onClose={() => setOpen(false)}
        labels={labels}
        onGoTo={goTo}
        lang={lang}
        setLang={setLang}
        // forzamos el theme al union de THEMES
        theme={theme as (typeof THEMES)[number]}
        setTheme={typedSetTheme}
        // 👇 esto ahora cuadra con MenuPanel porque ahí lo tenemos como `readonly ThemeName[]`
        themes={THEMES}
      />
    </>
  );
}
