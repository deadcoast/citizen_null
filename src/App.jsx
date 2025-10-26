import { useState, useEffect } from 'react'
import StantonMap3DWorking from './components/StantonMap3DWorking'
import LoadingScreen from './components/LoadingScreen'
import { stantonSystemData, populateStationItems } from './data/mapData'
import itemsData from './data/items.json'
import { Toaster } from 'react-hot-toast'

function App() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [showItemModal, setShowItemModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for professional feel
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Populate the map data with items
  const mapData = populateStationItems(stantonSystemData, itemsData)

  // Calculate statistics for display
  const totalItems = itemsData.length
  const rareItems = itemsData.filter(item => item.rarity === 'rare' || item.rarity === 'epic' || item.rarity === 'legendary').length

  const handleItemClick = (itemName) => {
    // Find the item in our items data
    const item = itemsData.find(i => i.name === itemName)
    if (item) {
      setSelectedItem(item)
      setShowItemModal(true)
    }
  }

  const closeItemModal = () => {
    setShowItemModal(false)
    setSelectedItem(null)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream border-4 border-pure-black p-6 mb-6">
        <h1 className="text-6xl font-bold text-center mb-2 font-mono">
          CITIZEN ZINE
        </h1>
        <p className="text-center text-sm tracking-wider text-mid-gray">
          FOR CITIZENS, BY CITIZENS // STANTON SYSTEM INTEL NETWORK
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Map Section */}
        <div className="mb-8">
          <div className="bg-cream border-4 border-pure-black p-4 mb-4">
            <h2 className="text-2xl font-bold font-mono mb-2">STANTON SYSTEM MAP</h2>
            <p className="text-sm text-mid-gray">
              Interactive location database showing item availability across the system
            </p>
          </div>

          <StantonMap3DWorking
            items={itemsData}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Item Stats */}
        <div className="bg-cream border-4 border-pure-black p-4">
          <h3 className="text-xl font-bold font-mono mb-4">SYSTEM STATISTICS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-bold text-punk-red">TOTAL ITEMS</div>
              <div className="text-2xl font-mono">{totalItems}</div>
            </div>
            <div>
              <div className="font-bold text-punk-red">ACTIVE STATIONS</div>
              <div className="text-2xl font-mono">{mapData.planets.reduce((total, planet) => total + planet.stations.length, 0)}</div>
            </div>
            <div>
              <div className="font-bold text-punk-red">PLANETS</div>
              <div className="text-2xl font-mono">{mapData.planets.length}</div>
            </div>
            <div>
              <div className="font-bold text-punk-red">RARE ITEMS</div>
              <div className="text-2xl font-mono">{rareItems}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      {showItemModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-cream border-4 border-pure-black p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold font-mono">{selectedItem.name}</h3>
              <button
                onClick={closeItemModal}
                className="bg-punk-red text-cream px-3 py-1 text-sm font-bold hover:bg-punk-red-light transition-colors"
              >
                × CLOSE
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold text-punk-red">LOCATION: </span>
                <span className="font-mono">{selectedItem.location.station}</span>
              </div>

              <div>
                <span className="font-bold text-punk-red">RARITY: </span>
                <span className={`font-mono uppercase ${selectedItem.rarity === 'legendary' ? 'text-mustard' :
                  selectedItem.rarity === 'epic' ? 'text-purple-600' :
                  selectedItem.rarity === 'rare' ? 'text-blue-600' :
                  selectedItem.rarity === 'uncommon' ? 'text-green-600' : 'text-mid-gray'}`}>
                  {selectedItem.rarity}
                </span>
              </div>

              <div>
                <span className="font-bold text-punk-red">DESCRIPTION: </span>
                <p className="text-sm mt-1">{selectedItem.description}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-pure-black">
              <button
                onClick={() => {
                  // Here you could add functionality to highlight the station on the map
                  console.log('View on map:', selectedItem.location.station)
                }}
                className="btn-primary w-full"
              >
                VIEW ON MAP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#faf7f0',
            border: '2px solid #8b0000',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px'
          }
        }}
      />
    </div>
  )
}

export default App
