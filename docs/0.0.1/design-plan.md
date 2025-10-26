# CITIZEN ZINE - COMPLETE WEBSITE PLAN

A Star Citizen Hub, for Citizens, By Citizens.

---

## 1. PURPOSE

> NOTE: FOR BREVITY, EVERY SUBSECTION IN `Purpose` REQUIRES: ['LOCATION OF ASSET', 'HOW TO OBTAIN']

### INSPIRATION
- Punk movement, 90's era zines
- DIY underground aesthetic
- Cut-and-paste collage style
- Raw, authentic information delivery

### UX PHILOSOPHY
- Straightforward underground news network that provides users an easy and fast way to view new additions in the latest Patch for Star Citizen
- Single-page mindset: minimize navigation complexity
- Visual hierarchy emphasizing newest/rarest items
- No account required (optional: save favorites to localStorage)

### EARNABLE_LOOT (Content Categories)

#### PLAYER ITEMS
- Weapons
  - Location of asset
  - How to obtain (purchase/loot/mission reward)
  - Stats comparison to previous patch
  - Rarity indicator
- Armor
  - Location of asset
  - How to obtain
  - Protection stats
  - Visual preview
- Misc Items
  - Location of asset
  - How to obtain
  - Utility/purpose
  - New vs returning item flag

#### SHIP COMPONENTS
- Weapons
  - Location of asset
  - How to obtain
  - Compatible ships
  - DPS/stats
- Shields
  - Location of asset
  - How to obtain
  - Shield HP/regen
- Quantum Drives
  - Location of asset
  - How to obtain
  - Speed/fuel efficiency
- Coolers
  - Location of asset
  - How to obtain
  - Cooling rate

---

## 2. DESIGN SYSTEM

### CITIZEN ZINE AESTHETIC

punk zine / photocopied 90s aesthetic palette:

### Core Colors (Xerox/Photocopied)
```
Primary Background: #faf7f0 (cream/aged paper - like newsprint)
Secondary Background: #e8e3d5 (slightly darker aged paper)
Ink Black: #1a1a1a (photocopier black ink)
Pure Black: #000000 (for high contrast elements)
Off-White: #ffffff (paper highlights, white space)
```

### Accent Colors (Spot Color - use SPARINGLY)
```
Punk Red: #8b0000 (dark blood red - THE signature punk color)
  Use for: NEW badges, important warnings, call-to-action buttons

Faded Red: #a83232 (lighter red for secondary elements)
  Use for: Hover states, secondary badges

Rust Orange: #cc5500 (old photocopy toner fade)
  Use for: Rare item indicators, alternative accent

Mustard Yellow: #d4a017 (aged paper highlight/marker)
  Use for: Legendary items only, sparingly
```

### Grayscale (Photocopy Quality)
```
Dark Gray: #2b2b2b (heavy ink coverage)
Mid Gray: #666666 (halftone dots, degraded print)
Light Gray: #999999 (faded photocopy areas)
Barely Gray: #d9d9d9 (shadow on paper)
```

### Usage Rules

- 80% of the design: Black on cream/white (like a photocopied zine)
- 15%: Grayscale for depth and texture
- 5%: Punk red as THE accent color (like a stamp or marker highlight)
- Rare occasions: Rust orange or mustard yellow for special items

Think: Black and white xerox copy with ONE red stamp
NOT: Full color print job

### Examples of Usage

Item Card (Common)
- Background: Cream (#faf7f0)
- Border: Ink black (#1a1a1a)
- Text: Pure black (#000000)
- No color accent

Item Card (NEW)
- Background: Cream (#faf7f0)
- Border: Ink black (#1a1a1a)
- Text: Pure black (#000000)
- "NEW!" stamp: Punk red (#8b0000) rotated, rough edges

Legendary Item
- Same as above but small mustard yellow (#d4a017) corner banner

Typography Colors
- All headlines: Pure black (#000000)
- Body text: Ink black (#1a1a1a)
- De-emphasized text: Mid gray (#666666)
- Links: Punk red (#8b0000) - underlined
```

---

## VISUAL REFERENCE KEYWORDS

Your design should look like:
- Xeroxed punk show flyers (grainy, high contrast)
- Maximum Rocknroll zine (black and white with red accents)
- Cut-and-paste collage (handmade, DIY)
- Newsprint fanzine (yellowed paper, black ink)
- Hand-stamped "SOLD OUT" or "NEW!" in red ink

NOT:
- Cyberpunk neon
- Vaporwave aesthetics
- Tron-style glowing elements
- Bright digital colors

---

## TEXTURE OVERLAYS (Critical for Authenticity)

```
Grain texture: Heavy photocopier grain (opacity: 15-30%)
Paper texture: Visible paper fibers
Ink bleeding: Slight blur on text edges
Halftone dots: On photos/images (like newspaper print)
Xerox artifacts: Random black marks, misaligned copies
```

Does this capture the aesthetic you were going for? Raw, analog, DIY punk zine vibes - not digital cyber aesthetics.

#### TYPOGRAPHY
```
Heading Font: 'Courier New', monospace (typewriter aesthetic)
Body Font: 'Arial', sans-serif or 'Inconsolata' (readable, technical)
Accent Font: 'VT323' or 'Press Start 2P' (retro gaming feel)

Font Sizes (Tailwind):
- H1: text-4xl md:text-6xl
- H2: text-2xl md:text-4xl
- H3: text-xl md:text-2xl
- Body: text-sm md:text-base
- Small: text-xs
```

#### VISUAL ELEMENTS
- Xerox/Photocopy Effect: Grain texture overlays, slight misalignment
- Cut-out Style: Jagged borders, torn paper edges (using clip-path or border images)
- Stamp/Sticker Overlays: "NEW", "RARE", "PATCHED", "BUGGED"
- Scanlines: Subtle horizontal lines for CRT monitor effect
- Noise Texture: Background grain (CSS filter or SVG)
- Distressed Text: Occasional glitch effects on headers

---

## 3. INFORMATION ARCHITECTURE

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

---

## 4. CORE FEATURES & COMPONENTS

### 4.1 HERO SECTION

Purpose: Immediate patch identification and vibe-setting

Components Needed:
- `<PatchHero />` component

Features:
- Large patch number/name
- Release date
- Glitchy animated text effect
- Background: distressed texture or static noise
- Quick stats: "X NEW ITEMS | Y LOCATIONS | Z CHANGES"

Tailwind Classes:
```jsx
<div className="relative h-screen bg-black overflow-hidden">
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    <h1 className="text-6xl md:text-9xl font-bold text-cyan-400 glitch-effect">
      PATCH 3.23
    </h1>
    {/* Add content */}
  </div>
</div>
```

---

### 4.2 FILTER & SEARCH BAR

Purpose: Quick navigation without page reloads

Components Needed:
- `<FilterBar />` component
- `<SearchInput />` component
- `<FilterChip />` component

Features:
- Search by item name (live filtering)
- Filter by category (Player Items / Ship Components)
- Filter by rarity
- Filter by "NEW" vs "Returning"
- Sort by: Name, Rarity, Location
- "Clear All" button

UI Layout:
```
[SEARCH BAR ..................] [CATEGORY] [RARITY] [NEW ONLY ] [CLEAR]
```

Implementation:
```jsx
<div className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b-2 border-cyan-400 p-4">
  <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
    <input
      type="text"
      placeholder="SEARCH ITEMS..."
      className="flex-1 bg-gray-900 border-2 border-gray-700 px-4 py-2 text-white focus:border-cyan-400"
    />
    {/* Filters */}
  </div>
</div>
```

---

### 4.3 ITEM GRID (Main Content)

Purpose: Display all items in scannable card layout

Components Needed:
- `<ItemGrid />` wrapper
- `<ItemCard />` individual item
- `<RarityBadge />` visual indicator
- `<NewItemFlag />` for new items

Layout:
- Grid: 1 column mobile, 2 columns tablet, 3-4 columns desktop
- Each card shows: image, name, location, rarity, "NEW" badge
- Click card → opens detailed modal

ItemCard Structure:
```jsx
<div className="group relative bg-gray-900 border-2 border-gray-700 hover:border-magenta-500
                transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
  {/* NEW badge if applicable */}
  {isNew && (
    <div className="absolute -top-2 -right-2 bg-magenta-500 text-black px-3 py-1
                    rotate-12 font-bold text-xs">
      NEW!
    </div>
  )}

  {/* Item image with grain overlay */}
  <div className="relative h-48 bg-gray-800 overflow-hidden">
    <img src={imageUrl} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>
  </div>

  {/* Item info */}
  <div className="p-4 space-y-2">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-white">{name}</h3>
      <RarityBadge rarity={rarity} />
    </div>

    <div className="text-sm text-cyan-400">
       {location.station}
    </div>

    <div className="text-xs text-gray-400">
      {howToObtain}
    </div>
  </div>
</div>
```

Rarity Badge Colors:
- Common: `text-gray-400 border-gray-400`
- Uncommon: `text-green-400 border-green-400`
- Rare: `text-blue-400 border-blue-400`
- Epic: `text-purple-400 border-purple-400`
- Legendary: `text-yellow-400 border-yellow-400`

---

### 4.4 ITEM DETAIL MODAL

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

---

### 4.5 INTERACTIVE MAP (CUSTOM FEATURE)

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

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 TECH STACK

Frontend:
- React 18+ (with Hooks)
- Tailwind CSS 3+
- React Router (if multi-page in future)
- Framer Motion or React Spring (animations)
- Lucide React (icons)

State Management:
- React Context API (simple state)
- OR Zustand (if complex filtering needed)

Data Source:
- JSON files (initial version - static data)
- OR Headless CMS (Strapi, Sanity) for admin updates
- OR Firebase Firestore for real-time updates

Build Tools:
- Vite (fast dev server)
- ESLint + Prettier
- PostCSS (for Tailwind)

Deployment:
- Vercel, Netlify, or Cloudflare Pages (free tier)
- Custom domain: `citizenzine.com` or similar

---

### 5.2 REACT COMPONENT TREE

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

---

### 5.3 STATE MANAGEMENT NEEDS

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

Actions:
- `setSearchQuery(query)`
- `setFilter(filterType, value)`
- `clearAllFilters()`
- `selectItem(itemId)`
- `closeModal()`
- `openMap(locationData)`

---

### 5.4 UTILITY FUNCTIONS NEEDED

```javascript
// Filter items based on current state
function filterItems(items, filters) {
  return items.filter(item => {
    // Search query match
    if (filters.searchQuery && !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }

    // Rarity filter
    if (filters.rarity !== 'all' && item.rarity !== filters.rarity) {
      return false;
    }

    // New only filter
    if (filters.showNewOnly && !item.isNew) {
      return false;
    }

    return true;
  });
}

// Sort items
function sortItems(items, sortBy) {
  switch(sortBy) {
    case 'name':
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case 'rarity':
      const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
      return [...items].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    case 'location':
      return [...items].sort((a, b) => a.location.planet.localeCompare(b.location.planet));
    default:
      return items;
  }
}

// Generate shareable link
function generateItemLink(itemId) {
  return `${window.location.origin}/?item=${itemId}`;
}
```

---

## 6. USER FLOWS

### 6.1 PRIMARY USER FLOW

```
1. User lands on site
   ↓
2. Sees Patch Hero with latest patch info
   ↓
3. Scrolls down, sees Filter Bar + Item Grid
   ↓
4. Uses search or filters to narrow down items
   ↓
5. Clicks item card → Modal opens with full details
   ↓
6. Clicks "View on Map" → Map modal opens
   ↓
7. Sees visual location of item on SC map
   ↓
8. Closes modal, continues browsing or exits
```

### 6.2 ALTERNATE FLOW (Direct Link)

```
1. User clicks shared link (e.g., from Discord)
   ↓
2. Site loads with item modal already open
   ↓
3. User views item details
   ↓
4. Closes modal → Sees full item grid
```

---

## 7. RESPONSIVE DESIGN BREAKPOINTS

Mobile (< 640px):
- Single column grid
- Collapsed filter bar (hamburger menu)
- Simplified map controls
- Bottom sheet modal instead of centered

Tablet (640px - 1024px):
- Two column grid
- Horizontal filter bar
- Side-by-side modal layout

Desktop (> 1024px):
- Three-four column grid
- Full filter bar with all options visible
- Large modal with optimal spacing
- Map gets full screen treatment

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 REQUIRED OPTIMIZATIONS

- Lazy Loading: Load images only when in viewport
- Virtual Scrolling: If item count > 100, implement react-window
- Memoization: Use `React.memo` on ItemCard components
- Debounced Search: 300ms delay on search input
- Code Splitting: Lazy load Modal and Map components
- Image Optimization: WebP format, multiple sizes
- Caching: Service worker for offline access (future)

### 8.2 BUNDLE SIZE TARGETS

- Initial bundle: < 200KB (gzipped)
- Each route/chunk: < 100KB
- Images: < 150KB each (optimized)
- Total page weight: < 2MB

---

## 9. CONTENT MANAGEMENT

### 9.1 ADMIN WORKFLOW (Non-Developer Admin)

Requirement: Non-technical admin needs to update patch data

Solution Options:

Option A: JSON File + GitHub
- Admin edits JSON file in GitHub web interface
- Push to main branch → Auto-deploy via Vercel/Netlify
- Pro: Simple, version controlled
- Con: Requires basic GitHub knowledge

Option B: Headless CMS (Sanity/Strapi)
- Admin logs into CMS dashboard
- Adds items via form interface
- Site fetches data from CMS API
- Pro: User-friendly, no code knowledge needed
- Con: More complex setup, possible costs

Option C: Google Sheets + API
- Admin updates Google Sheet
- Site fetches data via Google Sheets API
- Pro: Extremely user-friendly
- Con: Rate limits, requires API setup

Recommended: Start with Option A, migrate to Option B as site grows

---

### 9.2 DATA ENTRY FORM (Future Feature)

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

---

## 10. ACCESSIBILITY (A11Y)

Must-Have Features:
- Semantic HTML (`<main>`, `<nav>`, `<article>`)
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators (visible borders)
- Alt text on all images
- Color contrast ratios (WCAG AA minimum)
- Skip to content link

Tailwind A11Y Classes:
```jsx
// Focus states
className="focus:outline-none focus:ring-2 focus:ring-cyan-400"

// Screen reader only
className="sr-only"

// High contrast mode compatibility
className="forced-colors:border-white"
```

---

## 11. SEO REQUIREMENTS

Meta Tags (in `<head>`):
```html
<title>Citizen Zine - Star Citizen Patch 3.23 New Items</title>
<meta name="description" content="Find all new weapons, armor, and ship components in Star Citizen Patch 3.23. Quick location guide for dedicated players." />
<meta property="og:title" content="Citizen Zine - Star Citizen Hub" />
<meta property="og:description" content="New patch items, locations, and how to obtain them." />
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

Structured Data (JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Citizen Zine",
  "description": "Star Citizen patch item database",
  "url": "https://citizenzine.com"
}
```

URL Structure:
- Homepage: `/`
- Item detail: `/?item=devastator-shotgun`
- Patch archive (future): `/patch/3.23.0`

---

## 12. TECH DEBT TO AVOID

Don't:
- Over-engineer the map (keep it simple)
- Add features before core is solid
- Ignore mobile experience
- Skip image optimization
- Forget error handling
- Hardcode values (use constants/config)

Do:
- Write clean, documented code
- Use TypeScript for type safety (optional but recommended)
- Implement error boundaries
- Add loading states
- Keep components small and focused
- Follow React best practices

---
