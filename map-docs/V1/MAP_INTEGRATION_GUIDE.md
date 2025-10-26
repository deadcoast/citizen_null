# Stanton System Map - Integration Guide

## Files Created

1. **stanton-system-map.html** - Standalone demo (view in browser)
2. **StantonMap.jsx** - React component for your codebase
3. **mapData.js** - Data structure and helper functions

---

## Quick Start

### 1. Copy Files to Your Project

```
src/
 components/
    StantonMap.jsx
 data/
    mapData.js
```

### 2. Import and Use

```jsx
import StantonMap from './components/StantonMap';

function App() {
  const handleItemClick = (itemName) => {
    // Open your ItemModal with this item
    console.log('Item clicked:', itemName);
  };

  return (
    <div>
      <StantonMap onItemClick={handleItemClick} />
    </div>
  );
}
```

---

## Integration with Your Existing Data

### Connect to Your Items Database

The map needs to know which items are at which stations. Update `mapData.js`:

```javascript
import { populateStationItems } from './data/mapData';
import yourItemsData from './data/items.json';

// In your component
const mapWithItems = populateStationItems(stantonSystemData, yourItemsData);
```

### Modify StantonMap.jsx to Use Your Data

Replace the hardcoded `stantonData` in `StantonMap.jsx`:

```jsx
import { stantonSystemData, populateStationItems } from '../data/mapData';

export default function StantonMap({ items, onItemClick }) {
  // Populate stations with your actual items
  const mapData = populateStationItems(stantonSystemData, items);

  // Rest of component...
}
```

---

## Modal Integration

### Option 1: Pass Map as Modal Content

```jsx
// In your main App component
const [isMapOpen, setIsMapOpen] = useState(false);

<Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
  <StantonMap onItemClick={handleItemClick} />
</Modal>
```

### Option 2: Separate Map Page/Route

```jsx
// routes.js
{
  path: '/map',
  element: <MapPage />
}

// MapPage.jsx
export default function MapPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="bg-cream border-4 border-black p-5 mb-5">
        <h1 className="text-4xl font-bold">STANTON SYSTEM MAP</h1>
        <p className="text-sm">INTERACTIVE LOCATION DATABASE</p>
      </div>
      <StantonMap onItemClick={openItemModal} />
    </div>
  );
}
```

---

## Customization

### 1. Update Colors to Match Your Theme

In `StantonMap.jsx`, find these classes and update:

```jsx
// Current cyber aesthetic (cyan/blue)
border-cyan-400
text-cyan-400
stroke="#00ffff"

// Change to punk zine aesthetic (red/cream)
border-red-800
text-red-800
stroke="#8b0000"
```

### 2. Adjust Map Size

```jsx
// In the main div
className="relative w-full h-[700px]" // Change 700px to your preferred height
```

### 3. Add More Planets/Systems

Edit `mapData.js`:

```javascript
planets: [
  // ... existing planets
  {
    id: "newplanet",
    name: "New Planet",
    x: 300,
    y: 300,
    radius: 30,
    orbitRadius: 150,
    color: "#hexcolor",
    description: "Description",
    stations: [...]
  }
]
```

---

## Tailwind Configuration

Add these colors to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        cream: '#faf7f0',
        'red-800': '#8b0000',
        // ... your other colors
      }
    }
  }
}
```

---

## State Management Integration

### With Context API

```jsx
// MapContext.js
export const MapContext = createContext();

export function MapProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <MapContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      isMapOpen,
      setIsMapOpen
    }}>
      {children}
    </MapContext.Provider>
  );
}

// In StantonMap.jsx
const { setSelectedLocation } = useContext(MapContext);
```

### With Zustand

```javascript
// store.js
export const useStore = create((set) => ({
  isMapOpen: false,
  selectedLocation: null,
  openMap: (location) => set({ isMapOpen: true, selectedLocation: location }),
  closeMap: () => set({ isMapOpen: false })
}));

// In any component
const openMap = useStore((state) => state.openMap);
```

---

## Linking Item Cards to Map

### Add "View on Map" Button to ItemCard

```jsx
// ItemCard.jsx
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();

  const viewOnMap = () => {
    // Option 1: Navigate to map page with query params
    navigate(`/map?station=${item.location.station}`);

    // Option 2: Open map modal with location
    openMapModal(item.location);
  };

  return (
    <div className="item-card">
      {/* ... item info ... */}
      <button onClick={viewOnMap}>
         VIEW ON MAP
      </button>
    </div>
  );
}
```

### Highlight Station When Opened from Item

```jsx
// StantonMap.jsx - add prop
export default function StantonMap({ items, onItemClick, highlightStation }) {
  useEffect(() => {
    if (highlightStation) {
      // Find and select the planet/station
      const station = getStationByName(highlightStation);
      if (station) {
        setSelectedPlanet(station.planetId);
        // Zoom to station, etc.
      }
    }
  }, [highlightStation]);
}
```

---

## Performance Optimization

### 1. Lazy Load Map Component

```jsx
import { lazy, Suspense } from 'react';

const StantonMap = lazy(() => import('./components/StantonMap'));

<Suspense fallback={<div>LOADING MAP...</div>}>
  <StantonMap />
</Suspense>
```

### 2. Memoize Map Data

```jsx
import { useMemo } from 'react';

const mapData = useMemo(() =>
  populateStationItems(stantonSystemData, items),
  [items]
);
```

---

## Responsive Behavior

The map is responsive by default, but you can customize:

```jsx
// Hide controls on mobile
<div className="hidden md:flex map-controls">
  {/* zoom buttons */}
</div>

// Adjust map height on mobile
<div className="h-[400px] md:h-[700px]">
  {/* map */}
</div>
```

---

## Future Enhancements

### Phase 2 Features to Add

1. **Search Functionality**
   - Search for stations by name
   - Filter by item type
   - Highlight matching locations

2. **Layer Toggles**
   - Toggle planets on/off
   - Toggle stations on/off
   - Toggle item pins on/off

3. **Zoom to Location**
   - Auto-zoom when station selected
   - Smooth camera transitions
   - Follow selected item

4. **Multiple Systems**
   - Add Pyro system
   - System switcher dropdown
   - Cross-system navigation

5. **User Interactions**
   - Save favorite locations
   - Add custom waypoints
   - Export route data

---

## Troubleshooting

### Map Not Showing
- Check SVG viewBox dimensions match your data coordinates
- Verify planet x/y coordinates are within viewBox
- Check z-index stacking

### Items Not Appearing
- Verify `populateStationItems()` is called with correct data
- Check item location format matches station names
- Console.log the mapData to inspect

### Performance Issues
- Reduce number of item pins rendered at once
- Implement virtual rendering for large datasets
- Use `React.memo` on sub-components

### Styling Conflicts
- Ensure Tailwind classes are properly configured
- Check for global CSS overrides
- Use more specific selectors if needed

---

## API Reference

### StantonMap Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | Array | No | Array of items from your database |
| `onItemClick` | Function | No | Callback when item is clicked |
| `highlightStation` | String | No | Station name to highlight on load |
| `initialZoom` | Number | No | Starting zoom level (default: 1) |
| `showLegend` | Boolean | No | Show/hide legend (default: true) |

### Helper Functions

```javascript
// Get planet data
getPlanetById(planetId: string): Planet

// Get station data
getStationByName(stationName: string): Station

// Populate stations with items
populateStationItems(mapData: Object, items: Array): Object

// Calculate positions
calculateStationPosition(planet: Object, index: number, total: number): {x, y, angle}
```

---

## Questions?

The map is now ready to integrate. Key files:
1. **StantonMap.jsx** → Drop into your components
2. **mapData.js** → Your data source
3. **This README** → Integration guide

Next steps:
1. Copy files to your project
2. Connect to your items database
3. Add to your routing/modal system
4. Customize colors to match aesthetic
5. Test with real data

**Need the files?** They're all in `/mnt/user-data/outputs/`
