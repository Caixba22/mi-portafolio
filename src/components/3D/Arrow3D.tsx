// src/components/3D/Arrow3D.tsx
import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

interface Arrow3DProps {
  direction?: "left" | "right";
  color?: string;
}

export default function Arrow3D({ direction = "right", color = "#00ffff" }: Arrow3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const clock = useRef(new THREE.Clock());

  // 🔷 Crear la forma de una flecha 2D (tipo UI → o ←)
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.5, 0.3);
    s.lineTo(0.1, 0.3);
    s.lineTo(0.1, 0.6);
    s.lineTo(0.6, 0);
    s.lineTo(0.1, -0.6);
    s.lineTo(0.1, -0.3);
    s.lineTo(-0.5, -0.3);
    s.lineTo(-0.5, 0.3);
    return s;
  }, []);

  // Extruir la forma para darle volumen
  const arrowGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 3,
      }),
    [shape]
  );

  const arrowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.9,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.8,
      }),
    [color]
  );

  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      }),
    [color]
  );

  // 🌟 Animación (rotación + glow pulsante)
  useFrame(() => {
    if (!groupRef.current) return;
    const t = clock.current.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
    groupRef.current.position.y = Math.sin(t * 2) * 0.05;

    const mesh = groupRef.current.children[0] as THREE.Mesh;
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, 0, direction === "left" ? Math.PI : 0]}
      scale={1.3}
    >
      {/* Flecha principal */}
      <mesh geometry={arrowGeo} material={arrowMat} castShadow>
        <Edges color={color} />
      </mesh>

      {/* Halo para efecto glow */}
      <mesh scale={1.3} material={haloMat}>
        <sphereGeometry args={[1.2, 32, 32]} />
      </mesh>
    </group>
  );
}
