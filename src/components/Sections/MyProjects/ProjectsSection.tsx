// src/components/Sections/ProjectsSection.tsx
import React from "react";
import { useUI } from "../../../context/uiContext";
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

export default function ProjectsSection({ projects }: Props) {
  const { lang } = useUI();
  const title = lang === "es" ? "Mis proyectos" : "My projects";

  return (
    <section
      id="projects-grid"
      className="relative py-16 bg-app-soft text-app overflow-hidden"
    >
      {/* ✨ shader blanco */}
      <div
        className="
          pointer-events-none
          absolute -top-24 left-1/2 -translate-x-1/2
          w-[60rem] h-[20rem]
          bg-white/10
          blur-3xl
          rounded-full
          mix-blend-screen
        "
      />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-[var(--color-primary)]">
          {title}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={i}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
