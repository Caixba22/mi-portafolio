// src/components/Sections/MyProjects.tsx
import React, { Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Camera } from 'three' // 💡 Importamos el tipo Camera de three
import Experience from '../../scenes/Experience'
import ProjectCard from './ProjectCard'

// 💡 Definimos el tipo para las propiedades de la cámara
interface CameraProps {
    position: [number, number, number]; // <--- CORRECCIÓN CLAVE: Tupla de 3 números
    fov: number;
}

// HOOK: Detecta el ancho de la ventana para la responsividad
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return width
}

export default function MyProjects() {
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth < 768

    // 💡 LÓGICA DE CÁMARA 3D RESPONSIVA
    // Usamos useMemo y tipamos el resultado como CameraProps
    const cameraProps: CameraProps = useMemo(() => {
        // En móvil, acercamos la cámara (Z: 4)
        if (isMobile) {
            return { position: [0, 2, 4], fov: 55 }
        }
        // Escritorio
        return { position: [0, 2, 6], fov: 45 }
    }, [isMobile])


    const projects = [
        {
          title: 'Portfolio Website',
          desc: 'Sitio 3D interactivo con React Three Fiber.',
          img: '/projects/portfolio.png',
          link: '#',
        },
        {
          title: 'E-Commerce App',
          desc: 'Aplicación full-stack con React y Node.js.',
          img: '/projects/ecommerce.png',
          link: '#',
        },
        {
          title: 'Data Dashboard',
          desc: 'Dashboard analítico con gráficas y API REST.',
          img: '/projects/dashboard.png',
          link: '#',
        },
    ]

    return (
        <section
            id="projects"
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem min(4rem, 5vw)', 
                color: 'white',
                background: 'linear-gradient(180deg, #0a0e15 0%, #10141f 60%, #0a0e15 100%)',
                overflow: 'hidden',
                margin: '0 auto', 
            }}
        >
            {/* 🎯 Título principal */}
            <h2
                style={{
                    fontSize: '2.4rem',
                    marginBottom: '2.5rem',
                    textAlign: 'center',
                    color: '#00b4ff',
                    letterSpacing: '1px',
                    textShadow: '0 0 10px rgba(0,180,255,0.3)',
                }}
            >
                Mis Proyectos & Demo 3D
            </h2>

            {/* 🌌 Canvas con el modelo 3D */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    aspectRatio: '16 / 9',
                    marginBottom: '4rem',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 0 40px rgba(0,180,255,0.2)',
                }}
            >
                <Canvas
                    shadows
                    // 💡 Usamos las propiedades de cámara responsivas
                    camera={cameraProps} 
                    style={{ width: '100%', height: '100%', background: 'transparent' }}
                >
                    <color attach="background" args={['transparent']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[3, 5, 2]} intensity={1.4} castShadow />
                    <pointLight position={[-3, 3, -3]} intensity={0.8} />
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>
            </div>

            {/* 🧱 Contenedor de Cards en grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                    gap: isMobile ? '3rem' : '4rem', 
                    width: '100%',
                    maxWidth: '1000px',
                    justifyItems: 'center',
                }}
            >
                {projects.map((p, i) => (
                    <ProjectCard key={i} project={p} />
                ))}
            </div>
        </section>
    )
}