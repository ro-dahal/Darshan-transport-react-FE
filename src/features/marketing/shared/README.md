# Marketing Shared Components

This directory contains reusable UI components specifically designed for the marketing-facing pages of the Darshan Transport website.

## Components

### 1. `ReachSection`

A visually striking section that displays the "Our Reach" map of Nepal with a wave background effect.

- **Usage**: Typically used on the Home page to show coverage.
- **Dependencies**: `NepalMap` layout component.

### 2. `WhatsAppFloat`

A floating action button (FAB) that initiates a WhatsApp conversation.

- **Props**:
  - `phoneNumber`: string (required) - Format: country code + number (e.g., "97798XXXXXXXX").
  - `message`: string (optional) - The pre-filled message for the chat.
- **Features**:
  - Animated pulse effect.
  - Custom tooltip on hover (desktop).
  - Fully accessible (aria-labels, keyboard support).
  - Responsive sizing for mobile.

## Design Patterns

- **Responsive Design**: Most components use Tailwind CSS with `max-md` and `max-sm` utilities for responsiveness.
- **Accessibility**: Standard ARIA roles and keyboard interactions are implemented.
- **Styling**: Uses a mix of Tailwind classes and local CSS files for complex animations.
