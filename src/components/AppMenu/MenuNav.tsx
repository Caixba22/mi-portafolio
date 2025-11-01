// src/components/AppMenu/MenuNav.tsx
import React from "react";

type Labels = {
  about: string;
  projects: string;
  contact: string;
};

export default function MenuNav({
  labels,
  onGoTo,
  activeSection,
}: {
  labels: Labels;
  onGoTo: (id: string) => void;
  activeSection?: string | null;
}) {
  const items = [
    { id: "about", label: labels.about },
    { id: "projects", label: labels.projects },
    { id: "contact", label: labels.contact },
  ];

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
        {items.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            onClick={() => onGoTo(`#${item.id}`)}
            active={activeSection === item.id}
          />
        ))}
      </nav>
    </>
  );
}

function NavItem({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-300 ${
        active ? "font-semibold" : ""
      }`}
      style={{
        color: "var(--color-text)",
        background: active
          ? "color-mix(in oklab, var(--color-primary) 25%, transparent)"
          : "transparent",
        border: active
          ? "1px solid color-mix(in oklab, var(--color-primary) 60%, transparent)"
          : "1px solid transparent",
      }}
    >
      {label}
    </button>
  );
}
