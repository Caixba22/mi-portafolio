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
 * - Diseño limpio, centrado y responsive
 */
export default function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="projects"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "2rem",
        padding: "4rem clamp(1rem, 5vw, 3rem)",
        maxWidth: "90rem",
        margin: "0 auto",
        background: "radial-gradient(circle at 50% 10%, #0d121b, #05070c 90%)",
        color: "white",
      }}
    >
      <h2
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          marginBottom: "2rem",
          color: "#00b4ff",
          letterSpacing: "1px",
          textShadow: "0 0 20px rgba(0,180,255,0.5)",
        }}
      >
        Mis Proyectos
      </h2>

      {projects.map((p, i) => (
        <div
          key={i}
          style={{
            flex: "1 1 clamp(17rem, 30%, 22rem)",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05) translateY(-5px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          <ProjectCard project={p} />
        </div>
      ))}
    </section>
  );
}
