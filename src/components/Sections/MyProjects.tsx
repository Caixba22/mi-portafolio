// src/components/Sections/MyProjects.tsx

import React, { Suspense, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "../../scenes/Experience";
import ProjectCard from "./ProjectCard";

// 💡 Hook para detectar el ancho del viewport
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

  // 🎥 Cámara responsiva (corrige el tipo de tupla)
  const cameraProps = useMemo(() => {
    if (isMobile)
      return { position: [0, 2, 4] as [number, number, number], fov: 55 };
    return { position: [0, 2, 6] as [number, number, number], fov: 45 };
  }, [isMobile]);

  // 📂 Lista de proyectos (nueva estructura con imágenes y tecnologías)
  const projects = [
    {
      title: "Music Visualizer 0.0",
      desc: "Sitio 3D interactivo con React Three Fiber y animaciones suaves.",
      imgDesktop: "/public/pc_musicvisualizer.png",
      imgMobile: "/public/movil_musicvisualizer.jpg",
      link: "https://miportfolio.vercel.app/",
      technologies: ["React", "Three.js", "TypeScript", "CSS"],
    },
    {
      title: "Mi Consultorio",
      desc: "Aplicación full-stack con React, Node.js y base de datos MongoDB.",
      imgDesktop: "/public/pc_miconsultorio.png",
      imgMobile: "/public/movil_miconsultorio.jpg",
      link: "https://myecommerce.netlify.app/",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Mi Catálogo",
      desc: "Dashboard analítico con gráficas dinámicas y consumo de API REST.",
      imgDesktop: "/public/pc_micatalogo.png",
      imgMobile: "/public/movil_micatalogo.jpg",
      link: "https://mydashboard.netlify.app/",
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
        background:
          "linear-gradient(180deg, #0a0e15 0%, #10141f 60%, #0a0e15 100%)",
        overflow: "hidden",
        marginInline: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* 🎯 Título principal */}
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          marginBottom: "2.5rem",
          textAlign: "center",
          color: "#00b4ff",
          letterSpacing: "1px",
          textShadow: "0 0 10px rgba(0,180,255,0.3)",
        }}
      >
        Mis Proyectos & Demo 3D
      </h2>

      {/* 🌌 Canvas 3D responsivo */}
      <div
        style={{
          width: "100%",
          maxWidth: "min(90vw, 60rem)",
          aspectRatio: "16 / 9",
          marginBottom: "4rem",
          borderRadius: "1.2rem",
          overflow: "hidden",
          boxShadow: "0 0 2rem rgba(0,180,255,0.25)",
          background: "transparent",
        }}
      >
        <Canvas
          shadows
          camera={cameraProps}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
          }}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.4} castShadow />
          <pointLight position={[-3, 3, -3]} intensity={0.8} />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* 🧱 Grid de proyectos responsivo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(14rem, 45%, 20rem), 1fr))",
          gap: "clamp(1.5rem, 4vw, 2.5rem)",
          width: "100%",
          maxWidth: "min(90vw, 65rem)",
          justifyItems: "center",
          alignItems: "stretch",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}
