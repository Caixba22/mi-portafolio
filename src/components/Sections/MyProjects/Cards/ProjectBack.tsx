// src/components/Sections/Cards/ProjectBack.tsx

import React from "react";

interface Props {
  technologies: string[];
}

export default function ProjectBack({ technologies }: Props) {
  const accent = "#00b4ff";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "1.5rem",
        transform: "rotateY(180deg)",
      }}
    >
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
        {technologies.map((tech, i) => (
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
  );
}
