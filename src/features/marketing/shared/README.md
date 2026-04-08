# Marketing Shared Components

This directory contains reusable UI components specifically designed for the marketing-facing pages of the Darshan Transport website.

## Components

### 1. `WhatsAppFloat`

A floating action button (FAB) that initiates a WhatsApp conversation.

- **Props**:
  - `phoneNumber`: string (required) - Format: country code + number (e.g., "97798XXXXXXXX").
  - `message`: string (optional) - The pre-filled message for the chat.
- **Features**:
  - Animated pulse effect.
  - Custom tooltip on hover (desktop).
  - Fully accessible (aria-labels, keyboard support).
  - Responsive sizing for mobile.

### 2. `ClientCarousel`

A reusable, animated client-logo carousel used across the marketing pages.

## Design Patterns

- **Responsive Design**: Most components use Tailwind CSS with `max-md` and `max-sm` utilities for responsiveness.
- **Accessibility**: Standard ARIA roles and keyboard interactions are implemented.
- **Styling**: Uses a mix of Tailwind classes and local CSS files for complex animations.
