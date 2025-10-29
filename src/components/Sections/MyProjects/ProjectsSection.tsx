// src/components/Sections/ProjectsSection.tsx
import React from "react";
import ProjectCard from "./Cards/ProjectCard";

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
 * 🧩 ProjectsSection — Versión sin modelo 3D
 * - Muestra los proyectos en una cuadrícula adaptable
 * - Diseño limpio, centrado y responsive (ahora con Tailwind)
 */
export default function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="projects"
      className="
        flex flex-wrap justify-center items-stretch
        gap-8
        px-6 md:px-12 py-16
        max-w-[90rem] mx-auto
        text-white
        bg-[radial-gradient(circle_at_50%_10%,#0d121b,#05070c_90%)]
      "
    >
      <h2
        className="
          w-full text-center text-cyan-400
          text-4xl md:text-5xl font-bold mb-10
          tracking-wide
          drop-shadow-[0_0_20px_rgba(0,180,255,0.5)]
        "
      >
        Mis Proyectos
      </h2>

      {projects.map((p, i) => (
        <div
          key={i}
          className="
            flex justify-center items-stretch
            flex-[1_1_clamp(17rem,30%,22rem)]
            transform transition-transform duration-300 ease-out
            hover:scale-[1.05] hover:-translate-y-1
          "
        >
          <ProjectCard project={p} />
        </div>
      ))}
    </section>
  );
}
