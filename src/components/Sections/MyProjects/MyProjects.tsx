// src/components/Sections/MyProjects.tsx

// src/components/Sections/MyProjects.tsx

import React, { useEffect, useState } from "react";
import { useUI } from "../../../context/uiContext";
import ProjectReel from "./ProjectReel/ProjectReel";

const useWindowWidth = () => {
  const [width, setWidth] = useState(() =>
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

  const heading = lang === "es" ? "Mis proyectos más recientes" : "My projects";

  return (
    <section
      id="projects"
      className="
        scroll-mt-[80px]
        relative w-full
        flex flex-col items-center
        py-24
        bg-app/0 text-app
      "
    >
      {/* luz suave arriba */}
      <div
        className="
          pointer-events-none
          absolute -top-32 left-1/2 -translate-x-1/2
          w-[60rem] h-[18rem]
          bg-white/6 blur-[110px] rounded-full
        "
      />

      {/* CONTENEDOR ANGOSTO + BORDE REDONDEADO + FONDO */}
      <div
        className="
          relative
          mx-auto
          w-[min(100vw-2rem,68rem)]
          md:w-[min(100vw-4rem,62rem)]
          bg-black/10
          border border-white/5
          rounded-2xl md:rounded-3xl
          backdrop-blur-sm
          pt-10 pb-12 px-3 md:px-6
          overflow-hidden
        "
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-[var(--color-primary)]">
          {heading}
        </h2>

        {/* este div fuerza al carrusel a NO salirse del tamaño anterior */}
        <div className="relative w-full overflow-hidden rounded-xl">
          <ProjectReel projects={projects} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
