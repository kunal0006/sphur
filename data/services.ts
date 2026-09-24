import { HeroService, DetailedService } from "@/types";

export const HERO_SERVICES: HeroService[] = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Bespoke, high-performance web experiences architected from the ground up — engineered for 99+ Lighthouse scores, sub-second load times, and effortless conversion.",
    capabilities: [
      "Web Design & Prototyping",
      "Next.js & React Architecture",
      "Headless CMS & 3D WebGL",
      "Performance & SEO Optimization",
    ],
  },
  {
    number: "02",
    title: "Video Editing",
    description:
      "High-retention commercial storytelling, brand films, and motion graphics engineered for the 3-second hook and maximum audience watch time.",
    capabilities: [
      "Brand Films & Commercials",
      "Motion Graphics & 3D VFX",
      "Social-First Retention Cuts",
      "Color Grading & Master Audio",
    ],
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description:
      "Strategy-led content ecosystems and paid performance campaigns that capture attention, build community trust, and compound revenue.",
    capabilities: [
      "Full-Funnel Content Strategy",
      "Organic Community Management",
      "Paid Social Campaigns (Meta & TikTok)",
      "Growth Analytics & Attribution",
    ],
  },
];

export const DETAILED_SERVICES: DetailedService[] = [
  {
    id: "brand-identity",
    number: "01",
    title: "Brand Identity & Design",
    tagline: "Systems that make you instantly recognizable",
    description:
      "Logos, guidelines, packaging, and visual systems that make you instantly recognizable — online and off.",
    category: "IDENTITY & SYSTEMS",
    pills: [
      "Logos & Brandmarks",
      "Comprehensive Guidelines",
      "Packaging & Print Systems",
      "Visual Identity Systems",
    ],
  },
  {
    id: "web-development",
    number: "02",
    title: "Web Development",
    tagline: "Built to turn visitors into loyal customers",
    description:
      "Fast, clean, conversion-focused websites. Not just \"nice to look at\" — built to turn visitors into customers.",
    category: "DIGITAL ENGINEERING",
    pills: [
      "Next.js & React Architecture",
      "Conversion Rate Optimization",
      "Sub-Second Speed & 99+ CWV",
      "Interactive 3D & Micro-Motion",
    ],
  },
  {
    id: "social-media",
    number: "03",
    title: "Social Media Management",
    tagline: "Growing real followers, not just post counts",
    description:
      "Content calendars, community management, and platform strategy that actually grows your following — not just your post count.",
    category: "COMMUNITY & DISTRIBUTION",
    pills: [
      "Editorial Content Calendars",
      "Active Community Management",
      "Cross-Platform Strategy",
      "Organic Growth Funnels",
    ],
  },
  {
    id: "performance-marketing",
    number: "04",
    title: "Performance Marketing",
    tagline: "Optimized for return on investment, not vanity metrics",
    description:
      "Meta, Google, and programmatic ad campaigns optimized for ROI, not vanity metrics. We report what matters: leads, sales, cost per acquisition.",
    category: "PAID MEDIA & ATTRIBUTION",
    pills: [
      "Meta & Google Ad Campaigns",
      "Programmatic Media Buying",
      "Direct-Response Creative",
      "CAC, ROAS & Pipeline Reporting",
    ],
  },
  {
    id: "content-creation",
    number: "05",
    title: "Content Creation",
    tagline: "Engineered to stop the endless scroll",
    description:
      "Photography, videography, reels, and copy that fits your brand voice — made to stop the scroll.",
    category: "PRODUCTION & EDITORIAL",
    pills: [
      "Commercial Photography",
      "High-Retention Reels & Shorts",
      "Brand Films & Video Production",
      "Voice-Led Copywriting",
    ],
  },
  {
    id: "influencer-marketing",
    number: "06",
    title: "Influencer & Talent Marketing",
    tagline: "Handled privately, from initial brief to final booking",
    description:
      "Curated talent matching for campaigns, shoots, and brand activations — handled privately, brief to booking.",
    category: "PARTNERSHIPS & INFLUENCE",
    pills: [
      "Curated Creator Discovery",
      "Private Rate Negotiation",
      "Brief-to-Booking Management",
      "Campaign Attribution & ROI",
    ],
  },
  {
    id: "talent-casting",
    number: "07",
    title: "Talent & Casting",
    tagline: "The right faces and voices for your brand production",
    description:
      "Our Talent & Casting team connects brands with the right on-camera talent, presenters, models, actors, and creators for digital campaigns, social content, advertisements, and brand productions.",
    category: "CREATIVE TALENT ROSTER",
    pills: [
      "On-Camera Presenters & Hosts",
      "Commercial & Fashion Models",
      "Actors & Voiceover Artists",
      "Digital Creators & Brand UGC",
    ],
    ctaLabel: "Request Talent →",
    ctaModalType: "talent",
  },
  {
    id: "event-planning",
    number: "08",
    title: "Event Planning",
    tagline: "End-to-end execution, including overseas events",
    description:
      "From brand activations to product launches, we plan and execute events end to end — concept, logistics, vendors, and on-ground production, including overseas events — so your brand shows up exactly the way it should, in person.",
    category: "EXPERIENTIAL & ON-GROUND",
    pills: [
      "Brand Activations & Pop-ups",
      "Product Launches & Premieres",
      "Overseas & Destination Events",
      "On-Ground Logistics & Production",
    ],
    ctaLabel: "Plan Your Event →",
    ctaModalType: "event",
  },
];
