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
    reel.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
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
    <div className="flex flex-col items-center w-full max-w-[80rem] mx-auto overflow-visible">
      {/* 🎞️ Carrusel horizontal */}
      <div
        ref={reelRef}
        className="
          flex flex-row gap-8 overflow-x-auto overflow-y-visible
          px-8 py-16 scroll-smooth snap-x snap-mandatory
          w-full no-scrollbar
        "
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="
              flex justify-center items-stretch
              snap-center flex-shrink-0
              [flex:0_0_clamp(17rem,60vw,22rem)]
              bg-transparent rounded-xl
              transition-all duration-300 ease-in-out
              hover:scale-[1.06] hover:-translate-y-2 hover:z-10
            "
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* 🎯 Flechas 3D */}
      <div className="flex justify-center items-center gap-8 mt-8">
        {/* Flecha izquierda */}
        <button
          onClick={() => scrollBy("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`
            flex items-center justify-center rounded-full 
            w-[5.5rem] h-[5.5rem] md:w-[4rem] md:h-[4rem]
            border border-cyan-400/40 
            bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.12),rgba(0,150,200,0.08))]
            backdrop-blur-md transition-all duration-200 ease-in-out
            shadow-[inset_0_0_16px_rgba(0,255,255,0.35),0_0_25px_rgba(0,180,255,0.25)]
            hover:scale-110 hover:shadow-[inset_0_0_22px_rgba(0,255,255,0.6),0_0_40px_rgba(0,255,255,0.5)]
            ${!canScrollLeft ? "opacity-40 pointer-events-none" : ""}
          `}
        >
          <div className="w-[3.8rem] h-[3.8rem] overflow-visible rounded-full">
            <Canvas frameloop="always" shadows camera={{ position: [0, 0, 3.5], fov: 35 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[2, 2, 3]} intensity={1.4} />
              <pointLight position={[-3, -2, 2]} intensity={0.6} color="#00ffff" />
              <Arrow3D direction="left" />
              <EffectComposer>
                <Bloom intensity={1.4} luminanceThreshold={0.25} luminanceSmoothing={0.8} />
              </EffectComposer>
            </Canvas>
          </div>
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => scrollBy("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`
            flex items-center justify-center rounded-full 
            w-[5.5rem] h-[5.5rem] md:w-[4rem] md:h-[4rem]
            border border-cyan-400/40 
            bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.12),rgba(0,150,200,0.08))]
            backdrop-blur-md transition-all duration-200 ease-in-out
            shadow-[inset_0_0_16px_rgba(0,255,255,0.35),0_0_25px_rgba(0,180,255,0.25)]
            hover:scale-110 hover:shadow-[inset_0_0_22px_rgba(0,255,255,0.6),0_0_40px_rgba(0,255,255,0.5)]
            ${!canScrollRight ? "opacity-40 pointer-events-none" : ""}
          `}
        >
          <div className="w-[3.8rem] h-[3.8rem] overflow-visible rounded-full">
            <Canvas frameloop="always" shadows camera={{ position: [0, 0, 3.5], fov: 35 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[2, 2, 3]} intensity={1.4} />
              <pointLight position={[-3, -2, 2]} intensity={0.6} color="#00ffff" />
              <Arrow3D direction="right" />
              <EffectComposer>
                <Bloom intensity={1.4} luminanceThreshold={0.25} luminanceSmoothing={0.8} />
              </EffectComposer>
            </Canvas>
          </div>
        </button>
      </div>
    </div>
  );
}
