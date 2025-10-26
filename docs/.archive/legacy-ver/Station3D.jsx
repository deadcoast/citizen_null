import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Professional station marker with animations
export default function Station3D({
  station,
  planet,
  index,
  totalStations,
  isSelected,
  onStationClick,
  onStationHover,
  onStationLeave
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Calculate position around planet
  const angle = (index * (360 / totalStations)) * (Math.PI / 180)
  const distance = planet.radius + 50
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance
  const z = 0

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime * 2 + index) * 2

      // Rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5

      // Hover/selection scale
      if (hovered || isSelected) {
        meshRef.current.scale.setScalar(1.3)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onStationClick(station, planet)
  }

  const handlePointerOver = () => {
    setHovered(true)
    onStationHover(station, planet)
  }

  const handlePointerOut = () => {
    setHovered(false)
    onStationLeave()
  }

  return (
    <group position={[x, y, z]}>
      {/* Connection line to planet */}
      <mesh position={[-x, -y, 0]}>
        <cylinderGeometry args={[0.5, 0.5, distance, 8]} />
        <meshBasicMaterial
          color="#999999"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Station marker (diamond shape) */}
      <Box
        ref={meshRef}
        args={[8, 8, 8]}
        rotation={[0, 0, Math.PI / 4]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={isSelected ? "#8b0000" : "#999999"}
          emissive={isSelected ? "#8b0000" : "#333333"}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Station glow effect */}
      <Sphere args={[6, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={isSelected ? "#8b0000" : "#00ffff"}
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Station name */}
      <Text
        position={[0, -15, 0]}
        fontSize={8}
        color="#999999"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Regular.woff"
      >
        {station.name}
      </Text>

      {/* Item pins */}
      {station.items && station.items.slice(0, 3).map((item, itemIdx) => {
        const pinAngle = angle + (itemIdx * 30 - 15) * (Math.PI / 180)
        const pinX = Math.cos(pinAngle) * 12
        const pinY = Math.sin(pinAngle) * 12

        return (
          <Sphere
            key={item.id || itemIdx}
            args={[2, 8, 8]}
            position={[pinX, pinY, 0]}
          >
            <meshBasicMaterial
              color="#8b0000"
              emissive="#8b0000"
              emissiveIntensity={0.3}
            />
          </Sphere>
        )
      })}
    </group>
  )
}
