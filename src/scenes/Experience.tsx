// src/scenes/Experience.tsx
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'
import Podium from '../components/Podium'
import Lights from './Lights'
import { useResponsiveCamera } from '../hooks/useResponsiveCamera'
import { useResponsiveModel } from '../hooks/useResponsiveModel'
import Background from '../components/Sections/Background' // Fondo 3D o gradiente

export default function Experience() {
  // 🔧 Referencia al modelo principal
  const podiumRef = useRef<Group | null>(null)

  // 🧩 Hooks personalizados
  useResponsiveCamera()
  useResponsiveModel(podiumRef)

  return (
    <>
      {/* 🌌 Fondo dinámico */}
      <Background type="gradient" /> 
      {/* Puedes cambiar a:
          <Background type="color" color="#101820" />
          <Background type="hdri" hdriPath="/textures/studio_hdri.hdr" /> */}

      {/* 💡 Luces */}
      <Lights />

      {/* 🧱 Modelo principal */}
      <group ref={podiumRef}>
        <Podium />
      </group>

      {/* 🎥 Cámara principal */}
      <PerspectiveCamera makeDefault />

      {/* 🧭 Controles de órbita */}
      <OrbitControls
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}
