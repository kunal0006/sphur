# SPHUR — Creative & Production Studio

A modern, high-performance web experience for **SPHUR**, a creative and production studio specializing in brand architecture, high-impact motion/video editing, campaign direction, and digital experiences.

---

## ⚡ Features & Architecture

- **Editorial Dark Aesthetic**: High-contrast, typography-driven design system built with Anton, Playfair Display, and Outfit font pairings.
- **Accessible & WCAG 2.2 AA Compliant**: Strict color contrast ratios (>= 4.5:1), full semantic heading hierarchy, screen-reader landmarks, and accessible touch target sizes (>= 44×44px).
- **Zero-Overflow Responsive Layout**: Custom fluid typography clamps and viewport padding verified from ultra-compact mobile (320px) up to 4K displays.
- **Conversion-Optimized Funnel**: Interactive slider initiation with an integrated online Project Brief modal fallback.
- **Hardened Security**: Preconfigured security headers (`X-Frame-Options`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- **Technical SEO**: Built-in Open Graph social cards (`og-image.jpg`), dynamic `robots.txt`, `sitemap.xml`, and structured JSON-LD Organization schema.

---

## 📁 Project & Content Architecture

The project is structured according to modern Next.js and TypeScript standards with clean separation between UI components and editorial data:

```text
sphur/
├── app/                  # Next.js App Router (pages, layouts, metadata)
│   ├── about/            # /about (Agency origin, philosophy, metrics)
│   ├── services/         # /services (Detailed 8-practice catalog & modals)
│   ├── team/             # /team (10 departments & creative roster)
│   ├── privacy/          # /privacy policy
│   ├── globals.css       # Core typography, tokens & styling system
│   ├── layout.tsx        # Root layout, fonts & Lenis smooth scroll
│   └── page.tsx          # Homepage runway
├── components/           # Presentation & Interaction Layer
│   ├── sections/         # Hero, Work, Services, Testimonials, Stats, CTA, Footer
│   └── ui/               # Nav, Cursor, Preloader, MagneticButton
├── data/                 # ⭐️ Centralized Content & Configuration Layer
│   ├── projects.ts       # Selected projects & filter categories
│   ├── testimonials.ts   # Client reviews & author information
│   ├── services.ts       # Hero practices & detailed service catalog
│   ├── team.ts           # Department details & member rosters
│   ├── stats.ts          # Core agency impact numbers & stats
│   ├── about.ts          # Agency story, values & notable client list
│   ├── navigation.ts     # Header & footer routes
│   └── site.ts           # Agency contact info, domain, socials
├── types/                # TypeScript interfaces & data contracts
│   └── index.ts          # Type schemas for projects, services, team, etc.
└── public/               # Static assets (brand logos, custom fonts, OG image)
```

### ✏️ Content Maintenance Guide
Updating site copy or media is completely isolated from animation and component code:
- **Add / Edit Projects**: Modify [`data/projects.ts`](file:///Users/aniii/sphur/data/projects.ts).
- **Update Client Reviews**: Modify [`data/testimonials.ts`](file:///Users/aniii/sphur/data/testimonials.ts).
- **Update Agency Stats**: Modify [`data/stats.ts`](file:///Users/aniii/sphur/data/stats.ts).
- **Add Team Members**: Modify [`data/team.ts`](file:///Users/aniii/sphur/data/team.ts).
- **Edit Services**: Modify [`data/services.ts`](file:///Users/aniii/sphur/data/services.ts).
- **Update Contact Info**: Modify [`data/site.ts`](file:///Users/aniii/sphur/data/site.ts).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation & Motion**: GSAP 3 (ScrollTrigger) & Framer Motion
- **Smooth Scrolling**: Lenis

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or later
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kunal0006/sphur.git

# Navigate to project directory
cd sphur

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build & Linting

```bash
# Lint checks
npm run lint

# TypeScript verification
npx tsc --noEmit

# Production build
npm run build
npm run start
```

---

## 📄 License

All rights reserved © SPHUR Studio.
