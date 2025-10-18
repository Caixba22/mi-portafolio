// src/hooks/useResponsiveCamera.ts
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'

/**
 * Ajusta dinámicamente la cámara según el tamaño y la proporción de la pantalla.
 * Controla FOV y posición del viewport para diferentes dispositivos.
 */
export function useResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const cam = camera as ThreePerspectiveCamera
    const aspect = size.width / size.height

    if (!cam) return

    // 📱 Móviles pequeños
    if (size.width <= 480) {
      cam.fov = 70
      cam.position.set(0, 3.5, 13)
    }
    // 💻 Tablets
    else if (size.width <= 768) {
      cam.fov = 60
      cam.position.set(0, 3, 11)
    }
    // 🧩 Pantallas cuadradas o verticales
    else if (aspect < 1.3) {
      cam.fov = 55
      cam.position.set(0, 2.5, 9)
    }
    // 🖥️ Laptops y medianas
    else if (aspect < 1.8) {
      cam.fov = 50
      cam.position.set(0, 2, 8)
    }
    // 🖼️ Monitores grandes o ultra-wide
    else {
      cam.fov = 45
      cam.position.set(0, 2, 7)
    }

    cam.aspect = aspect
    cam.updateProjectionMatrix()
  }, [camera, size])
}
