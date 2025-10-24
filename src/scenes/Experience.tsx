// src/scenes/Experience.tsx
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import {
  Group,
  Color,
  MeshStandardMaterial,
  Mesh,
  Material,
  Object3D,
} from "three";
import { useFrame } from "@react-three/fiber";
import Podium from "../components/Podium";
import Lights from "./Lights";
import { useResponsiveCamera } from "../hooks/useResponsiveCamera";
import { useResponsiveModel } from "../hooks/useResponsiveModel";
import Background from "../components/Sections/Background";

interface Props {
  activeProject?: string | null;
}

export default function Experience({ activeProject }: Props) {
  const podiumRef = useRef<Group | null>(null);
  const targetColor = useRef(new Color("#000000")); // color a interpolar

  useResponsiveCamera();
  useResponsiveModel(podiumRef);

  // 🧩 Clonar materiales y guardar info original solo de los emisivos
  useEffect(() => {
    if (!podiumRef.current) return;

    podiumRef.current.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      const mat = mesh.material as Material | Material[];

      if (Array.isArray(mat)) {
        mat.forEach((m) => setupMaterial(mesh, m));
      } else if (mat) {
        setupMaterial(mesh, mat);
      }
    });

    function setupMaterial(mesh: Mesh, mat: Material) {
      if (!(mat instanceof MeshStandardMaterial)) return;

      if (!mat.userData.isCloned) {
        mesh.material = mat.clone();
        (mesh.material as MeshStandardMaterial).userData.isCloned = true;
      }

      const m = mesh.material as MeshStandardMaterial;
      const hasEmissive =
        (m.emissive.r > 0 || m.emissive.g > 0 || m.emissive.b > 0) &&
        m.emissiveIntensity > 0;

      if (hasEmissive) {
        m.userData.isEmissive = true;
        m.userData.originalEmissive = m.emissive.clone();
      } else {
        m.userData.isEmissive = false;
      }
    }
  }, []);

  // 🎨 Selección de color destino
  useEffect(() => {
    if (activeProject === "Music Visualizer 0.0")
      targetColor.current.set("#00b4ff");
    else if (activeProject === "Mi Consultorio")
      targetColor.current.set("#00ffcc");
    else if (activeProject === "Mi Catálogo")
      targetColor.current.set("#ffaa00");
    else targetColor.current.set("#000000"); // sin proyecto → sin brillo
  }, [activeProject]);

  // 🪄 Animar solo materiales emisivos verdaderos
  useFrame(() => {
    if (!podiumRef.current) return;

    podiumRef.current.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      const mat = mesh.material as Material | Material[];

      if (Array.isArray(mat)) {
        mat.forEach(updateEmissive);
      } else if (mat) {
        updateEmissive(mat);
      }
    });
  });

  function updateEmissive(mat: Material) {
    if (!(mat instanceof MeshStandardMaterial)) return;
    if (!mat.userData.isEmissive) return; // 🛑 solo los emisivos reales

    const orig = mat.userData.originalEmissive as Color;
    if (!orig) return;

    const target = activeProject ? targetColor.current : orig;
    mat.emissive.lerp(target, 0.08);
    mat.emissiveIntensity = activeProject ? 2.0 : 1.0;
    mat.needsUpdate = true;
  }

  return (
    <>
      <Background type="gradient" />
      <Lights />
      <group ref={podiumRef}>
        <Podium />
      </group>
      <PerspectiveCamera makeDefault />
      <OrbitControls
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}
