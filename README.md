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

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & CSS Modules
- **Motion & Interactions**: Framer Motion
- **Icons**: Lucide React

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

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

All rights reserved © SPHUR Studio.
