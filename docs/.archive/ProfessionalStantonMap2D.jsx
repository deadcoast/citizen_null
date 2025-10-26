import React, { useState, useRef, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stantonSystemData, populateStationItems } from '../data/mapData'
import toast from 'react-hot-toast'

// Professional 2D map with advanced animations and effects
export default function ProfessionalStantonMap2D({ items = [], onItemClick }) {
  // State management
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [selectedStation, setSelectedStation] = useState(null)
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [hoveredStation, setHoveredStation] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [animationPhase, setAnimationPhase] = useState(0)

  // Filter state
  const [filters, setFilters] = useState({
    rarity: [],
    category: [],
    station: []
  })

  // Animation loop for professional effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Populate map data with items
  const mapData = useMemo(() => {
    return populateStationItems(stantonSystemData, items)
  }, [items])

  // Filter items based on current filters
  const filteredMapData = useMemo(() => {
    if (!filters.rarity.length && !filters.category.length && !filters.station.length) {
      return mapData
    }

    const filtered = { ...mapData }
    filtered.planets = mapData.planets.map(planet => ({
      ...planet,
      stations: planet.stations.map(station => ({
        ...station,
        items: station.items ? station.items.filter(item => {
          const rarityMatch = !filters.rarity.length || filters.rarity.includes(item.rarity)
          const categoryMatch = !filters.category.length || filters.category.includes(item.category)
          const stationMatch = !filters.station.length || filters.station.includes(station.name)
          return rarityMatch && categoryMatch && stationMatch
        }) : []
      }))
    }))

    return filtered
  }, [mapData, filters])

  // Event handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 2.5))
    toast.success('Zoomed in')
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5))
    toast.success('Zoomed out')
  }

  const handleReset = () => {
    setZoomLevel(1)
    setSelectedPlanet(null)
    setSelectedStation(null)
    toast.success('View reset')
  }

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet.id === selectedPlanet ? null : planet.id)
    setSelectedStation(null)
    toast.success(`${planet.name} ${planet.id === selectedPlanet ? 'deselected' : 'selected'}`)
  }

  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet)
  }

  const handlePlanetLeave = () => {
    setHoveredPlanet(null)
  }

  const handleStationClick = (station, planet) => {
    setSelectedStation({ ...station, planet: planet.name })
    toast.success(`Station ${station.name} selected`)
  }

  const handleStationHover = (station, planet) => {
    setHoveredStation({ ...station, planet: planet.name })
  }

  const handleStationLeave = () => {
    setHoveredStation(null)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    toast.success(`Searching for "${query}"`)
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
      {/* Professional Animated Star Field Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20% 30%, #ffffff, transparent),
            radial-gradient(2px 2px at 40% 70%, #3b82f6, transparent),
            radial-gradient(1px 1px at 90% 40%, #ffffff, transparent),
            radial-gradient(1px 1px at 50% 50%, #3b82f6, transparent),
            radial-gradient(2px 2px at 80% 10%, #ffffff, transparent),
            radial-gradient(1px 1px at 10% 80%, #3b82f6, transparent),
            radial-gradient(1px 1px at 70% 20%, #ffffff, transparent),
            radial-gradient(2px 2px at 30% 60%, #3b82f6, transparent)
          `,
          backgroundSize: '300% 300%',
          animation: `starfield ${15 + Math.sin(animationPhase * 0.01) * 3}s linear infinite`
        }}
      />

      {/* Nebula Background Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%)
          `,
          animation: `nebula ${25}s ease-in-out infinite`
        }}
      />

      {/* Animated Scan Lines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(59, 130, 246, 0.02) 50%)',
          backgroundSize: '100% 4px',
          animation: `scanlines ${2 + Math.sin(animationPhase * 0.02) * 0.5}s linear infinite`
        }}
      />

      {/* Professional Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center',
          opacity: 0.3
        }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Modern System Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-5 left-5 bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 text-xs z-20 backdrop-blur-sm rounded-lg glass-effect"
      >
        <div className="text-emerald-500 font-bold text-sm mb-2 tracking-wider">SYSTEM: STANTON</div>
        <div className="text-zinc-400 tracking-wide">JURISDICTION: UEE</div>
        <div className="text-zinc-400 tracking-wide">PLANETS: 4 MAJOR</div>
        <div className="text-zinc-400 tracking-wide">STATUS: ACTIVE</div>
        <div className="text-zinc-400 tracking-wide mt-2">ZOOM: {(zoomLevel * 100).toFixed(0)}%</div>

        {selectedPlanet && (
          <div className="text-blue-400 tracking-wide mt-2">
            SELECTED: {selectedPlanet.name?.toUpperCase()}
          </div>
        )}

        {selectedStation && (
          <div className="text-blue-400 tracking-wide mt-1">
            STATION: {selectedStation.name}
          </div>
        )}
      </motion.div>

      {/* Modern Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-5 right-5 flex flex-col gap-2 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomIn}
          className="modern-button text-sm px-4 py-2"
        >
          + ZOOM IN
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomOut}
          className="modern-button text-sm px-4 py-2"
        >
          - ZOOM OUT
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="modern-button text-sm px-4 py-2"
        >
          ↻ RESET
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleToggleFilters()}
          className="modern-button text-sm px-4 py-2"
        >
          FILTERS
        </motion.button>
      </motion.div>

      {/* Modern Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-5 left-5 bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 text-xs z-20 backdrop-blur-sm rounded-lg glass-effect"
      >
        <div className="text-emerald-500 font-bold mb-2 tracking-wider">LEGEND</div>

        <div className="flex items-center gap-2 my-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 border border-blue-400 animate-pulse"></div>
          <span className="text-zinc-300">Planet</span>
        </div>

        <div className="flex items-center gap-2 my-1">
          <div className="w-3 h-3 bg-zinc-400 border border-blue-400 transform rotate-45"></div>
          <span className="text-zinc-300">Station</span>
        </div>

        <div className="flex items-center gap-2 my-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"></div>
          <span className="text-zinc-300">Item Location</span>
        </div>
      </motion.div>

      {/* Professional Map Canvas */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center'
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 700"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          {/* Central Star with Glow Effect */}
          <motion.circle
            animate={{
              r: [15, 18, 15],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            cx={600}
            cy={350}
            r="15"
            fill="#ffff00"
            filter="url(#glow)"
          />
          <text
            x={600}
            y={320}
            fill="#ffff00"
            fontSize="12"
            textAnchor="middle"
            opacity="0.7"
            fontFamily="Courier New, monospace"
          >
            STANTON (STAR)
          </text>

          {/* Professional Filters and Gradients */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="planetGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Modern Planet Gradients */}
            <radialGradient id="planetGradienthurston" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="1"/>
              <stop offset="50%" stopColor="#ea580c" stopOpacity="1"/>
              <stop offset="100%" stopColor="#c2410c" stopOpacity="1"/>
            </radialGradient>

            <radialGradient id="planetGradientcrusader" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="1"/>
              <stop offset="50%" stopColor="#f97316" stopOpacity="1"/>
              <stop offset="100%" stopColor="#ea580c" stopOpacity="1"/>
            </radialGradient>

            <radialGradient id="planetGradientarccorp" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#a1a1aa" stopOpacity="1"/>
              <stop offset="50%" stopColor="#71717a" stopOpacity="1"/>
              <stop offset="100%" stopColor="#52525b" stopOpacity="1"/>
            </radialGradient>

            <radialGradient id="planetGradientmicrotech" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="1"/>
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1"/>
              <stop offset="100%" stopColor="#0284c7" stopOpacity="1"/>
            </radialGradient>
          </defs>

          {/* Planets with Professional Animations */}
          {filteredMapData.planets.map((planet) => {
            const isSelected = selectedPlanet === planet.id;
            const isHovered = hoveredPlanet?.id === planet.id;

            return (
              <g key={planet.id}>
                {/* Orbit Ring with Animation */}
                <motion.circle
                  animate={{
                    strokeDashoffset: [0, -20, 0],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  cx={600}
                  cy={350}
                  r={planet.orbitRadius}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />

                {/* Professional Planet with Multiple Layers */}
                <g>
                  {/* Planet Shadow/Glow */}
                  <motion.circle
                    animate={{
                      r: [planet.radius + 8, planet.radius + 12, planet.radius + 8],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    cx={planet.x}
                    cy={planet.y}
                    r={planet.radius + 10}
                    fill={planet.color}
                    opacity="0.2"
                    filter="url(#glow)"
                  />

                  {/* Planet Atmosphere */}
                  <motion.circle
                    animate={{
                      r: [planet.radius + 3, planet.radius + 5, planet.radius + 3],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    cx={planet.x}
                    cy={planet.y}
                    r={planet.radius + 4}
                    fill={planet.color}
                    opacity="0.4"
                  />

                  {/* Main Planet - Clickable */}
                  <motion.circle
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
                      opacity: isSelected ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                    cx={planet.x}
                    cy={planet.y}
                    r={planet.radius}
                    fill={`url(#planetGradient${planet.id})`}
                    stroke={isSelected ? "#ef4444" : "#3b82f6"}
                    strokeWidth={isSelected ? "4" : "2"}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onClick={() => handlePlanetClick(planet)}
                    onMouseEnter={() => handlePlanetHover(planet)}
                    onMouseLeave={handlePlanetLeave}
                    filter={isSelected ? "url(#glow)" : "url(#planetGlow)"}
                  />

                  {/* Invisible Click Layer - Ensures full planet is clickable */}
                  <circle
                    cx={planet.x}
                    cy={planet.y}
                    r={planet.radius + 10}
                    fill="transparent"
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onClick={() => handlePlanetClick(planet)}
                    onMouseEnter={() => handlePlanetHover(planet)}
                    onMouseLeave={handlePlanetLeave}
                  />

                  {/* Planet Surface Details */}
                  <motion.circle
                    animate={{
                      r: [planet.radius - 5, planet.radius - 3, planet.radius - 5],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    cx={planet.x}
                    cy={planet.y}
                    r={planet.radius - 4}
                    fill="rgba(255, 255, 255, 0.1)"
                  />
                </g>

                {/* Planet Name with Animation */}
                <motion.text
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    y: [planet.y + planet.radius + 20, planet.y + planet.radius + 18, planet.y + planet.radius + 20]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  x={planet.x}
                  y={planet.y + planet.radius + 20}
                  fill="#3b82f6"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="Courier New, monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {planet.name.toUpperCase()}
                </motion.text>

                {/* Stations with Professional Animations */}
                {isSelected && planet.stations.map((station, idx) => {
                  const angle = (idx * (360 / planet.stations.length)) * (Math.PI / 180);
                  const stationX = planet.x + Math.cos(angle) * (planet.radius + 50);
                  const stationY = planet.y + Math.sin(angle) * (planet.radius + 50);
                  const isStationSelected = selectedStation?.name === station.name;
                  const isStationHovered = hoveredStation?.name === station.name;

                  return (
                    <g key={station.name}>
                      {/* Connection Line with Animation */}
                      <motion.line
                        animate={{
                          strokeDashoffset: [0, -10, 0],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        x1={planet.x}
                        y1={planet.y}
                        x2={stationX}
                        y2={stationY}
                        stroke="#999"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />

                      {/* Professional Station Marker */}
                      <g>
                        {/* Station Glow Effect */}
                        <motion.rect
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          x={stationX - 8}
                          y={stationY - 8}
                          width="16"
                          height="16"
                          fill={isStationSelected ? "#ef4444" : "#3b82f6"}
                          opacity="0.2"
                          transform={`rotate(45 ${stationX} ${stationY})`}
                        />

                        {/* Main Station Marker */}
                        <motion.rect
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            scale: isStationSelected ? 1.3 : isStationHovered ? 1.2 : 1,
                            rotate: isStationSelected ? 45 : 45
                          }}
                          transition={{ duration: 0.3 }}
                          x={stationX - 6}
                          y={stationY - 6}
                          width="12"
                          height="12"
                          fill={isStationSelected ? "#ef4444" : "#71717a"}
                          stroke={isStationSelected ? "#ef4444" : "#3b82f6"}
                          strokeWidth="2"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStationClick(station, planet);
                          }}
                          onMouseEnter={() => handleStationHover(station, planet)}
                          onMouseLeave={handleStationLeave}
                          filter={isStationSelected ? "url(#glow)" : "none"}
                        />

                        {/* Station Interior Details */}
                        <motion.rect
                          animate={{
                            scale: [0.8, 1, 0.8],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          x={stationX - 3}
                          y={stationY - 3}
                          width="6"
                          height="6"
                          fill="rgba(255, 255, 255, 0.3)"
                          transform={`rotate(45 ${stationX} ${stationY})`}
                        />
                      </g>

                      {/* Station Name */}
                      <text
                        x={stationX}
                        y={stationY + 20}
                        fill="#71717a"
                        fontSize="10"
                        textAnchor="middle"
                        fontFamily="Courier New, monospace"
                        style={{ pointerEvents: 'none' }}
                      >
                        {station.name}
                      </text>

                      {/* Professional Item Pins */}
                      {station.items && station.items.slice(0, 3).map((item, itemIdx) => {
                        const pinAngle = angle + (itemIdx * 20 - 20) * (Math.PI / 180);
                        const pinX = stationX + Math.cos(pinAngle) * 25;
                        const pinY = stationY + Math.sin(pinAngle) * 25;

                        return (
                          <g key={item.id || itemIdx}>
                            {/* Item Pin Glow */}
                            <motion.circle
                              animate={{
                                r: [6, 8, 6],
                                opacity: [0.2, 0.4, 0.2]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              cx={pinX}
                              cy={pinY}
                              r="6"
                              fill="#ef4444"
                              opacity="0.3"
                            />

                            {/* Main Item Pin */}
                            <motion.circle
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              cx={pinX}
                              cy={pinY}
                              r="4"
                              fill="#ef4444"
                              stroke="#f87171"
                              strokeWidth="1"
                              style={{ cursor: 'pointer' }}
                              onClick={() => onItemClick && onItemClick(item.name || item)}
                              filter="url(#glow)"
                            />

                            {/* Item Pin Core */}
                            <motion.circle
                              animate={{
                                scale: [0.5, 0.8, 0.5],
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              cx={pinX}
                              cy={pinY}
                              r="2"
                              fill="#ffffff"
                            />
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Professional Planet Tooltip */}
      <AnimatePresence>
        {hoveredPlanet && !selectedStation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 text-xs pointer-events-none z-30 min-w-[200px] backdrop-blur-sm rounded-lg glass-effect"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="font-bold text-sm text-emerald-500 mb-1 uppercase tracking-wide">
              {hoveredPlanet.name}
            </div>
            <div className="text-zinc-300">{hoveredPlanet.description}</div>
            <div className="text-zinc-300">Stations: {hoveredPlanet.stations.length}</div>
            <div className="mt-2 text-[10px] text-zinc-400">
              CLICK TO VIEW STATIONS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Station Popup */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 p-6 text-zinc-900 dark:text-zinc-100 text-sm z-30 min-w-[300px] shadow-2xl rounded-lg glass-effect"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 font-bold text-base hover:bg-red-600 transition-colors rounded"
              onClick={() => setSelectedStation(null)}
            >
              ×
            </button>

            <h3 className="text-lg mb-2 uppercase tracking-wide font-bold">
              {selectedStation.name}
            </h3>

            <div className="text-xs text-zinc-500 mb-4">
              {selectedStation.planet} System
            </div>

            <div>
              <div className="font-bold mb-3">
                ITEMS AVAILABLE ({selectedStation.items ? selectedStation.items.length : 0}):
              </div>
              {selectedStation.items && selectedStation.items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="py-2 border-b border-zinc-200 dark:border-zinc-700 cursor-pointer hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  onClick={() => onItemClick && onItemClick(item.name || item)}
                >
                   {item.name || item}
                </motion.div>
              ))}
            </div>

            <div className="mt-4 text-xs text-zinc-500">
              Click item to view details
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional CSS Animations */}
      <style jsx>{`
        @keyframes starfield {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes nebula {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
          100% { opacity: 0.1; transform: scale(1); }
        }

        @keyframes planetPulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        @keyframes stationGlow {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(1); }
        }

        @keyframes itemPulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
