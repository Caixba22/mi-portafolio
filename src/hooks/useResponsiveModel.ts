// src/hooks/useResponsiveModel.ts
import { useEffect } from 'react'
import { Group } from 'three'
import { useThree } from '@react-three/fiber'

/**
 * Escala y posiciona un modelo 3D de manera responsiva según el tamaño de la pantalla.
 * @param modelRef - referencia al modelo (por ejemplo, un Podium o Mesh)
 */
export function useResponsiveModel(modelRef: React.RefObject<Group | null>) {
  const { size } = useThree()

  useEffect(() => {
    const model = modelRef.current
    if (!model) return

    // 📱 Móviles pequeños
    if (size.width <= 480) {
      model.scale.set(0.7, 0.7, 0.7)
      model.position.set(0, -0.2, 0)
    }
    // 💻 Tablets
    else if (size.width <= 768) {
      model.scale.set(0.85, 0.85, 0.85)
      model.position.set(0, -0.1, 0)
    }
    // 🖥️ Escritorios y monitores grandes
    else {
      model.scale.set(1, 1, 1)
      model.position.set(0, 0, 0)
    }
  }, [size, modelRef])
}
