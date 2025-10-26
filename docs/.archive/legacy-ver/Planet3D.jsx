import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Professional planet material with atmosphere
function PlanetMaterial({ color, emissive, atmosphere = false }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.1}
      roughness={0.8}
      metalness={0.2}
      transparent={atmosphere}
      opacity={atmosphere ? 0.3 : 1}
    />
  )
}

// Atmospheric glow effect
function Atmosphere({ color, size = 1.1 }) {
  return (
    <Sphere args={[size, 32, 32]}>
      <PlanetMaterial color={color} atmosphere={true} />
    </Sphere>
  )
}

// Orbit ring
function OrbitRing({ radius, color = "#00ffff" }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.0001
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.5, radius + 0.5, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Professional planet component
export default function Planet3D({
  planet,
  isSelected,
  onPlanetClick,
  onPlanetHover,
  onPlanetLeave
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.0005

      // Hover animation
      if (hovered || isSelected) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    onPlanetClick(planet)
  }

  const handlePointerOver = () => {
    setHovered(true)
    onPlanetHover(planet)
  }

  const handlePointerOut = () => {
    setHovered(false)
    onPlanetLeave()
  }

  return (
    <group position={[planet.x - 600, planet.y - 350, 0]}>
      {/* Orbit ring */}
      <OrbitRing radius={planet.orbitRadius} />

      {/* Planet with atmosphere */}
      <Sphere
        ref={meshRef}
        args={[planet.radius, 32, 32]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <PlanetMaterial
          color={planet.color}
          emissive={isSelected ? "#8b0000" : planet.color}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Atmosphere color={planet.color} size={planet.radius * 1.2} />

      {/* Planet label */}
      <Text
        position={[0, planet.radius + 30, 0]}
        fontSize={14}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Bold.woff"
      >
        {planet.name.toUpperCase()}
      </Text>

      {/* Selection highlight */}
      {isSelected && (
        <Sphere args={[planet.radius + 5, 32, 32]}>
          <meshBasicMaterial
            color="#8b0000"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>
      )}
    </group>
  )
}
