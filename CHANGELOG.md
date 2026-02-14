# Changelog

All notable changes to the Darshan Transport Frontend project will be documented in this file.

## [1.4.0] - 2026-02-14

### Added

- **Organic SEO Discovery**: Added foundational `robots.txt` and `sitemap.xml` to public assets.
- **Enhanced MetaTags**: Upgraded `MetaTags` component with support for canonical links, `noindex` triggers, and JSON-LD structured data.
- **Traceable Security**: Integrated `X-Correlation-ID` into the Backend Rate Limiter logs. You can now identify precisely which user triggers a rate limit.
- **Standardized Workspace**: Added `.editorconfig` to the project root to enforce consistent coding standards (indentation, line endings) across all team IDEs.
- **API Traceability**: Integrated automatic `X-Correlation-ID` header injection into `apiClient`. Enabled end-to-end request tracing with the backend.
- **Enhanced SEO**: Implemented a reusable `MetaTags` component with OpenGraph and Twitter card support. Standardized metadata across Home, Services, and Contact pages.
- **UX Fix (Scroll Reset)**: Added `ScrollToTop` component to reset viewport on route transitions.
- **Bundle Analysis**: Integrated `rollup-plugin-visualizer` into the Vite build for monitoring dependency bloat.
- **Resilient UI**: Enhanced the global `ErrorBoundary` with better messaging and a direct page refresh action.

## [1.3.0] - 2026-02-14 (Code Quality & Stability)

### Added

- **Global Error Handling**: Introduced `ErrorBoundary` and `ErrorFallback` components to catch and display UI crashes gracefully.
- **useBreakpoint Hook**: Added a shared hook in `src/core/hooks` to centralize responsiveness logic and eliminate redundant event listeners.

### Changed

- **Code Consistency (Prettier)**: Integrated Prettier with ESLint for automated formatting. Added `npm run format` and `npm run format:check` scripts.
- **Accessibility Improvements**:
  - Enhanced `index.css` with descriptive `:focus-visible` styles for better keyboard navigation.
  - Refactored `TestimonialsSection` to use `useBreakpoint` for cleaner, more predictable layout shifts.
- **Maintenance**: Updated `package.json` and `eslint.config.js` with modern linting and formatting standards.

## [1.2.0] - 2026-02-14 (Performance & UI Polish)

### Added

- **PWA & Offline Support**: Integrated `vite-plugin-pwa` with Service Worker caching for instant repeat loads and offline readiness.
- **Self-Hosted Assets**: Migrated `Montserrat` fonts to local hosting (WOFF2) to eliminate external DNS lookups and 3rd-party latency.
- **Enhanced Map Interactions**:
  - Added clickable pins to the "Our Reach" map.
  - Implemented automatic rotation pause upon manual selection for improved discovery.
- **Build Compression**: Enabled Gzip and Brotli pre-compression for all production assets.

### Changed

- **Aggressive Image Optimization**: 99% reduction in asset size via global migration to WebP with custom `sharp` scripts.
- **Hero UX**: Converted 1.6MB GIF hero animation to 148KB animated WebP.
- **Mobile Responsiveness**:
  - Centered Connect links in the footer for small screens.
  - Stabilized Map information box with fixed dimensions (120px) to prevent layout shifts.
- **Rendering Performance**: Applied `content-visibility: auto` to heavy off-screen sections.

### Fixed

- **Resource Cleanup**: Resolved persistent "Failed to decode font" (.ttf) errors by purging legacy Service Worker cache and CSS imports.
- **Asset Links**: Fixed broken logo paths in various layouts.
- **Font Preloading**: Optimized `<link rel="preload">` strategies to match hashed assets precisely.

## [1.1.0] - 2026-02-13 (Feature & Content Update)

### Added

- **Seo Component**: Unified SEO management across all marketing pages.
- **NepalMap Component**: Initial implementation of interactive map with SVG paths and animated pins.
- **Feature Modules**: Added Benefits section and updated Services, Home, and About page content.
- **404 Page**: Implemented custom error route for better user navigation.

### Changed

- **Architecture Refinement**: Moved accordion data to consolidated modules and updated global layout providers.
- **UI Refresh**: Updated Navbar logo and global footer social icons for improved aesthetics.
- **Vite Migration**: Updated project configuration for Vite v7+ and improved metadata.

## [1.0.0] - 2026-01-31 (Initial Marketing & SOLID Architecture)

### Added

- **Feature-Based Architecture**: Refactored frontend to follow SOLID principles with a modular service-oriented structure.
- **Marketing Foundation**: Implemented core sections including Hero Carousel, "How It Works," and "Our Reach."
- **CI/CD Integration**: Established GitHub Actions for automated deployment and health monitoring.
- **Contact System**: Implemented Contact Directory and Get Quote forms.

## [0.9.0] - 2026-01-15 (Marketing Content & Layout)

### Added

- **Marketing Components**: Integrated new sections for Services, Process, and Benefits.
- **Hero Carousel**: Implemented manual/auto carousel functionality for the Hero section.
- **Service Status Feed**: Added `ServiceStatusAlert` for real-time maintenance and status updates.

### Fixed

- **Typography & Alignment**: Standardized text justification and quote styles throughout marketing pages.
- **Link Accuracy**: Verified and corrected all footer and navigation links for consistency.

## [0.8.0] - 2025-10-14 (Early Alpha & Optimization)

### Added

- **Core UI Elements**: Initial implementation of Nav-bar and basic site navigation.
- **SOLID Refactor**: Started the migration towards a feature-based architecture.

### Fixed

- **SEO Base**: Corrected initial meta data and site configuration entries.
- **Linting**: Resolved initial `react-refresh` and hook-related linting issues.

## [0.7.0] - 2025-09-25 (API Integration & CI/CD)

### Added

- **Dynamic Data**: Implemented centralized API client with support for delivery status and series tracking.
- **CI/CD Pipeline**: Launched automated GitHub Actions workflows for IIS deployment and environment-based configuration.
- **Production Readiness**: Added `web.config` for IIS optimization and production environment variables.

### Changed

- **SOLID Architecture**: Completed the first major refactor of the frontend into a modular, feature-based system.
- **Styling Upgrade**: Integrated `styled-components` for more robust component styling.

## [0.6.0] - 2025-08-31 (UI Experience & Interactivity)

### Added

- **Interactivity**: Implemented scroll-based header behavior (hide/show) and "Scroll to Top" functionality.
- **Brand Story**: Added Logo Carousel/Slider with seamless looping and branding updates.
- **Navigation**: Initial implementation of the primary Navigation Bar.

### Changed

- **Preloader**: Enhanced page load experience with animated loaders and smoother fade-out effects.
- **Configuration**: Updated favicon, site titles, and initial branding assets.

## [0.5.0] - 2025-07-24 (Project Inception)

### Added

- **Development Start**: Initial project setup and core codebase initialization.
- **Base Infrastructure**: Basic React scaffolding and project structure established.
