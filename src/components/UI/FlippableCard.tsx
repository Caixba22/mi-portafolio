// components/UI/FlippableCard.tsx

import React from "react";

interface FlippableCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  onFlip?: () => void;
}

export default function FlippableCard({ front, back, onFlip }: FlippableCardProps) {
  const [flipped, setFlipped] = React.useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
    onFlip?.();
  };

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
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
  };

  const sideStyle: React.CSSProperties = {
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

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={cardStyle}>
        {/* FRONT */}
        <div style={sideStyle}>{front}</div>

        {/* BACK (rotado, pero su contenido NO en espejo) */}
        <div style={{ ...sideStyle, transform: "rotateY(180deg)" }}>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "rotateY(180deg)", // ← esta línea corrige el texto invertido
            }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}
