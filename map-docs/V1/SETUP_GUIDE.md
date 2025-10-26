# CITIZEN ZINE - PROJECT SETUP GUIDE

## Complete Project Structure

```
citizen-zine/
 public/
    (static assets like images, favicon)
 src/
    components/
       StantonMap.jsx          # Interactive map component
       ItemCard.jsx            # Item display card
       ItemModal.jsx           # Item detail modal
       FilterBar.jsx           # Search and filter controls
       PatchHero.jsx           # Hero banner
       (other components)
    data/
       mapData.js              # Map coordinates and structure
       items.json              # Your items database
    App.jsx                     # Main app component
    main.jsx                    # React entry point
    index.css                   # Global styles + Tailwind
 index.html                      # HTML entry point
 package.json                    # Dependencies
 vite.config.js                  # Vite configuration
 tailwind.config.js              # Tailwind configuration
 postcss.config.js               # PostCSS configuration
 .eslintrc.cjs                   # ESLint configuration
```

---

## Quick Start (5 Minutes)

### Step 1: Initialize Project

```bash
# Create project directory
mkdir citizen-zine
cd citizen-zine

# Copy all config files from outputs
# (package.json, vite.config.js, tailwind.config.js, etc.)
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- All dev dependencies

### Step 3: Create File Structure

```bash
# Create directories
mkdir -p src/components src/data public

# Copy files
# - main.jsx → src/
# - index.css → src/
# - StantonMap.jsx → src/components/
# - mapData.js → src/data/
```

### Step 4: Create Minimal App.jsx

```jsx
// src/App.jsx
import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-bold text-center mb-4">
          CITIZEN ZINE
        </h1>
        <p className="text-center text-sm tracking-wider mb-8">
          FOR CITIZENS, BY CITIZENS
        </p>

        {/* Your components go here */}
        <div className="text-center mt-20">
          <p className="typewriter">BUILD IN PROGRESS...</p>
        </div>
      </div>
    </div>
  )
}

export default App
```

### Step 5: Run Development Server

```bash
npm run dev
```

Server starts at `http://localhost:3000` and opens automatically.

---

## All Configuration Files Explained

### package.json
**Location:** Root directory
**Purpose:** Defines project dependencies and scripts
**Key Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### vite.config.js
**Location:** Root directory
**Purpose:** Vite bundler configuration
**Settings:**
- React plugin enabled
- Dev server on port 3000
- Auto-open browser
- Source maps in production

### tailwind.config.js
**Location:** Root directory
**Purpose:** Tailwind CSS customization
**Includes:**
- Punk zine color palette
- Custom spacing scale
- Font families (Courier New, Arial)
- Border width utilities
- Star Citizen tech colors

### postcss.config.js
**Location:** Root directory
**Purpose:** PostCSS processing for Tailwind
**Plugins:**
- Tailwind CSS
- Autoprefixer (browser compatibility)

### .eslintrc.cjs
**Location:** Root directory
**Purpose:** Code linting rules
**Features:**
- React 18 rules
- React Hooks rules
- ES2020 support

### index.html
**Location:** Root directory
**Purpose:** HTML entry point
**Loads:** `/src/main.jsx`

### main.jsx
**Location:** `src/`
**Purpose:** React application entry
**Imports:** App.jsx and index.css

### index.css
**Location:** `src/`
**Purpose:** Global styles
**Contains:**
- Tailwind directives
- Custom punk zine utilities
- Paper grain texture
- Scanline effects
- Button styles
- Glitch animations

---

## Using the Custom Styles

### Punk Zine Color Classes

```jsx
// Backgrounds
<div className="bg-cream">           {/* Aged paper */}
<div className="bg-pure-black">      {/* Black ink */}
<div className="bg-punk-red">        {/* Red accent */}

// Text colors
<p className="text-ink-black">       {/* Main text */}
<p className="text-punk-red">        {/* Accent text */}
<p className="text-mid-gray">        {/* De-emphasized */}

// Borders
<div className="border-2 border-pure-black">  {/* Standard */}
<div className="border-thick">                {/* 4px */}
<div className="border-heavy">                {/* 8px */}
```

### Component Utility Classes

```jsx
// Paper texture overlay
<div className="paper-grain">
  {/* Content gets grain texture */}
</div>

// Scanlines (CRT effect)
<div className="scanlines">
  {/* Content gets scan lines */}
</div>

// Stamp effect
<div className="stamp">NEW!</div>

// Typewriter text
<p className="typewriter">System online...</p>

// Buttons
<button className="btn-primary">Click Me</button>
<button className="btn-secondary">Cancel</button>

// Item cards
<div className="item-card">
  {/* Item content */}
</div>

// Rarity badges
<span className="rarity-rare">RARE</span>
<span className="rarity-legendary">LEGENDARY</span>
```

---

## Development Workflow

### 1. Start Development

```bash
npm run dev
```

Your site is now live at `http://localhost:3000`

Hot reload is enabled - changes appear instantly.

### 2. Add Components

Create new components in `src/components/`:

```jsx
// src/components/ItemCard.jsx
export default function ItemCard({ item }) {
  return (
    <div className="item-card p-4">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="text-sm text-mid-gray">{item.location}</p>
    </div>
  )
}
```

Import in App.jsx:

```jsx
import ItemCard from './components/ItemCard'
```

### 3. Add Data

Create JSON files in `src/data/`:

```json
// src/data/items.json
[
  {
    "id": "001",
    "name": "Devastator Shotgun",
    "location": "Lorville",
    "rarity": "rare"
  }
]
```

Import in components:

```jsx
import items from './data/items.json'
```

### 4. Test Locally

```bash
# Build production version
npm run build

# Preview production build
npm run preview
```

### 5. Deploy

Build output goes to `dist/` folder:

```bash
npm run build
```

Upload `dist/` to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static host

---

## Adding the Map Component

### 1. Copy Files

```bash
# Copy these to your project:
src/components/StantonMap.jsx
src/data/mapData.js
```

### 2. Import in App

```jsx
import StantonMap from './components/StantonMap'
import items from './data/items.json'

function App() {
  const handleItemClick = (itemName) => {
    console.log('Item clicked:', itemName)
    // Open your item modal here
  }

  return (
    <div>
      <StantonMap
        items={items}
        onItemClick={handleItemClick}
      />
    </div>
  )
}
```

---

## Next Steps After Setup

### Phase 1: Basic Structure
1. Install dependencies
2. Set up file structure
3. Run dev server
4. Create basic App.jsx layout
5. Add header/footer components

### Phase 2: Core Features
1. Build ItemCard component
2. Build ItemGrid component
3. Add FilterBar component
4. Create sample items.json
5. Test filtering/search

### Phase 3: Advanced Features
1. Integrate StantonMap
2. Add ItemModal
3. Connect map to items
4. Add routing (optional)
5. State management

### Phase 4: Polish
1. Add textures/grain overlays
2. Implement animations
3. Responsive design testing
4. Performance optimization
5. SEO meta tags

### Phase 5: Deploy
1. Build production version
2. Test production build
3. Deploy to hosting
4. Set up custom domain
5. Launch!

---

## Troubleshooting

### "Module not found" errors
- Check file paths in imports
- Ensure files are in correct directories
- Restart dev server

### Tailwind classes not working
- Verify `index.css` imports Tailwind directives
- Check `tailwind.config.js` content paths
- Restart dev server

### Port 3000 already in use
Edit `vite.config.js`:
```js
server: {
  port: 3001, // Change to different port
}
```

### Build errors
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

---

## Resources

### Documentation
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

### Your Project Files
- Map component: `StantonMap.jsx`
- Map data: `mapData.js`
- Integration guide: `MAP_INTEGRATION_GUIDE.md`
- Design plan: `citizen-zine-design-plan.md`
- Complete spec: `citizen-zine-complete-plan.md`

---

## Verification Checklist

Before you start building, verify:

- [ ] All config files in root directory
- [ ] `src/` folder structure created
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] Dev server starts without errors
- [ ] Browser opens to localhost:3000
- [ ] Tailwind classes apply correctly
- [ ] Hot reload works (edit App.jsx and see changes)

---

## You're Ready

Your Citizen Zine project is now set up and ready for development.

**Start building:**
```bash
npm run dev
```

**Questions?** Refer to:
- This setup guide
- MAP_INTEGRATION_GUIDE.md (for map specifics)
- citizen-zine-complete-plan.md (for full feature specs)

**Good luck, Citizen! o7**
