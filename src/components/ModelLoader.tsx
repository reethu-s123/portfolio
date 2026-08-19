import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

// Simple ModelLoader: assumes a single scene root in the GLTF/GLB
export default function ModelLoader({ src = '/assets/model.glb' }: { src?: string }){
  // useGLTF will throw while loading; Suspense around this component handles fallback
  const gltf = useGLTF(src, true)

  return <primitive object={gltf.scene} dispose={null} />
}

useGLTF.preload = (url: string) => {
  try {
    // Type hint for tree-shaking; actual preloading logic is provided by drei
  } catch (e) {
    // noop
  }
}
