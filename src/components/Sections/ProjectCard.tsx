// src/components/Sections/ProjectCard.tsx

import React from 'react'

interface Project {
  title: string
  desc: string
  img: string
  link: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  // --- Propiedades Clave ---
  const primaryColor = '#00b4ff' // Azul principal para el borde
  const secondaryColor = '#6efff6' // Color de acento neón

  // Estilos Base y Dinámicos
  const cardStyle = {
    // Fondo transparente para que el color de fondo de la sección lo separe
    background: 'rgba(255, 255, 255, 0.00)', 
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    borderRadius: '8px', 
    boxShadow: isHovered
      ? `0 0 15px ${primaryColor}40, 0 8px 20px rgba(0,0,0,0.6)`
      : '0 4px 15px rgba(0,0,0,0.4)',
    padding: '1.5rem',
    width: '100%', 
    maxWidth: '400px', 
    transition: 'all 0.4s ease-out',
    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)', 
    position: 'relative' as const,
    overflow: 'hidden',
  }

  const linkStyle = {
    display: 'inline-block',
    marginTop: '1.2rem',
    padding: '0.6rem 1.2rem',
    background: isHovered ? secondaryColor : primaryColor, 
    color: '#10141f',
    fontWeight: 700,
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s',
    boxShadow: isHovered ? `0 0 15px ${secondaryColor}80` : 'none',
    fontSize: '0.9rem', 
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Borde Superior Asimétrico (Separador visual) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: primaryColor, 
          clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.4s',
        }}
      />
      {/* Barra de Acero / Indicador lateral */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: 0,
          width: '4px',
          height: '30%',
          background: isHovered ? secondaryColor : 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          transition: 'background 0.4s',
        }}
      />
      
      <img
        src={project.img}
        alt={project.title}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '1rem',
          filter: isHovered ? 'saturate(1.2)' : 'saturate(1)',
          transition: 'filter 0.5s',
        }}
      />
      
      <h3 style={{ 
          color: primaryColor, 
          marginBottom: '0.5rem', 
          fontSize: '1.3rem',
          textShadow: '0 0 5px rgba(0,180,255,0.2)' 
      }}>
        {project.title}
      </h3>
      
      <p style={{ fontSize: '0.9rem', opacity: 0.85, minHeight: '48px', color: '#e0e0e0' }}>
        {project.desc}
      </p>
      
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        onMouseOver={(e) => ((e.target as HTMLAnchorElement).style.transform = 'scale(1.02)')}
        onMouseOut={(e) => ((e.target as HTMLAnchorElement).style.transform = 'scale(1)')}
      >
        ACCEDER AL DATOS ⛭
      </a>
    </div>
  )
}