// src/components/Podium.tsx
import { useGLTF } from '@react-three/drei'

export default function Podium() {
  const { scene } = useGLTF('/models/podium.glb')
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />
}

// Preload del modelo para rendimiento
useGLTF.preload('/models/podium.glb')
