# ADDITIONS

## CRITICAL (Need Immediately)

### Paper Grain Texture
- Subtle noise overlay for all backgrounds
- Seamless tileable pattern
- Format: PNG (transparent) or SVG
- Apply at 10-20% opacity over cream backgrounds

### Icons (8-10 needed)
- Search magnifying glass
- Close X (for modals)
- Filter funnel
- Location pin/marker
- Arrow (for dropdowns)
- Checkmark (for filters)
- External link icon
- Style: Thick strokes, angular, monochrome

---

## HIGH PRIORITY

### Rarity Badge Graphics
You have text labels (RARE, COMMON, etc.) but might want:
- Small geometric shapes or borders for each rarity level
- Color-coded boxes or stamps
- Keep current text approach OR add visual indicators

### "NEW!" Stamp Variations
- Current red stamp looks good
- Consider adding: "RARE DROP", "LIMITED", "BUGGED", "PATCHED"
- Each rotated differently (5-15°)
- Format: SVG for crisp edges

---

## MEDIUM PRIORITY (Polish)

### Photocopier Artifacts
- Vertical streaks (toner lines)
- Random black spots/marks
- Edge darkness gradients
- Format: PNG overlays at low opacity

### Loading State Graphic
- Simple "LOADING..." text with blinking cursor
- OR horizontal scanning line
- NO spinners (not punk zine aesthetic)

### Empty State Illustration
When search returns no results:
- "[NO ITEMS FOUND]" in typewriter text
- Maybe ASCII art of empty box
- Simple, minimal

### Divider Graphics
- Horizontal torn paper edges (between sections)
- Jagged lines
- Hand-drawn looking separators
- Format: SVG for scalability

### Logo Variations
- Favicon (16x16, 32x32)
- Small logo for mobile header
- Social media preview image (1200x630)
- Optional: Animated glitch effect version

### Corner Brackets (HUD elements)
- L-shaped brackets for modal corners
- Simple black lines
- 2-4px stroke weight
- Format: SVG

### Background Variations
- Slightly darker cream for hover states
- Alternative paper textures
- Fold/crease line graphics

### Stamp/Sticker Set
- "VERIFIED"
- "OUT OF STOCK"
- "MISSION REWARD"
- "SUBSCRIBER EXCLUSIVE"
- All in red with rotation

---

## ACTIONABLE ITEMS

- Paper grain texture for backgrounds
- Lucide Icons
- Sample halftone texture overlay (SVG)
- Additional stamp graphics

## Product & IA Enhancements

- Patch Hub + Patch Landing: Home spotlight for the latest patch, plus a dedicated `/patch/[version]` page with tabs (All | Player Items | Ship Components | Events).
- Entry Detail Page with above-the-fold LOCATION OF ASSET + HOW TO OBTAIN + a compact map panel.
- /submit (Moderated): community submissions routed into an approval queue.
- Changelog (site): brief log of data and site updates.

## Content Model (to enforce your “info-first” rules)

- Required fields per entry:
  `type, subcategory, patch_version, rarity, location_of_asset, how_to_obtain, map_refs, availability, requirements, proof_links, source_refs, verification_status, timestamps`
- POI registry: `slug, name, kind (planet/moon/station/city/event_zone), coords(optional), parent_slug`.

## Search & Filter Mechanics

- Global search (name, planet, vendor, tags).
- Filters: category, subcategory, rarity, patch, acquisition type (vendor/loot/event), verification status.
- URL-synced filters so players can share exact views.

## Update & Moderation Workflows

- Patch Day flow: create patch record → draft entries → require both key fields → publish editor-verified; surface a “Help Verify” list.
- Moderation queue for user submissions; normalize fields; publish as community-verified; promote to editor-verified with proof.
- Per-entry changelog (what moved, rotated vendors, etc.).

## Trust & Governance

- Verification badges: Unverified / Community-verified / Editor-verified.
- Source credit strip on entries (patch notes anchors, dev posts, player proofs).
- Content rules: fair use, takedown path.

## UX Boosters (fast retrieval aligned to your ethos)

- Card-first lists with the two essentials visible at a glance.
- Copy buttons: “Copy Location”, “Copy Steps”.
- “TIP” pull-quote sticker for one killer insight per entry.
- Patch toggle to hop between recent versions without losing filters.

## Performance, A11y, SEO (without diluting the vibe)

- Budgets: LCP < 2.5s mobile; initial JS ≤ 180KB; lazy-loaded images.
- WCAG AA contrast; visible focus rings; reduced-motion support for glitch effects.
- JSON-LD (HowTo/Product) + canonical URLs for entries; patch/version meta.

## Tech Foundations (non-binding, to make it shippable)

- Next.js (SSG/ISR) for speed.
- CMS (Sanity/Payload) with roles (editor, moderator) and your schema.
- Leaflet map with skinned raster tiles.
- Client search (Fuse.js) → upgrade later (Typesense/Algolia).
- Image CDN (Cloudinary/ImageKit) for auto-thumbs.
