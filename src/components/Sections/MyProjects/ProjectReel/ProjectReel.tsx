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
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    <div className="flex flex-col items-center w-full">
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
        <div className="flex justify-center items-center gap-4 pb-2 pt-2">
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
  const [accent, setAccent] = React.useState("#00ffff");

  React.useEffect(() => {
    const getColor = () => {
      const root = document.documentElement;
      const val =
        getComputedStyle(root).getPropertyValue("--color-primary").trim() ||
        "#00ffff";
      setAccent(val);
    };
    getColor();
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          getColor();
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  return (
    <button
      onClick={onClick}
      className={`
        inline-grid place-items-center
        w-12 h-12
        bg-transparent
        border-0
        rounded-none
        ${active ? "opacity-100" : "opacity-40 pointer-events-none"}
      `}
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 3.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{
          width: "3rem",
          height: "3rem",
          background: "transparent", // 👈 IMPORTANTE
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 3]} intensity={1.4} />
        <pointLight position={[-3, -2, 2]} intensity={0.9} color={accent} />
        <Arrow3D direction={dir} color={accent} variant="chevron" />
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.7}
          />
        </EffectComposer>
      </Canvas>
    </button>
  );
}
