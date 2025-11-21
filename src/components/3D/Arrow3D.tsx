// src/components/3D/Arrow3D.tsx
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

interface Arrow3DProps {
  direction?: "left" | "right";
  color?: string;
  variant?: "chevron" | "solid";
}

export default function Arrow3D({
  direction = "right",
  color = "#00ffff",
  variant = "chevron",
}: Arrow3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const clock = useRef(new THREE.Clock());

  /**
   * VARIANTE 1: chevron (más plano, más de UI)
   *   /\
   *  /  \
   *   \/
   */
  const chevronShape = useMemo(() => {
    const s = new THREE.Shape();
    // forma como > pero un poco curva
    s.moveTo(-0.4, 0.55);
    s.lineTo(0.3, 0);
    s.lineTo(-0.4, -0.55);
    s.lineTo(-0.18, -0.55);
    s.lineTo(0.52, 0);
    s.lineTo(-0.18, 0.55);
    s.lineTo(-0.4, 0.55);
    return s;
  }, []);

  /**
   * VARIANTE 2: la tuya original (solid)
   */
  const solidShape = useMemo(() => {
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

  const baseShape = variant === "chevron" ? chevronShape : solidShape;

  const arrowGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(baseShape, {
        depth: variant === "chevron" ? 0.12 : 0.2,
        bevelEnabled: true,
        bevelThickness: variant === "chevron" ? 0.015 : 0.03,
        bevelSize: variant === "chevron" ? 0.012 : 0.02,
        bevelSegments: 3,
      }),
    [baseShape, variant]
  );

  const arrowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: variant === "chevron" ? 0.4 : 0.9,
        roughness: variant === "chevron" ? 0.25 : 0.2,
        emissive: color,
        emissiveIntensity: 0.6,
      }),
    [color, variant]
  );

  // aro/glow más flaquito
  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      }),
    [color]
  );

  // animación
  useFrame(() => {
    if (!groupRef.current) return;
    const t = clock.current.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
    groupRef.current.position.y = Math.sin(t * 2) * 0.045;

    const mesh = groupRef.current.children[0] as THREE.Mesh;
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.25;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, 0, direction === "left" ? Math.PI : 0]}
      scale={variant === "chevron" ? 1.25 : 1.3}
    >
      {/* flecha */}
      <mesh geometry={arrowGeo} material={arrowMat} castShadow>
        {/* bordes más sutiles en chevron */}
        <Edges
          color={color}
          threshold={variant === "chevron" ? 25 : 15}
        />
      </mesh>

      {/* halo */}
      <mesh
        scale={variant === "chevron" ? 1.18 : 1.3}
        material={haloMat}
      >
        <sphereGeometry args={[1.1, 28, 28]} />
      </mesh>
    </group>
  );
}
