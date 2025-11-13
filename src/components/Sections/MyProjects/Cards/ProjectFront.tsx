// src/components/Sections/MyProjects/Cards/ProjectFront.tsx
"use client"; // si usas Next 13+, si no, puedes quitar esta línea

import React, { useState } from "react";
import { createPortal } from "react-dom";
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
  const btnLabel = lang === "es" ? "Visitar sitio →" : "Visit Site →";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (
    e: React.MouseEvent<HTMLImageElement>,
    src: string
  ) => {
    e.stopPropagation(); // que no dispare el flip
    setModalImg(src);
    setIsModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setModalImg(null);
  };

  return (
    <>
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
            className="
              w-[68%] h-[160px]
              rounded-md object-cover brightness-[0.98]
              cursor-zoom-in
            "
            onClick={(e) => openModal(e, imgDesktop)}
          />
          <img
            src={imgMobile}
            alt={`${title} Mobile`}
            className="
              w-[26%] h-[160px]
              rounded-md object-cover opacity-90
              cursor-zoom-in
            "
            onClick={(e) => openModal(e, imgMobile)}
          />
        </div>

        {/* TEXTO SCROLLEABLE */}
        <div
          className="min-h-0 overflow-y-auto pr-2"
          onClick={(e) => e.stopPropagation()} // no dispares el flip al intentar scroll
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
          onClick={(e) => e.stopPropagation()} // que el click vaya al link, no al flip
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

      {/* MODAL GLOBAL VIA PORTAL (fuera del card) */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              bg-black/70 backdrop-blur-sm
            "
            onClick={closeModal} // clic en el fondo cierra
          >
            <div
              className="
                relative
                max-w-[min(90vw,1000px)]
                max-h-[80vh]
              "
              onClick={(e) => e.stopPropagation()} // no cierres si clican la imagen
            >
              {modalImg && (
                <img
                  src={modalImg}
                  alt={title}
                  className="
                    max-h-[80vh] w-auto
                    rounded-lg shadow-2xl
                    object-contain
                  "
                />
              )}

              <button
                type="button"
                onClick={closeModal}
                className="
                  absolute -top-3 -right-3
                  rounded-full bg-black/85
                  px-2 py-1 text-xs
                  text-white shadow-lg
                "
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
