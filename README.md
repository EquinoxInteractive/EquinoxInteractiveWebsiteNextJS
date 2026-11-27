<div align="center">

# Equinox Interactive

**Official Studio Website — Next.js + TypeScript + Tailwind CSS**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88ce02?logo=greensock)](https://gsap.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-000000)](https://ui.shadcn.com)
[![License](https://img.shields.io/badge/License-Unlicensed-lightgrey)](#license)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages and Sections](#pages-and-sections)
- [Component Reference](#component-reference)
- [Theming System](#theming-system)
- [Routing](#routing)
- [Animations and Scroll Behavior](#animations-and-scroll-behavior)
- [Typography](#typography)
- [Social Links and Contact](#social-links-and-contact)
- [Updating Content](#updating-content)
- [Asset Management](#asset-management)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Build and Deployment](#build-and-deployment)
- [Configuration Reference](#configuration-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Official website of **Equinox Interactive**, an independent game studio founded in April 2025. It presents the studio story, the team, the game portfolio, and social links.

Built with the Next.js App Router, TypeScript, and Tailwind CSS. The palette is taken from the studio logo (slate, silver, steel grey) with no gradients, in dark (default) and light themes. Interactive details include an ASCII-rendered logo, Lenis smooth scrolling synced with GSAP, text-scramble effects, and a circular view-transition theme toggle.

---

## Live Preview

The portfolio section links to the first release:

```
https://boxsiege.vercel.app/
```

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.3 |
| UI | React | 19 |
| Language | TypeScript | 5.7 |
| Styling | Tailwind CSS + tailwindcss-animate | 3.4 / 1.0 |
| UI primitives | shadcn/ui style (Radix Dialog, Tooltip, Slot, cva) | latest |
| Animation | GSAP + ScrollTrigger | 3.13 |
| Smooth scroll | Lenis | 1.3 |
| Charts | Recharts | 2.15 |
| Theme | next-themes | 0.4 |
| Icons | Lucide React | 0.468 |

> `npm run setup:registry` also clones the skill/registry repos (ui-ux-pro-max-skill, taste-skill, anatomy, skiper-ui, cult-ui, bklit-ui, evilcharts) into `.claude/skills/` and `vendor/` for reference. They are not imported by the app.

---

## Project Structure

```
equinox-interactive-next/
├── public/
│   ├── bg.mp4                  -- Hero background video (960p, grayscale, ~100 KB)
│   ├── logo.png                -- Transparent logo mark (navbar, footer, ASCII logo)
│   └── og.png                  -- Open Graph / Twitter image
├── scripts/
│   └── setup-registry.sh       -- Installs deps and clones reference repos
├── src/
│   ├── app/
│   │   ├── layout.tsx          -- Fonts, metadata, providers
│   │   ├── page.tsx            -- Composes all sections
│   │   ├── not-found.tsx       -- 404 page
│   │   ├── globals.css         -- Tailwind layers and design tokens
│   │   └── icon.png            -- Favicon
│   ├── assets/                 -- box-siege.jpg, BadutZY.jpg, SwimmingFOX.jpg, Ari.jpg
│   ├── components/
│   │   ├── navbar.tsx          -- Floating nav, active section, mobile sheet
│   │   ├── theme-toggle.tsx    -- Dark/light toggle with view transition
│   │   ├── back-to-top.tsx
│   │   ├── fx/                 -- Effects: ascii-logo, hero-video, preloader, smooth-scroll,
│   │   │                          scramble-text, reveal, marquee, magnetic, count-up,
│   │   │                          cursor, scroll-progress
│   │   ├── sections/           -- hero, about, team, games, contact, footer,
│   │   │                          section-header, pipeline-chart
│   │   └── ui/                 -- button, badge, card, sheet, tooltip
│   ├── lib/
│   │   ├── data.ts             -- All site content (nav, team, games, socials)
│   │   ├── scroll.ts           -- Shared Lenis instance + scrollToTarget()
│   │   └── utils.ts            -- cn() class merging utility
│   ├── hooks/
│   │   └── use-reduced-motion.ts
│   └── css.d.ts                -- Allows importing .css files in TypeScript
├── components.json             -- shadcn/ui configuration
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Pages and Sections

A single page (`src/app/page.tsx`). Navigation scrolls to anchors with Lenis.

| Anchor | Component | Description |
|---|---|---|
| `#home` | `Hero` | Headline, CTA buttons, interactive ASCII logo, marquee |
| `#about` | `About` | Story, vision, mission, `studio.log` card, animated stats |
| `#team` | `Team` | Member cards with GitHub / website icons on hover |
| `#portfolio` | `Games` | Released game cards, "Coming Soon" slots, pipeline chart |
| `#contact` | `Contact` | TikTok, Twitter/X, Instagram cards |

---

## Component Reference

**Navbar** — Floating bar that hides when scrolling down and returns when scrolling up. Highlights the active section (IntersectionObserver) and opens a Radix-based sheet on mobile.

**Hero** — Letter-by-letter headline reveal that waits for the preloader, with `HeroVideo` as a subtle background.

**AsciiLogo** — Renders `logo.png` as ASCII on a `<canvas>`. Drawn once; only a small region around the cursor is redrawn on hover, so idle cost is zero.

**HeroVideo** — Loads only on screens >= 1024px, skips reduced-motion and data-saver users, and pauses when off-screen.

**Team** — Cards tilt toward the cursor. Hover icons appear only for the links filled in `data.ts`; touch devices show the icons below the card.

**Games** — Renders everything from the `games` array. The pipeline chart and About stats are computed from the same data.

**Preloader / Cursor / ScrollProgress** — Boot-sequence loader, ring cursor (fine pointers only), and a top progress bar.

**Reveal / ScrambleText / Magnetic / CountUp / Marquee** — Reusable GSAP-driven effects.

---

## Theming System

Tokens are CSS variables in `src/app/globals.css`, stored as bare HSL channels so Tailwind opacity modifiers work (`bg-primary/20`). `next-themes` toggles the `.dark` class; default is dark.

```tsx
// src/app/layout.tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

| Token (dark) | Value | Usage |
|---|---|---|
| `--background` | `222 19% 9%` | Page background (logo slate) |
| `--foreground` | `220 9% 90%` | Primary text |
| `--primary` | `220 5% 71%` | Silver accent (logo) |
| `--accent` | `220 5% 35%` | Mid grey |
| `--secondary` | `222 10% 20%` | Dark grey surfaces |
| `--card` | `222 18% 12%` | Card backgrounds |
| `--border` | `222 11% 20%` | Borders and dividers |

---

## Routing

Next.js App Router: `/` renders `page.tsx` and unknown paths render `not-found.tsx`. In-page navigation is anchor-based (`#home`, `#about`, `#team`, `#portfolio`, `#contact`).

---

## Animations and Scroll Behavior

- **Lenis** smooth scroll is synced to the GSAP ticker and ScrollTrigger (`fx/smooth-scroll.tsx`).
- **Reveal** fades and lifts elements into view with ScrollTrigger.
- **ScrambleText** decodes text on view or hover.
- Everything respects `prefers-reduced-motion`.

---

## Typography

Loaded with `next/font/google` in `layout.tsx` and exposed as CSS variables.

| Family | Tailwind class | Used for |
|---|---|---|
| Orbitron | `font-orbitron` | Headings, display text |
| Poppins | `font-sans` | Body text |
| JetBrains Mono | `font-mono` | Labels, buttons, ASCII |

---

## Social Links and Contact

| Platform | Handle | URL |
|---|---|---|
| TikTok | @equinox.interactive | https://tiktok.com/@equinox.interactive |
| Twitter / X | @EquinoxIntratve | https://x.com/EquinoxIntratve |
| Instagram | @equinox.interactive | https://instagram.com/equinox.interactive |

Edit the `socialLinks` array in `src/lib/data.ts`; the Contact section and Footer both read from it.

---

## Updating Content

All content lives in `src/lib/data.ts`.

**Add a game** — add an object to `games` (a commented example is included):

```ts
{
  slug: 'new-game',
  title: 'New Game',
  status: 'released',            // or 'coming-soon'
  platform: 'PC',
  tags: ['Co-Op'],
  description: 'Short description with a highlighted phrase.',
  highlight: 'highlighted phrase',
  url: 'https://example.com',
  image: newGameImage,           // import from src/assets
  technologies: ['Unity', 'C#'],
  meta: [{ value: '2026', label: 'Released' }],
}
```

**Team links** — set `links: { github, website }` per member. Only the filled links get a hover icon (GitHub icon or globe icon).

---

## Asset Management

| Location | Contents | Notes |
|---|---|---|
| `src/assets/` | Team avatars, `box-siege.jpg` | Imported statically and served through `next/image` |
| `public/logo.png` | Transparent logo mark | Also sampled by the ASCII logo |
| `public/bg.mp4` | Hero background video | Served directly as `/bg.mp4` |
| `public/og.png` | Social share image | Used for Open Graph / Twitter |
| `src/app/icon.png` | Favicon | Picked up automatically by Next.js |

---

## Getting Started

### Requirements

- Node.js 18.18 or later
- npm 9 or later

### Installation

```bash
git clone <your-repo-url>
cd equinox-interactive-next
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

The `@` alias resolves to `src/` (set in `tsconfig.json`):

```ts
import { cn } from '@/lib/utils';
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build |
| `npm run setup:registry` | Install deps and clone reference skill/registry repos |

---

## Build and Deployment

```bash
npm run build
npm run start
```

Checklist before deploying:

1. `public/bg.mp4`, `public/logo.png`, and `public/og.png` are present.
2. Social links and the Box Siege URL in `src/lib/data.ts` are up to date.
3. `og.png` is correct (the current logo image contains a typo, "INTERAACTIVE").
4. Google Search Console verification is set in `src/app/layout.tsx` (`metadata.verification.google`).

| Platform | Notes |
|---|---|
| Vercel | Recommended. Import the repo; zero config for Next.js |
| Netlify | Use the official Next.js runtime |
| Self-hosted | `npm run build && npm run start` on Node 18.18+ |

---

## Configuration Reference

- **`next.config.mjs`** — `reactStrictMode` and AVIF/WebP image formats.
- **`tailwind.config.ts`** — `darkMode: ['class']`, font families, shadcn color tokens, and `marquee`, `blink`, `floaty` animations.
- **`components.json`** — shadcn/ui config (`new-york` style, CSS variables, `@/` aliases). Add components with `npx shadcn@latest add <component>`.
- **`tsconfig.json`** — strict mode and the `@/*` path alias.

---

## Contributing

1. Fork this repository.
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes and check them with `npm run dev` and `npm run build`.
4. Commit: `git commit -m "feat: description of change"`
5. Push and open a Pull Request.

Conventions:

- Use the `@/` alias for internal imports.
- Keep site content in `src/lib/data.ts`, not inside components.
- Mark components that use hooks or browser APIs with `'use client'`.
- Clean up listeners, observers, and GSAP contexts in the `useEffect` return.
- Respect `prefers-reduced-motion` for any new animation.

---

## License

This project is currently unlicensed. All rights are retained by Equinox Interactive unless otherwise specified. Contact the maintainer before using code or assets from this repository elsewhere.

---

<div align="center">

**Equinox Interactive — Built with Next.js, TypeScript, and Tailwind CSS**

*Small Team. Big Dreams.*

</div>
