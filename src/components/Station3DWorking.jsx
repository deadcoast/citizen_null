/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Professional station marker with animations
export default function Station3DWorking({
  data,
  planetPosition,
  onClick,
  isSelected,
  itemPins
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = planetPosition.y + Math.sin(state.clock.elapsedTime * 2) * 0.2

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
    onClick(data)
  }

  const handlePointerOver = () => {
    setHovered(true)
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group position={planetPosition}>
      {/* Station marker (diamond shape) */}
      <Box
        ref={meshRef}
        args={[0.8, 0.8, 0.8]}
        rotation={[0, 0, Math.PI / 4]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial
          color={isSelected ? "#ef4444" : "#71717a"}
        />
      </Box>

      {/* Station glow effect */}
      <Sphere args={[0.6, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={isSelected ? "#ef4444" : "#3b82f6"}
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Station name */}
      <Html position={[0, -1.5, 0]} center>
        <div className="text-zinc-500 text-xs font-mono whitespace-nowrap">
          {data.name}
        </div>
      </Html>

      {/* Item pins */}
      {itemPins && itemPins.map((item, itemIdx) => {
        const pinAngle = (itemIdx * 30 - 15) * (Math.PI / 180)
        const pinX = Math.cos(pinAngle) * 1.2
        const pinY = Math.sin(pinAngle) * 1.2

        return (
          <Sphere
            key={item.id || itemIdx}
            args={[0.2, 8, 8]}
            position={[pinX, pinY, 0]}
          >
            <meshBasicMaterial
              color="#ef4444"
            />
          </Sphere>
        )
      })}
    </group>
  )
}
