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

## ✅ Development conventions

- Favor feature folders with local data/config definitions to keep responsibilities focused.
- Use hooks (e.g., `useOrderTracking`, `useNavbarController`) to expose view models and side effects.
- All components and pages are now properly organized in the feature-based architecture.

Refer to in-code comments for additional guidance on extending each feature module.
