//src/components/Sections/ProjectReel.tsx

import React, { useRef, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
  technologies: string[];
}

interface Props {
  projects: Project[];
}

/**
 * 🎞️ ProjectReel — Carrusel moderno con:
 * - scroll horizontal suave
 * - flechas abajo (visibles en móvil y desktop)
 * - swipe táctil en móvil
 * - hover con profundidad
 */
export default function ProjectReel({ projects }: Props) {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 🔘 Scroll manual
  const scrollBy = (dir: "left" | "right") => {
    if (!reelRef.current) return;
    const amount = reelRef.current.clientWidth * 0.8;
    reelRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // 🧭 Detectar bordes para mostrar flechas
  const updateScrollState = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    const reel = reelRef.current;
    if (!reel) return;
    reel.addEventListener("scroll", updateScrollState);
    return () => reel.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "min(90vw, 80rem)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🎠 Carrusel */}
      <div
        ref={reelRef}
        className="project-reel"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "1rem 2rem 2.5rem",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          width: "100%",
          position: "relative",
        }}
      >
        <style>
          {`
            .project-reel::-webkit-scrollbar { display: none; }

            .project-reel > div {
              transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.3s ease;
            }

            .project-reel > div:hover {
              transform: scale(1.06) translateY(-8px);
              box-shadow: 0 0 25px rgba(0,180,255,0.3);
              filter: brightness(1.08);
            }

            /* 🎯 Flechas inferiores */
            .reel-controls {
              display: flex;
              justify-content: center;
              gap: 1.5rem;
              margin-top: 1.5rem;
            }

            .reel-arrow {
              background: rgba(0, 180, 255, 0.15);
              border: 1px solid rgba(0, 180, 255, 0.4);
              color: #00b4ff;
              font-size: 1.6rem;
              border-radius: 50%;
              width: 2.8rem;
              height: 2.8rem;
              cursor: pointer;
              backdrop-filter: blur(6px);
              box-shadow: 0 0 10px rgba(0, 180, 255, 0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.25s ease;
            }

            .reel-arrow:hover {
              background: rgba(0, 180, 255, 0.35);
              transform: scale(1.1);
              box-shadow: 0 0 20px rgba(0, 180, 255, 0.5);
            }

            @media (max-width: 768px) {
              .reel-arrow {
                font-size: 1.4rem;
                width: 2.5rem;
                height: 2.5rem;
              }
            }
          `}
        </style>

        {projects.map((p, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 clamp(17rem, 60vw, 22rem)",
              scrollSnapAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* 🎯 Flechas debajo del carrusel */}
      <div className="reel-controls">
        <button
          className="reel-arrow"
          onClick={() => scrollBy("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          style={{
            opacity: canScrollLeft ? 1 : 0.4,
            pointerEvents: canScrollLeft ? "auto" : "none",
          }}
        >
          ⟵
        </button>
        <button
          className="reel-arrow"
          onClick={() => scrollBy("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          style={{
            opacity: canScrollRight ? 1 : 0.4,
            pointerEvents: canScrollRight ? "auto" : "none",
          }}
        >
          ⟶
        </button>
      </div>
    </div>
  );
}
