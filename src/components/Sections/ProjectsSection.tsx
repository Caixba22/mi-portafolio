// src/components/Sections/ProjectsSection.tsx

import React from "react";
import ProjectCard from "./ProjectCard";

// 👇 Actualizamos la interfaz para incluir las nuevas propiedades
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
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
        padding: "3rem 1rem",
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} />
      ))}
    </section>
  );
}
