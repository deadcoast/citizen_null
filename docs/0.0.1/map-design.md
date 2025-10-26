# Map Design

Map Interaction Flow:
1. Default: Show full Stanton system view
2. Click planet → Animate zoom to planet, show stations around it
3. Click station → Show popup with items available there
4. Click item → Open ItemModal with full details

## Map Assets (for custom Star Citizen map)
- Planet icons: Simple circles with system-appropriate colors
  - Hurston (brown/rust)
  - ArcCorp (gray/industrial)
  - microTech (white/ice blue)
  - Crusader (orange/gas giant)
- Station markers: Small diamonds or squares
- Location pins: Red pins for item locations
- Orbit lines: Dashed circles
- Background star field: Black with white dots
- Grid overlay: Cyan/gray technical grid
- /map page: clickable pins, POI search, and links back to entries.
- Layer toggles (Planets, Stations, Event Zones).
- Pin popovers with 1-line “how to obtain” and “open entry” link.
- Search by planet/station/POI.
- Support approximate locations (hatched overlays).
- Map asset templates

Actions:
- `openMap(locationData)`

---

### SITE STRUCTURE

```
/
 Hero Section (Patch Banner)
 Filter/Search Bar
 Item Grid (Main Content)
    Player Items Section
       Weapons
       Armor
       Misc
    Ship Components Section
        Weapons
        Shields
        Quantum Drives
        Coolers
 Interactive Map Modal
 Footer (Credits, Patch Notes Link)
```

### DATA STRUCTURE (JSON Schema)

```json
{
  "patch": {
    "version": "3.23.0",
    "releaseDate": "2024-03-15",
    "title": "Patch 3.23 - NEW LOOT",
    "summary": "Brief patch highlights"
  },
  "items": [
    {
      "id": "unique-id-001",
      "name": "Devastator Shotgun",
      "category": "player_items",
      "subcategory": "weapons",
      "rarity": "rare", // common, uncommon, rare, epic, legendary
      "isNew": true, // vs returning from previous patch
      "location": {
        "system": "Stanton",
        "planet": "Hurston",
        "station": "Lorville - CBD Shop",
        "coordinates": "x: 1234, y: 5678" // for map
      },
      "howToObtain": "Purchase from Hurston Security in Lorville CBD",
      "price": "12,500 aUEC",
      "stats": {
        "damage": "850",
        "fireRate": "120 RPM",
        "magazineSize": "8"
      },
      "imageUrl": "/images/items/devastator-shotgun.png",
      "tags": ["kinetic", "close-range", "fps"],
      "patchAdded": "3.23.0",
      "notes": "New unique variant with higher damage than standard"
    }
  ]
}
```

### ITEM DETAIL MODAL

Purpose: Deep dive on individual item without navigation

Components Needed:
- `<ItemModal />` overlay component
- `<StatTable />` for item stats
- `<LocationMap />` (custom map feature)
- `<ShareButton />` copy link to item

Features:
- Full-screen overlay (dark backdrop)
- Close button (X) or ESC key
- Large item image
- All stats in table format
- Location section with mini-map
- "How to Obtain" step-by-step
- External links: Erkul DPS calculator, Official wiki

Layout:
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
  <div className="relative max-w-4xl w-full bg-gray-900 border-4 border-cyan-400
                  max-h-[90vh] overflow-y-auto">

    {/* Close button */}
    <button className="absolute top-4 right-4 text-white hover:text-magenta-500">
      <X size={32} />
    </button>

    <div className="grid md:grid-cols-2 gap-6 p-8">
      {/* Left: Image & Basic Info */}
      <div>
        <img src={imageUrl} className="w-full border-2 border-gray-700" />
        <h2 className="text-3xl font-bold mt-4">{name}</h2>
        <RarityBadge rarity={rarity} />
      </div>

      {/* Right: Stats & Location */}
      <div className="space-y-6">
        <StatTable stats={stats} />

        <div className="border-2 border-cyan-400 p-4">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">LOCATION</h3>
          <p>{location.planet} - {location.station}</p>
          <button onClick={openMap} className="mt-2 text-magenta-500">
            VIEW ON MAP →
          </button>
        </div>

        <div className="border-2 border-yellow-400 p-4">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">HOW TO OBTAIN</h3>
          <p>{howToObtain}</p>
          {price && <p className="mt-2 font-bold">Price: {price}</p>}
        </div>
      </div>
    </div>
  </div>
</div>
```

### INTERACTIVE MAP (CUSTOM FEATURE)

Purpose: Visual location reference with Star Citizen aesthetic

Components Needed:
- `<StarCitizenMap />` main component
- `<SystemLayer />` (Stanton system view)
- `<PlanetMarker />` clickable planet icons
- `<LocationPin />` item location markers

Map Requirements:
- Not complex: Simple SVG-based or Canvas
- Modular: Admin can add planets, stations, coordinates
- Aesthetic: Matches SC's holographic blue UI style
- Interactive: Click planet → zoom to planet → show stations → show item pins

Data Structure for Map:
```json
{
  "systems": [
    {
      "name": "Stanton",
      "planets": [
        {
          "name": "Hurston",
          "x": 100,
          "y": 200,
          "radius": 50,
          "color": "#8B4513",
          "stations": [
            {
              "name": "Lorville",
              "x": 120,
              "y": 180,
              "items": ["item-id-001", "item-id-002"]
            }
          ]
        }
      ]
    }
  ]
}
```

Visual Style:
- Background: Deep black with star field (small white dots)
- Planets: Circles with gradient fills matching planet theme
- Orbit lines: Dashed cyan circles
- Station markers: Small diamond shapes
- Item pins: Pulsing magenta dots
- Grid overlay: Subtle cyan grid lines
- Holographic effect: Cyan glow, scanlines

Implementation Approach:
```jsx
<div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden border-2 border-cyan-400">
  {/* Star field background */}
  <div className="absolute inset-0 bg-[url('/stars.png')]"></div>

  {/* SVG Map */}
  <svg className="absolute inset-0 w-full h-full">
    {/* Grid overlay */}
    <defs>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="cyan" strokeWidth="0.5" opacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    {/* Planets */}
    {planets.map(planet => (
      <g key={planet.name}>
        <circle
          cx={planet.x}
          cy={planet.y}
          r={planet.radius}
          fill={planet.color}
          stroke="cyan"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
        <text
          x={planet.x}
          y={planet.y + planet.radius + 20}
          fill="cyan"
          fontSize="14"
          textAnchor="middle"
        >
          {planet.name}
        </text>
      </g>
    ))}

    {/* Location pins */}
    {/* ... */}
  </svg>

  {/* Controls */}
  <div className="absolute top-4 right-4 flex gap-2">
    <button className="bg-gray-900 border border-cyan-400 px-3 py-1 text-cyan-400">
      ZOOM +
    </button>
    <button className="bg-gray-900 border border-cyan-400 px-3 py-1 text-cyan-400">
      ZOOM -
    </button>
    <button className="bg-gray-900 border border-cyan-400 px-3 py-1 text-cyan-400">
      RESET
    </button>
  </div>
</div>
```

Map Interaction Flow:
1. Default: Show full Stanton system view
2. Click planet → Animate zoom to planet, show stations around it
3. Click station → Show popup with items available there
4. Click item → Open ItemModal with full details

### DATA ENTRY FORM MAP REFERENCE

```
Location:
  System: [Dropdown: Stanton / Pyro / etc.]
  Planet: [Dropdown: based on system]
  Station/Location: [______________]
  Map Coordinates X: [___]
  Map Coordinates Y: [___]
```

If using CMS, admin sees form like:

```
[Add New Item]

Item Name: [______________]
Category: [Dropdown: Player Items / Ship Components]
Subcategory: [Dropdown: Weapons / Armor / etc.]
Rarity: [Dropdown: Common / Uncommon / Rare / Epic / Legendary]
Is New in Patch: [Checkbox]

Location:
  System: [Dropdown: Stanton / Pyro / etc.]
  Planet: [Dropdown: based on system]
  Station/Location: [______________]
  Map Coordinates X: [___]
  Map Coordinates Y: [___]

How to Obtain: [Text Area]
Price: [______________] (optional)

Stats: (key-value pairs)
  [Add Stat Field]

Image Upload: [Choose File]
Tags: [______________] (comma-separated)

[Save Item] [Cancel]
```

### 5.3 STATE MANAGEMENT NEEDS

`isMapOpen: false,`

Global State (Context or Zustand):
```javascript
{
  // Patch data
  currentPatch: { version, releaseDate, items },

  // UI state
  filters: {
    searchQuery: "",
    category: "all", // all, player_items, ship_components
    subcategory: "all",
    rarity: "all",
    showNewOnly: false,
    sortBy: "name" // name, rarity, location
  },

  // Modal state
  selectedItem: null,
  isModalOpen: false,
  isMapOpen: false,
  selectedLocation: null
}
```

## MAP DIRECTORY REFERENCE

```
 <ItemModal> (conditional)
    <MapButton>
```

```
 <MapModal> (conditional)
    <StarCitizenMap>
        <SystemView>
        <PlanetMarker> (repeating)
        <LocationPin> (repeating)
```

```
<App>
 <Header>
    <Logo>
 <PatchHero>
 <FilterBar>
    <SearchInput>
    <CategoryFilter>
    <RarityFilter>
    <ClearButton>
 <ItemGrid>
    <SectionHeader> (Player Items)
    <ItemCard> (repeating)
       <ItemImage>
       <RarityBadge>
       <NewItemFlag>
       <ItemInfo>
    <SectionHeader> (Ship Components)
    <ItemCard> (repeating)
 <ItemModal> (conditional)
    <ModalHeader>
    <ItemDetails>
    <StatTable>
    <LocationInfo>
    <MapButton>
 <MapModal> (conditional)
    <StarCitizenMap>
        <SystemView>
        <PlanetMarker> (repeating)
        <LocationPin> (repeating)
 <Footer>
```
