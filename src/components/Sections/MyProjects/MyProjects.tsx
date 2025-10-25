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
      imgDesktop: "/public/pc_musicvisualizer.png",
      imgMobile: "/public/movil_musicvisualizer.jpg",
      link: "https://music-visualizer00.netlify.app/",
      technologies: ["React", "Three.js", "TypeScript", "CSS"],
    },
    {
      title: "Mi Consultorio",
      desc: "Aplicación full-stack con React, Node.js y base de datos MongoDB.",
      imgDesktop: "/public/pc_miconsultorio.png",
      imgMobile: "/public/movil_miconsultorio.jpg",
      link: "https://mipaginaweb-miconsultorio.netlify.app/",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Mi Catálogo",
      desc: "Dashboard analítico con gráficas dinámicas y consumo de API REST.",
      imgDesktop: "/public/pc_micatalogo.png",
      imgMobile: "/public/movil_micatalogo.jpg",
      link: "https://mi-negocio-two.vercel.app/",
      technologies: ["React", "Chart.js", "REST API", "Sass"],
    },
  ];

  return (
    <section
      id="projects"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem clamp(1rem, 5vw, 4rem)",
        color: "white",
        background: "radial-gradient(circle at 50% 10%, #0d121b, #05070c 90%)",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          marginBottom: "3rem",
          textAlign: "center",
          color: "#00b4ff",
          letterSpacing: "1px",
          textShadow: "0 0 20px rgba(0,180,255,0.5)",
        }}
      >
        Mis Proyectos
      </h2>

      {/* 🎞️ Carrusel de proyectos */}
      <ProjectReel projects={projects} />
    </section>
  );
}
