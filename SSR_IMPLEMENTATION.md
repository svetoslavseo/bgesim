## SSR Implementation Guide

This document explains how Server‑Side Rendering (SSR) is implemented in this project (Vite + React 18 + Express), how to run it in development and production, and how to extend it.

### Overview

- **Stack**: React 18, ReactDOMServer, Vite, Express, `react-helmet-async`, `i18next`
- **Entry (server)**: `src/entry-server.js` exposes `render(url)` → `{ appHtml, helmet }`
- **Dev server (SSR)**: `server.js` (Vite middleware mode)
- **Prod server (SSR)**: `server-production.js` (Express + prebuilt bundles)
- **Template**: `index.html` with `<!--ssr-outlet-->` placeholder and client hydration script

### Rendering Flow

1) Request hits Express server
2) Server picks HTML template (`dist/index.html` if available, otherwise `index.html`)
3) Server loads `render(url)` from SSR bundle (dev: via Vite, prod: via `./dist/entry-server.js`)
4) `render(url)` returns:
   - `appHtml`: React markup rendered via `renderToString`
   - `helmet`: SEO/meta collected with `react-helmet-async`
5) Server injects `appHtml` into `<!--ssr-outlet-->` and inserts Helmet tags into `<head>` (also sets `<html lang>` when present)
6) Response is returned; client then hydrates via `index.tsx`

### Key Files

- `src/entry-server.js`
  - Mocks browser globals (`window`, `document`, `localStorage`, `sessionStorage`) for SSR safety
  - Detects language from URL (`/zh` → zh, otherwise en)
  - Loads translations synchronously from `public/locales/<lang>/<namespace>.json`
  - Initializes `i18next` with loaded namespaces
  - Optionally preloads critical data via `dataService.getPlansData()`
  - Wraps `<App />` in `HelmetProvider` and returns `{ appHtml, helmet }`

- `server.js` (Development SSR)
  - Vite middleware mode (`vite.ssrLoadModule('/src/entry-server.js')`)
  - Transforms the HTML template, injects SSR HTML + Helmet tags
  - Cleans stray Helmet titles in body and corrects `<body>` class leakage
  - Returns HTTP 410 for not‑found pages using a DOM marker (`data-page-404="true"`)

- `server-production.js` (Production SSR)
  - Uses Express with `compression` and `helmet`
  - Serves static assets from `dist`
  - Imports SSR bundle (`./dist/entry-server.js`) and injects HTML + Helmet tags
  - Sets status 404 when Helmet meta contains `name="http-status" content="404"`

- `vite.config.ts`
  - Ensures stable `entry-server.js` filename for SSR bundle
  - Code-splitting and vendor chunking for client build
  - Copies locales and data into `dist/client` for SSR lookup and client access

- `index.html`
  - Contains the SSR outlet (`<!--ssr-outlet-->`)
  - Loads client entry (`/index.tsx`) which hydrates the server-rendered markup

### Commands

- Development (SSR):
  - `npm run dev:ssr` → runs `server.js` (Vite middleware mode)

- Production:
  - Build: `npm run build:ssr` (builds client and server bundles)
  - Start: `npm start` → runs `server-production.js`

Note: Ensure the server’s import path matches the SSR bundle output location. If you change `outDir` for the SSR build, update `server-production.js` accordingly (expects `./dist/entry-server.js`).

### Internationalization (i18n)

- Language is inferred from URL path (`/zh/...` → zh, otherwise en)
- Translations are loaded synchronously from the filesystem for SSR reliability
- `i18next` is initialized server-side with all required namespaces so strings resolve during render

### SEO and Metadata

- `react-helmet-async` collects per-page `<title>`, `<meta>`, `<link>`, `<script>` and optional html attributes
- Server injects Helmet tags into `<head>` and may adjust `<html lang>`
- Status mapping: a special Helmet meta can signal 404 to the server

### Data Preloading

- Critical data (e.g., plans) can be loaded in `src/entry-server.js` before rendering
- Client performs additional preloading after hydration for UX

### Routing Considerations

- Routing logic is implemented inside `App.tsx`
- SSR sets `globalThis.window.location.pathname` to match the incoming URL so the same logic runs server-side
- Chinese routes (`/zh`) can map to region/country URLs; helpers in `App.tsx` normalize between internal routes and public URLs

### Adding New Pages

1) Implement the page component under `pages/`
2) Wire up route handling inside `App.tsx` (SSR and client share the same logic)
3) If the page requires translations, add namespace JSON files in `public/locales/<lang>/`
4) If you add a new namespace, include it in `src/entry-server.js` namespaces array

### Error Handling & Timeouts

- `src/entry-server.js` wraps rendering with a 30s timeout and returns a minimal fallback shell on failure
- Servers log stack traces to aid debugging; dev server uses Vite’s stacktrace fixer

### Troubleshooting

- Blank page in prod: verify `./dist/entry-server.js` exists and matches the server import path
- Missing translations during SSR: ensure files exist under `public/locales/<lang>/` and namespaces are listed in `entry-server.js`
- Helmet tags not applied: confirm `HelmetProvider` wraps `<App />` and that server injects tags before `</head>`
- 404 handling: check the page outputs the `data-page-404` marker (dev) or sets the Helmet meta (prod)


