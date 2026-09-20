"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
}

const SERVICES: Service[] = [
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

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Default to only first service open (clean, uncluttered editorial view)
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

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

  const toggleService = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      ref={sectionRef}
      className="bg-ink text-milk pt-24 md:pt-36 pb-12 border-t border-milk/10 overflow-hidden"
    >
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

      {/* Clean, uncluttered interactive accordion */}
      <div className="border-t border-milk/10">
        {SERVICES.map((service, index) => {
          const isOpen = activeIdx === index;

          return (
            <div
              key={service.number}
              className={`border-b border-milk/10 transition-colors duration-300 ${
                isOpen ? "bg-milk/[0.02]" : "hover:bg-milk/[0.01]"
              }`}
            >
              {/* Row Header Trigger */}
              <button
                type="button"
                onClick={() => toggleService(index)}
                className="w-full text-left px-6 md:px-12 lg:px-20 py-7 sm:py-9 md:py-10 flex items-center justify-between gap-4 group cursor-pointer focus-visible:ring-2 focus-visible:ring-orange focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={`service-detail-${index}`}
              >
                <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10 min-w-0 flex-1">
                  <span
                    className={`font-mono text-xs sm:text-sm tracking-[0.2em] transition-colors duration-300 shrink-0 ${
                      isOpen
                        ? "text-orange font-bold"
                        : "text-milk/40 group-hover:text-milk"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.5rem,4.2vw,5rem)] leading-none tracking-[-0.02em] uppercase transition-colors duration-300 break-words ${
                      isOpen
                        ? "text-orange"
                        : "text-milk group-hover:text-orange"
                    }`}
                  >
                    {service.title}
                  </span>
                </div>

                {/* Minimalist interactive toggle indicator */}
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "border-orange text-orange bg-orange/10 rotate-45"
                      : "border-milk/20 text-milk/60 group-hover:border-milk/50 group-hover:text-milk"
                  }`}
                  aria-hidden="true"
                >
                  <span className="font-mono text-lg leading-none font-light">
                    +
                  </span>
                </div>
              </button>

              {/* Clean, uncluttered details drawer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`service-detail-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-12 lg:px-20 pt-2 pb-10 sm:pb-12 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                      {/* Left: Punchy outcome statement */}
                      <div className="md:col-span-7">
                        <p className="font-body text-milk/80 text-base sm:text-lg leading-[1.65] max-w-[48ch]">
                          {service.description}
                        </p>
                      </div>

                      {/* Right: Curated core capabilities */}
                      <div className="md:col-span-5 md:pl-8 md:border-l md:border-milk/10">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 block mb-3.5">
                          Capabilities
                        </span>
                        <ul className="space-y-2.5">
                          {service.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className="font-mono text-xs sm:text-sm tracking-wide text-milk/75 flex items-center gap-3"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
