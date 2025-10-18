// src/scenes/Experience.tsx
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { PerspectiveCamera as ThreePerspectiveCamera, Group } from 'three'
import Podium from '../components/Podium'
import Lights from './Lights'
//import Background from '../components/Sections/Background'


export default function Experience() {
  const { camera, size } = useThree()
  const podiumRef = useRef<Group>(null)

  useEffect(() => {
    const cam = camera as ThreePerspectiveCamera
    const aspect = size.width / size.height

    // 🔧 Ajuste dinámico de cámara y FOV
    if (size.width <= 480) {
      // Móviles pequeños
      cam.fov = 70
      cam.position.set(0, 3.5, 13)
    } else if (size.width <= 768) {
      // Tablets
      cam.fov = 60
      cam.position.set(0, 3, 11)
    } else if (aspect < 1.3) {
      // Pantalla vertical o cuadrada
      cam.fov = 55
      cam.position.set(0, 2.5, 9)
    } else if (aspect < 1.8) {
      // Laptops o medianas
      cam.fov = 50
      cam.position.set(0, 2, 8)
    } else {
      // Monitores grandes o ultra-wide
      cam.fov = 45
      cam.position.set(0, 2, 7)
    }

    cam.aspect = aspect
    cam.updateProjectionMatrix()

    // 🔧 Ajuste del modelo (escala y posición)
    if (podiumRef.current) {
      if (size.width <= 480) {
        podiumRef.current.scale.set(0.7, 0.7, 0.7)
        podiumRef.current.position.set(0, -0.2, 0)
      } else if (size.width <= 768) {
        podiumRef.current.scale.set(0.85, 0.85, 0.85)
        podiumRef.current.position.set(0, -0.1, 0)
      } else {
        podiumRef.current.scale.set(1, 1, 1)
        podiumRef.current.position.set(0, 0, 0)
      }
    }
  }, [size, camera])

  return (
    <>
      <Lights />

      {/* Podium con referencia para manipular escala */}
      <group ref={podiumRef}>
        <Podium />
      </group>

      {/* Cámara principal */}
      <PerspectiveCamera makeDefault />

      {/* Controles */}
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
