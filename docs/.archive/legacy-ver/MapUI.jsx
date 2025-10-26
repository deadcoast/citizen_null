import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  MapIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// Professional search component
function SearchBar({ onSearch, placeholder = "Search stations, items..." }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
    toast.success(`Searching for "${query}"`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <form onSubmit={handleSubmit} className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mid-gray" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-ink-black border-2 border-punk-red text-cream placeholder-mid-gray focus:outline-none focus:border-sc-cyan transition-colors font-mono text-sm"
        />
      </form>
    </motion.div>
  )
}

// Professional filter panel
function FilterPanel({ isOpen, onClose, filters, onFilterChange }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-80 bg-ink-black border-l-4 border-punk-red z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-cream font-mono">FILTERS</h3>
              <button
                onClick={onClose}
                className="text-mid-gray hover:text-cream transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Rarity Filter */}
              <div>
                <label className="block text-sm font-bold text-punk-red mb-3">RARITY</label>
                <div className="space-y-2">
                  {['common', 'uncommon', 'rare', 'epic', 'legendary'].map((rarity) => (
                    <label key={rarity} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.rarity.includes(rarity)}
                        onChange={(e) => onFilterChange('rarity', rarity, e.target.checked)}
                        className="w-4 h-4 text-punk-red bg-ink-black border-punk-red focus:ring-punk-red"
                      />
                      <span className="text-cream capitalize">{rarity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-punk-red mb-3">CATEGORY</label>
                <div className="space-y-2">
                  {['weapons', 'armor', 'ships', 'tools', 'equipment'].map((category) => (
                    <label key={category} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={(e) => onFilterChange('category', category, e.target.checked)}
                        className="w-4 h-4 text-punk-red bg-ink-black border-punk-red focus:ring-punk-red"
                      />
                      <span className="text-cream capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Professional system info panel
function SystemInfo({ zoomLevel, selectedPlanet, selectedStation }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-5 left-5 bg-ink-black/90 border-2 border-punk-red p-4 text-xs z-20 backdrop-blur-sm"
    >
      <div className="text-punk-red font-bold text-sm mb-2 tracking-wider">SYSTEM: STANTON</div>
      <div className="text-mid-gray tracking-wide">JURISDICTION: UEE</div>
      <div className="text-mid-gray tracking-wide">PLANETS: 4 MAJOR</div>
      <div className="text-mid-gray tracking-wide">STATUS: ACTIVE</div>
      <div className="text-mid-gray tracking-wide mt-2">ZOOM: {(zoomLevel * 100).toFixed(0)}%</div>

      {selectedPlanet && (
        <div className="text-sc-cyan tracking-wide mt-2">
          SELECTED: {selectedPlanet.name.toUpperCase()}
        </div>
      )}

      {selectedStation && (
        <div className="text-sc-cyan tracking-wide mt-1">
          STATION: {selectedStation.name}
        </div>
      )}
    </motion.div>
  )
}

// Professional controls panel
function MapControls({ onZoomIn, onZoomOut, onReset, onToggleFilters, onToggleSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-5 right-5 flex flex-col gap-2 z-20"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onZoomIn}
        className="bg-ink-black border-2 border-punk-red text-cream px-4 py-2 text-xs tracking-wider hover:border-sc-cyan hover:text-sc-cyan transition-all font-mono"
      >
        + ZOOM IN
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onZoomOut}
        className="bg-ink-black border-2 border-punk-red text-cream px-4 py-2 text-xs tracking-wider hover:border-sc-cyan hover:text-sc-cyan transition-all font-mono"
      >
        - ZOOM OUT
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="bg-ink-black border-2 border-punk-red text-cream px-4 py-2 text-xs tracking-wider hover:border-sc-cyan hover:text-sc-cyan transition-all font-mono"
      >
        ↻ RESET
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleFilters}
        className="bg-ink-black border-2 border-punk-red text-cream px-4 py-2 text-xs tracking-wider hover:border-sc-cyan hover:text-sc-cyan transition-all font-mono flex items-center gap-2"
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        FILTERS
      </motion.button>
    </motion.div>
  )
}

// Professional legend
function MapLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-5 left-5 bg-ink-black/90 border-2 border-punk-red p-4 text-xs z-20 backdrop-blur-sm"
    >
      <div className="text-punk-red font-bold mb-2 tracking-wider">LEGEND</div>

      <div className="flex items-center gap-2 my-1">
        <div className="w-3 h-3 rounded-full bg-brown border border-sc-cyan"></div>
        <span className="text-cream">Planet</span>
      </div>

      <div className="flex items-center gap-2 my-1">
        <div className="w-3 h-3 bg-mid-gray border border-sc-cyan transform rotate-45"></div>
        <span className="text-cream">Station</span>
      </div>

      <div className="flex items-center gap-2 my-1">
        <div className="w-3 h-3 rounded-full bg-punk-red animate-pulse"></div>
        <span className="text-cream">Item Location</span>
      </div>
    </motion.div>
  )
}

// Main UI component
export default function MapUI({
  zoomLevel,
  selectedPlanet,
  selectedStation,
  onZoomIn,
  onZoomOut,
  onReset,
  onSearch,
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters
}) {
  return (
    <>
      <SystemInfo
        zoomLevel={zoomLevel}
        selectedPlanet={selectedPlanet}
        selectedStation={selectedStation}
      />

      <MapControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
        onToggleFilters={onToggleFilters}
      />

      <MapLegend />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => onToggleFilters(false)}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </>
  )
}
