import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, MeshWobbleMaterial, Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function FloatingMesh(){
  const ref = useRef<any>()
  useFrame((state, delta) => {
    if(ref.current){
      ref.current.rotation.y += delta * 0.2
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.6
    }
  })
  return (
    <mesh ref={ref} castShadow position={[0,0,0]}>
      <icosahedronGeometry args={[1.2, 3]} />
      <MeshWobbleMaterial factor={0.6} speed={1.2} color="#00d9ff" emissive="#001a26"/>
    </mesh>
  )
}

export default function ThreeScene(){
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 720)
    const onResize = () => setIsMobile(window.innerWidth < 720)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 320 }}>
      <Canvas shadows dpr={Math.min(2, window.devicePixelRatio)} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <Suspense fallback={<Html>Loading 3D...</Html>}>
          <FloatingMesh />
        </Suspense>
        {!isMobile && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>
    </div>
  )
}
