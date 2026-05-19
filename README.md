# Heshma Air Conditioning — heshmaairconditioning.com

Static HVAC website. Hosting: Bluehost (cPanel). No backend, no database.

---

## Estructura de páginas

| Archivo | Descripción |
|---|---|
| [index.html](index.html) | Homepage principal — Forney TX, schema @graph, LCP optimizado |
| [gallery.html](gallery.html) | Galería de trabajos |
| [404.html](404.html) | Error 404 personalizada — noindex/follow |
| [ac-repair-forney-tx.html](ac-repair-forney-tx.html) | City page — "AC repair Forney TX" |
| [ac-repair-dallas-tx.html](ac-repair-dallas-tx.html) | City page — "AC repair Dallas TX" |
| [privacy-policy.html](privacy-policy.html) | Política de privacidad |
| [terms-of-use.html](terms-of-use.html) | Términos de uso |

---

## Cómo desplegar

Subir archivos via **cPanel → File Manager → public_html**.
Es HTML estático — no hay build, no hay comandos. Solo subir y reemplazar.

---

## ⏳ PENDIENTE — Por hacer (no olvidar)

### 🔴 Crítico — sin esto el SEO no impacta

- [ ] **Subir todos los archivos a Bluehost** — nada de lo hecho está en vivo todavía
- [ ] **Crear `.htaccess`** con:
  - 301 redirect: `/projects/` → `/gallery.html`
  - 301 redirect: `/residential-hvac/` → `/ac-repair-forney-tx.html`
  - ErrorDocument 404 → `/404.html`
  - Forzar HTTPS
- [ ] **Optimizar Google Business Profile** — categorías, fotos de trabajos reales, descripción, horario exacto
- [ ] **Solicitar reseñas reales a clientes** — sin reseñas no hay Local Pack

### 🟡 Alta prioridad

- [ ] **Comprimir imágenes** (tú lo haces):
  - [css/gallery/](css/gallery/) — 9 imágenes JPEG sin comprimir
  - [css/img/logo-df.png](css/img/logo-df.png) — convertir a WebP
  - [css/img/logo-h.jpeg](css/img/logo-h.jpeg) — verificar si se usa
  - [css/img/logo-t.jpeg](css/img/logo-t.jpeg) — verificar si se usa
  - Meta: imágenes <100KB, formato WebP donde sea posible
- [ ] **Verificar en Google Search Console** después de subir:
  - Solicitar indexación de: index.html, ac-repair-forney-tx.html, ac-repair-dallas-tx.html
  - Monitorear que `/projects/` y `/residential-hvac/` dejen de aparecer

### 🟢 Siguiente ronda — city pages adicionales

| Página a crear | Target keyword | Prioridad |
|---|---|---|
| ac-repair-rockwall-tx.html | AC repair Rockwall TX | Alta |
| ac-repair-rowlett-tx.html | AC repair Rowlett TX | Alta |
| ac-repair-mesquite-tx.html | AC repair Mesquite TX | Alta |
| ac-repair-sunnyvale-tx.html | AC repair Sunnyvale TX | Media |

### 🔵 Cuando el cliente confirme datos reales

- [ ] **AggregateRating en schema** — solo con número real de reseñas y calificación verificada (riesgo de penalización manual si es falso)
- [ ] **Formulario de contacto** — alternativa a WhatsApp para usuarios que prefieren no usar la app
- [ ] **Número de teléfono sticky en mobile** — siempre visible, un toque para llamar

---

## Estado SEO actual

| Capa | Estado | Score |
|---|---|---|
| Técnico on-page | ✅ Completado | — |
| Schema @graph | ✅ Completado | — |
| City pages (2) | ✅ Completadas | — |
| Sitemap + robots.txt | ✅ Correctos | — |
| WhatsApp crawleable | ✅ Todos los archivos | — |
| En producción | ❌ No subido todavía | — |
| Google Business Profile | ❓ Sin revisar | — |
| Reseñas Google | ❓ Sin datos | — |
| **Score estimado en vivo** | ❌ 3/10 (viejo) | |
| **Score en local listo para subir** | ✅ 6.5/10 | |

---

## Search Console — datos al 11 mayo 2026

- Homepage: 24 clics / 1,169 impresiones (CTR ~2% — muy bajo, title viejo en prod)
- `/projects/` — 42 impresiones, 0 clics — página muerta, necesita redirect 301
- `/residential-hvac/` — 16 impresiones, 0 clics — página muerta, necesita redirect 301

---

## Archivos por no tocar

- [js/cookie-consent.js](js/cookie-consent.js) — funciona, no modificar
- [css/cookie-consent.css](css/cookie-consent.css) — funciona, no modificar
- [css/gallery.css](css/gallery.css) — no revisado, no tocar sin auditar primero

## Cómo correr localmente

Sitio estático. Abrir con VS Code Live Server:
1. Click derecho en `index.html`
2. "Open with Live Server"
