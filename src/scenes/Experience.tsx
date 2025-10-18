// src/scenes/Experience.tsx (Versión Limpia)

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import Podium from '../components/Podium'
import Lights from './Lights'

export default function Experience() {
  const { camera, size } = useThree()

  useEffect(() => {
    // 🔧 Forzamos el tipo de cámara a PerspectiveCamera
    const cam = camera as ThreePerspectiveCamera

    if (size.width < 768) {
      cam.position.set(0, 2, 12)
      cam.fov = 55
    } else if (size.width < 1200) {
      cam.position.set(0, 2, 9)
      cam.fov = 50
    } else {
      cam.position.set(0, 2, 7)
      cam.fov = 45
    }

    cam.updateProjectionMatrix()
  }, [size, camera])

  return (
    <>
      <Lights />
      <Podium />

      {/* Cámara principal */}
      <PerspectiveCamera makeDefault />

      {/* Controles */}
      <OrbitControls
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={false}
      />
    </>
  )
}

