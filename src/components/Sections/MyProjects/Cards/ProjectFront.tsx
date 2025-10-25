// src/components/Sections/Cards/ProjectFront.tsx

import React from "react";

interface Props {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
}

export default function ProjectFront({ title, desc, imgDesktop, imgMobile, link }: Props) {
  const accent = "#00b4ff";
  const textColor = "#e4e8ef";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "1.2rem",
      }}
    >
      {/* IMÁGENES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <img
          src={imgDesktop}
          alt={`${title} Desktop`}
          style={{
            width: "68%",
            height: "160px",
            borderRadius: "6px",
            objectFit: "cover",
            filter: "brightness(0.95)",
          }}
        />
        <img
          src={imgMobile}
          alt={`${title} Mobile`}
          style={{
            width: "26%",
            height: "160px",
            borderRadius: "6px",
            objectFit: "cover",
            opacity: 0.9,
          }}
        />
      </div>

      {/* TEXTO */}
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
          {title}
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
          {desc}
        </p>
        <a
          href={link}
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
  );
}
