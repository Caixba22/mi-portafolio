// src/components/Sections/ProjectReel.tsx

import React, { useRef, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Arrow3D from "../3D/Arrow3D";

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
 * 🎞️ ProjectReel — Carrusel con flechas 3D reales
 * - Scroll horizontal suave y centrado
 * - Flechas 3D animadas con Three.js
 * - Brillo (Bloom) y movimiento flotante
 * - Diseño responsive
 */
export default function ProjectReel({ projects }: Props) {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 🔘 Scroll manual centrado
  const scrollBy = (dir: "left" | "right") => {
    if (!reelRef.current) return;
    const reel = reelRef.current;
    const cards = Array.from(reel.children) as HTMLElement[];
    if (!cards.length) return;

    // calcula el ancho de un card más el gap (~2rem = 32px)
    const cardWidth = cards[0].offsetWidth + 32;
    const scrollAmount = dir === "left" ? -cardWidth : cardWidth;

    reel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // 🧭 Detectar bordes para mostrar/desactivar flechas
  const updateScrollState = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  // 🪄 Centrar el primer proyecto al inicio
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const firstCard = reel.children[0] as HTMLElement;
    if (firstCard) {
      const offset =
        firstCard.offsetLeft +
        firstCard.offsetWidth / 2 -
        reel.clientWidth / 2;
      reel.scrollTo({ left: offset });
    }
    updateScrollState();
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
              background: radial-gradient(circle at 30% 30%, rgba(0,255,255,0.1), rgba(0,150,200,0.1));
              border: 1px solid rgba(0, 200, 255, 0.4);
              border-radius: 50%;
              width: 3rem;
              height: 3rem;
              cursor: pointer;
              backdrop-filter: blur(6px);
              box-shadow:
                inset 0 0 10px rgba(0,255,255,0.3),
                0 0 10px rgba(0,180,255,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.25s ease;
            }

            .reel-arrow:hover {
              background: radial-gradient(circle at 30% 30%, rgba(0,255,255,0.25), rgba(0,150,255,0.25));
              transform: scale(1.1);
              box-shadow:
                inset 0 0 15px rgba(0,255,255,0.6),
                0 0 25px rgba(0,255,255,0.5);
            }

            canvas {
              border-radius: 50%;
            }

            @media (max-width: 768px) {
              .reel-arrow {
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

      {/* 🎯 Flechas 3D debajo del carrusel */}
      <div className="reel-controls">
        {/* 🔹 Flecha izquierda */}
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
          <Canvas
            style={{ width: "2.5rem", height: "2.5rem" }}
            frameloop="always"
            shadows
            camera={{ position: [0, 0, 3.5], fov: 35 }}
          >
            <color attach="background" args={["#000"]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[2, 2, 3]} intensity={1.4} />
            <pointLight position={[-3, -2, 2]} intensity={0.6} color="#00ffff" />
            <Arrow3D direction="left" />
            <EffectComposer>
              <Bloom intensity={1.4} luminanceThreshold={0.25} luminanceSmoothing={0.8} />
            </EffectComposer>
          </Canvas>
        </button>

        {/* 🔹 Flecha derecha */}
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
          <Canvas
            style={{ width: "2.5rem", height: "2.5rem" }}
            frameloop="always"
            shadows
            camera={{ position: [0, 0, 3.5], fov: 35 }}
          >
            <color attach="background" args={["#000"]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[2, 2, 3]} intensity={1.4} />
            <pointLight position={[-3, -2, 2]} intensity={0.6} color="#00ffff" />
            <Arrow3D direction="right" />
            <EffectComposer>
              <Bloom intensity={1.4} luminanceThreshold={0.25} luminanceSmoothing={0.8} />
            </EffectComposer>
          </Canvas>
        </button>
      </div>
    </div>
  );
}
