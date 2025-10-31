//src/components/AppMenu/MenuNav.tsx
import React from "react";

type Labels = {
  about: string;
  projects: string;
  contact: string;
};

export default function MenuNav({
  labels,
  onGoTo,
}: {
  labels: Labels;
  onGoTo: (id: string) => void;
}) {
  return (
    <>
      <p
        className="px-4 pb-2 text-[10px] tracking-[.2em] uppercase font-semibold"
        style={{
          color: "color-mix(in oklab, var(--color-text) 55%, transparent)",
        }}
      >
        Navegación
      </p>

      <nav className="px-3 flex flex-col">
        <NavItem label={labels.about} onClick={() => onGoTo("#about")} />
        <NavItem label={labels.projects} onClick={() => onGoTo("#projects")} />
        <NavItem label={labels.contact} onClick={() => onGoTo("#contact")} />
      </nav>
    </>
  );
}

function NavItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left text-sm px-3 py-2 rounded-lg transition-all focus-visible:outline-none hover:bg-white/5 active:scale-[0.98]"
      style={{
        color: "var(--color-text)",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </button>
  );
}
