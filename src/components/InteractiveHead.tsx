import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh } from 'three'

type Props = {
  scale?: number
  position?: [number, number, number]
}

export default function InteractiveHead({ scale = 1, position = [0, 0, 0] }: Props) {
  const group = useRef<Group | null>(null)
  const leftPupil = useRef<Mesh | null>(null)
  const rightPupil = useRef<Mesh | null>(null)
  const { mouse } = useThree()

  useFrame(() => {
    // mouse.x / mouse.y are normalized -1..1
    const x = mouse.x
    const y = mouse.y

    // subtle head rotation based on pointer
    if (group.current) {
      group.current.rotation.y = -x * 0.25
      group.current.rotation.x = y * 0.12
    }

    // pupils move within a small range
    const px = x * 0.08
    const py = y * 0.06

    if (leftPupil.current) {
      leftPupil.current.position.x = -0.22 + px
      leftPupil.current.position.y = 0.12 + py
    }
    if (rightPupil.current) {
      rightPupil.current.position.x = 0.22 + px
      rightPupil.current.position.y = 0.12 + py
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Head */}
      <mesh castShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial color="#ffd9c7" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Left eye (white) */}
      <mesh position={[-0.5, 0.25, 0.92]}> 
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>

      {/* Right eye (white) */}
      <mesh position={[0.5, 0.25, 0.92]}> 
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>

      {/* Left pupil (black) */}
      <mesh ref={leftPupil} position={[-0.22, 0.12, 1.02]}> 
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Right pupil (black) */}
      <mesh ref={rightPupil} position={[0.22, 0.12, 1.02]}> 
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Simple nose */}
      <mesh position={[0, -0.05, 0.92]} rotation={[0.2, 0, 0]}> 
        <coneGeometry args={[0.08, 0.28, 16]} />
        <meshStandardMaterial color="#ffbca3" />
      </mesh>

      {/* Simple ears */}
      <mesh position={[-1.0, 0.0, 0.0]} rotation={[0, 0, 0]}> 
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ffd9c7" />
      </mesh>
      <mesh position={[1.0, 0.0, 0.0]} rotation={[0, 0, 0]}> 
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ffd9c7" />
      </mesh>

    </group>
  )
}
