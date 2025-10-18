// src/components/Sections/Background.tsx
import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * 🎨 Background flexible para escenas 3D.
 * Soporta: color plano, gradiente procedural o HDRI realista.
 */

export default function Background({
  type = 'gradient', // 'color' | 'gradient' | 'hdri'
  color = '#0a0e15', // color base si se usa modo "color" o "gradient"
  hdriPath = '/textures/studio_hdri.hdr', // ruta al archivo HDRI si aplica
}: {
  type?: 'color' | 'gradient' | 'hdri'
  color?: string
  hdriPath?: string
}) {
  const { scene } = useThree()

  // 🎨 Fondo tipo color sólido
  if (type === 'color') {
    scene.background = new THREE.Color(color)
    return null
  }

  // 🌌 Fondo tipo HDRI (para iluminación realista)
  if (type === 'hdri') {
    return <Environment background files={hdriPath} />
  }

  // 🌈 Fondo tipo gradiente procedural (por defecto)
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // 🎨 Gradiente vertical
    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#141E30') // azul oscuro superior
    gradient.addColorStop(1, '#243B55') // azul profundo inferior
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1, 256)

    const texture = new THREE.CanvasTexture(canvas)
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter
    return texture
  }, [])

  if (gradientTexture) {
    scene.background = gradientTexture
  }

  return null
}
