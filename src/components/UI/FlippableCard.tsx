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

  // ✅ Aumento de altura a 400px para garantizar que el botón quepa
  const containerStyle: React.CSSProperties = {
    perspective: "1000px",
    width: "100%",
    maxWidth: "380px",
    // 👈 Altura ajustada para mayor seguridad
    height: "400px", 
    cursor: "pointer",

    // Estilos de sombra y ajuste móvil
    padding: "20px",
    margin: "10px auto", 
    boxSizing: "border-box", 
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

  // ☁️ CRISTAL GRIS CLARO FUTURISTA
  const sideStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    // Su altura es ahora el 100% de los 400px del padre (menos el padding)
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "18px",
    overflow: "hidden",

    // ... (otros estilos)
    background:
      "linear-gradient(135deg, rgba(210, 210, 210, 0.7), rgba(170, 170, 170, 0.55))",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(14px) saturate(180%) contrast(120%) brightness(110%)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.4), " +
      "inset 0 0 10px rgba(255,255,255,0.12)",
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