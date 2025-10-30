// src/context/uiContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "es" | "en";
type ThemeName = "ocean" | "sunset" | "forest";

type UIContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<ThemeName>(() => {
    const attr = document.documentElement.getAttribute("data-theme") as ThemeName | null;
    const saved = localStorage.getItem("theme") as ThemeName | null;
    return attr ?? saved ?? "ocean";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <UIContext.Provider value={{ lang, setLang, theme, setTheme }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}
