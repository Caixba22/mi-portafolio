// src/scenes/Lights.tsx (Ajuste Final para Brillo de Fondo)
import { Environment } from '@react-three/drei'

export default function Lights() {
  return (
    <>
      {/* 🌤 Luz ambiental - Un poco más intensa para levantar las sombras */}
      <ambientLight intensity={1.0} color="#bcd4ff" /> // De 0.6 a 1.0

      {/* ☀️ Luz principal - Más frontal y más intensa */}
      <directionalLight
        position={[0, 6, 8]}
        intensity={3.0} // <-- Aumentada (de 1.8 a 3.0)
        color="#ffffff"
        castShadow
      />

      {/* 💡 Luz lateral (Relleno) */}
      <directionalLight
        position={[-4, 3, -3]}
        intensity={1.5} // Ligeramente más intensa
        color="#66ccff"
      />

      {/* 🔦 SpotLight - Más intensa y cubre más área del fondo */}
      <spotLight
        position={[0, 2, 5]}
        angle={0.8}
        penumbra={0.9}
        intensity={6.0} // <-- ¡CLAVE! Aumentada drásticamente para iluminar el fondo (de 2.8 a 6.0)
        color="#e3e9ff"
        castShadow
      />

      {/* ✨ Luz de acento (Mantener) */}
      <pointLight position={[0, 1.2, 3]} intensity={1.1} color="#88ccff" />

      {/* 🌆 Entorno HDRI suave (Mantener) */}
      <Environment preset="city" />
    </>
  )
}