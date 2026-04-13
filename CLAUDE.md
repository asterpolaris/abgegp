# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ABGE GP is a static event website for Montreal race weekend events at Auberge Saint-Gabriel. Built with Astro 6, Tailwind CSS 4, and Decap CMS (Netlify CMS). Bilingual content (French/English). Currently in "coming soon" mode — the index page shows a splash hero; event pages exist but aren't linked from the homepage yet.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally

No test framework or linter is configured.

## Architecture

**Content system:** Astro Content Collections with glob loaders. Two collections defined in `src/content.config.ts`:
- `events` — Markdown files in `src/content/events/`, each with Zod-validated frontmatter (title, dates, descriptions in FR/EN, artists, ticket URL, etc.). No markdown body is rendered; all data comes from frontmatter fields.
- `settings` — Single `src/content/settings/site.json` file holding global site config (emails, labels, policies, social image).

**Data helpers** in `src/lib/site.ts`: `getSortedEvents()` (chronological), `getSiteSettings()`, `eventHref()`.

**Routing:** File-based. `src/pages/events/[slug].astro` generates static pages via `getStaticPaths()` from the events collection. `src/pages/sitemap.xml.ts` generates the sitemap.

**Layout:** Single `BaseLayout.astro` handles `<head>` meta/OG/Twitter/JSON-LD, plus Netlify Identity widget script.

**Styling:** Tailwind 4 via Vite plugin (`@tailwindcss/vite`). Global styles in `src/styles/global.css`. Two typefaces: "Cormorant Garamond" (serif, for nav/buttons/footer via `.nav-face`, `.button-face`, `.footer-face`) and "Source Sans 3" (body). Dark theme with `--accent: #c71f25`.

**CMS:** Decap CMS at `/admin/` — config in `public/admin/config.yml`, uses git-gateway backend on `main` branch. Media uploads go to `public/images/`.

**Deployment:** Netlify (`netlify.toml`), Node 22. Site URL: `https://abgegp.com`.

## Content Conventions

- Event images go in `public/images/events/` and are referenced as `/images/events/<name>.jpg`.
- Event descriptions are always provided in both French (`descriptionFr`) and English (`descriptionEn`) as plain text fields, not markdown.
- `ticketUrl` is either a valid URL or empty string `""` (not omitted) — the template toggles between "Buy Tickets" link and "Tickets Coming Soon" badge based on this.
- Events can override the global reservation email via `primaryReservationEmail`.
