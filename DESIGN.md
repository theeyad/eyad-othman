# Eyad Othman — Design System Specification

This document is the single source of truth for all visual, architectural, and interaction patterns across the portfolio and admin management application. Every future page, modal, and component must strictly adhere to these standards.

---

## 1. Design Philosophy & The Three Golden Commandments

The portfolio embodies **Editorial Monochromatic Brutalism** — a modern, high-contrast, typographic aesthetic characterized by clean geometry, purposeful whitespace, and razor-sharp border separation rather than synthetic depth.

### The Three Golden Commandments

1. **Zero Shadows (Absolute Rule):**
   - **Never** use box shadows (`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`).
   - Depth and hierarchy are achieved exclusively through surface contrast (`bg-background` vs `bg-card`) and 1px crisp borders (`border border-border`).
2. **Default Cursor Everywhere:**
   - **Never** display the hand pointer cursor (`cursor-pointer`).
   - All interactive elements (buttons, links, nav tabs, toggle chips, cards) must explicitly use or inherit `cursor-default`.
3. **100% Logical CSS Properties (Bidirectional Native Support):**
   - **Never** use physical directional utilities (`left-`, `right-`, `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`).
   - **Always** use CSS logical properties:
     - Spacing & Margins: `ms-`, `me-`, `ps-`, `pe-`
     - Positioning: `inset-s-`, `inset-e-`, `start-`, `end-`
     - Text Alignment: `text-start`, `text-end`
     - Directional Borders: `border-s-`, `border-e-`

---

## 2. Color Palette & Design Tokens

A pure monochrome palette supplemented by precise functional status tokens.

### Theme Tokens Matrix

| Token Name | Tailwind Variable | Light Mode (`:root`) | Dark Mode (`.dark`) | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `--background` | `#fafafa` | `#0a0a0a` | Global canvas / page backdrop |
| **Card / Surface** | `--card` | `#ffffff` | `#111111` | Card panels, floating bars, modals |
| **Border / Line** | `--border` | `#e8e8e8` | `#242424` | 1px dividers, card boundaries, input lines |
| **Foreground / Text** | `--foreground` | `#000000` | `#ffffff` | Primary headings, active text, contrast fills |
| **Muted Foreground** | `--muted-foreground` | `#666666` | `#999999` | Subtitles, body prose, icons, meta details |
| **Muted Surface** | `--muted` | `#f4f4f5` | `#18181b` | Chip backgrounds, badge fills |
| **Success / Available** | `--success` | `#22c55e` | `#22c55e` | Status dots, active milestones, live badges |
| **Destructive / Error** | `--destructive` | `#ef4444` | `#ef4444` | Form errors, delete actions, error banners |

### Theme Transition Flash Suppression
To prevent color lag or hydration flash during theme changes, the `.theme-changing` class suppresses all transitions:
```css
.theme-changing,
.theme-changing * {
  transition: none !important;
}
```

---

## 3. Bilingual Typography Matrix

Typography defines the editorial identity. Font selection and text treatment differ intentionally between English and Arabic.

```
       English (LTR)                             Arabic (RTL)
┌──────────────────────────┐             ┌──────────────────────────┐
│ Bebas Neue (Headings)    │             │ Cairo (Headings & Body)  │
│ Manrope (Body & UI)      │             │                          │
│ Oswald (Nav Tabs/Badges) │             │                          │
└──────────────────────────┘             └──────────────────────────┘
```

### Typography Hierarchy

| Role | English (`en`) | Arabic (`ar`) | Classes & Styling |
| :--- | :--- | :--- | :--- |
| **Primary Display Title (`h1`)** | `Bebas Neue` (`font-bebas`) | `Cairo` (`font-cairo`) | **EN:** `text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.95] tracking-normal`<br>**AR:** `text-4xl sm:text-5xl md:text-6xl font-bold leading-tight` |
| **Section Headings (`h2`)** | `Bebas Neue` (`font-bebas`) | `Cairo` (`font-cairo`) | **EN:** `text-2xl sm:text-3xl uppercase leading-[0.95] tracking-normal`<br>**AR:** `text-2xl sm:text-3xl font-bold leading-tight` |
| **Card & Item Titles (`h3`)** | `Bebas Neue` (`font-bebas`) | `Cairo` (`font-cairo`) | **EN:** `text-xl sm:text-2xl uppercase tracking-tight`<br>**AR:** `text-xl sm:text-2xl font-bold` |
| **Body Prose / Descriptions** | `Manrope` (`font-manrope`) | `Cairo` (`font-cairo`) | `text-sm sm:text-base leading-relaxed text-muted-foreground` |
| **Form Labels & Micro Badges** | `Manrope` (`font-manrope`) | `Cairo` (`font-cairo`) | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` |
| **Navigation Tab Pills** | `Oswald` (`font-oswald`) | `Cairo` (`font-cairo`) | **EN:** `font-oswald text-base uppercase tracking-tight font-normal`<br>**AR:** `font-cairo text-sm font-medium` |
| **Monogram Identity ("EO")** | `Bebas Neue` (`font-bebas`) | `Bebas Neue` (`font-bebas`) | `text-xl tracking-normal leading-none select-none` |

> [!IMPORTANT]
> **Headings Rule:** Never apply `tracking-wider` to `Bebas Neue`. Keep it strictly `tracking-normal` or `tracking-tight` to preserve its tight, impactful headline typography.

### SplitText Ligature Preservation Rule
- In **English**, animated titles split by **character** (`charDelay: 0.035s`) for a staggered wave effect.
- In **Arabic**, splitting by character breaks cursive letter ligatures. The system must always split by **word** when `locale === 'ar'` (`isArabic ? words : chars`) to maintain proper letter connections.

---

## 4. Layout, Grids & Responsive Shells

### Max-Width Containers & Padding
- **Global Page Wrapper:**
  ```tsx
  <main className="min-h-[calc(100vh-5rem)] flex flex-col px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-28 pb-24 bg-background text-foreground">
    <div className="w-full max-w-6xl mx-auto">
      {/* Content */}
    </div>
  </main>
  ```
- **Editorial Subpage / Form Layout:**
  - Non-centered layout: Start-aligned container (`w-full lg:ms-10 max-w-2xl`) with generous whitespace.

### Navigation Shells

#### 1. Desktop Navbar (`md:` and above)
- **Positioning:** `fixed top-5 inset-x-0 mx-auto z-99 w-fit hidden md:flex items-center gap-2.5`
- **Monogram Circle:** `size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111]`
- **Center Capsule Pill:**
  - Motion container scaling from dynamic origin (`isAr ? "right center" : "left center"`).
  - Pill tabs with circular dome sweep hover animation:
    - Base: `bg-[#ffffff] dark:bg-[#111111] rounded-full px-5 py-2 overflow-hidden`
    - Dome sweep element: scales from bottom on hover (`scale-0 group-hover:scale-100 duration-350`)
    - Vertical flip text: default text translates up `translate-y-[-120%]`, inverted text translates from `translate-y-[120%]` to `0`.
    - Active notch dot: `size-3 rounded-full bg-[#111111] dark:bg-[#ffffff] absolute -bottom-1.5 left-1/2 -translate-x-1/2`.
- **Toggle Group:** Circular `size-11` buttons for theme toggle and language switch.

#### 2. Mobile Floating Bar (`<md`)
- **Positioning:** `fixed bottom-4 inset-x-0 mx-auto z-99 w-fit max-w-[95vw] flex md:hidden`
- **Surface:** Frosted capsule (`rounded-2xl border border-border bg-card/90 backdrop-blur-md p-1.5`)
- **Squircle Buttons:** `size-10 rounded-xl flex items-center justify-center` with inverted monochrome active states.

#### 3. Floating Social Dock (`lg:` only)
- **Positioning:** `fixed inset-s-6 top-1/2 -translate-y-1/2 z-99 hidden lg:flex flex-col items-center`
- **Structure:** 1px gradient vertical lines (`h-15 w-px`) sandwiching 5 circular icon buttons (`size-10 rounded-full border border-border bg-card`).
- **Interactions:**
  - Micro-shift on hover: `hover:translate-x-1 rtl:hover:-translate-x-1`
  - Tooltip: `inset-s-full ms-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs`.

---

## 5. Component Specifications & UI Patterns

### Action Buttons

#### Primary CTA Pill (`MainActionButton`)
```tsx
<button
  className="inline-flex items-center justify-center rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-6 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
>
  {label}
</button>
```

#### Secondary / Icon Circular Button
```tsx
<button
  className="size-10 sm:size-11 rounded-full border border-border bg-card text-foreground hover:bg-foreground hover:text-card transition-all duration-200 flex items-center justify-center cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
>
  <Icon className="size-4" />
</button>
```

---

### Form Controls (Editorial Underline & Full Canvas Aesthetic)

Rather than generic rectangular boxes inside a cramped centered card (`max-w-md bg-card border rounded-3xl`), all forms (including Login, Project Creator, and Experience Editor) use the **Full Canvas Editorial Layout**:
- **Canvas-First Layout:** The form resides directly on the canvas (`bg-background text-foreground`) spanning the natural page width without an enclosing card box or `max-w-md` restraint.
- **Start-Aligned Direction:** Left-aligned in English (`lg:ms-10`) and right-aligned in Arabic, with generous breathing space.
- **Editorial Underline Inputs:** Transparent inputs with bottom-only borders (`border-b border-b-border bg-transparent focus:border-b-foreground px-4 py-3 text-sm`), uppercase micro-labels, and end-aligned icons.
- **Expansive Dual-Language Grids:** English and Arabic inputs span comfortably across side-by-side columns on desktop (`grid grid-cols-1 md:grid-cols-2 gap-8`) directly on the page surface.

#### Form Field Blueprint
```tsx
<div className="space-y-1.5">
  <label
    htmlFor="field-id"
    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
  >
    {label}
  </label>

  <div className="relative">
    <input
      id="field-id"
      className={cn(
        "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
        hasError ? "border-b-destructive" : "border-b-border",
        "pe-10" // Space for end icon
      )}
    />
    <div className="pointer-events-none absolute inset-y-0 inset-e-0 flex items-center pe-3.5 text-muted-foreground">
      <Icon className="size-4" />
    </div>
  </div>

  {hasError && (
    <p className="text-xs text-destructive mt-1 font-medium">{errorMessage}</p>
  )}
</div>
```

#### Destructive / Alert Callout Banner
```tsx
<div
  role="alert"
  className="mb-6 flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive"
>
  <AlertCircle className="size-4 shrink-0 mt-0.5" />
  <span>{errorText}</span>
</div>
```

---

### Cards, Badges & Chips

#### Surface Card
- **Border Radius:** `rounded-2xl sm:rounded-3xl`
- **Classes:** `border border-border bg-card p-6 sm:p-8 cursor-default transition-all duration-300 hover:border-foreground/30`

#### Status Availability Pill
```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
  <span className="size-2 rounded-full bg-success shrink-0" />
  <span className="font-medium">{statusText}</span>
</div>
```

#### Category / Dark Overlay Badge
```tsx
<span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
  {category}
</span>
```

#### Tech Stack Pill Chip
```tsx
<span className="inline-flex items-center rounded-full border border-border bg-muted/20 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-foreground">
  {techName}
</span>
```

---

## 6. Admin Panel Design Blueprint (`/[locale]/admin`)

All Admin dashboard views, project creators, and experience managers must strictly inherit this design language:

```
┌─────────────────────────────────────────────────────────────┐
│  EO ADMIN PANEL                             [Logout] [Exit] │
├─────────────────────────────────────────────────────────────┤
│  OVERVIEW DASHBOARD                                         │
│  Manage projects, profile content, and career milestones.   │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌────────────────────┐ │
│  │ 12 PROJECTS   │ │ 3 EXPERIENCES │ │ SUPABASE CONNECTED │ │
│  └───────────────┘ └───────────────┘ └────────────────────┘ │
│                                                             │
│  PROJECTS                                    [+ New Project]│
│  ─────────────────────────────────────────────────────────  │
│  • Project Alpha     [Frontend]   [Live: Yes]   [Edit] [Del]│
│  • Project Beta      [Fullstack]  [Live: Yes]   [Edit] [Del]│
│                                                             │
│  EXPERIENCE                                 [+ Add Timeline]│
│  ─────────────────────────────────────────────────────────  │
│  • Frontend Dev @ Freelance   (Oct 2025 - Present)   [Edit] │
└─────────────────────────────────────────────────────────────┘
```

### Admin Guidelines

1. **Dashboard Shell:**
   - Consistent layout with the main site: `min-h-screen px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-24 pb-20`.
   - Start-aligned header: Title in `font-bebas text-3xl sm:text-4xl text-foreground uppercase` (or `font-cairo font-bold` in Arabic).
2. **Metric / Stat Cards:**
   - Border cards: `rounded-2xl border border-border bg-card p-6`.
   - Metric number in `font-bebas text-4xl text-foreground` accompanied by micro-label `text-xs uppercase tracking-wider text-muted-foreground`.
3. **Data Tables & Management Lists:**
   - Avoid heavy grid tables. Use clean, border-separated rows:
     `border-b border-border py-4 flex items-center justify-between hover:bg-muted/10`
   - Action controls: Minimal circular icon buttons or text links with default cursor.
4. **Dedicated CRUD Pages Architecture (No Modals):**
   - In place of cramped modals or drawers, creation and editing of projects and experience entries use dedicated full-page routes (`/admin/projects/new`, `/admin/projects/[id]/edit`, `/admin/experience/new`, `/admin/experience/[id]/edit`).
   - **Back Navigation:** Each subpage features an editorial back link at the top (`ArrowLeft` in EN, `ArrowRight` in AR) pointing back to `/admin`.
   - **Bilingual Sectioning:** Generous space allows dual English and Arabic fields to be clearly divided or tabbed without vertical clipping.
   - **Form Fields:** Transparent underline inputs (`border-b border-b-border bg-transparent focus:border-b-foreground py-3 text-sm`) with uppercase micro-labels and end-aligned icons.
   - **Image Upload Integration:** The single and multi-image uploaders seamlessly integrate into the form canvas with flat dashed borders (`border border-dashed border-border rounded-2xl p-6 text-center hover:border-foreground/40`), zero shadows, default cursor, and logical RTL/LTR positioning.

---

## 7. Motion & Interaction Standards

### Spring Transitions (`motion/react`)
- **Fast / Snappy Spring (Icons, Pills, Tabs):**
  ```ts
  { type: "spring", stiffness: 450, damping: 22 }
  ```
- **Gentle / Reveal Spring (Containers, Capsular Navigation):**
  ```ts
  { type: "spring", stiffness: 280, damping: 24 }
  ```

### Micro-Interactions
- Primary CTA hover/active: `transition-transform duration-200 hover:scale-105 active:scale-95`
- Full-width button hover/active: `transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]`
- Color / border transitions: `transition-colors duration-200 ease-out`
- Image zoom on card hover: `transition-transform duration-500 ease-out group-hover:scale-105`

### Bidirectional Motion Handling
- **GSAP Multiplier:** Horizontal travel uses `dirMultiplier = isAr ? -1 : 1`.
- **CSS Ticker Animation:**
  - LTR uses `@keyframes logoloop-scroll` (`translateX(0)` to `translateX(calc(-50% - 0.5rem))`).
  - RTL uses `@keyframes logoloop-scroll-rtl` (`translateX(0)` to `translateX(calc(50% + 0.5rem))`).

---

## 8. React 19 & Next.js 16 Architectural Best Practices

- **Zero-Hydration-Mismatch State:**
  - **Never** use `useState` + `useEffect` solely to track client mounting or media-query matches.
  - **Always** use `useSyncExternalStore`:
    ```tsx
    const emptySubscribe = () => () => {};
    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    ```
- **Server Components by Default:**
  - Only mark components with `"use client"` when interactive state, browser events, or hooks are necessary.
  - Public pages (`page.tsx`) fetch translations and data on the server via `getTranslations` and async queries.
- **Strict Internationalization (`next-intl`):**
  - Never hardcode user-facing strings.
  - Every string key in `messages/en.json` must have an exact twin in `messages/ar.json`.
- **Zero Console Policy & Native Error Propagation:**
  - **Never** write `console.error` or `console.log` in Server Actions or production code.
  - Return exact error strings from Supabase (`{ success: false, error: error.message }`) to be displayed in the UI error banner.
  - Handle unexpected runtime failures through Next.js `error.tsx` boundaries.

