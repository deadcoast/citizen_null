# CITIZEN ZINE - DESIGN PLAN

**Visual Design Philosophy & Layout Guidelines**

---

## DESIGN MANIFESTO

### Core Principles

**"Authentic, Not Aesthetic"**
This isn't a tribute to punk - it IS punk. Every design decision should feel like it was made by someone with access to a photocopier, scissors, and glue in 1992.

**"Information First, Beauty Second"**
Players don't need pretty - they need FAST and CLEAR. If a design choice adds visual interest but slows down information retrieval, cut it.

**"DIY or Die"**
Nothing should look polished. Nothing should look professional. Everything should look handmade by someone who cares more about the message than the medium.

---

## VISUAL LANGUAGE

### The "Xeroxed Zine" Aesthetic

**What This Looks Like:**

You've photocopied the same flyer 50 times. By copy #50:
- The blacks are REALLY black (high contrast)
- The whites are slightly gray (aging paper)
- There are random specks and artifacts
- Text edges are slightly fuzzy
- Nothing is perfectly aligned
- Halftone dots are visible on photos

**Physical Reference Points:**
- Early Maximum Rocknroll issues
- DIY punk show flyers taped to telephone poles
- Self-published perzines from the 90s
- Photocopied band demos and tape inserts
- Newsprint fanzines
- Hand-collaged protest posters

**Digital Translation:**
- High contrast everywhere
- Visible grain and texture
- Imperfect alignment (but still readable)
- Mixed type sizes (typewriter + handwritten feel)
- Cut-out photo edges (not smooth borders)
- Tape/staple marks
- Paper fold lines

---

## LAYOUT PHILOSOPHY

### "The Zine Grid"

**Traditional Zine Layout Rules:**
1. No design software templates - everything is placed by hand
2. White space is NOT wasted space - it's breathing room
3. Headlines are BIG and BLACK
4. Body text is small and dense
5. Important info gets a box around it (literal box, drawn with marker)
6. Photos/images are cropped with scissors, edges are rough

**Applied to Web Design:**

**AVOID:**
- Perfect alignment
- Equal spacing between all elements
- Smooth gradients
- Rounded corners (use sharp angles)
- Drop shadows
- Blur effects
- Animation (except glitchy/stuttering intentional effects)

**EMBRACE:**
- Slightly off-kilter placement
- Varied spacing (tight in some areas, loose in others)
- Hard edges and straight lines
- Overlapping elements (layered collage effect)
- Visible borders (thick black lines)
- Diagonal placement occasionally
- White space as dramatic punctuation

---

## INFORMATION HIERARCHY

### "Shout, Speak, Whisper"

**Level 1: SHOUT (Headlines, New Items, Patch Number)**
- Thick, bold, ALL CAPS
- Pure black ink
- Largest size on page
- Can be at angles (10-15° rotation)
- May have hand-drawn box around it
- Red stamp effect for "NEW!"

**Level 2: SPEAK (Item Names, Categories, Location Headers)**
- Bold, Mixed Case or ALL CAPS
- Black ink
- Medium size
- Usually horizontal (but can break rule)
- May have simple underline

**Level 3: WHISPER (Body Text, Stats, Descriptions)**
- Regular weight
- Smaller size
- Black or dark gray
- Dense paragraphs or tight lists
- Looks like typewriter text

**Level 4: BARELY THERE (Footnotes, References, Links)**
- Smallest size
- Mid-gray
- Bottom corners or margins
- Handwritten feel

---

## SPATIAL DESIGN

### Page Composition

**The "Collage Approach":**

Think of your screen as a cork board where you're pinning things:
- Items don't need to be in perfect rows
- Some overlap is GOOD (creates depth)
- Empty space is dramatic (don't fill every pixel)
- Elements can bleed off edges
- Borders/frames can be imperfect

**Grid System (Loose):**
- 12-column grid as GUIDE, not LAW
- Allow items to break the grid occasionally
- Asymmetry is your friend
- Group related items tightly, separate unrelated items widely

**Rhythm and Flow:**
- BIG headline → lots of white space → dense information grid
- Alternate between sparse and dense sections
- Guide the eye with black lines and boxes
- Use orientation changes sparingly (1-2 rotated elements per screen)

---

## COMPONENT DESIGN PATTERNS

### Item Cards

**Visual Structure:**
```

     [PHOTO - ROUGH]      ← Halftone effect, torn edges
       EDGE CROP         

  ITEM NAME (BOLD)       
  Location (small)       
   How to get (bullet)  
                         
  [RARE] or [NEW!] stamp  ← Rotated, red ink

```

**Design Notes:**
- NO rounded corners
- Thick borders (2-4px black)
- Background: cream paper texture
- Hover state: Slight shift (like paper moving), NOT glow
- Photos: Always black/white or heavy grain color
- Red stamp only if NEW or high rarity

### Filter Bar

**Visual Structure:**
```

[SEARCH____________] [CAT] [RARE] [X]

```

**Design Notes:**
- Looks like a torn strip of paper at top
- Black border top and bottom
- White/cream background
- All caps labels
- Simple dropdown arrows (ASCII style: )
- "X" to clear is literal X character

### Modal / Detail View

**Visual Structure:**
```

 [X]                ITEM NAME     

                                  
  [LARGE IMAGE]     STATS         
   halftone            
                    Damage: 850   
                    Rate: 120     
                                  
       
    LOCATION                    
    Hurston - Lorville          
    [VIEW MAP →]                
       
                                  
  HOW TO OBTAIN:                  
  Purchase from shop in CBD...    
                                  

```

**Design Notes:**
- Thick black border (8-10px)
- Paper texture background
- Stats in simple table format
- Location gets its own box (drawn box style)
- Close X in corner (large, obvious)
- No fancy animations - just appear/disappear

---

## TYPOGRAPHY DESIGN

### Type Hierarchy Visual

**Display/Headline:**
```
PATCH 3.23
 Courier New or similar monospace
   All caps, bold, 72-96px equivalent
   Letter-spacing: slightly tight
```

**Section Headers:**
```
NEW WEAPONS
 Courier New, bold, 32-48px
   Slight rotation OK (5-10°)
   May have underline or box
```

**Item Names:**
```
Devastator Shotgun
 Arial Bold or Helvetica Bold
   18-24px, mixed case
   Tight leading
```

**Body Text:**
```
Purchase from Hurston Security...
 Arial Regular, 14-16px
   Dark gray or black
   Dense paragraphs
```

**Handwritten Notes (Optional Accent):**
```
*rare drop!
 Handwritten font or marker style
   Used sparingly for annotations
   Red ink color
```

### Typographic Rules

**DO:**
- Use monospace for technical data (stats, coordinates)
- Use bold liberally (headlines, labels, emphasis)
- Mix type sizes dramatically (big headers, small body)
- Use ALL CAPS for urgency (NEW!, RARE!, patch numbers)
- Allow typewriter-style imperfections

**DON'T:**
- Use decorative fonts (no brush scripts, no fancy serifs)
- Use light/thin weights (everything should feel INKED)
- Use multiple font families (2-3 max)
- Use italic (rare in punk zines - prefer bold or caps)
- Use gradient text or outlines

---

## COLOR USAGE STRATEGY

### "Black, White, and Red All Over"

**The 95/5 Rule:**
- 95% of visual space: Black, white, cream, gray
- 5% of visual space: Red (and rarely, rust orange or mustard)

**When to Use Red:**
- NEW item stamps (rotated, rough edges)
- Important CTAs (links to map, key actions)
- Warning text (bugs, limited availability)
- Rare/Legendary indicators (small accent, not whole card)
- Hover states on interactive elements

**When NOT to Use Red:**
- Regular body text
- All item cards (only special ones)
- Backgrounds (keep paper colors)
- Borders (keep black)

**Grayscale Application:**
- Pure black: Headlines, borders, key text
- Dark gray: Body text, icons
- Mid gray: De-emphasized text, dividers
- Light gray: Subtle shadows, texture overlays
- Cream/white: Backgrounds, paper

---

## TEXTURE & EFFECTS

### Required Texture Layers

**1. Paper Grain (Always On)**
- Subtle noise across all backgrounds
- Makes screen feel like paper
- Opacity: 10-20%

**2. Photocopier Artifacts (Strategic)**
- Random black spots/marks
- Vertical streaks (like toner running low)
- Edge darkness (center is lighter)
- Use on hero sections and key cards

**3. Halftone on Images**
- All photos get newspaper-style dots
- Black and white or limited color
- Visible dot pattern
- Makes images feel printed, not digital

**4. Ink Bleed**
- Text edges slightly fuzzy
- Not crisp digital text
- Subtle effect, not blurry

**5. Fold/Crease Lines (Accent)**
- Diagonal lines suggesting paper folds
- On hero section or large blocks
- Light gray, subtle

---

## INTERACTIVE DESIGN

### Hover States (Desktop)

**Item Cards:**
- Before: Flat on surface
- Hover: Slight shift up and left (3-5px), like paper lifting
- Border gets slightly thicker
- NO glow, NO shadow, NO color change
- Maybe: Red underline appears on name

**Buttons/Links:**
- Before: Black text, underline
- Hover: Red text, thicker underline
- NO background change, NO border growth

**Filters/Dropdowns:**
- Before: Cream background, black border
- Hover: Slight paper texture intensifies
- Active: Red border or indicator

### Click/Tap States (Universal)

**Feedback:**
- Element shifts down slightly (pressed paper effect)
- Brief red flash (like stamp ink)
- NO bounce, NO elastic, NO scale-up

### Animations (Use Sparingly)

**Allowed:**
- Glitchy text effect on patch number (1-2 second loop)
- Scanning line across hero (slow, subtle)
- Paper shift on hover (instant, no easing)
- Modal appear/disappear (cut transition, no fade)

**Banned:**
- Smooth fades
- Elastic bounces
- Rotating elements (except intentional diagonal layout)
- Parallax scrolling
- Particle effects

---

## RESPONSIVE DESIGN APPROACH

### Mobile (< 640px)

**Philosophy: "Pocket Zine"**
- Think: folded up zine in back pocket
- Simpler layout, bigger touch targets
- Less collage, more linear
- Maintain DIY feel but prioritize clarity

**Adaptations:**
- Single column (no grid)
- Larger text (readability on small screen)
- Filter bar collapses to hamburger (with punk aesthetic)
- Cards stack vertically
- Bigger tap areas (minimum 44x44px)

### Tablet (640-1024px)

**Philosophy: "Open Zine on Table"**
- Two-column layout
- More white space
- Collage elements start appearing
- Side-by-side comparisons possible

### Desktop (> 1024px)

**Philosophy: "Full Spread Zine"**
- Multi-column grid (3-4 columns)
- Maximum collage effect
- Diagonal elements, overlaps
- Spacious, dramatic layouts

---

## PHOTOGRAPHY & IMAGE TREATMENT

### Image Style

**Source Material:**
- In-game screenshots from Star Citizen
- High-res preferred (will be degraded intentionally)

**Treatment Process:**
1. Convert to black and white OR heavily desaturate
2. Increase contrast dramatically
3. Apply halftone dot pattern
4. Add grain/noise
5. Crop with irregular edges (torn paper effect)
6. Optional: slight rotation (2-5°)

**Image Borders:**
- NO smooth edges
- Use CSS clip-path for torn/cut effect
- Thick black border around images
- May overlap with other elements

**Image Layout:**
- Not all images same size (vary for interest)
- Some images can be small (postage stamp size)
- Some images can be large (hero photo)
- Group images in collage clusters

---

## ICONOGRAPHY

### Icon Style

**NOT:**
- Smooth vector icons
- Filled circles
- Gradient icons
- Outlined icons with rounded corners

**YES:**
- Simple geometric shapes
- Thick strokes (2-3px)
- Angular, not rounded
- ASCII-inspired where possible
- Hand-drawn feel

**Examples:**
- Search: Magnifying glass (thick lines, angular handle)
- Close: Large X (thick, black)
- Filter: Three stacked lines (thick, unequal lengths)
- Location: Pushpin shape (angular)
- New: Star burst (jagged points)

---

## NEGATIVE SPACE USAGE

### "Air to Breathe"

**Zine Design Truth:**
More is NOT more. Cramming content creates confusion. Strategic emptiness creates IMPACT.

**Spacing Strategy:**

**Tight Spacing (Intentional Density):**
- Item grid (cards close together)
- Stat tables (compact info)
- Filter options (clustered controls)

**Loose Spacing (Dramatic Pauses):**
- Around hero section (patch number gets SPACE)
- Between major sections (clear separation)
- Around "NEW!" stamps (make them POP)
- Margins on mobile (don't cram to edges)

**White Space as Design Element:**
- Large empty areas feel like torn-out sections
- Creates visual rhythm (busy → calm → busy)
- Frames important information
- Makes rare items feel MORE rare

---

## SECTION-SPECIFIC DESIGN

### Hero Section (Patch Banner)

**Design Goal:**
First impression should scream: "This is THE punk zine for Star Citizen"

**Visual Elements:**
- Massive patch number (centered or off-center)
- Glitchy/distressed text effect
- Heavy grain background
- Minimal text (patch number + date + one tagline)
- Possible: diagonal strip with "NEW LOOT INSIDE"
- Photocopier artifacts visible
- Maybe: hand-drawn arrow pointing down

**Mood:**
Raw energy, urgency, authenticity

### Filter Bar

**Design Goal:**
Functional but looks like a torn strip from a checklist

**Visual Elements:**
- Horizontal strip (full width or torn edge width)
- White/cream background
- Black top and bottom border
- Simple form controls (no fancy UI)
- ALL CAPS labels
- Monospace font for inputs
- Clear visual separation from content below

**Mood:**
Utilitarian, no-nonsense, quick scanning

### Item Grid

**Design Goal:**
Browsing should feel like flipping through a physical zine

**Visual Elements:**
- Cards arranged in grid (but not perfectly aligned)
- Varied card sizes acceptable (feature some items)
- Overlapping edges OK (slight depth)
- Section headers look hand-lettered or stamped
- Cream backgrounds with black borders
- Photos in halftone
- Red stamps on NEW items only

**Mood:**
Organized chaos, treasure hunt, authentic catalog

### Item Detail Modal

**Design Goal:**
"Clip this page out and save it" vibe

**Visual Elements:**
- Thick border (photocopied page edge)
- Large item image (halftone)
- Stats in simple grid (typewriter style)
- Location box (literal drawn box)
- How-to-obtain in narrative text
- Close X prominent in corner
- Optional: tape marks in corners (visual only)

**Mood:**
Reference sheet, detailed guide, keep-this-handy

### Map Interface

**Design Goal:**
Looks like a photocopied star chart with handwritten notes

**Visual Elements:**
- Black background (space)
- Simple planet circles (not realistic renders)
- White/gray orbit lines (dotted or dashed)
- Location markers as simple pins or X marks
- Coordinate grid (faint white lines)
- Labels in monospace font
- Red pins for item locations
- Zoom controls look like buttons on old copy machine

**Mood:**
Technical diagram, navigation chart, DIY space map

---

## BRAND IDENTITY ELEMENTS

### Logo/Wordmark

**"CITIZEN ZINE"**

**Design Approach:**
- Typewriter font or bold sans-serif
- ALL CAPS
- Stacked or horizontal
- May have rough edges (stamped look)
- Black on cream or reverse (cream on black)
- Optional: Red underline or box

**NOT:**
- Fancy ligatures
- Script fonts
- Gradients
- Icons integrated into letters

**Placement:**
- Top left corner (traditional zine placement)
- Small and functional, not huge branding
- May appear on every "page" like a zine masthead

### Tagline Options

- "For Citizens, By Citizens"
- "Your Patch Survival Guide"
- "New Loot. Fast."
- "No Bullshit Star Citizen Database"

**Typographic Treatment:**
- Small text under logo
- Italics or regular weight
- Gray or black
- Not emphasized (logo is the star)

---

## MICRO-INTERACTIONS

### Subtle Details That Matter

**Form Inputs:**
- Focus state: Black border becomes red
- Text cursor: Thick block (terminal style)
- Placeholder text: Mid-gray, italic

**Checkboxes/Radio Buttons:**
- Not rounded
- Thick borders
- Red fill when selected (or black X)
- Hand-drawn appearance

**Dropdowns:**
- Simple black border
- White background
- Options in ALL CAPS
- Selected item gets red background

**Loading States:**
- Simple text: "LOADING..."
- Blinking cursor (typewriter effect)
- NO spinners, NO progress bars
- Maybe: horizontal scanning line

**Error States:**
- Red border around problem area
- Red text with icon: " ERROR"
- ALL CAPS error message
- Feels like stamped "REJECTED"

---

## DESIGN CONSISTENCY RULES

### "If It Looks Digital, You Failed"

**Test Your Design:**

 **PASS if...**
- You can imagine printing it on a photocopier
- It looks like something from 1992
- Color palette is 90% grayscale
- Text is bold and HIGH contrast
- Edges are rough and imperfect
- There's visible texture everywhere

 **FAIL if...**
- It looks like a modern SaaS app
- There are smooth gradients
- Corners are rounded
- Shadows are soft/blurred
- Colors are neon/bright/saturated (except red)
- Everything is perfectly aligned

### Design Decision Framework

**When choosing between options, ask:**
1. "Would this work on a photocopier?"
   - Yes → Good candidate
   - No → Reconsider
2. "Is this information-first or decoration-first?"
   - Information → Keep it
   - Decoration → Cut it or simplify
3. "Does this feel handmade or software-made?"
   - Handmade → Perfect
   - Software → Needs roughing up

---

## ACCESSIBILITY WITHOUT COMPROMISE

### Making Punk Zine Design Accessible

**Color Contrast:**
- Black on cream: 12:1 ratio (excellent)
- Red on cream: Check for AA compliance (adjust if needed)
- Never red on black (poor contrast)
- Never gray text on white (increase darkness)

**Text Size:**
- Minimum body text: 14px actual size
- Zine aesthetic doesn't mean unreadable
- Scale up for mobile

**Interactive Elements:**
- All clickable areas: Minimum 44x44px
- Hover states must be obvious (not just color change)
- Keyboard navigation: Visible focus states (red outline)

**Screen Readers:**
- Alt text on all images (describe item, not aesthetic)
- Semantic HTML (even if it doesn't look semantic)
- ARIA labels where needed

**Motion:**
- Glitch effects can be disabled (prefers-reduced-motion)
- No auto-playing animations longer than 5 seconds
- All animations must be optional

---

## DESIGN SYSTEM DOCUMENTATION

### Component Visual Standards

**Every Component Needs:**
1. Default state mockup
2. Hover state mockup (desktop)
3. Active/selected state mockup
4. Error state mockup (if applicable)
5. Mobile variant mockup
6. Texture/grain specifications
7. Border thickness specs
8. Spacing rules

**Design Tokens to Define:**
- Border widths (thin: 1px, medium: 2px, thick: 4px, heavy: 8px)
- Corner radius (always: 0px - no rounding)
- Spacing scale (tight: 4px, normal: 8px, loose: 16px, spacious: 32px)
- Font sizes (small: 14px, base: 16px, large: 20px, xl: 32px, xxl: 48px)
- Line heights (tight: 1.2, normal: 1.5, loose: 1.8)

---

## VISUAL INSPIRATION MOOD BOARD

### Reference Materials to Study

**Physical Zines:**
- Maximum Rocknroll (1980s-90s issues)
- Punk Planet magazine
- Cometbus zines
- DIY local show flyers
- Self-published perzines from thrift stores

**Digital References:**
- Brutalist web design examples
- ASCII art interfaces
- Early web (1990s geocities aesthetic)
- Terminal/command-line interfaces
- Photocopier art movement

**NOT Your Inspiration:**
- Modern minimalist design
- Apple/Google material design
- Dribbble trending designs
- Gradient-heavy portfolios

### Building Your Own Mood Board

**Collect:**
- 20+ scanned punk zine pages
- 10+ photocopied flyer examples
- 5+ examples of "bad" photocopies (artifacts, misalignment)
- Color palettes from vintage newsprint
- Halftone pattern examples

**Analyze:**
- How is hierarchy achieved? (size, weight, placement)
- Where is color used? (sparingly, for emphasis)
- How much white space? (more than you'd think)
- What feels "authentic" vs "trying too hard"?

---

## DESIGN EVOLUTION PLAN

### Phase 1: Launch (MVP Design)
- Core visual system established
- Black, white, cream, red only
- Basic textures (grain, halftone)
- Simple layouts (functional first)
- Desktop and mobile working

### Phase 2: Polish (Post-Launch)
- Add more texture variety
- Refine photocopier artifacts
- Experiment with diagonal elements
- Add subtle animations
- Improve micro-interactions

### Phase 3: Expansion (Future)
- Custom hand-drawn icons
- User-submitted zine pages
- Print stylesheet (actual printable zines)
- Collectible "issue covers" per patch
- Community design contributions

---

## COMMON DESIGN MISTAKES TO AVOID

### Rookie Errors

 **Over-designing**
- Adding too many effects
- Using all accent colors at once
- Making everything rotated/diagonal
- Cramming too much on screen

 **Solution:** Simplify. One accent color per screen section. Limit rotation to 1-2 elements.

 **Going too "clean"**
- Perfectly aligned everything
- No texture or grain
- Smooth, polished look

 **Solution:** Add imperfection intentionally. Misalign slightly. Add grain.

 **Wrong retro aesthetic**
- Neon colors (that's synthwave, not punk)
- Rounded corners (that's Y2K, not zine)
- Smooth gradients (that's 2010s, not 90s)

 **Solution:** Study actual punk zines. High contrast, rough edges, limited color.

 **Illegible in pursuit of style**
- Text too small
- Low contrast red on black
- Overly distressed fonts

 **Solution:** Style serves function. If users can't read it, redesign it.

---

## DESIGN DELIVERABLES CHECKLIST

### What You Need Before Coding

**Visual Design:**
- [ ] Color palette finalized (with hex codes)
- [ ] Typography system defined (fonts, sizes, weights)
- [ ] Component mockups (at least 5 key components)
- [ ] Texture/effect samples created
- [ ] Hero section design complete
- [ ] Item card design complete
- [ ] Modal design complete

**Design System:**
- [ ] Spacing scale documented
- [ ] Color usage rules written
- [ ] Typography hierarchy chart
- [ ] Component state variations
- [ ] Responsive breakpoint decisions

**Assets:**
- [ ] Paper texture files (grain, aged paper)
- [ ] Photocopier artifact overlays
- [ ] Halftone pattern generator or files
- [ ] Icon set (or ASCII alternatives)
- [ ] Sample item images (with halftone applied)

**Design Tools:**
- [ ] Figma/Sketch file (if using)
- [ ] Style guide document
- [ ] Component library
- [ ] Design token export

---

## FINAL DESIGN PHILOSOPHY

### "Authentic Over Trendy"

**The Goal:**
When someone lands on Citizen Zine, they should immediately think:
- "This was made by someone who GETS punk zines"
- "This looks like something I'd find at a record store"
- "This is rough but I trust it more than polished corporate sites"

**NOT:**
- "This is a cool retro aesthetic trend"
- "Someone used a vintage filter"
- "This is trying too hard"

### Measure Success By

1. **Speed of information retrieval**
   - Can user find what they need in < 30 seconds?

2. **Emotional response**
   - Does it feel authentic and trustworthy?

3. **Memorability**
   - Will users remember and return?

4. **Community adoption**
   - Do Star Citizen players share it?

5. **Design integrity**
   - Does every element serve the punk zine vision?

---

## DESIGN SIGN-OFF CRITERIA

### Before Launch, Verify

**Visual Coherence:**
- [ ] 90%+ of design is black/white/cream/gray
- [ ] Red used only for emphasis (<5% of space)
- [ ] All photos have halftone treatment
- [ ] Texture visible on all backgrounds
- [ ] No rounded corners anywhere
- [ ] Typography follows hierarchy rules

**Functional Design:**
- [ ] All interactive elements obvious
- [ ] Mobile layout tested and working
- [ ] Color contrast meets WCAG AA
- [ ] Loading states designed
- [ ] Error states designed

**Brand Consistency:**
- [ ] Logo/wordmark in place
- [ ] Consistent header/footer
- [ ] Same aesthetic across all pages/modals
- [ ] Design system documented

**Punk Zine Authenticity Check:**
- [ ] Would this work as a printed photocopied zine?
- [ ] Does it look handmade, not software-generated?
- [ ] Is it information-first, not decoration-first?
- [ ] Does it reject modern design trends?

---

**END OF DESIGN PLAN**

This is your visual north star. When in doubt, ask: "Would this be in a punk zine from 1992?"

If yes → Do it
If no → Don't

Keep it raw. Keep it real. Keep it readable.

---

**Document Version:** 1.0
**Created:** October 2025
**Next Step:** Start visual mockups in Figma or go straight to code with this as your guide
