/* eslint-disable react/no-unknown-property */
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function MapUI({
  zoomLevel,
  handleZoomIn,
  handleZoomOut,
  handleReset,
  hoveredPlanet,
  tooltipPos, // eslint-disable-line no-unused-vars
  selectedStation,
  stationPopupPos, // eslint-disable-line no-unused-vars
  setSelectedStation,
  handleItemClick,
  selectedItem,
  showItemModal,
  closeItemModal,
  searchQuery,
  onSearch,
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  allItems
}) {
  const itemModalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
  }

  return (
    <>
      {/* System Info */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="absolute top-5 left-5 bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 text-xs z-20 backdrop-blur-sm rounded-lg glass-effect"
      >
        <div className="text-emerald-500 font-bold text-sm mb-2 tracking-wider">SYSTEM: STANTON</div>
        <div className="text-zinc-400 tracking-wide">JURISDICTION: UEE</div>
        <div className="text-zinc-400 tracking-wide">PLANETS: 4 MAJOR</div>
        <div className="text-zinc-400 tracking-wide">STATUS: ACTIVE</div>
        <div className="text-zinc-400 tracking-wide mt-2">ZOOM: {(zoomLevel * 100).toFixed(0)}%</div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
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
          onClick={() => onToggleFilters && onToggleFilters()}
          className="modern-button text-sm px-4 py-2"
        >
          FILTERS
        </motion.button>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
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

      {/* Global Item Browser - Shows ALL items in the system */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        className="absolute top-20 left-5 z-20 max-w-md"
      >
        <div className="bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 rounded-lg backdrop-blur-sm glass-effect">
          <h3 className="text-emerald-500 font-bold text-sm mb-3 tracking-wider">ALL ITEMS IN SYSTEM</h3>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search all items..."
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-400 text-sm px-3 py-2 border border-zinc-200/20 dark:border-zinc-800/20 rounded focus:outline-none focus:border-blue-400 mb-3"
          />

          {/* Item List - Show all items from all stations */}
          <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
            {allItems && allItems.length > 0 ? (
              allItems.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-zinc-800/50 border border-zinc-600/30 p-2 rounded cursor-pointer hover:bg-zinc-700/50 transition-colors"
                  onClick={() => handleItemClick && handleItemClick(item.name || item)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{item.name || item}</div>
                      {item.rarity && (
                        <div className={`text-xs ${
                          item.rarity === 'legendary' ? 'text-yellow-400' :
                          item.rarity === 'epic' ? 'text-purple-400' :
                          item.rarity === 'rare' ? 'text-blue-400' :
                          item.rarity === 'uncommon' ? 'text-green-400' :
                          'text-gray-400'
                        }`}>
                          {item.rarity.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {item.category || 'MISC'}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-zinc-400 text-sm text-center py-4">
                No items found
              </div>
            )}
          </div>

          {/* Color Accent Strip */}
          <div className="mt-3 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-32 right-5 bg-white/10 dark:bg-zinc-900/90 border border-zinc-200/20 dark:border-zinc-800/20 p-4 rounded-lg backdrop-blur-sm glass-effect z-20 min-w-[250px]"
          >
            <h3 className="text-emerald-500 font-bold text-sm mb-3 tracking-wider">FILTERS</h3>

            {/* Rarity Filter */}
            <div className="mb-3">
              <div className="text-zinc-300 text-xs mb-2">RARITY</div>
              {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => (
                <label key={rarity} className="flex items-center gap-2 text-xs text-zinc-300 mb-1">
                  <input
                    type="checkbox"
                    checked={filters?.rarity?.includes(rarity) || false}
                    onChange={(e) => onFilterChange && onFilterChange('rarity', rarity, e.target.checked)}
                    className="w-3 h-3"
                  />
                  {rarity.toUpperCase()}
                </label>
              ))}
            </div>

            {/* Category Filter */}
            <div className="mb-3">
              <div className="text-zinc-300 text-xs mb-2">CATEGORY</div>
              {['weapon', 'armor', 'component', 'consumable', 'misc'].map(category => (
                <label key={category} className="flex items-center gap-2 text-xs text-zinc-300 mb-1">
                  <input
                    type="checkbox"
                    checked={filters?.category?.includes(category) || false}
                    onChange={(e) => onFilterChange && onFilterChange('category', category, e.target.checked)}
                    className="w-3 h-3"
                  />
                  {category.toUpperCase()}
                </label>
              ))}
            </div>

            {/* Station Filter */}
            <div>
              <div className="text-zinc-300 text-xs mb-2">STATION</div>
              {['Port Olisar', 'Grim Hex', 'Area 18', 'New Babbage', 'Lorville'].map(station => (
                <label key={station} className="flex items-center gap-2 text-xs text-zinc-300 mb-1">
                  <input
                    type="checkbox"
                    checked={filters?.station?.includes(station) || false}
                    onChange={(e) => onFilterChange && onFilterChange('station', station, e.target.checked)}
                    className="w-3 h-3"
                  />
                  {station.toUpperCase()}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planet Tooltip */}
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

      {/* Station Popup */}
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
              <XMarkIcon className="h-4 w-4 mx-auto" />
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
                  onClick={() => {
                    handleItemClick(item.name || item);
                    toast.success(`Item: ${item.name || item} selected!`);
                  }}
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

      {/* Item Modal */}
      <AnimatePresence>
        {showItemModal && selectedItem && (
          <motion.div
            variants={itemModalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeItemModal}
          >
            <motion.div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {selectedItem.name}
              </h3>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <p><span className="font-bold">Location:</span> {selectedItem.location}</p>
                <p><span className="font-bold">Rarity:</span> <span className={`uppercase ${selectedItem.rarity === 'legendary' ? 'text-yellow-500' : selectedItem.rarity === 'epic' ? 'text-purple-500' : selectedItem.rarity === 'rare' ? 'text-red-500' : ''}`}>{selectedItem.rarity}</span></p>
                <p><span className="font-bold">Category:</span> {selectedItem.category}</p>
                <p className="mt-4"><span className="font-bold">Description:</span> {selectedItem.description}</p>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                  onClick={closeItemModal}
                >
                  CLOSE
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    toast.info(`Navigating to ${selectedItem.location} on map...`);
                    closeItemModal();
                  }}
                >
                  VIEW ON MAP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
