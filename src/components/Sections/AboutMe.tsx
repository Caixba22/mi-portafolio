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
        padding: '6rem 2rem',
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
          gap: '3rem',
          maxWidth: '900px', // 👈 limita el ancho
          width: '100%',
          margin: '0 auto', // 👈 centra el bloque principal
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {/* 🧑‍💻 Imagen de perfil */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            flexShrink: 0, // 👈 evita que la imagen se estire
          }}
        >
          <img
            src="/models/profile.png"
            alt="Tu foto"
            style={{
              width: isMobile ? '140px' : '180px',
              height: isMobile ? '140px' : '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
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

        {/* 💬 Texto de presentación */}
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
