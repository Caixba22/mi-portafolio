// src/components/Sections/MyProjects/Cards/ProjectFront.tsx
import React from "react";
import { useUI } from "../../../../context/uiContext"; // 👈 para leer el idioma

interface Props {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
}

export default function ProjectFront({
  title,
  desc,
  imgDesktop,
  imgMobile,
  link,
}: Props) {
  const { lang } = useUI();
  const btnLabel = lang === "es" ? "Visitar sitio →" : "Visit Site →"; // 👈 dinámico

  return (
    <div
      className="
        grid grid-rows-[auto,1fr,auto]
        h-full p-5 gap-4
        bg-transparent
      "
    >
      {/* IMÁGENES */}
      <div className="flex justify-center gap-2">
        <img
          src={imgDesktop}
          alt={`${title} Desktop`}
          className="w-[68%] h-[160px] rounded-md object-cover brightness-[0.98]"
        />
        <img
          src={imgMobile}
          alt={`${title} Mobile`}
          className="w-[26%] h-[160px] rounded-md object-cover opacity-90"
        />
      </div>

      {/* TEXTO SCROLLEABLE */}
      <div
        className="min-h-0 overflow-y-auto pr-2"
        onClick={(e) => e.stopPropagation()}         // no dispares el flip al intentar scroll
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <h3 className="text-[var(--color-primary)] text-lg font-semibold tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-app/90 text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      {/* BOTÓN SIEMPRE ABAJO */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}         // que el click vaya al link, no al flip
        className="
          inline-block px-4 py-2 rounded-md text-sm font-semibold
          border border-[color-mix(in_oklab,var(--color-primary)_55%,transparent)]
          bg-[color-mix(in_oklab,var(--color-primary)_12%,transparent)]
          text-[var(--color-primary)]
          transition
          hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60
        "
      >
        {btnLabel}
      </a>
    </div>
  );
}
