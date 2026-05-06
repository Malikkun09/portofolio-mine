import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, Float } from '@react-three/drei'
import * as THREE from 'three'

interface HeroSceneProps {
  scrollProgressRef: React.MutableRefObject<number>
}

function Particles() {
  const count = 1200
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return [pos, vel]
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]
      if (Math.abs(posArray[i * 3]) > 15) velocities[i * 3] *= -1
      if (Math.abs(posArray[i * 3 + 1]) > 15) velocities[i * 3 + 1] *= -1
      if (Math.abs(posArray[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A1A1AA"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function SceneContent({ scrollProgressRef }: HeroSceneProps) {
  const textRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { camera, viewport } = useThree()
  const textSize = Math.max(0.7, Math.min(1.3, viewport.width / 6))
  const textHeight = textSize * 0.25
  const bevelSize = textSize * 0.02

  useFrame((state) => {
    // Mouse parallax
    const targetX = (state.mouse.x * 0.5)
    const targetY = (state.mouse.y * 0.3)
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.05
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.05
    camera.position.x = mouseRef.current.x
    camera.position.y = mouseRef.current.y
    camera.lookAt(0, 0, 0)

    // Scroll-linked animation
    const progress = scrollProgressRef.current
    if (textRef.current) {
      textRef.current.position.z = -progress * 5
      textRef.current.scale.setScalar(1 - progress * 0.3)
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, 3]} intensity={0.3} color="#4F46E5" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center ref={textRef}>
          <Text3D
            font="https://unpkg.com/three@0.175.0/examples/fonts/helvetiker_bold.typeface.json"
            size={textSize}
            height={textHeight}
            curveSegments={12}
            bevelEnabled
            bevelThickness={bevelSize}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={5}
          >
            MALIK
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#4F46E5"
              emissiveIntensity={0.15}
              roughness={0.3}
              metalness={0.7}
            />
          </Text3D>
        </Center>
      </Float>

      <Particles />
    </>
  )
}

export default function HeroScene({ scrollProgressRef }: HeroSceneProps) {
  return (
    <SceneContent scrollProgressRef={scrollProgressRef} />
  )
}
