// src/components/Sections/AboutMe.tsx
import React, { useEffect, useState } from 'react'

export default function AboutMe() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="about"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // ✅ Espacio superior reducido (de 4rem a 2.5rem) para acercar al Header
        padding: '2.5rem 2rem 6rem 2rem', // Top: 2.5rem, Bottom: 6rem
        color: 'white',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3.5rem',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {/* 🧑‍💻 Imagen de perfil con diseño elegante y sutil */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem',
            flexShrink: 0,
          }}
        >
          <img
            src="/models/profile.png"
            alt="Tu foto"
            style={{
              width: isMobile ? '180px' : '220px',
              height: isMobile ? '180px' : '220px',
              borderRadius: '50%',
              objectFit: 'cover',
              // Borde de color sutil, casi invisible
              border: '1px solid rgba(0, 180, 255, 0.2)', 
              // ✅ Sombra elegante: Halo de Datos sutil con poco spread y opacidad baja
              boxShadow: '0 0 10px rgba(0, 180, 255, 0.5), inset 0 0 5px rgba(0, 180, 255, 0.2)', 
              transition: 'all 0.3s ease-out',
            }}
          />
          <a
            href="/cv.pdf"
            download
            style={{
              background: '#0d6efd',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLAnchorElement).style.background = '#0b5ed7')
            }
            onMouseOut={(e) =>
              ((e.target as HTMLAnchorElement).style.background = '#0d6efd')
            }
          >
            Descargar CV
          </a>
        </div>

        {/* 💬 Texto de presentación (sin cambios) */}
        <div
          style={{
            flex: 1,
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '480px',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              marginBottom: '1rem',
            }}
          >
            Hola, soy{' '}
            <span
              style={{
                color: '#00b4ff',
                fontWeight: 700,
              }}
            >
              Tu Nombre
            </span>
          </h2>
          <p style={{ opacity: 0.9 }}>
            Desarrollador full-stack especializado en <b>React</b>, <b>Three.js</b>{' '}
            y desarrollo interactivo en 3D. Me apasiona crear interfaces elegantes y
            experiencias inmersivas.
          </p>
        </div>
      </div>
    </section>
  )
}