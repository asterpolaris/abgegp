# ABGE GP Website Migration Plan
## WordPress/Elementor → Astro + Decap CMS on Netlify

---

## Project Overview

Migrate **abgegp.com** from a WordPress/Elementor site (with WooCommerce and The Events Calendar) to a lightweight static site built with **Astro** and **Decap CMS** (formerly Netlify CMS), hosted on **Netlify** via a **GitHub** repository.

**Client:** ABGE GP — Race Weekend events by **Auberge Saint-Gabriel**, Montreal
**Current site:** https://abgegp.com
**Built by:** Asterpolaris Marketing (https://asterpolaris.com)
**2026 Event dates:** Thursday May 21 – Sunday May 24, 2026

### Why migrate?
- The site no longer sells tickets directly — it links to external platforms
- WordPress, Elementor Pro, WooCommerce, and The Events Calendar are overkill for what is now a landing page + event pages
- Eliminates hosting costs, plugin licensing, security maintenance, and database overhead
- Static output = faster page loads, free hosting, zero attack surface

---

## Current Site Architecture (Full Audit)

### Tech Stack (to be removed)
- WordPress 6.9.4
- Elementor 3.23.4 + Elementor Pro
- WooCommerce (cart/checkout pages exist but unused)
- The Events Calendar + Tribe Tickets (ticket forms on event pages)
- Hello Elementor theme

### Site Structure

```
Homepage (/)
├── Hero: Full-width B&W F1 pit stop background image
├── Navigation bar:
│   ├── Logo: ABGE + "Race Weekend" + checkered flags (PNG: Artboard-1@2x.png)
│   ├── "Dinner Menu" → links to PDF: /wp-content/uploads/2025/04/ABGE_MENU.pdf
│   ├── "RESERVATION" → mailto:grandprix@aubergesaint-gabriel.com
│   ├── "Casa Del Arte" → /event/casa-25/
│   ├── "Power Unit" → /event/power-25/
│   ├── "BAGATELLE" → /event/bagatelle-25/
│   ├── "Full Speed" → /event/full-speed-25/
│   └── "Pole Position" → /event/pole-position-25/
├── Event cards section: 5 cards in a horizontal row
│   Each card = event flyer image (portrait 576x1024) + "BUY TICKETS" button
│   Cards link to same event pages as nav
├── Footer:
│   ├── Logo (repeated)
│   └── "Built by Asterpolaris Marketing" → http://asterpolaris.com
│
├── /event/casa-25/ — Casa Del Arte event page
├── /event/power-25/ — Power Unit event page
├── /event/bagatelle-25/ — Bagatelle event page
├── /event/full-speed-25/ — Full Speed event page
└── /event/pole-position-25/ — Pole Position event page
```

### Design Characteristics
- **Color scheme:** Pure black background (#000000), white text, red accent color for highlights
- **Typography:** Clean sans-serif, all-caps for nav items and headings
- **Style:** Dark, cinematic, luxury nightlife aesthetic
- **Layout:** Full-bleed hero image, horizontal card grid on homepage
- **Responsive breakpoints:** Mobile (767px), Tablet (1024px)

---

## Current Assets to Extract

### Images (download all from WordPress before decommissioning)

| Asset | URL | Purpose |
|-------|-----|---------|
| Logo | `https://abgegp.com/wp-content/uploads/2025/04/Artboard-1@2x.png` | Header/footer logo (1196x153) |
| Hero BG | Background image on homepage hero section (CSS `background-image`) | Full-width hero |
| Casa Del Arte flyer | `https://abgegp.com/wp-content/uploads/2025/05/12-JUIN-CASA-DEL-ARTE-F1-2025-STORY-576x1024.jpg` | Event card + event page |
| Power Unit flyer | `https://abgegp.com/wp-content/uploads/2025/04/13-JUIN-ABGE-F1-2025-STORY-576x1024.jpg` | Event card + event page |
| Bagatelle flyer | `https://abgegp.com/wp-content/uploads/2025/05/BAGATELLE-ABGE-F1-2025-Story-576x1024.jpg` | Event card + event page |
| Full Speed flyer | `https://abgegp.com/wp-content/uploads/2025/05/14-Juin-FULL-SPEED-ABGE-F1-2025-STORY-1-576x1024.jpg` | Event card + event page |
| Pole Position flyer | `https://abgegp.com/wp-content/uploads/2025/05/15-JUIN-Pole-Position-ABGE-F1-2025-STORY-576x1024.jpg` | Event card + event page |
| Dinner Menu PDF | `https://abgegp.com/wp-content/uploads/2025/04/ABGE_MENU.pdf` | Nav link download |
| Favicon | From WordPress site head | Browser tab icon |

### Content to Preserve

**Site meta:**
- Title: "ABGE GP | Let's race again!"
- Description: "ABGE presents 'Let's race again'. Experience the best Montreal has to offer for the race weekend."
- Featured image for social sharing: `/wp-content/uploads/2025/04/image001-1024x576.jpg`

**Ticket policy (shared across all events — bilingual):**
- FR: "Toutes les ventes de billets sont définitives. Les billets ne sont ni remboursables ni échangeables. En achetant un billet, vous acceptez ces conditions."
- EN: "All ticket sales are final. Tickets are non-refundable and cannot be exchanged or returned. By purchasing a ticket, you agree to these terms."

---

## Event Content Database

Each event follows the same template. Below is the data for all 5 current events.

### Event 1: Casa Del Arte
- **Slug:** `casa-del-arte`
- **Date:** May 21 (21 MAI) — Thursday
- **Time:** 10PM – 3AM (À partir de 22h / From 10PM)
- **Description FR:** "Une soirée de fête sans limite, qui vous laissera souvenirs impérissables ou trous de mémoire. À vous de choisir."
- **Description EN:** "The exhilaration of limitless opportunities epitomized in one wild evening."
- **Artists/DJs:** Dan Ficara, Tommy Kimpton, Forrest Del Arte
- **Flyer image:** `12-JUIN-CASA-DEL-ARTE-F1-2025-STORY-576x1024.jpg`
- **Ticket link:** External URL (currently expired — to be updated each year)

### Event 2: Power Unit
- **Slug:** `power-unit`
- **Date:** May 22 (22 MAI) — Friday
- **Time:** 10PM – 3AM (À partir de 22h / From 10PM)
- **Description FR:** "Une soirée glamour décadente et disjonctée."
- **Description EN:** "A glamorous decadent, crazy party."
- **Artists/DJs:** DJ Cruz (France), Baron (France), Ekho, Tali Rose
- **Sponsor highlight:** Heineken
- **Flyer image:** `13-JUIN-ABGE-F1-2025-STORY-576x1024.jpg`
- **Ticket link:** External URL

### Event 3: Bagatelle
- **Slug:** `bagatelle`
- **Date:** May 23 (23 MAI) — Saturday
- **Time:** 12PM – 8PM (daytime brunch event)
- **Type:** Pop Up Event / Brunch Party
- **Description FR:** "Laissez-vous aller et plongez dans l'instant présent. Il est temps de faire la fête comme s'il était trois heures du matin! La nuit est encore très jeune."
- **Description EN:** "Let yourself go and give in to the moment. It's time to party like it's 3 a.m.! The night is very young."
- **Special info:**
  - Chef: Jimmy De Almeida (Executive Chef of Bagatelle Miami)
  - Brunch menu: 125$ (taxes and gratuity not included)
  - Bottle service available after brunch
  - Brunch reservation: abo@gp.com
  - Bottle service reservation: grandprix@aubergesaint-gabriel.com
- **Flyer image:** `BAGATELLE-ABGE-F1-2025-Story-576x1024.jpg`
- **Ticket link:** External URL

### Event 4: Full Speed
- **Slug:** `full-speed`
- **Date:** May 23 (23 MAI) — Saturday night
- **Time:** 10PM – 3AM (À partir de 22h / From 10PM)
- **Description FR:** "Une soirée glamour décadente et disjonctée."
- **Description EN:** "A glamorous decadent, crazy party."
- **Artists/DJs:** Mili (Toronto), Mekki, The Vizys
- **Flyer image:** `14-Juin-FULL-SPEED-ABGE-F1-2025-STORY-1-576x1024.jpg`
- **Ticket link:** External URL

### Event 5: Pole Position
- **Slug:** `pole-position`
- **Date:** May 24 (24 MAI) — Sunday
- **Time:** 10PM – 3AM (À partir de 22h / From 10PM)
- **Description FR:** "Une dernière chance de vivre la folie du Grand Prix dans la démesure d'une soirée ultra-VIP où se retrouvent pilotes et personnalités exubérantes. La fête à ne pas manquer."
- **Description EN:** "One last chance to enjoy Grand Prix celebrations as they were meant to be. A first-rate VIP event where Formula 1 drivers and celebrities gather to party the night away."
- **Artists/DJs:** The Neighbors, Purple (Miami), Bretty Boop, Malek, Choby, Hilal
- **Flyer image:** `15-JUIN-Pole-Position-ABGE-F1-2025-STORY-576x1024.jpg`
- **Ticket link:** External URL

### Common sponsor logos on all event flyers:
Dom Pérignon, Veuve Clicquot, Belvedere, Casamigos, Heineken (these are baked into the flyer images — no separate logos needed)

---

## New Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Astro 5.x | Static site generator with component islands |
| **CMS** | Decap CMS (v3.x) | Git-based headless CMS with admin UI at /admin |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS for the dark luxury aesthetic |
| **Hosting** | Netlify (free tier) | Static hosting with auto-deploy from GitHub |
| **Repository** | GitHub | Version control + Decap CMS backend |
| **Domain** | abgegp.com | Point DNS to Netlify |
| **Auth** | Netlify Identity (free tier) | Login for /admin CMS access |
| **Media** | Netlify Large Media or Git LFS | Store event flyer images |

---

## New Repository Structure

```
abgegp/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── netlify.toml
├── public/
│   ├── admin/
│   │   ├── index.html          ← Decap CMS admin panel entry point
│   │   └── config.yml          ← Decap CMS collection/field definitions
│   ├── images/
│   │   ├── logo.png            ← ABGE Race Weekend logo
│   │   ├── hero.jpg            ← Homepage hero background
│   │   ├── og-image.jpg        ← Social sharing image
│   │   └── favicon.ico
│   └── files/
│       └── menu.pdf            ← Dinner menu PDF
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    ← Shared HTML shell (head, nav, footer)
│   ├── components/
│   │   ├── Navbar.astro        ← Top navigation bar
│   │   ├── Hero.astro          ← Full-bleed hero image section
│   │   ├── EventCard.astro     ← Single event card (flyer + CTA button)
│   │   ├── EventGrid.astro     ← 5-column responsive event card grid
│   │   └── Footer.astro        ← Footer with logo + Asterpolaris credit
│   ├── pages/
│   │   ├── index.astro         ← Homepage
│   │   └── events/
│   │       └── [slug].astro    ← Dynamic event page template
│   ├── content/
│   │   ├── config.ts           ← Astro content collection schema
│   │   └── events/             ← Markdown files for each event (CMS-editable)
│   │       ├── casa-del-arte.md
│   │       ├── power-unit.md
│   │       ├── bagatelle.md
│   │       ├── full-speed.md
│   │       └── pole-position.md
│   └── styles/
│       └── global.css          ← Global styles, font imports
└── README.md
```

---

## Decap CMS Configuration

The admin panel at `abgegp.com/admin` will allow non-technical users to:
1. Add/edit/remove events
2. Upload new flyer images (drag and drop)
3. Update ticket links, dates, descriptions
4. Update the dinner menu PDF
5. Edit site-wide settings (reservation email, meta description)

### `public/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/events"
public_folder: "/images/events"

collections:
  - name: "events"
    label: "Events"
    folder: "src/content/events"
    create: true
    delete: true
    slug: "{{slug}}"
    fields:
      - { label: "Event Name", name: "title", widget: "string" }
      - { label: "Slug (URL path)", name: "slug", widget: "string" }
      - { label: "Date", name: "date", widget: "string", hint: "e.g. 12 JUIN" }
      - { label: "Time", name: "time", widget: "string", hint: "e.g. 10PM – 3AM" }
      - { label: "Start Time Note", name: "startNote", widget: "string", hint: "e.g. À partir de 22h / From 10PM" }
      - { label: "Description (French)", name: "descriptionFr", widget: "text" }
      - { label: "Description (English)", name: "descriptionEn", widget: "text" }
      - { label: "Artists / DJs", name: "artists", widget: "string", hint: "Comma-separated names" }
      - { label: "Flyer Image", name: "flyerImage", widget: "image" }
      - { label: "Ticket URL", name: "ticketUrl", widget: "string" }
      - { label: "Ticket Button Text", name: "ticketButtonText", widget: "string", default: "BUY TICKETS" }
      - { label: "Display Order", name: "order", widget: "number" }
      - { label: "Special Info (optional)", name: "specialInfo", widget: "markdown", required: false }
      - { label: "Nav Label", name: "navLabel", widget: "string", hint: "Short name for navigation bar" }

  - name: "settings"
    label: "Site Settings"
    files:
      - label: "General"
        name: "general"
        file: "src/content/settings/general.json"
        fields:
          - { label: "Site Title", name: "siteTitle", widget: "string", default: "ABGE GP | Let's race again!" }
          - { label: "Site Description", name: "siteDescription", widget: "text" }
          - { label: "Reservation Email", name: "reservationEmail", widget: "string" }
          - { label: "Dinner Menu PDF", name: "menuPdf", widget: "file" }
          - { label: "Hero Background Image", name: "heroImage", widget: "image" }
          - { label: "Ticket Policy (French)", name: "ticketPolicyFr", widget: "text" }
          - { label: "Ticket Policy (English)", name: "ticketPolicyEn", widget: "text" }
```

---

## Event Markdown File Format

Each event is a markdown file in `src/content/events/`. Example for Casa Del Arte:

```markdown
---
title: "Casa Del Arte"
slug: "casa-del-arte"
navLabel: "Casa Del Arte"
date: "21 MAI"
time: "10PM – 3AM"
startNote: "À partir de 22h / From 10PM"
descriptionFr: "Une soirée de fête sans limite, qui vous laissera souvenirs impérissables ou trous de mémoire. À vous de choisir."
descriptionEn: "The exhilaration of limitless opportunities epitomized in one wild evening."
artists: "Dan Ficara, Tommy Kimpton, Forrest Del Arte"
flyerImage: "/images/events/casa-del-arte.jpg"
ticketUrl: "https://external-ticketing-url.com/casa-del-arte"
ticketButtonText: "BUY TICKETS"
order: 1
---
```

---

## Page-by-Page Build Specifications

### Homepage (`src/pages/index.astro`)

**Layout:**
1. **Navbar** — sticky top, black background with slight transparency on scroll
   - Left: ABGE Race Weekend logo (PNG)
   - Right: Nav links dynamically generated from events collection + "Dinner Menu" + "RESERVATION"
   - Mobile: hamburger menu
2. **Hero** — full viewport height, black & white F1 pit stop image as background with slight dark overlay
   - No text overlay (image speaks for itself, matching current design)
3. **Event Grid** — 5 event cards in a responsive horizontal row
   - Desktop: 5 columns
   - Tablet: 2-3 columns with scroll
   - Mobile: single column or horizontal scroll
   - Each card: event flyer image (portrait aspect ratio) with hover effect (subtle zoom/brightness)
   - Below each card: CTA button styled as outlined white button with "BUY TICKETS" text
4. **Footer** — black background
   - Left: logo
   - Right: "Built by Asterpolaris Marketing" linked to asterpolaris.com
   - Optional: add Auberge Saint-Gabriel credit/mention

**Modernization touches:**
- Smooth scroll behavior
- Subtle parallax on hero image
- Card hover: slight scale + brightness shift
- Nav: glassmorphism effect (backdrop-filter blur)
- Typography: Inter or Montserrat (clean, modern sans-serif)
- Smooth page transitions between homepage and event pages

### Event Pages (`src/pages/events/[slug].astro`)

**Layout (2-column on desktop, stacked on mobile):**
1. **Navbar** — same as homepage
2. **Content area:**
   - Left column (40%): Event flyer image, full height
   - Right column (60%):
     - Event title (h1, large, white)
     - French description (italic)
     - English description
     - Start time note
     - Artists/DJs list
     - Ticket policy text (smaller, gray)
     - CTA button: "BUY TICKETS" → links to external ticketing URL
     - Special info section (if present, e.g. Bagatelle brunch details)
3. **Footer** — same as homepage

---

## Step-by-Step Implementation Plan

### Phase 1: Setup (Day 1)

1. **Create GitHub repository**
   ```bash
   gh repo create abgegp --public --clone
   cd abgegp
   ```

2. **Initialize Astro project**
   ```bash
   npm create astro@latest . -- --template minimal
   npx astro add tailwind
   ```

3. **Install dependencies**
   ```bash
   npm install decap-cms-app
   ```

4. **Set up project structure** as defined in the repository structure section above

5. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [build.environment]
     NODE_VERSION = "20"
   ```

### Phase 2: Asset Extraction (Day 1)

Download all assets from the current WordPress site before decommissioning:

```bash
# Create directories
mkdir -p public/images/events public/files

# Download logo
curl -o public/images/logo.png "https://abgegp.com/wp-content/uploads/2025/04/Artboard-1@2x.png"

# Download event flyers
curl -o public/images/events/casa-del-arte.jpg "https://abgegp.com/wp-content/uploads/2025/05/12-JUIN-CASA-DEL-ARTE-F1-2025-STORY-576x1024.jpg"
curl -o public/images/events/power-unit.jpg "https://abgegp.com/wp-content/uploads/2025/04/13-JUIN-ABGE-F1-2025-STORY-576x1024.jpg"
curl -o public/images/events/bagatelle.jpg "https://abgegp.com/wp-content/uploads/2025/05/BAGATELLE-ABGE-F1-2025-Story-576x1024.jpg"
curl -o public/images/events/full-speed.jpg "https://abgegp.com/wp-content/uploads/2025/05/14-Juin-FULL-SPEED-ABGE-F1-2025-STORY-1-576x1024.jpg"
curl -o public/images/events/pole-position.jpg "https://abgegp.com/wp-content/uploads/2025/05/15-JUIN-Pole-Position-ABGE-F1-2025-STORY-576x1024.jpg"

# Download hero background (extract from Elementor CSS/page source)
# NOTE: The hero background image URL needs to be extracted from the Elementor
# section's inline CSS. Check the page source for the .elementor-section
# with the background-image property.

# Download dinner menu PDF
curl -o public/files/menu.pdf "https://abgegp.com/wp-content/uploads/2025/04/ABGE_MENU.pdf"

# Download social sharing image
curl -o public/images/og-image.jpg "https://abgegp.com/wp-content/uploads/2025/04/image001-1024x576.jpg"
```

### Phase 3: Build Components (Days 2-3)

Build in this order:
1. `BaseLayout.astro` — HTML shell with meta tags, font imports, global styles
2. `Navbar.astro` — with dynamic event links from content collection
3. `Footer.astro` — logo + Asterpolaris credit + Auberge Saint-Gabriel mention
4. `Hero.astro` — full-bleed background image section
5. `EventCard.astro` — single card component (image + button)
6. `EventGrid.astro` — responsive grid of EventCard components
7. `index.astro` — compose homepage from components
8. `[slug].astro` — event page template

### Phase 4: Content Collection Setup (Day 3)

1. Define Astro content collection schema in `src/content/config.ts`
2. Create all 5 event markdown files with frontmatter
3. Create site settings JSON file
4. Verify all events render correctly on homepage and individual pages

### Phase 5: CMS Integration (Day 4)

1. Create `public/admin/index.html`:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="robots" content="noindex" />
       <title>ABGE GP Admin</title>
       <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
     </head>
     <body></body>
   </html>
   ```

2. Create `public/admin/config.yml` as specified in the Decap CMS Configuration section

3. Test CMS locally:
   ```bash
   npx decap-server
   # In another terminal:
   npm run dev
   # Visit http://localhost:4321/admin/
   ```

### Phase 6: Netlify Deployment (Day 4-5)

1. **Push to GitHub**
   ```bash
   git add -A
   git commit -m "Initial Astro site with Decap CMS"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log into Netlify → "Add new site" → "Import from Git" → Select the `abgegp` repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

3. **Enable Netlify Identity** (for CMS login)
   - Netlify dashboard → Site settings → Identity → Enable Identity
   - Under Registration: set to "Invite only"
   - Under Services → Git Gateway: Enable Git Gateway
   - Invite team members by email

4. **Test CMS access**
   - Visit `https://your-netlify-url.netlify.app/admin/`
   - Accept invite email → set password
   - Create/edit an event → verify it commits to GitHub and triggers rebuild

### Phase 7: Domain Migration (Day 5)

1. **Add custom domain in Netlify**
   - Netlify → Domain settings → Add custom domain → `abgegp.com`
   - Also add `www.abgegp.com`

2. **Update DNS records**
   - Option A (Netlify DNS — recommended): Transfer DNS management to Netlify
   - Option B (External DNS): Point A record to Netlify's load balancer IP, CNAME for www

3. **Enable HTTPS** — Netlify provisions a free Let's Encrypt certificate automatically

4. **Verify:**
   - `https://abgegp.com` loads the new static site
   - `https://abgegp.com/admin/` loads the CMS
   - All event pages work
   - All images load
   - Mobile responsive

### Phase 8: Decommission WordPress (Day 6+)

1. Export a full WordPress backup (just in case)
2. Cancel WordPress hosting
3. Cancel any Elementor Pro license
4. Cancel The Events Calendar / Tribe Tickets license
5. Delete the WordPress installation

---

## CMS User Guide (for non-technical team members)

### How to update events:

1. Go to `abgegp.com/admin`
2. Log in with your email and password
3. Click "Events" in the sidebar
4. Click the event you want to edit
5. Update any field: change the date, swap the flyer image (drag & drop), paste a new ticket URL
6. Click "Publish" in the top right
7. The site automatically rebuilds in ~30 seconds

### How to add a new event:

1. Go to `abgegp.com/admin`
2. Click "Events" → "New Event"
3. Fill in all fields (name, date, time, descriptions in both languages, upload flyer, ticket URL)
4. Set the "Display Order" number to control position in the grid
5. Click "Publish"

### How to update the dinner menu:

1. Go to `abgegp.com/admin`
2. Click "Site Settings" → "General"
3. Upload a new PDF in the "Dinner Menu PDF" field
4. Click "Publish"

---

## Parent Company Information

The following should appear on the site:

- **Event brand:** ABGE GP (Auberge Saint-Gabriel Grand Prix events)
- **Venue:** Auberge Saint-Gabriel, Montreal
- **Reservation contact:** grandprix@aubergesaint-gabriel.com
- **Website built by:** Asterpolaris Marketing (https://asterpolaris.com)
- **Bottle service / VIP:** grandprix@aubergesaint-gabriel.com
- **Brunch reservations (Bagatelle):** abo@gp.com

Consider adding a small "An Auberge Saint-Gabriel event" tagline in the footer or below the logo for brand clarity.

---

## Modernization Notes

When rebuilding, apply these subtle upgrades to refresh the design while maintaining the same dark luxury aesthetic:

1. **Typography:** Replace default fonts with Inter (body) + Montserrat (headings) from Google Fonts
2. **Nav bar:** Add a glassmorphism effect (backdrop-filter: blur) with slight transparency when scrolled
3. **Hero section:** Subtle parallax scroll effect on the background image
4. **Event cards:** On hover, slight scale(1.03) + brightness increase transition
5. **CTA buttons:** Outlined style with hover fill animation (transparent → white bg with black text)
6. **Page transitions:** Astro View Transitions API for smooth fade between pages
7. **Mobile:** Proper responsive grid — cards stack vertically with full-width flyer images
8. **Performance:** Astro Image component for automatic WebP conversion and lazy loading
9. **Accessibility:** Proper alt text on all images, ARIA labels on nav, semantic HTML
10. **SEO:** Open Graph meta tags, structured data for events, sitemap.xml

---

## Estimated Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Project setup (GitHub, Astro, Tailwind) | 2 hours |
| 2 | Asset extraction from WordPress | 1 hour |
| 3 | Build all components + pages | 4-6 hours |
| 4 | Content collection + event data | 1 hour |
| 5 | Decap CMS integration + testing | 2-3 hours |
| 6 | Netlify deployment | 1 hour |
| 7 | Domain migration + DNS | 1-2 hours (+ propagation time) |
| 8 | WordPress decommission | 30 minutes |
| **Total** | | **~2 days of work** |

---

## Post-Migration Checklist

- [ ] All 5 event pages load correctly with images and content
- [ ] Homepage event grid displays all events in correct order
- [ ] "Buy Tickets" buttons link to correct external URLs
- [ ] "Dinner Menu" downloads the PDF
- [ ] "RESERVATION" opens email client with correct address
- [ ] CMS admin panel accessible at /admin
- [ ] Non-technical user can log in and edit an event
- [ ] Non-technical user can upload a new flyer image
- [ ] Site loads correctly on mobile (iPhone, Android)
- [ ] Site loads correctly on tablet
- [ ] HTTPS working with valid certificate
- [ ] Old WordPress URLs redirect or 404 gracefully
- [ ] Page speed: Lighthouse score > 90
- [ ] Social sharing (Open Graph) image displays correctly
- [ ] Google Search Console updated with new sitemap
- [ ] Old WordPress hosting cancelled
