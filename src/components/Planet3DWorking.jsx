/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

// Atmospheric glow effect
function Atmosphere({ color, size = 1.1 }) {
  return (
    <Sphere args={[size, 32, 32]}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

// Orbit ring
function OrbitRing({ radius, color = "#3b82f6" }) {
  const ringRef = useRef()

  // Removed orbit ring rotation to prevent flickering

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.2, radius + 0.2, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Professional planet component
export default function Planet3DWorking({
  data,
  isSelected,
  onClick,
  onHover,
  onUnhover,
  center
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      // Removed rotation completely to eliminate flickering

      // Smoother hover animation
      if (hovered || isSelected) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.05)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05)
      }
    }
  })

  const handleClick = () => {
    onClick(data)
  }

  const handlePointerOver = (event) => {
    setHovered(true)
    onHover(data, event)
  }

  const handlePointerOut = () => {
    setHovered(false)
    onUnhover()
  }

  // Calculate position relative to the center of the system
  const planetPosition = new THREE.Vector3(
    (data.x - center.x) / 10,
    (data.y - center.y) / 10,
    0
  )

  return (
    <group position={planetPosition}>
      {/* Orbit ring */}
      <OrbitRing radius={data.orbitRadius / 10} />

      {/* Planet with atmosphere */}
      <Sphere
        ref={meshRef}
        args={[data.radius / 10, 32, 32]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial
          color={isSelected ? "#ef4444" : data.color}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Atmosphere color={data.color} size={data.radius / 10 * 1.2} />

      {/* Planet label */}
      <Html position={[0, data.radius / 10 + 3, 0]} center>
        <div className="text-blue-500 text-sm font-bold font-mono whitespace-nowrap">
          {data.name.toUpperCase()}
        </div>
      </Html>

      {/* Selection highlight */}
      {isSelected && (
        <Sphere args={[data.radius / 10 + 0.5, 32, 32]}>
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>
      )}
    </group>
  )
}
