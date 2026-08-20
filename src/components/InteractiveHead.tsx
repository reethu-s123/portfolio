import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh, Vector3 } from 'three'

type Props = {
  scale?: number
  position?: [number, number, number]
}

// Helper lerp
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function InteractiveHead({ scale = 1, position = [0, 0, 0] }: Props) {
  const group = useRef<Group | null>(null)
  const leftEye = useRef<Mesh | null>(null)
  const rightEye = useRef<Mesh | null>(null)
  const leftIris = useRef<Mesh | null>(null)
  const rightIris = useRef<Mesh | null>(null)
  const leftPupil = useRef<Mesh | null>(null)
  const rightPupil = useRef<Mesh | null>(null)
  const upperLidL = useRef<Mesh | null>(null)
  const lowerLidL = useRef<Mesh | null>(null)
  const upperLidR = useRef<Mesh | null>(null)
  const lowerLidR = useRef<Mesh | null>(null)
  const { mouse } = useThree()

  const targetEyeOffset = useRef(new Vector3())
  const currentEyeOffset = useRef(new Vector3())
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  const [blinkTarget, setBlinkTarget] = useState(0)
  const blink = useRef(0)

  // random blinking intervals
  useEffect(() => {
    let mounted = true
    function scheduleBlink() {
      const t = 2000 + Math.random() * 3500
      setTimeout(() => {
        if (!mounted) return
        // close
        setBlinkTarget(1)
        setTimeout(() => {
          if (!mounted) return
          setBlinkTarget(0)
          scheduleBlink()
        }, 150)
      }, t)
    }
    scheduleBlink()
    return () => { mounted = false }
  }, [])

  useFrame((state, delta) => {
    // compute target rotations and eye offsets from normalized mouse (-1..1)
    const mx = mouse.x
    const my = mouse.y

    // head rotation target (subtle)
    targetRot.current.y = -mx * 0.35
    targetRot.current.x = my * 0.18

    // smoothly interpolate current rotation
    currentRot.current.y = lerp(currentRot.current.y, targetRot.current.y, 0.08)
    currentRot.current.x = lerp(currentRot.current.x, targetRot.current.x, 0.08)
    if (group.current) {
      group.current.rotation.y = currentRot.current.y
      group.current.rotation.x = currentRot.current.x
    }

    // Eye target offset, limited range
    const tx = mx * 0.09
    const ty = my * 0.06
    targetEyeOffset.current.set(tx, ty, 0)

    // lerp current eye offset
    currentEyeOffset.current.lerp(targetEyeOffset.current, 0.12)

    // Apply to iris/pupil positions
    if (leftIris.current) {
      leftIris.current.position.x = -0.22 + currentEyeOffset.current.x
      leftIris.current.position.y = 0.12 + currentEyeOffset.current.y
    }
    if (rightIris.current) {
      rightIris.current.position.x = 0.22 + currentEyeOffset.current.x
      rightIris.current.position.y = 0.12 + currentEyeOffset.current.y
    }
    if (leftPupil.current) {
      leftPupil.current.position.x = -0.22 + currentEyeOffset.current.x
      leftPupil.current.position.y = 0.12 + currentEyeOffset.current.y
    }
    if (rightPupil.current) {
      rightPupil.current.position.x = 0.22 + currentEyeOffset.current.x
      rightPupil.current.position.y = 0.12 + currentEyeOffset.current.y
    }

    // Blink interpolation
    blink.current = lerp(blink.current, blinkTarget, 0.25)
    const b = blink.current // 0..1

    // map blink to eyelid positions (higher = more closed)
    const upperY = 0.42 - b * 0.5 // upper lid moves down
    const lowerY = -0.18 + b * 0.5 // lower lid moves up

    if (upperLidL.current) upperLidL.current.position.y = upperY
    if (lowerLidL.current) lowerLidL.current.position.y = lowerY
    if (upperLidR.current) upperLidR.current.position.y = upperY
    if (lowerLidR.current) lowerLidR.current.position.y = lowerY
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Skin / head */}
      <mesh castShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial color="#e0b899" roughness={0.52} metalness={0.02} />
      </mesh>

      {/* Hair cap (back) */}
      <mesh position={[0, 0.12, -0.25]}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshStandardMaterial color="#2b1f18" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Bangs / front hair (simple geometry slices) */}
      <mesh position={[0, 0.45, 0.95]} rotation={[ -0.6, 0, 0 ]}>
        <boxGeometry args={[1.4, 0.9, 0.18]} />
        <meshStandardMaterial color="#2b1f18" roughness={0.8} />
      </mesh>

      {/* Ears */}
      <mesh position={[-1.05, 0.02, 0.05]} rotation={[0, 0, 0]}> 
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>
      <mesh position={[1.05, 0.02, 0.05]} rotation={[0, 0, 0]}> 
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>

      {/* Earrings (hoops) */}
      <mesh position={[-1.18, -0.02, 0.05]} rotation={[0, 0, 0]}> 
        <torusGeometry args={[0.12, 0.02, 16, 100]} />
        <meshStandardMaterial color="#d6d6d6" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[1.18, -0.02, 0.05]} rotation={[0, 0, 0]}> 
        <torusGeometry args={[0.12, 0.02, 16, 100]} />
        <meshStandardMaterial color="#d6d6d6" metalness={1} roughness={0.25} />
      </mesh>

      {/* Eyes: white spheres */}
      <mesh ref={leftEye} position={[-0.5, 0.25, 0.92]}> 
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh ref={rightEye} position={[0.5, 0.25, 0.92]}> 
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Iris (flat disc slightly in front) */}
      <mesh ref={leftIris} position={[-0.22, 0.12, 1.02]}> 
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#4a2a12" roughness={0.4} />
      </mesh>
      <mesh ref={rightIris} position={[0.22, 0.12, 1.02]}> 
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#4a2a12" roughness={0.4} />
      </mesh>

      {/* Pupil (small black sphere in front of iris) */}
      <mesh ref={leftPupil} position={[-0.22, 0.12, 1.06]}> 
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={rightPupil} position={[0.22, 0.12, 1.06]}> 
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Eyelids (thin flattened spheres used to cover the eye) */}
      <mesh ref={upperLidL} position={[-0.5, 0.42, 0.95]} rotation={[0,0,0]}> 
        <sphereGeometry args={[0.31, 24, 24]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>
      <mesh ref={lowerLidL} position={[-0.5, -0.18, 0.95]} rotation={[0,0,0]}> 
        <sphereGeometry args={[0.31, 24, 24]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>

      <mesh ref={upperLidR} position={[0.5, 0.42, 0.95]} rotation={[0,0,0]}> 
        <sphereGeometry args={[0.31, 24, 24]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>
      <mesh ref={lowerLidR} position={[0.5, -0.18, 0.95]} rotation={[0,0,0]}> 
        <sphereGeometry args={[0.31, 24, 24]} />
        <meshStandardMaterial color="#e0b899" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.05, 0.92]} rotation={[0.2, 0, 0]}> 
        <coneGeometry args={[0.08, 0.28, 16]} />
        <meshStandardMaterial color="#dba884" />
      </mesh>

      {/* Mouth (simple slight smile using torus segment) */}
      <mesh position={[0, -0.35, 0.98]} rotation={[Math.PI * 0.95, 0, 0]}> 
        <torusGeometry args={[0.22, 0.03, 8, 100, Math.PI * 0.6]} />
        <meshStandardMaterial color="#c76b6b" roughness={0.6} />
      </mesh>

      {/* Optional small freckles/moles to match photo */}
      <mesh position={[0.18, -0.05, 1.01]}> 
        <circleGeometry args={[0.015, 8]} />
        <meshStandardMaterial color="#7a4a3a" />
      </mesh>
      <mesh position={[-0.12, -0.03, 1.01]}> 
        <circleGeometry args={[0.01, 8]} />
        <meshStandardMaterial color="#7a4a3a" />
      </mesh>

    </group>
  )
}
