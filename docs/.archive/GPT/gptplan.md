# CITIZEN ZINE — First-Draft Site Plan (coherent + complete, no code yet)

A compact blueprint you can hand to a designer/dev and start building. I’ve filled the gaps, added the critical elements you’ll need, and kept it aligned to a 90’s zine vibe + “what’s new in this patch?” utility.

---

## 1) Product Goals (what the site must do)

1. Surface what’s new in the latest patch instantly.
2. Show where it is (LOCATION OF ASSET) and how to get it (HOW TO OBTAIN) for every entry.
3. Be fast, skimmable, and zine-styled—no walls of text, no labyrinth of pages.
4. Stay current with simple update workflows on patch day and after.
5. Let the community submit & verify finds without turning the site into chaos.

---

## 2) Information Architecture (pages & flows)

* Home (Patch Hub)

  * Hero: “Patch X.Y.Z — What’s New” (big zine header cut-out style)
  * 3 tiles: Player Items, Ship Components, Events/Activities
  * Newest 6–10 entries grid (cards show: thumbnail, rarity, planet/system, “Get it at…”, quick tags)
  * “Quick Filters” bar (rarity • location • activity type • patch)

* Patch Landing (All changes for X.Y.Z)

  * Tabs: All | Player Items | Ship Components | Events
  * Filter panel (left): Category, Sub-type, Rarity, Planet/Moon/Station, Vendor vs Drop, PvE/PvP, Time-limited
  * List/grid of entries with zine-style card layout

* Entry Detail (single item/component/event)

  * Above-the-fold essentials: Name, Category, Rarity, Patch, LOCATION OF ASSET, HOW TO OBTAIN
  * Map widget (simple, skinnable) with pins for known spots
  * “Where it drops/sells” chips (Planet  Area  Vendor/POI  Conditions)
  * How-to steps (bulleted, terse), screenshots, loadout notes, risks (e.g., hostile zone)
  * “Verified by” + change log (what changed since last patch)
  * “Community notes” (short, moderated)

* Map

  * Minimal SC-style theme; layer toggles (Planets, Cities, Stations, Event Areas)
  * Search box (Planet, POI, Vendor, Event)
  * Clicking a pin shows mini-cards linking to entries

* Submit / Report

  * Form to add a new find or update an existing one
  * Attach proof (screenshot, short clip URL), pick patch, set location + steps
  * Anti-spam & moderation queue

* About / Method

  * Promise: concise, verified, patch-focused
  * How verification works, how you cite sources, disclosure (fan site, non-official)

* Changelog / Roadmap (optional but useful)

  * What shipped on the site itself, what’s next

---

## 3) Content Model (what you store per entry)

Every entry (Item/Component/Event) must include the “Purpose NOTE” pair:

* LOCATION OF ASSET (required)
* HOW TO OBTAIN (required)

Core fields

* `id`
* `type` (player_item | ship_component | event)
* `subcategory`

  * player_item: weapon | armor | misc
  * ship_component: weapon | shield | warp_drive | cooler
  * event: limited_time | dynamic_event | mission_chain
* `name`
* `patch_version` (e.g., 4.3.1)
* `rarity` (common/uncommon/rare/unique/time-limited)
* `location_of_asset` (short, precise: Planet/Moon  Region/POI  Vendor/Enemy/Container)
* `how_to_obtain` (bullet steps; if chance-based, include % or “low/med/high”)
* `map_refs` (array of coordinates/POI slugs; can be approximate)
* `availability` (always | vendor-rotates | event-only | loot-only | mission-locked)
* `requirements` (reputation, mission unlock, ship class, suit, etc.)
* `proof_links` (screenshots, clips)
* `notes` (quirks, bugs, patch deltas)
* `source_refs` (patch notes anchors, dev posts, trusted community sources)
* `verification_status` (unverified | community-verified | editor-verified)
* `created_at`, `updated_at`, `created_by`, `verified_by`

Supporting tables

* `planets`/`moons`/`stations` (name, slug, map bbox/centroid, tags)
* `vendors` (name, location slug, stock notes)
* `events` (name, window, recurrence, POIs)

This structure forces the two critical fields you asked for and keeps data future-proof.

---

## 4) UX Patterns (so it stays fast + skimmable)

* Card First: Every list view uses compact cards with the two essentials visible:

  * `LOCATION OF ASSET` (single line)
  * `HOW TO OBTAIN` (single shortest step or “See steps”)
* Zine Pull-Quotes: For tricky items, a big cut-out “Tip” sticker with the one line that matters.
* Copy-Snippet Buttons: “Copy Location”, “Copy Steps” for quick paste in Discord.
* Patch Toggle: Switch across recent patches without losing filters.
* “One Screen, One Job”:

  * Home = what’s new
  * Patch page = all new, filtered fast
  * Entry page = location + how-to with map

---

## 5) Visual Design (90’s zine aesthetic without killing readability)

* Typography

  * Headlines: distressed sans or photocopy serif (e.g., *Fugaz One*, *Saira Stencil One*, or a licensed grunge face)
  * Body: clean sans (e.g., *Inter*, *IBM Plex Sans*) for legibility
  * Use uppercase “slab” stickers for category labels

* Color & Texture

  * Off-white paper (#F4F1EA), inky black (#101010), accent red (#E33), acid green (#9EE)
  * Halftone dots, torn-paper edges, tape strips (sparingly—performance budget!)
  * Screened backgrounds behind sections to suggest photocopy layers

* Components

  * Zine Header Bar with patch selector (dropdown that looks like a pasted label)
  * Sticker Chips for planet/vendor/tags
  * Polaroid Frames for screenshots
  * Map skinned with a photocopy-grid tile + simple planet rings

* Motion

  * Low-motion by default; micro-jitter hover on stickers; no parallax

* Accessibility

  * WCAG AA contrast
  * Focus states visible (dotted outline fits zine theme)
  * Reduced-motion CSS respected

---

## 6) Custom Map (minimal but useful)

Goal: Provide an aesthetic locator, not a flight computer.

* Layers

  * Systems/Planets (abstract rings + labeled dots)
  * Settlements/Stations (pins)
  * Event Zones (hatched overlays)
* Interactions

  * Search: planet, station, POI
  * Click pin → mini card (name, 1-line “How to obtain”, link to entry)
  * Filter toggles: Vendors | Loot | Events
* Data

  * Store POIs as named slugs with optional coords; support “approximate”
* Theming

  * Black-white tile base, with red/green highlight pins; paper-edge container

You can build this with Leaflet (simple) or maplibre (if you later want custom vector tiles).

---

## 7) Search & Filtering (the speed piece)

* Search box across: name, planet, vendor, tags
* Filters: category, subcategory, rarity, patch, location, acquisition (vendor/loot/event), verification status
* “Fast paths”: one-click filters (e.g., “Event-Only” or “New & Rare”)

Start with client-side (Lunr/Fuse) + static JSON; move to server search (Postgres trigram / Typesense / Algolia) when content grows.

---

## 8) Content Workflows (how you keep it fresh)

Patch Day (T-0)

1. Create new Patch record X.Y.Z (site auto-generates landing page).
2. Preload candidate entries from: official notes, dev posts, PTR/preview notes, trusted community feeds.
3. For each candidate, draft entries with placeholders, then add:

   * LOCATION OF ASSET (required)
   * HOW TO OBTAIN (required)
4. Publish as “Editor-verified” only when both are filled.
5. Tag anything uncertain as “Unverified” and place on a “Help verify” list.

Post-Patch (rolling)

* Community submissions land in a moderation queue; editors check proof, normalize fields, publish.
* When locations rotate or vendors change, editors bump `updated_at` + add a short delta in “notes.”

Submission Form (user-facing)

* Required: patch, category, name, location_of_asset, how_to_obtain
* Optional: screenshot/clip URL, vendor name, planet/POI pickers, notes
* Spam control: rate limit + honeypot; “first post needs approval”

---

## 9) Governance (so it doesn’t rot)

* Verification Tiers

  * Unverified (gray badge)
  * Community-verified (green badge, 2+ consistent reports)
  * Editor-verified (red “stamp” badge)
* Edit History: changelog per entry
* Source Crediting: brief line with link (no scraping; fair-use excerpt only)
* Content Rules: no datamining proprietary DBs; reference official notes + player-generated proof

---

## 10) Tech Choices (non-binding suggestions)

* Frontend: Next.js or SvelteKit (SSG/ISR for speed)
* CMS: Sanity / Payload / Strapi (schema-first; draft/publish; roles)
* DB: Postgres (Supabase) or just CMS backend to start
* Search: Fuse.js → Typesense/Algolia when needed
* Map: Leaflet + custom raster tiles (fast & themeable)
* Media: Cloudinary/ImageKit (auto-thumbs)
* Deploy: Vercel/Netlify (static pages, incremental rebuilds)
* Analytics: Plausible (lightweight)

---

## 11) Performance & Quality

* Budgets: LCP < 2.5s on mid-tier mobile; JS < 180KB initial; images lazy-loaded
* SEO: Each entry gets canonical URL, JSON-LD (Product/Place/HowTo depending on type), `meta` with patch & planet
* Accessibility: Keyboard-first nav; alt text is mandatory for screenshots

---

## 12) Security & Legal

* Fan site disclaimer (non-affiliated, fair use of names/assets)
* Content license: CC-BY-SA for user submissions (or similar) so guides can evolve
* Moderation: takedown path for copyrighted material on request
* Privacy: minimal cookies, no trackers beyond analytics

---

## 13) Initial Taxonomy (keeps filters clean)

* Categories

  * Player Items  Weapons | Armor | Misc
  * Ship Components  Weapons | Shields | Warp Drive | Cooler
  * Events  Limited-time | Dynamic | Mission Chain
* Tags (examples)

  * Vendor, Loot, Mission-Locked, Reputation-Locked, Time-Limited, PvE, PvP, Hazard, Multiparty, Solo-friendly

---

## 14) Example Entry (how it reads on page)

Name: Crusader “Helfire” SMG
Type: Player Item  Weapon | Patch: 4.3.1 | Rarity: Rare

* LOCATION OF ASSET: Orison (Crusader)  Providence Platform  “Grey Market” kiosk (back stalls)
* HOW TO OBTAIN: Complete “Dockside Dispute” mission chain, then check kiosk stock; rotates daily; bring ≥ 5k aUEC.

Map: Orison pin + highlighted stall row
Notes: Rotates with “ArcLight” pistol; availability dips during IAE week.
Verification: Editor-verified (2 proofs)
Sources: Patch notes 4.3.1 (weapons section), Player clips (2)

*(All fields are short and skimmable—no essays.)*

---

## 15) Roadmap (phased so you can actually ship)

Phase 0 — One-week prototype

* Static Next/Svelte site, hand-curated entries for the latest patch
* Home, Patch page, Entry page (hardcoded JSON), basic filters
* Minimal zine skin + placeholder map image

Phase 1 — Foundational

* CMS with the schema above
* Real map (Leaflet), POI pins
* Submission form + moderation queue
* Basic search + filter URL state

Phase 2 — Community & Scale

* Verification badges, edit history, contributor profiles
* Image hosting pipeline, clip embeds
* Typesense/Algolia search
* Performance passes (code-split, image CDs)

Phase 3 — Nice-to-haves

* Vendor rotation tracking
* “Loadout synergy” quick tips
* Patch diff view (what moved/changed)
* Lightweight API for bots/overlays

---

## 16) What I still need from you (later, not now)

* A short list of trusted sources you’ll accept as “proof”
* Your preference on CMS (hosted vs self-hosted)
* Any brand assets (logo, wordmark) or we’ll do a temporary zine logotype

---

If you want, I can turn this plan into a 1-page “Builder’s Spec” (sections: scope, non-goals, acceptance criteria, schema, IA, styles) so a dev can estimate.
