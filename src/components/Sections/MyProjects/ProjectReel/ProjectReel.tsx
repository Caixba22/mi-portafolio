// src/components/Sections/ProjectReel.tsx
import React, { useRef, useState, useEffect } from "react";
import ProjectCard from "../Cards/ProjectCard";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Arrow3D from "../../../3D/Arrow3D";

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

export default function ProjectReel({ projects }: Props) {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollBy = (dir: "left" | "right") => {
    if (!reelRef.current) return;
    const reel = reelRef.current;
    const cards = Array.from(reel.children) as HTMLElement[];
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 32;
    const scrollAmount = dir === "left" ? -cardWidth : cardWidth;
    reel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollState = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const firstCard = reel.children[0] as HTMLElement;
    if (firstCard) {
      const offset =
        firstCard.offsetLeft + firstCard.offsetWidth / 2 - reel.clientWidth / 2;
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
        overflow: "visible",
      }}
    >
      <div
        ref={reelRef}
        className="project-reel"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          overflowX: "auto",
          overflowY: "visible",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "4rem 2rem 3.5rem",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          width: "100%",
          position: "relative",
          background: "transparent",
        }}
      >
        <style>
          {`
            .project-reel::-webkit-scrollbar { display: none; }

            /* ✨ Hover solo sobre la card interna */
            .project-reel > div {
              transition: transform 0.4s ease, filter 0.3s ease;
              background: transparent;
              border-radius: 1rem;
              overflow: visible;
            }

            .project-reel > div:hover {
              transform: scale(1.06) translateY(-8px);
              filter: brightness(1.1);
              z-index: 10;
            }

            /* 💡 Aplica sombra a la card, no al wrapper */
            .project-reel > div:hover > div {
              box-shadow: 0 0 30px rgba(0,180,255,0.4);
              border-radius: 1rem;
            }

            /* ⚡ Flechas */
            .reel-controls {
              display: flex;
              justify-content: center;
              gap: 2rem;
              margin-top: 2.4rem;
            }

            .reel-arrow {
              background: radial-gradient(circle at 50% 50%, rgba(0,255,255,0.12), rgba(0,150,200,0.08));
              border: 1px solid rgba(0, 200, 255, 0.4);
              border-radius: 50%;
              width: 5.5rem;
              height: 5.5rem;
              cursor: pointer;
              backdrop-filter: blur(8px);
              box-shadow:
                inset 0 0 16px rgba(0,255,255,0.35),
                0 0 25px rgba(0,180,255,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.25s ease;
              overflow: visible;
            }

            .reel-arrow:hover {
              background: radial-gradient(circle at 50% 50%, rgba(0,255,255,0.25), rgba(0,150,255,0.2));
              transform: scale(1.12);
              box-shadow:
                inset 0 0 22px rgba(0,255,255,0.6),
                0 0 40px rgba(0,255,255,0.5);
            }

            .arrow-canvas-wrapper {
              width: 3.8rem;
              height: 3.8rem;
              clip-path: circle(50%);
              overflow: visible;
            }

            .arrow-canvas-wrapper canvas {
              width: 100% !important;
              height: 100% !important;
              background: transparent !important;
            }

            @media (max-width: 768px) {
              .reel-arrow {
                width: 4rem;
                height: 4rem;
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
              overflow: "visible",
              position: "relative",
              background: "transparent",
              borderRadius: "1rem",
            }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* 🎯 Flechas 3D */}
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
          <div className="arrow-canvas-wrapper">
            <Canvas
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
                <Bloom
                  intensity={1.4}
                  luminanceThreshold={0.25}
                  luminanceSmoothing={0.8}
                />
              </EffectComposer>
            </Canvas>
          </div>
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
          <div className="arrow-canvas-wrapper">
            <Canvas
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
                <Bloom
                  intensity={1.4}
                  luminanceThreshold={0.25}
                  luminanceSmoothing={0.8}
                />
              </EffectComposer>
            </Canvas>
          </div>
        </button>
      </div>
    </div>
  );
}
