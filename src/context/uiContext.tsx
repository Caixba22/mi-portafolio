// src/context/uiContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeName } from "../styles/theme.config";


export type Lang = "es" | "en";
export type Mode = "light" | "dark";

export interface UIContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    return (localStorage.getItem("lang") as Lang) ?? "es";
  });

  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "ocean";
    return (
      (document.documentElement.getAttribute("data-theme") as ThemeName) ??
      (localStorage.getItem("theme") as ThemeName) ??
      "ocean"
    );
  });

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (document.documentElement.getAttribute("data-mode") as Mode) ??
      (localStorage.getItem("mode") as Mode) ??
      "dark"
    );
  });

  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <UIContext.Provider value={{ lang, setLang, theme, setTheme, mode, setMode }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}

export default UIContext;
