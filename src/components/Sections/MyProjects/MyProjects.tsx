// src/components/Sections/MyProjects.tsx
import React, { useEffect, useState } from "react";
import ProjectReel from "./ProjectReel/ProjectReel";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

export default function MyProjects() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const projects = [
    {
      title: "Music Visualizer 0.0",
      desc: "Sitio 3D interactivo con React Three Fiber y animaciones suaves.",
      imgDesktop: "/pc_musicvisualizer.png",
      imgMobile: "/movil_musicvisualizer.jpg",
      link: "https://music-visualizer00.netlify.app/",
      technologies: ["React", "Three.js", "TypeScript", "CSS"],
    },
    {
      title: "Mi Consultorio",
      desc: "Aplicación full-stack con React, Node.js y base de datos MongoDB.",
      imgDesktop: "/pc_miconsultorio.png",
      imgMobile: "/movil_miconsultorio.jpg",
      link: "https://mipaginaweb-miconsultorio.netlify.app/",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Mi Catálogo",
      desc: "Dashboard analítico con gráficas dinámicas y consumo de API REST.",
      imgDesktop: "/pc_micatalogo.png",
      imgMobile: "/movil_micatalogo.jpg",
      link: "https://mi-negocio-two.vercel.app/",
      technologies: ["React", "Chart.js", "REST API", "Sass"],
    },
  ];

  return (
    <section
      id="projects"
      className="
        w-full min-h-screen
        flex flex-col items-center justify-center
        px-6 md:px-16 py-24
        text-white
        bg-[radial-gradient(circle_at_50%_10%,#0d121b,#05070c_90%)]
        overflow-visible
      "
    >
      <h2
        className="
          text-center text-cyan-400
          text-4xl md:text-5xl font-bold mb-12
          tracking-wide
          drop-shadow-[0_0_20px_rgba(0,180,255,0.5)]
        "
      >
        Mis Proyectos
      </h2>

      {/* 🎞️ Carrusel horizontal */}
      <ProjectReel projects={projects} />
    </section>
  );
}
