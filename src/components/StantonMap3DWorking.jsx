/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { stantonSystemData, populateStationItems } from '../data/mapData'
import Planet3DWorking from './Planet3DWorking'
import Station3DWorking from './Station3DWorking'
import SpaceEnvironmentWorking from './SpaceEnvironmentWorking'
import MapUI from './MapUI'
import gsap from 'gsap'

// Camera control component for GSAP animations
function CameraControls({ targetPosition, targetZoom, animate }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (animate) {
      gsap.to(camera.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current?.update(),
      })
      gsap.to(camera, {
        zoom: targetZoom,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix()
          controlsRef.current?.update()
        },
      })
    }
  }, [targetPosition, targetZoom, animate, camera])

  return <OrbitControls ref={controlsRef} enablePan enableZoom />
}

export default function StantonMap3DWorking({ items = [], onItemClick }) {
  // State management
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [selectedStation, setSelectedStation] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  // Filter state
  const [filters, setFilters] = useState({
    rarity: [],
    category: [],
    station: []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Camera animation states
  const [cameraTargetPosition, setCameraTargetPosition] = useState([0, 0, 50])
  const [cameraTargetZoom, setCameraTargetZoom] = useState(1)
  const [animateCamera, setAnimateCamera] = useState(false)

  // Removed unused animation loop

  // Populate map data with items
  const mapData = useMemo(() => {
    return populateStationItems(stantonSystemData, items)
  }, [items])

  // Filter items based on current filters and search
  const filteredMapData = useMemo(() => {
    if (!searchQuery && !filters.rarity.length && !filters.category.length && !filters.station.length) {
      return mapData
    }

    const filtered = { ...mapData }
    filtered.planets = mapData.planets.map(planet => ({
      ...planet,
      stations: planet.stations.map(station => ({
        ...station,
        items: station.items ? station.items.filter(item => {
          const searchMatch = !searchQuery || item.name?.toLowerCase().includes(searchQuery.toLowerCase())
          const rarityMatch = !filters.rarity.length || filters.rarity.includes(item.rarity)
          const categoryMatch = !filters.category.length || filters.category.includes(item.category)
          const stationMatch = !filters.station.length || filters.station.includes(station.name)
          return searchMatch && rarityMatch && categoryMatch && stationMatch
        }) : []
      }))
    }))

    return filtered
  }, [mapData, searchQuery, filters])

  // Event handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 2.5))
    setCameraTargetZoom(prev => Math.min(prev + 0.3, 2.5))
    setAnimateCamera(true)
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5))
    setCameraTargetZoom(prev => Math.max(prev - 0.3, 0.5))
    setAnimateCamera(true)
  }

  const handleReset = () => {
    setZoomLevel(1)
    setSelectedPlanet(null)
    setSelectedStation(null)
    setCameraTargetPosition([0, 0, 50])
    setCameraTargetZoom(1)
    setAnimateCamera(true)
  }

  const handlePlanetClick = (planet) => {
    const newSelectedPlanet = planet.id === selectedPlanet ? null : planet.id
    setSelectedPlanet(newSelectedPlanet)
    setSelectedStation(null)

    if (newSelectedPlanet) {
      // Animate camera to planet
      const targetX = planet.x - mapData.center.x
      const targetY = planet.y - mapData.center.y
      setCameraTargetPosition([targetX / 10, targetY / 10, 10]) // Adjust for 3D scale
      setCameraTargetZoom(2)
    } else {
      setCameraTargetPosition([0, 0, 50])
      setCameraTargetZoom(1)
    }
    setAnimateCamera(true)
  }

  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet)
  }

  const handleStationClick = (station) => {
    setSelectedStation({ ...station, planet: mapData.planets.find(p => p.stations.some(s => s.name === station.name))?.name })
  }

  const handleItemClickWrapper = (itemName) => {
    // Find the item in our items data
    const item = items.find(i => i.name === itemName)
    if (item) {
      setSelectedItem(item)
    }
    if (onItemClick) {
      onItemClick(itemName)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }))
  }

  const handleToggleFilters = (state) => {
    setShowFilters(state !== undefined ? state : !showFilters)
  }

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-xl shadow-2xl glass-effect">
      <Canvas camera={{ position: [0, 0, 50], fov: 75, zoom: 1 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SpaceEnvironmentWorking />
        <CameraControls targetPosition={cameraTargetPosition} targetZoom={cameraTargetZoom} animate={animateCamera} />

        {/* Central Star */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color={0xffff00} />
          <Html position={[0, -2.5, 0]} center>
            <div className="text-blue-400 text-xs uppercase font-bold">STANTON (STAR)</div>
          </Html>
        </mesh>

        {/* Planets */}
        {filteredMapData.planets.map((planet) => {
          const isSelected = selectedPlanet === planet.id
          const planetCenter = { x: mapData.center.x, y: mapData.center.y }

          return (
            <React.Fragment key={planet.id}>
              <Planet3DWorking
                data={planet}
                onClick={handlePlanetClick}
                onHover={handlePlanetHover}
                onUnhover={() => setHoveredPlanet(null)}
                isSelected={isSelected}
                center={planetCenter}
              />

              {/* Stations (shown when planet selected) */}
              {isSelected && planet.stations.map((station, idx) => {
                const angle = (idx * (360 / planet.stations.length)) * (Math.PI / 180)
                const stationX = (planet.x - planetCenter.x) / 10 + Math.cos(angle) * (planet.radius / 10 + 3)
                const stationY = (planet.y - planetCenter.y) / 10 + Math.sin(angle) * (planet.radius / 10 + 3)

                return (
                  <Station3DWorking
                    key={station.name}
                    data={station}
                    planetPosition={new THREE.Vector3(stationX, stationY, 0)}
                    onClick={handleStationClick}
                    isSelected={selectedStation?.name === station.name}
                    itemPins={station.items?.slice(0, 2)}
                  />
                )
              })}
            </React.Fragment>
          )
        })}
      </Canvas>

      <MapUI
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleReset={handleReset}
        hoveredPlanet={hoveredPlanet}
        tooltipPos={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
        selectedStation={selectedStation}
        stationPopupPos={{ x: window.innerWidth / 2 + 100, y: window.innerHeight / 2 }}
        setSelectedStation={setSelectedStation}
        handleItemClick={handleItemClickWrapper}
        selectedItem={selectedItem}
        showItemModal={selectedItem !== null}
        closeItemModal={() => {
          setSelectedItem(null)
          onItemClick(null)
        }}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
        allItems={items}
      />
    </div>
  )
}
