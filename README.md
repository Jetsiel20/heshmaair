# Heshma Air Conditioning Website

Conversion-focused static website for Heshma Air Conditioning LLC, including Home, Gallery, Privacy Policy, and Terms of Use pages.

## Live Page Structure

- [index.html](index.html): Main landing page (services, metrics, testimonials, emergency CTA)
- [gallery.html](gallery.html): CEO video + image gallery proof section
- [privacy-policy.html](privacy-policy.html): Privacy policy page
- [terms-of-use.html](terms-of-use.html): Terms of use page

## Project Structure

- [css/heshma.css](css/heshma.css): Global styles (layout, shared components, responsive behavior)
- [css/gallery.css](css/gallery.css): Gallery-specific styles
- [css/cookie-consent.css](css/cookie-consent.css): Cookie consent banner styles (Home only)
- [js/heshma.js](js/heshma.js): Main interaction logic (WhatsApp triggers, nav behavior, counters)
- [js/cookie-consent.js](js/cookie-consent.js): Cookie consent behavior (show delay, accept/reject persistence)
- [docs/landing-modular-guide.md](docs/landing-modular-guide.md): Internal modular guide

## How To Run Locally

This is a static site. You can run it with any local static server.

Example with VS Code Live Server:

1. Open the project folder.
2. Right-click [index.html](index.html).
3. Select "Open with Live Server".

## Key Features

- Mobile-first responsive layout
- Conversion-oriented CTA strategy (`tel:` + WhatsApp actions)
- CEO hero video on Gallery page
- 9-card gallery image section
- Dedicated Privacy Policy and Terms pages
- Cookie consent banner on Home page (accept/reject, 6s delay)

## Notes

- Images and videos are loaded from local folders under [css/img](css/img), [css/gallery](css/gallery), and [css/video](css/video).
- Favicon is configured on main pages using the company logo.
- For content updates, edit text directly in [index.html](index.html) and [gallery.html](gallery.html).
