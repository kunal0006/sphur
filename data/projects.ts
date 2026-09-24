import { Project, ProjectFilterCategory } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "01",
    name: "Savn Group",
    category: "Brand & Social Growth",
    discipline: "growth",
    deliverable: "Content Strategy · 3x Engagement · Inbound Engine",
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=900&q=80",
    imageAlt: "Savn Group social ecosystem and engagement growth",
  },
  {
    id: "02",
    name: "FinPilot",
    category: "Performance & Web",
    discipline: "brand",
    deliverable: "Paid Acquisition · -40% CPL · Conversion UI",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    imageAlt: "FinPilot high-conversion fintech platform and acquisition",
  },
  {
    id: "03",
    name: "House of Savorella",
    category: "Brand & Packaging",
    discipline: "brand",
    deliverable: "Visual Identity · Luxury Packaging · Social Systems",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80",
    imageAlt: "House of Savorella luxury packaging and visual identity",
  },
  {
    id: "04",
    name: "Supradyn Clothing",
    category: "Video & Campaign",
    discipline: "video",
    deliverable: "Editorial Fashion Shoot · Launch Film · Motion Direction",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80",
    imageAlt: "Supradyn Clothing editorial fashion campaign rollout",
  },
  {
    id: "05",
    name: "Brave Tab",
    category: "Performance Marketing",
    discipline: "growth",
    deliverable: "Multi-Channel Ads · Full Attribution · Scaled ROAS",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80",
    imageAlt: "Brave Tab performance ad campaigns and attribution engine",
  },
  {
    id: "06",
    name: "Easemydeal",
    category: "Video Production",
    discipline: "video",
    deliverable: "Commercial Film · Talent Booking · Master Color & Sound",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80",
    imageAlt: "Easemydeal commercial video production and on-camera talent",
  },
];

export const PROJECT_CATEGORIES: ProjectFilterCategory[] = [
  { id: "ALL", label: "ALL", count: "06" },
  { id: "BRAND", label: "BRAND & WEB", count: "02" },
  { id: "VIDEO", label: "VIDEO & SHOOTS", count: "02" },
  { id: "GROWTH", label: "GROWTH & ADS", count: "02" },
];

export const isProjectMatch = (project: Project, filter: string) => {
  if (filter === "ALL") return true;
  if (filter === "BRAND") return project.discipline === "brand";
  if (filter === "VIDEO") return project.discipline === "video";
  if (filter === "GROWTH") return project.discipline === "growth";
  return true;
};
