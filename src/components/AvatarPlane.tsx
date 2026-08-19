import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, Vector2 } from 'three'

type Props = {
  src?: string
  position?: [number, number, number]
  scale?: number
}

// AvatarPlane: renders a textured plane with two small pupil meshes that follow cursor
export default function AvatarPlane({ src = '/assets/avatar.png', position = [1.4, -0.1, 0], scale = 1.0 }: Props){
  const texture = useLoader(TextureLoader, src)
  const group = useRef<any>()
  const leftPupil = useRef<any>()
  const rightPupil = useRef<any>()
  const { mouse, size } = useThree()

  // approximate eye positions on the plane in plane local space
  // These were tuned to the provided image — you can tweak if necessary
  const leftEyeBase = useMemo(() => ({ x: -0.23, y: 0.08, z: 0.02 }), [])
  const rightEyeBase = useMemo(() => ({ x: 0.23, y: 0.08, z: 0.02 }), [])

  // range of pupil travel in plane units
  const range = 0.06

  useFrame(() => {
    // mouse.x / mouse.y are -1..1; convert to small offset
    const mx = mouse.x
    const my = mouse.y

    // translate mouse coordinates into pupil offsets with easing
    const targetX = mx * range
    const targetY = my * range * -1 // invert y to map canvas coords

    if(leftPupil.current){
      leftPupil.current.position.x += (leftEyeBase.x + targetX - leftPupil.current.position.x) * 0.12
      leftPupil.current.position.y += (leftEyeBase.y + targetY - leftPupil.current.position.y) * 0.12
    }
    if(rightPupil.current){
      rightPupil.current.position.x += (rightEyeBase.x + targetX - rightPupil.current.position.x) * 0.12
      rightPupil.current.position.y += (rightEyeBase.y + targetY - rightPupil.current.position.y) * 0.12
    }

    // subtle group tilt based on pointer
    if(group.current){
      group.current.rotation.y += ((-mx * 0.25) - group.current.rotation.y) * 0.08
      group.current.rotation.x += ((my * 0.12) - group.current.rotation.x) * 0.08
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* textured plane */}
      <mesh position={[0,0,0]}>
        <planeGeometry args={[2.0, 2.0]} />
        <meshStandardMaterial map={texture} transparent={true} toneMapped={false} />
      </mesh>

      {/* pupils rendered slightly in front of the plane */}
      <mesh ref={leftPupil} position={[leftEyeBase.x, leftEyeBase.y, leftEyeBase.z]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh ref={rightPupil} position={[rightEyeBase.x, rightEyeBase.y, rightEyeBase.z]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.6} />
      </mesh>

    </group>
  )
}
