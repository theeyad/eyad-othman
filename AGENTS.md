<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- RULES -->

IMPORTANT NOTE: FROM NOW ON YOU CAN'T EDIT OR WRITE ANY CODE UNTILL I APPROVE TO YOU
IMPORTANT NOTE: FROM NOW ON WE WILL ALWAYS DISCUSS BEFORE IMPLEMENTING

---

# Eyad Othman — Portfolio Project Blueprint

### 1. Personal Identity & Profile

- **Name:** Eyad Othman
- **Role:** Frontend Developer
- **Tagline:** "A man who learned, is learning, and will always learn..."
- **GitHub:** https://github.com/theeyad
- **LinkedIn:** https://www.linkedin.com/in/eyad-othman
- **Email:** eyadosman35@gmail.com
- **WhatsApp / Phone:** +20 115 044 0572
- **Telegram:** @eyad_osman2005

### 2. Core Tech Stack

- **Framework:** Next.js 16.4 (Turbopack) & React 19
- **Styling:** Tailwind CSS v4 (Logical properties: `ms-`, `me-`, `start-`, `end-` for native RTL/LTR)
- **i18n:** `next-intl` (English `/en` and Arabic `/ar` with automatic RTL switching)
- **UI & Components:** `shadcn/ui` primitives + React Bits
- **Animations:** `motion` (`motion/react`) + CSS hardware-accelerated keyframes
- **Forms & Validation:** React Hook Form (RHF) + Zod
- **Contact Channel:** Telegram Bot API (instant push notifications) + WhatsApp quick action

### 3. Internationalization Rules

- All user-facing strings are rendered with `useTranslations` (or `getTranslations`) from `next-intl`, never hardcoded in components.
- Each message referenced should match an entry in `messages/en.json`, with the corresponding translation in `messages/ar.json`.
- Use descriptive, yet short, key names like `title` and `description` instead of repeating the current source string.
- Use ICU arguments instead of string concatenation to give translators the flexibility to change the order of words within a sentence.
- Always use CSS logical properties (`start-`, `end-`, `ms-`, `me-`, `ps-`, `pe-`) to guarantee natural RTL and LTR support.

### 4. Typography Rules

- **English Headings:** Use `font-display` (`Bebas Neue`) for primary headings, section titles, and badges to give an editorial, high-impact aesthetic. Avoid `tracking-wider` on `Bebas Neue` to maintain tight, impactful headline typography.
- **English Body & UI:** Use `font-sans` (`Manrope`) for body text, subtitles, descriptions, navigation, and interactive buttons to keep the UI clean, balanced, and readable (avoid overusing `Bebas Neue`).
- **Arabic Text:** Use `font-arabic` (`Cairo`) across headings, body, and UI elements with appropriate font weights (`font-semibold`, `font-bold`) for natural Arabic legibility.

### 5. Design Tokens & Theme Specification

- **Light Mode (Default if system is light):**
  - Background: `#fafafa`
  - Card / Surface: `#ffffff`
  - Borders: `#e8e8e8`
  - Text: `#000000` (Black)
  - Muted Text & Icons: `#666666`
  - Status Dot: `#22c55e`
  - Icon: `#000000` | Muted Icon: `#666666`

- **Dark Mode (Default if system is dark):**
  - Background: `#0a0a0a`
  - Card / Surface: `#111111`
  - Borders: `#242424`
  - Text: `#ffffff` (White)
  - Muted Text & Icons: `#999999`
  - Status Dot: `#22c55e`
  - Icon: `#ffffff` | Muted Icon: `#999999`

- **Toggle Behavior:**
  - Binary toggle (Sun ⇄ Moon) without a "System" option in the UI.
  - Automatically loads Dark if system preference is dark; otherwise defaults to Light.
  - Full FOUC and FOUT prevention via `next-themes` and `suppressHydrationWarning`.

---

### 6. Implementation Roadmap & Progress Tracker

- [x] **Phase 1: i18n Foundation**
  - Setup `next-intl` routing (`/en` and `/ar`).
  - Setup dynamic `dir="ltr"` / `dir="rtl"` layout shell.

- [x] **Phase 2: Typography**
  - Configure bilingual typography (`Cairo` for Arabic, `Manrope` + `Bebas Neue` for English).
  - Apply `font-display` for English headings, `font-sans` for English body, and `font-arabic` for Arabic.

- [x] **Phase 3: Design Tokens & Theme Engine**
  - Define dark (`#0a0a0a`) and light (`#fafafa`) CSS variables in `globals.css`.
  - Implement smooth dark/light mode toggle.

- [ ] **Phase 4: Navigation & Shell Components**
  - Top floating pill navbar (Initials `EO`, `#111111` / `#ffffff` inversion, active tab cut-in notch, language switcher, theme toggle, CV download).
  - Mobile top squircle navbar (EO monogram, Projects, Contact, CV download, theme toggle, and language switcher).
  - Desktop side floating vertical social dock (`lg:` only) with hover tooltips and custom SVG icons (GitHub, LinkedIn, WhatsApp, Telegram, Email).
  - Dedicated routes structure (`/[locale]`, `/[locale]/projects`, `/[locale]/contact`).

- [ ] **Phase 5: Hero Section**
  - "Available for work" pulse pill badge.
  - Headline, role, tagline, primary CTA buttons (`View Projects`, `Contact`, `Download CV`).
  - Direct communication chips (Telegram, WhatsApp, Email, GitHub, LinkedIn).
  - Profile image card frame.

- [ ] **Phase 6: Skills LogoLoop**
  - Infinite horizontal ticker (React Bits / pure CSS) with gradient edge fade masks.

- [ ] **Phase 7: Experience Timeline**
  - Clean vertical experience & education timeline with status badges.

- [ ] **Phase 8: Featured Projects Showcase**
  - High-impact project cards with tech tags, live preview, and GitHub links.
  - Category filters / interactive cards.

- [ ] **Phase 9: Contact Form**
  - RHF + Zod validated contact form connected to Telegram Bot API.

- [ ] **Phase 10: Mobile Responsive**

- [ ] **Phase 11: Final Polish**
  - SEO metadata, OpenGraph tags, dynamic sitemap.ts and dynamic robots.ts.
