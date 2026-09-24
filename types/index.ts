/**
 * Core TypeScript definitions for SPHUR Agency
 * Centralized interface contract for projects, services, testimonials, team, and site data.
 */

// ==========================================
// Projects & Case Studies
// ==========================================
export type ProjectDiscipline = "brand" | "video" | "growth";

export interface Project {
  id: string;
  name: string;
  category: string;
  discipline: ProjectDiscipline;
  deliverable: string;
  image: string;
  imageAlt: string;
}

export interface ProjectFilterCategory {
  id: string;
  label: string;
  count: string;
}

// ==========================================
// Testimonials & Reviews
// ==========================================
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

// ==========================================
// Key Metrics & Stats
// ==========================================
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

// ==========================================
// Services
// ==========================================
export interface HeroService {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface DetailedService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  pills: string[];
  ctaLabel?: string;
  ctaModalType?: "talent" | "event";
}

// ==========================================
// Team & Departments
// ==========================================
export type DepartmentCategory = "creative" | "production" | "strategy" | "technical";

export interface Department {
  id: string;
  number: string;
  name: string;
  tagline: string;
  members: string[];
  category: DepartmentCategory;
  categoryLabel: string;
}

// ==========================================
// About Page Data
// ==========================================
export interface AboutMetric {
  value: string;
  label: string;
  desc: string;
}

export interface AboutPrinciple {
  number: string;
  title: string;
  tagline: string;
  detail: string;
}

export interface SectorItem {
  title: string;
  desc: string;
}

// ==========================================
// Navigation & Site Metadata
// ==========================================
export interface NavLink {
  label: string;
  href: string;
  number: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}
