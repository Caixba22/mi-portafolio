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
          ? "Página web que utiliza un modelo 3D de Blender con materiales emisivos. Al seleccionar una fuente de audio, el modelo visualiza las frecuencias a través de efectos de luz dinámicos. (Limitado solo a computadoras por políticas de seguridad de la API de audio)."
          : "Website that uses a 3D Blender model with emissive materials. When you pick an audio source, the model visualizes the frequencies with dynamic light effects. (Desktop only due to audio API security policies.)",
      imgDesktop: "/pc_musicvisualizer.png",
      imgMobile: "/movil_musicvisualizer.jpg",
      link: "https://music-visualizer00.netlify.app/",
      technologies: ["React", "Three.js", "TypeScript", "CSS"],
    },
    {
      title: lang === "es" ? "Mi Consultorio" : "Mi Consultorio",
      desc:
        lang === "es"
          ? "Página web que simula el perfil de algún profesional de la salud, tiene una sección de ajustes para seleccionar algunas preferencias y un chat predeterminado que responde a preguntas frecuentes."
          : "Website that simulates a health professional’s profile. It includes a settings section to choose a few preferences and a preset chat that answers common questions.",
      imgDesktop: "/pc_miconsultorio.png",
      imgMobile: "/movil_miconsultorio.jpg",
      link: "https://mipaginaweb-miconsultorio.netlify.app/",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: lang === "es" ? "Mi Catálogo" : "Mi Catálogo",
      desc:
        lang === "es"
          ? "Página web para un pequeño negocio de ventas de distintos productos de catálogos, cuenta con una sección de gestión de productos solo para adminsitradores"
          : "Website for a small shop that sells different catalog products, with an admin-only section to manage items.",
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
        <div
          className="
            absolute inset-0 rounded-2xl md:rounded-3xl
            bg-[var(--color-primary)]
            opacity-15 blur-2xl
            pointer-events-none
          "
        />
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
