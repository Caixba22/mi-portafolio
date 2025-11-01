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

  // ☁️ CRISTAL GRIS CLARO FUTURISTA (más luminoso y elegante)
  const sideStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "18px",
    overflow: "hidden",

    // 1️⃣ Fondo gris claro perlado (más visible y brillante)
    background:
      "linear-gradient(135deg, rgba(210, 210, 210, 0.7), rgba(170, 170, 170, 0.55))",

    // 2️⃣ Borde más blanco para resaltar el cristal
    border: "1px solid rgba(255, 255, 255, 0.4)",

    // 3️⃣ Efecto de cristal claro y limpio
    backdropFilter: "blur(14px) saturate(180%) contrast(120%) brightness(110%)",

    // 4️⃣ Sombras más suaves (para un look etéreo, menos pesado)
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.12)",

    // 5️⃣ Reflejo superior sutil (vidrio pulido)
    backgroundImage:
      "linear-gradient(160deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={cardStyle}>
        {/* FRONT */}
        <div style={sideStyle}>{front}</div>

        {/* BACK */}
        <div style={{ ...sideStyle, transform: "rotateY(180deg)" }}>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "rotateY(180deg)",
            }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}
