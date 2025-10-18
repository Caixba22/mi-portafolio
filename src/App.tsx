import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Experience from './scenes/Experience'
import './index.css'

export default function App() {
  return (
  <Canvas
      shadows
      camera={{ position: [0, 2, 6], fov: 45 }}
      style={{ width: '100vw', height: '100vh', background: '#0a0e15' }}
    >
      <color attach="background" args={['#0a0e15']} />
      <Experience />
  </Canvas>
  )
}
