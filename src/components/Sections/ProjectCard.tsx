// src/components/Sections/ProjectCard.tsx
import React from "react";

interface Project {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
  technologies: string[];
}

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const accent = "#00b4ff";
  const textColor = "#e4e8ef";

  const containerStyle: React.CSSProperties = {
    perspective: "1000px",
    width: "100%",
    maxWidth: "380px",
    height: "340px",
    cursor: "pointer",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
  };

  const baseSide: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    background: "rgba(20,25,35,0.6)",
    backdropFilter: "blur(12px)",
  };

  const frontStyle: React.CSSProperties = {
    ...baseSide,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1.2rem",
  };

  const backStyle: React.CSSProperties = {
    ...baseSide,
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  };

  return (
    <div style={containerStyle} onClick={() => setIsFlipped(!isFlipped)}>
      <div style={cardStyle}>
        {/* FRONT */}
        <div style={frontStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={project.imgDesktop}
              alt={`${project.title} Desktop`}
              style={{
                width: "68%",
                height: "160px",
                borderRadius: "6px",
                objectFit: "cover",
                filter: "brightness(0.95)",
              }}
            />
            <img
              src={project.imgMobile}
              alt={`${project.title} Mobile`}
              style={{
                width: "26%",
                height: "160px",
                borderRadius: "6px",
                objectFit: "cover",
                opacity: 0.9,
              }}
            />
          </div>

          <div>
            <h3
              style={{
                color: accent,
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                letterSpacing: "0.4px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                color: textColor,
                fontSize: "0.9rem",
                opacity: 0.85,
                lineHeight: 1.4,
                marginBottom: "1rem",
              }}
            >
              {project.desc}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "0.5rem 1.2rem",
                background: "rgba(0,180,255,0.15)",
                border: `1px solid ${accent}50`,
                borderRadius: "6px",
                color: accent,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = accent;
                (e.currentTarget as HTMLElement).style.color = "#10141f";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(0,180,255,0.15)";
                (e.currentTarget as HTMLElement).style.color = accent;
              }}
            >
              Visit Site →
            </a>
          </div>
        </div>

        {/* BACK */}
        <div style={backStyle}>
          <h3
            style={{
              color: accent,
              fontSize: "1.1rem",
              marginBottom: "0.8rem",
              letterSpacing: "0.5px",
            }}
          >
            Technologies
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.6rem",
            }}
          >
            {project.technologies.map((tech, i) => (
              <li
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: "6px",
                  padding: "0.4rem 0.8rem",
                  color: "#cfd6e1",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
