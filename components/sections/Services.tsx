"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  title: string;
  capabilities: string[];
  description: string;
  deliverables: string[];
}

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Website Development",
    capabilities: [
      "Web Design & Prototyping",
      "Next.js & React Architecture",
      "Headless CMS & 3D WebGL",
      "Performance & SEO Optimization",
    ],
    description:
      "Websites that score 90+ on Lighthouse and convert. We architect from the ground up — no themes, no shortcuts. Every interaction deliberate, every millisecond accounted for.",
    deliverables: [
      "Next.js 16",
      "Tailwind CSS",
      "WebGL & 3D",
      "Headless CMS",
      "99+ Lighthouse",
    ],
  },
  {
    number: "02",
    title: "Video Editing",
    capabilities: [
      "Brand Films & Commercials",
      "Motion Graphics & VFX",
      "Social-First High-Retention Cuts",
      "Color Grading & Sound Design",
    ],
    description:
      "Attention is the asset. We edit for the 3-second hook and the 3-minute payoff. From brand films to platform-native short-form — engineered to earn watch time.",
    deliverables: [
      "DaVinci Resolve",
      "Premiere Pro",
      "After Effects",
      "4K Cinema",
      "Sound Design",
    ],
  },
  {
    number: "03",
    title: "Social Media Marketing",
    capabilities: [
      "Full-Funnel Content Strategy",
      "Organic Community Management",
      "Paid Social Campaigns (Meta/TikTok)",
      "Growth Analytics & Attribution",
    ],
    description:
      "Social that compounds. We build systems, not posts — strategy-led content ecosystems that grow your audience, earn trust, and convert followers into customers.",
    deliverables: [
      "Paid Meta Ads",
      "TikTok Strategy",
      "Content Engine",
      "Creative Testing",
      "Growth Analytics",
    ],
  },
];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rowRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Hover fill animation
  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(fillRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "power4.out",
      transformOrigin: "left center",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(fillRef.current, {
      scaleX: 0,
      duration: 0.5,
      ease: "power4.out",
      transformOrigin: "left center",
    });
  };

  return (
    <div
      ref={rowRef}
      className="relative border-t border-milk/10 last:border-b overflow-hidden"
    >
      {/* Main row button */}
      <button
        className="relative z-10 w-full text-left px-4 sm:px-6 md:px-12 lg:px-20 py-7 sm:py-8 md:py-10 group focus-visible:ring-2 focus-visible:ring-orange focus-visible:outline-none cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={`service-detail-${index}`}
      >
        {/* Orange fill (hover) */}
        <div
          ref={fillRef}
          aria-hidden="true"
          className="absolute inset-0 bg-orange pointer-events-none -z-10"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        <div className="flex items-baseline justify-between gap-2.5 sm:gap-4 relative z-10 w-full">
          <div className="flex items-baseline gap-2.5 sm:gap-4 md:gap-8 min-w-0 flex-1">
            <span
              className={`font-mono text-xs tracking-[0.15em] flex-shrink-0 transition-colors duration-300 ${
                hovered ? "text-milk font-bold" : "text-milk/70"
              }`}
            >
              {service.number}
            </span>
            <span
              className={`font-display text-[clamp(1.05rem,3.8vw,5rem)] leading-[0.92] tracking-[-0.03em] uppercase transition-colors duration-300 break-words ${
                hovered ? "text-milk" : "text-milk"
              }`}
            >
              {service.title}
            </span>
          </div>
          <span
            className={`font-mono text-base flex-shrink-0 transition-all duration-300 ${
              hovered ? "text-milk" : expanded ? "text-orange" : "text-milk/70"
            } ${expanded ? "rotate-45" : ""}`}
          >
            +
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      <div
        id={`service-detail-${index}`}
        ref={detailRef}
        className={`overflow-hidden transition-all duration-700 ease-entrance ${
          expanded ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 pb-12 grid md:grid-cols-12 gap-8 relative z-10">
          {/* Left: Positioning copy & Tech/Deliverables */}
          <div className="md:col-span-7 space-y-6">
            <p className="font-body text-milk/75 text-base md:text-lg leading-[1.65] max-w-[54ch]">
              {service.description}
            </p>
            <div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-milk/40 block mb-2.5">
                Core Deliverables & Tooling
              </span>
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] tracking-[0.06em] uppercase text-milk/80 bg-milk/[0.04] border border-milk/12 px-3 py-1.5 transition-colors hover:border-orange hover:text-orange"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Key Capabilities */}
          <div className="md:col-span-5 md:pl-8 md:border-l md:border-milk/10">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-milk/40 block mb-3">
              Key Capabilities
            </span>
            <ul className="space-y-3">
              {service.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="font-mono text-xs md:text-sm tracking-[0.04em] text-milk/70 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        clipPath: "inset(0 0 100% 0)",
        y: 40,
        duration: 1.0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-ink text-milk pt-24 md:pt-36 pb-0 border-t border-milk/10 overflow-hidden">
      {/* Section label */}
      <div className="px-6 md:px-12 lg:px-20 mb-8">
        <span className="font-mono text-milk/70 text-xs tracking-[0.15em] uppercase">
          (01) — Services
        </span>
      </div>

      {/* Section heading */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 md:mb-20 overflow-hidden">
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.85] tracking-[-0.03em] uppercase text-milk max-w-[14ch]"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          Three disciplines. One standard.
        </h2>
      </div>

      {/* Service rows */}
      <div>
        {SERVICES.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>


    </div>
  );
}
