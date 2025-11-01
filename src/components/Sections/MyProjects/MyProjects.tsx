// src/components/Sections/MyProjects.tsx
import React, { useEffect, useState } from "react";
import { useUI } from "../../../context/uiContext";
import ProjectReel from "./ProjectReel/ProjectReel";

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default function MyProjects() {
  const { lang } = useUI();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const projects = [
    {
      title: lang === "es" ? "Music Visualizer 0.0" : "Music Visualizer 0.0",
      desc:
        lang === "es"
          ? "Sitio 3D interactivo con React Three Fiber y animaciones suaves."
          : "3D interactive site with React Three Fiber and smooth animations.",
      imgDesktop: "/pc_musicvisualizer.png",
      imgMobile: "/movil_musicvisualizer.jpg",
      link: "https://music-visualizer00.netlify.app/",
      technologies: ["React", "Three.js", "TypeScript", "CSS"],
    },
    {
      title: lang === "es" ? "Mi Consultorio" : "My Clinic",
      desc:
        lang === "es"
          ? "Aplicación full-stack con React, Node.js y MongoDB."
          : "Full-stack app with React, Node.js and MongoDB.",
      imgDesktop: "/pc_miconsultorio.png",
      imgMobile: "/movil_miconsultorio.jpg",
      link: "https://mipaginaweb-miconsultorio.netlify.app/",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: lang === "es" ? "Mi Catálogo" : "My Catalog",
      desc:
        lang === "es"
          ? "Dashboard con gráficas y consumo de API REST."
          : "Dashboard with charts and REST API.",
      imgDesktop: "/pc_micatalogo.png",
      imgMobile: "/movil_micatalogo.jpg",
      link: "https://mi-negocio-two.vercel.app/",
      technologies: ["React", "Chart.js", "REST API", "Sass"],
    },
  ];

  const heading =
    lang === "es" ? "Mis proyectos más recientes" : "My recent projects";

  return (
    <section
      id="projects"
      className="
        scroll-mt-[80px]
        w-full flex justify-center
        py-20 px-4 sm:px-6 lg:px-8
        bg-transparent text-[#1a1a1a]
      "
    >
      <div
        className="
          relative
          w-[min(100%,52rem)]
          mx-auto
          rounded-2xl md:rounded-3xl
          border border-[color-mix(in_oklab,var(--color-primary)_30%,rgba(0,0,0,0.08))]
          shadow-[0_18px_45px_rgba(0,0,0,0.15)]
          bg-[rgba(255,255,255,0.65)]
          backdrop-blur-md
          px-6 sm:px-10 py-12
          transition-all duration-300
          hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]
        "
      >
        {/* ✨ Halo dinámico alrededor del bloque */}
        <div
          className="
            absolute inset-0 rounded-2xl md:rounded-3xl
            bg-[var(--color-primary)]
            opacity-15 blur-2xl
            pointer-events-none
          "
        />

        {/* 💎 Contenido principal */}
        <div className="relative z-10">
          <h2
            className="
              text-[2rem] sm:text-[2.4rem]
              mb-10
              text-[var(--color-primary)]
              text-center font-semibold
            "
          >
            {heading}
          </h2>

          <div className="relative w-full overflow-hidden rounded-xl">
            <ProjectReel projects={projects} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
}
