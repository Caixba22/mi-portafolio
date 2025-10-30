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
  isMobile?: boolean;
}

export default function ProjectReel({ projects, isMobile = false }: Props) {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);   // 👈 empieza en true para que no parpadeen
  const [canScrollRight, setCanScrollRight] = useState(true); // 👈

  const scrollBy = (dir: "left" | "right") => {
    if (!reelRef.current) return;
    const reel = reelRef.current;
    const cards = Array.from(reel.children) as HTMLElement[];
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 24;
    reel.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const updateScrollState = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;

    // si todo cabe, igual los dejamos en true para que NO desaparezcan
    const fits = scrollWidth <= clientWidth + 2;

    setCanScrollLeft(fits ? true : scrollLeft > 10);
    setCanScrollRight(fits ? true : scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const firstCard = reel.children[0] as HTMLElement;
    if (firstCard) {
      const offset =
        firstCard.offsetLeft + firstCard.offsetWidth / 2 - reel.clientWidth / 2;
      reel.scrollTo({ left: Math.max(offset, 0) });
    }

    updateScrollState();
    reel.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      reel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const reelClasses = isMobile
    ? `
        flex gap-5 overflow-x-auto overflow-y-visible
        px-2 py-8 scroll-smooth snap-x snap-mandatory
        w-full no-scrollbar
      `
    : `
        flex gap-6 overflow-x-auto overflow-y-visible
        px-4 py-10 scroll-smooth snap-x snap-mandatory
        w-full no-scrollbar
      `;

  return (
    <div
      className="
        flex flex-col items-center
        w-full
        bg-[color-mix(in_oklab,var(--color-surface)_70%,transparent)]
        rounded-3xl
        shadow-[0_12px_50px_rgba(0,0,0,0.35)]
        border border-[color-mix(in_oklab,var(--color-border)_55%,transparent)]
      "
    >
      <div ref={reelRef} className={reelClasses}>
        {projects.map((p, i) => (
          <div
            key={i}
            className="
              snap-center flex-shrink-0
              w-[17.5rem] sm:w-[18.5rem] md:w-[19.5rem] lg:w-[21rem]
              transition-transform duration-300
              hover:-translate-y-2
            "
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {!isMobile && (
        <div className="flex justify-center items-center gap-6 pb-6">
          <ArrowButton
            dir="left"
            active={canScrollLeft}
            onClick={() => scrollBy("left")}
          />
          <ArrowButton
            dir="right"
            active={canScrollRight}
            onClick={() => scrollBy("right")}
          />
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  dir,
  active,
  onClick,
}: {
  dir: "left" | "right";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-grid place-items-center
        w-16 h-16 rounded-2xl
        border border-[var(--color-border)]
        bg-[color-mix(in_oklab,var(--color-surface)_90%,transparent)]
        transition-all duration-200
        ${active ? "opacity-100 hover:scale-105" : "opacity-45"}
      `}
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
    >
      <div className="w-[3.2rem] h-[3.2rem] overflow-visible rounded-full">
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 3.5], fov: 35 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 2, 3]} intensity={1.4} />
          <pointLight position={[-3, -2, 2]} intensity={0.8} color="#00ffff" />
          <Arrow3D direction={dir} />
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.7}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </button>
  );
}
