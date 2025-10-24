// src/components/Sections/MyProjects.tsx

import React, { Suspense, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "../../scenes/Experience";
import ProjectReel from "./ProjectReel";

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

  const cameraProps = useMemo(() => {
    return isMobile
      ? { position: [0, 2, 4] as [number, number, number], fov: 55 }
      : { position: [0, 2, 6] as [number, number, number], fov: 45 };
  }, [isMobile]);

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
        Mis Proyectos & Demo 3D
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: "min(90vw, 60rem)",
          aspectRatio: "16 / 9",
          marginBottom: "5rem",
          borderRadius: "1.2rem",
          overflow: "hidden",
          boxShadow: "0 0 3rem rgba(0,180,255,0.35)",
        }}
      >
        <Canvas
          shadows
          camera={cameraProps}
          style={{ width: "100%", height: "100%" }}
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

      {/* 🎞️ El nuevo componente del reel */}
      <ProjectReel projects={projects} />
    </section>
  );
}
