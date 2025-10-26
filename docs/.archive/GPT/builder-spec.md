# CITIZEN ZINE — 1-Page Builder’s Spec (v0.1)

## 1) Scope (Phase 1 “Foundational”)

Deliver a fast, patch-centric fan site with zine aesthetic that:

* Lists “what’s new” for the latest patch (Player Items, Ship Components, Events).
* For every entry, must show: LOCATION OF ASSET and HOW TO OBTAIN (above the fold).
* Includes a minimal interactive map (pins + search) that links to entries.
* Supports search & filters, and a submission form with moderation queue.
* Content managed via lightweight CMS; static pages with incremental rebuild.

## 2) Non-Goals (Phase 1)

* No account system, comments, or real-time chat.
* No advanced cartography (no nav routes, orbits, 3D).
* No complex vendor stock forecasting.
* No mobile app—mobile web only.

## 3) Acceptance Criteria (ship check)

* Home shows latest patch hero, quick filters, and ≥6 newest entries.
* Patch page: tabbed categories, working filters, URL-synced state.
* Entry page: name, type, patch, rarity + LOCATION OF ASSET + HOW TO OBTAIN visible without scrolling; map pin or POI chip present.
* Map: search by planet/station/POI; clicking pin opens mini-card linking to entry.
* Submission form: required fields validated; entries land in moderation; publish sets verification badge.
* Performance: LCP < 2.5s on mid-range mobile; initial JS ≤ 180KB; images lazy-loaded.
* A11y: Keyboard nav works; focus states visible; text meets WCAG AA.
* SEO: Each entry has canonical URL + basic JSON-LD and meta.

## 4) Information Architecture

* / (Home / Patch Hub): Latest patch spotlight + newest entries grid.
* /patch/[version]: All new items/components/events for that patch (tabs + filters).
* /entry/[slug]: Single entry details (+ map panel, proof links, verification badge).
* /map: Minimal SC-styled world map; pins + search.
* /submit: New find/update form (goes to moderation).
* /about: Method, verification, disclaimer.
* /changelog (site updates) — optional if space permits.

## 5) Content Model (CMS schema, concise)

Entry

```
id, type(enum: player_item|ship_component|event), subcategory,
name, patch_version, rarity(enum),
location_of_asset (short string),
how_to_obtain (short steps, markdown-lite),
map_refs[poi_slug], availability(enum), requirements[], proof_links[],
source_refs[], verification_status(enum: unverified|community|editor),
created_at, updated_at, created_by, verified_by
```

POI: slug, name, kind(enum: planet|moon|station|city|event_zone), coords(optional), parent_slug(optional)

## 6) Visual & UX (90’s Zine Aesthetic)

* Type: Headings = distressed/grunge display; Body = clean sans (Inter/IBM Plex).
* Palette: Off-white paper, inky black, accent red + acid green. Halftone/torn-paper textures sparingly.
* Components: Zine header with patch selector; “sticker” chips for tags; polaroid frames for images.
* Patterns: Card-first lists; pull-quote “TIP” stickers; copy buttons (“Copy Location”, “Copy Steps”).
* Motion: Minimal; respect reduced-motion.

## 7) Tech Choices

* FE: Next.js (App Router) with SSG/ISR.
* CMS: Sanity (hosted) or Payload (self-hosted). Roles: editor, moderator.
* DB: CMS backend (Phase 1); Postgres later if needed.
* Search: Fuse.js client-side (Phase 1); Typesense/Algolia later.
* Map: Leaflet + simple raster tile background; POIs from CMS.
* Media: Cloudinary/ImageKit; thumbnails preset.
* Deploy: Vercel; preview branches on PR.

## 8) Workflows

Patch Day

1. Create Patch record; import candidate entries (draft).
2. Fill LOCATION OF ASSET & HOW TO OBTAIN; set status = editor-verified; publish.
3. Mark uncertain entries as unverified with “Help Verify” tag.

Community Submissions

* Form → moderation queue → normalize fields → publish as community-verified; editor can promote to editor-verified.

Edit History

* Auto-version entry on publish; display brief delta (“Vendor moved to…”, etc.).

## 9) Search & Filters

* Search fields: name, planet, vendor, tags.
* Filters: category, subcategory, rarity, patch, acquisition (vendor/loot/event), verification status.
* Persist filter state in URL (query params).

## 10) Performance, A11y, SEO

* Code-split routes; image width hints; prefetch on viewport.
* Alt text required; focus rings on interactive elements; skip-to-content link.
* JSON-LD: Product (items/components) or HowTo (steps); Patch meta in `<meta>` and breadcrumbs.

## 11) Security & Legal

* Fan site disclaimer; fair-use names; takedown pathway.
* Submission anti-spam: honeypot + rate-limit.
* Limit embeds to whitelisted domains.

## 12) Milestones & Deliverables

M1 — Prototype (3–5 days)

* Static JSON content; Home, Patch, Entry; basic zine skin; placeholder map image.

M2 — CMS & Map (1–2 weeks)

* CMS schema + editorial workflow; Leaflet map with POI pins; submission form → moderation.

M3 — Polish (1 week)

* Verification badges; URL-synced filters; copy buttons; SEO/A11y/perf passes.

## 13) Success Metrics (initial)

* Time-to-find: ≤ 2 clicks from Home to any entry.
* Bounce on Entry < 40%; repeat users/patcheday uplift.
* < 5% moderation rejection rate after 2 weeks (taxonomy clarity).

---
