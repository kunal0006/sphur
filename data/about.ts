import { AboutMetric, AboutPrinciple, SectorItem } from "@/types";

export const ABOUT_NUMBERS: AboutMetric[] = [
  { value: "3+", label: "Years of Craft", desc: "Refining identity & speed" },
  { value: "60+", label: "Projects Delivered", desc: "Web, video, and social" },
  { value: "10", label: "Disciplines, One Team", desc: "Zero handoff friction" },
  { value: "95%", label: "Client Retention Rate", desc: "Long-term compounding" },
];

export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  {
    number: "01",
    title: "Craft over clutter",
    tagline: "Every design decision has a reason.",
    detail:
      "We strip away the noise. If an element doesn't serve conversion, clarity, or memorable positioning, it doesn't survive our edit.",
  },
  {
    number: "02",
    title: "Data over guesswork",
    tagline: "We test, measure, and adjust.",
    detail:
      "Creative intuition is only the starting line. True longevity comes from validating with real user data, scroll behavior, and conversion tracking.",
  },
  {
    number: "03",
    title: "Partnership over transactions",
    tagline: "We grow when you grow.",
    detail:
      "We don't do 'deliverables and goodbye'. We embed into your brand strategy, obsess over your metrics, and treat your upside as our own.",
  },
];

export const NOTABLE_CLIENTS: string[] = [
  "Savn Group",
  "FinPilot",
  "Pushpdeep Collection",
  "House of Savorella",
  "Supradyn Clothing",
  "Brave Tab",
  "Easemydeal",
  "Phillips",
];

export const FOCUS_SECTORS: SectorItem[] = [
  {
    title: "D2C Brands",
    desc: "E-commerce flagships that convert traffic into high-LTV brand advocates.",
  },
  {
    title: "Finance & Fintech",
    desc: "High-trust digital interfaces translating complex utility into intuitive clarity.",
  },
  {
    title: "Fashion & Lifestyle",
    desc: "Visually arresting narratives, editorial typography, and high-production motion.",
  },
  {
    title: "Challenger Startups",
    desc: "Bold identities engineered for businesses ready to stop blending in and start standing out.",
  },
];
