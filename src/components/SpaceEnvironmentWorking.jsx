/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple star field without complex materials
function StarField({ count = 2000 }) {
  const points = useRef()

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Create a more realistic star distribution
      const radius = Math.random() * 2000 + 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      // Much slower rotation to prevent rhythmic flickering
      points.current.rotation.x = state.clock.elapsedTime * 0.00001
      points.current.rotation.y = state.clock.elapsedTime * 0.000005
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </points>
  )
}

// Nebula background effect
function Nebula() {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      // Much slower rotation to prevent flickering
      mesh.current.rotation.z = state.clock.elapsedTime * 0.00002
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -500]}>
      <planeGeometry args={[2000, 2000]} />
      <meshBasicMaterial
        color="#001122"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Grid overlay for technical feel
function TechnicalGrid() {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.0001
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[2000, 100, '#3b82f6', '#3b82f6']}
      position={[0, 0, 0]}
      material-opacity={0.1}
      material-transparent
    />
  )
}

// Removed ScanLines - was too distracting

// Main space environment component
export default function SpaceEnvironmentWorking() {
  return (
    <>
      <StarField count={3000} />
      <StarField count={1500} radius={500} />
      <Nebula />
      <TechnicalGrid />

      {/* Ambient lighting for depth */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffff00" />
    </>
  )
}
