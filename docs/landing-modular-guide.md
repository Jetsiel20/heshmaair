# Heshma Landing - Modular Guide

## Objective
Build a conversion-first HVAC landing page that is easy to maintain and scale.

## Current Modules

1. `index.html`
- `top-contact-bar`: trust and local context.
- `site-navbar`: sticky navigation and emergency call action.
- `hero-section`: main value proposition and primary CTAs.
- `services-section`: four service cards with WhatsApp conversion intent.
- `contact-cta`: emergency strip with dual CTA.
- `floating-emergency`: persistent WhatsApp emergency shortcut.

2. `css/heshma.css`
- `:root` design tokens (colors, spacing, fonts).
- Hero visual system.
- Reusable heading module: `.section-heading*`.
- Services module: `.services-section`, `.service-card*`, `.btn-service`.
- Emergency module: `.contact-cta*`, `.floating-emergency`.

3. `js/heshma.js`
- Config layer: `APP_CONFIG`.
- Message map: `WA_MESSAGES`.
- WhatsApp builder/opening functions.
- UI binding layer (`bindWhatsAppTriggers`, navbar state, mobile nav close).
- Single init entrypoint: `initializeApp`.

## CTA Rules
Every CTA must point to one of these:
- `tel:+12144071394`
- `openWhatsApp` via `.js-whatsapp-trigger` + `data-whatsapp-service`

Optional tracking context:
- Add `data-whatsapp-source` to identify where lead came from.

## How To Add A New Service Card
1. Duplicate an existing `.service-card` article in `index.html`.
2. Add a new key in `WA_MESSAGES` in `js/heshma.js`.
3. Set button attributes:
- `data-whatsapp-service="newKey"`
- `data-whatsapp-source="services-newKey"`
4. Reuse `.btn-service`; avoid inline styles.

## Safe Change Checklist
1. Keep semantic tags (`header`, `main`, `section`, `article`).
2. Keep CTA wording clear and action-first.
3. Preserve color token usage from `:root`.
4. Run diagnostics after edits.
5. Verify mobile menu + floating emergency button behavior.
