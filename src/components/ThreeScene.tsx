import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, MeshWobbleMaterial, Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import ModelLoader from './ModelLoader'
import InteractiveHead from './InteractiveHead'
import AvatarPlane from './AvatarPlane'

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
      <MeshWobbleMaterial factor={0.6} speed={1.2} color="#2dd4bf" emissive="#022b35"/>
    </mesh>
  )
}

export default function ThreeScene(){
  const [isMobile, setIsMobile] = useState(false)
  const [hasModel, setHasModel] = useState(false)
  const [hasAvatar, setHasAvatar] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only render <Canvas> on the client to avoid hydration/SSR issues
    setMounted(true)

    setIsMobile(window.innerWidth < 720)
    const onResize = () => setIsMobile(window.innerWidth < 720)
    window.addEventListener('resize', onResize)

    // Check if a local model exists at /assets/model.glb and avatar at /assets/avatar.png
    let cancelled = false
    Promise.all([
      fetch('/assets/model.glb', { method: 'HEAD' }).catch(() => ({ ok: false })),
      fetch('/assets/avatar.png', { method: 'HEAD' }).catch(() => ({ ok: false }))
    ])
    .then(([m, a]) => {
      if(cancelled) return
      setHasModel(m && (m as any).ok)
      setHasAvatar(a && (a as any).ok)

      // As a fallback, proactively attempt to load the avatar image (some CDNs block HEAD)
      if(!(a && (a as any).ok)){
        const img = new Image()
        img.src = '/assets/avatar.png'
        img.onload = () => { if(!cancelled) setHasAvatar(true) }
        img.onerror = () => { /* ignore */ }
      }
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // If not mounted yet, render a visible placeholder so the layout reserves space
  if (!mounted) {
    return (
      <div className="three-canvas" style={{minHeight: 420}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'#94a3b8'}}>
          Loading interactive hero...
        </div>
      </div>
    )
  }

  return (
    <div className="three-canvas" role="img" aria-label="Interactive avatar">
      <Canvas shadows dpr={Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <Suspense fallback={<Html center>Loading 3D...</Html>}>
          {/* Debug overlay inside canvas to show status in production if needed */}
          <Html center style={{pointerEvents:'none'}}>
            <div style={{background:'rgba(0,0,0,0.4)',padding:'6px 10px',borderRadius:6,fontSize:12,color:'#cbd5e1'}}>3D: {hasModel ? 'model' : hasAvatar ? 'avatar' : 'procedural'}</div>
          </Html>

          {hasModel ? (
            <ModelLoader src={'/assets/model.glb'} />
          ) : hasAvatar ? (
            <>
              <FloatingMesh />
              <AvatarPlane src={'/assets/avatar.png'} position={[1.4, -0.1, 0]} scale={1.0} />
            </>
          ) : (
            <>
              {/* decorative floating mesh behind the head for visual interest */}
              <FloatingMesh />
              {/* interactive procedural head positioned slightly right */}
              <InteractiveHead position={[1.4, -0.1, 0]} scale={1.0} />
            </>
          )}
        </Suspense>
        {!isMobile && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>
    </div>
  )
}
