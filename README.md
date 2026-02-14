# Darshan Transport Frontend

Modern marketing and order-tracking site for Darshan Transport built with **React**, **TypeScript**, and **Vite**. The application has been refactored to follow SOLID principles with clear domain boundaries, predictable stateful hooks, and reusable layout primitives.

## 🧱 Project structure

```
src/
├── app/                 # Application shell: providers, layouts, routes
├── core/                # Cross-cutting utilities (API client, config)
├── features/
│   ├── marketing/       # Marketing-facing pages (home, about, services, contact)
│   └── order-tracking/  # Order tracking domain feature
├── layout/              # Global layout components (navbar, footer, preloader)
├── pages/               # Legacy entry points re-exporting feature pages
└── assets/              # Images, styles, and static content
```

### Feature modules

- **Marketing** (`features/marketing`) groups all brochure pages with component/data separation for each page.
- **Order tracking** encapsulates API contracts, services, hooks, and UI components under `features/order-tracking`.
- **Core** hosts framework-agnostic utilities such as the API client, configuration helpers, and shared types.

Each feature exposes a `pages/*Page.tsx` entry that assembles the feature-specific components and view models. Shared presentation building blocks (e.g., `ReachSection`) live under `features/marketing/shared`.

### Application shell

- `app/providers/AppProviders.tsx` wires domain providers (e.g., order tracking service).
- `app/layouts/MainLayout.tsx` composes global layout concerns (preloader, navbar, footer).
- `app/routes/AppRoutes.tsx` defines the routing graph with nested layouts.

## 🚀 Getting started

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production bundle

```bash
npm run preview
```

## 🔌 API configuration

Set the backend base URL through environment variables (fallbacks to same-origin when unset or pointing to localhost while deployed remotely):

```bash
# .env.production
VITE_API_BASE_URL=https://your-backend-domain
```

The API client guards against invalid URLs and ignores `localhost` overrides when the site runs on a non-local domain.

Refer to in-code comments for additional guidance on extending each feature module.

## ⚡ Performance & Optimization

The application is heavily optimized for fast loading on 3G networks and high-latency environments:

- **Aggressive Image Compression**: All assets are converted to optimized WebP via `sharp`.
- **PWA support**: Full service-worker caching for instant subsequent loads and offline support.
- **Zero External Requests**: Google Fonts and critical assets are self-hosted to eliminate DNS latency.
- **Preloading Strategy**: Critical hero assets and fonts are preloaded using WOFF2 format.

### Optimization Scripts

We provide several utilities to maintain performance:

- `npm run optimize-images`: Runs the custom `sharp` script to compress/batch-convert images to WebP.
- `npm run generate-pwa-icons`: Re-generates standardized PWA icons from the base logo.
- `npm run download-fonts`: Utility to fetch and host fonts locally.
- `npm run format`: Automatically formats the codebase using Prettier.
- `npm run format:check`: Verifies code formatting without applying changes.

## 🛡️ Error Handling

The application includes a global **ErrorBoundary** wrapped around the `AppProviders`. This ensures that unexpected React rendering errors display a user-friendly fallback screen instead of a blank page.

## ✅ Development conventions

- Favor feature folders with local data/config definitions to keep responsibilities focused.
- Use JSDoc for all hooks and complex UI logic to maintain technical context.
- Use `npm run preview` to locally test the production bundle with compression and PWA features active.
- **Code Formatting**: Run `npm run format` before committing to ensure consistent code style across the project.
