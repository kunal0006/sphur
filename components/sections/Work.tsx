"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

import { PROJECTS, PROJECT_CATEGORIES as CATEGORIES, isProjectMatch } from "@/data";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const handleFilterClick = (catId: string) => {
    setActiveCategory(catId);

    // Find first matching project index
    const matchIdx =
      catId === "ALL"
        ? 0
        : PROJECTS.findIndex((p) => isProjectMatch(p, catId));
    if (matchIdx === -1) return;

    // Desktop: calculate pinned ScrollTrigger position
    const st = ScrollTrigger.getById("work-pin");
    if (st) {
      const progress = matchIdx / Math.max(1, PROJECTS.length - 1);
      const targetScroll = st.start + (st.end - st.start) * progress;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else if (trackRef.current) {
      // Mobile: native horizontal scroll to card
      const cards = trackRef.current.querySelectorAll(".work-card");
      if (cards[matchIdx]) {
        cards[matchIdx].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Butter-smooth pinned horizontal showcase
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Calculate travel distance: total track width minus visible screen width plus margin
        const getDistance = () =>
          track.scrollWidth - window.innerWidth + 120;

        // Unified butter-smooth horizontal scroll tween + pinning
        const anim = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            id: "work-pin",
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Smooth progress bar update
              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${self.progress})`;
              }

              // Real-time project counter update based on scrub position
              if (counterRef.current) {
                const total = PROJECTS.length;
                const currentIdx = Math.min(
                  total,
                  Math.max(1, Math.ceil(self.progress * total))
                );
                counterRef.current.textContent = `0${currentIdx} / 0${total}`;
              }
            },
          },
        });

        // Parallax image depth inside cards
        const cardImages = track.querySelectorAll(".work-card-img");
        cardImages.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.08, xPercent: -2 },
            {
              scale: 1,
              xPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getDistance()}`,
                scrub: 1,
              },
            }
          );
        });

        return () => {
          anim.kill();
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-ink text-milk relative w-full overflow-hidden border-t border-milk/10 md:h-screen md:min-h-[660px] md:max-h-[1080px] md:flex md:flex-col md:justify-between select-none"
      aria-labelledby="work-heading"
    >
      {/* ============================================================
          1. INTEGRATED PINNED HEADER
          Stays anchored throughout the horizontal journey
          ============================================================ */}
      <div
        className="px-6 md:px-12 lg:px-20 pb-4 md:pb-5 border-b border-milk/10"
        style={{ paddingTop: "104px" }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Left: Section Eyebrow + Title + Category Filter Sub-Bar */}
          <div className="flex flex-col gap-3.5">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.2em] uppercase text-milk/70 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                <span>(02) — PORTFOLIO ARCHIVE</span>
              </div>
              <h2
                id="work-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-milk uppercase tracking-tight leading-none"
              >
                Selected Projects
              </h2>
            </div>

            {/* Editorial Category Sub-Bar directly below SELECTED PROJECTS */}
            <div
              className="inline-flex items-center gap-1.5 p-1 bg-milk/[0.04] border border-milk/10 rounded-full backdrop-blur-md max-w-full overflow-x-auto scrollbar-none self-start"
              role="tablist"
              aria-label="Filter projects by discipline"
            >
              {CATEGORIES.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleFilterClick(tab.id)}
                    className={`relative px-3.5 sm:px-4 py-2 min-h-[44px] rounded-full font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase transition-colors duration-200 flex items-center gap-2 cursor-pointer flex-shrink-0 select-none ${
                      isActive
                        ? "text-ink font-semibold"
                        : "text-milk/70 hover:text-milk hover:bg-milk/[0.04]"
                    }`}
                  >
                    {/* Animated Sliding Capsule Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-milk rounded-full shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}

                    {/* Content Layer with Pulsing Dot and Count */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse flex-shrink-0" />
                      )}
                      <span>{tab.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full transition-colors font-mono ${
                          isActive
                            ? "bg-ink/10 text-ink/75 font-bold"
                            : "bg-milk/10 text-milk/40"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Project Counter & Horizontal Progress Bar */}
          <div className="flex items-center gap-5 font-mono text-xs tracking-[0.16em] uppercase text-milk/60 md:pb-2">
            {/* Active project index counter */}
            <span
              ref={counterRef}
              className="text-milk font-semibold min-w-[54px]"
            >
              01 / 06
            </span>

            {/* Scrub progress track */}
            <div
              className="hidden sm:block w-24 md:w-36 h-[2px] bg-milk/15 rounded-full overflow-hidden"
              aria-hidden="true"
            >
              <div
                ref={progressFillRef}
                className="h-full w-full bg-orange origin-left scale-x-0 transition-transform duration-100 ease-out will-change-transform"
              />
            </div>

            {/* Visual scroll prompt */}
            <div className="hidden md:flex items-center gap-1.5 text-orange">
              <span>SCRUB</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. HORIZONTAL PROJECT CARD RUNWAY
          On Desktop: GSAP-pinned smooth scrub runway
          On Mobile: Fluid native horizontal touch-snap carousel
          ============================================================ */}
      <div className="flex-1 flex items-center overflow-x-auto md:overflow-hidden scrollbar-none py-6 md:py-4">
        <div
          ref={trackRef}
          className="flex items-center gap-6 md:gap-10 px-6 md:px-12 lg:px-20 will-change-transform snap-x md:snap-none"
        >
          {PROJECTS.map((project) => {
            const isMatch = isProjectMatch(project, activeCategory);
            return (
              <div
                key={project.id}
                className={`work-card group flex-shrink-0 w-[310px] sm:w-[380px] md:w-[440px] lg:w-[490px] cursor-pointer snap-center transition-all duration-500 ease-out ${
                  isMatch
                    ? "opacity-100 scale-100"
                    : "opacity-20 grayscale scale-[0.96] blur-[0.5px] pointer-events-none"
                }`}
                data-cursor="pointer"
              >
              {/* Media Canvas with hover zoom and atmospheric lighting */}
              <div className="relative w-full h-[360px] sm:h-[420px] md:h-[450px] lg:h-[490px] overflow-hidden border border-milk/15 group-hover:border-orange/80 transition-all duration-500 bg-ink/60">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="work-card-img object-cover transition-transform duration-700 ease-entrance group-hover:scale-105"
                  sizes="(max-width: 768px) 380px, (max-width: 1200px) 490px, 600px"
                  priority
                  loading="eager"
                />

                {/* Dark gradient for typographic legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Floating category badge with backdrop blur */}
                <div className="absolute top-4 left-4 font-mono text-[11px] tracking-widest uppercase bg-ink/75 backdrop-blur-md border border-milk/15 text-milk px-3.5 py-1.5 select-none">
                  {project.category}
                </div>

                {/* Deliverable pills at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-milk">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] text-milk/60 bg-ink/80 backdrop-blur-sm px-2.5 py-1 border border-milk/10">
                    {project.deliverable}
                  </span>
                </div>
              </div>

              {/* Card Meta & Interactive Link */}
              <div className="pt-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-orange text-[11px] tracking-[0.16em] uppercase font-semibold mb-1">
                    <span>{project.id}</span>
                    <span className="text-milk/30">{"//"}</span>
                    <span>CASE STUDY</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-milk uppercase tracking-tight group-hover:text-orange transition-colors duration-300">
                    {project.name}
                  </h3>
                </div>

                {/* Magnetic Circular Arrow Button */}
                <div className="w-11 h-11 rounded-full border border-milk/20 flex items-center justify-center font-mono text-sm text-milk/70 group-hover:border-orange group-hover:bg-orange group-hover:text-milk transition-all duration-300 flex-shrink-0">
                  ↗
                </div>
              </div>
            </div>
          );
        })}

          {/* ============================================================
              3. CLOSING BRIDGE CARD (Seamless handoff into Process)
              Prevents abrupt ending at the 5th project
              ============================================================ */}
          <div className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] h-[360px] sm:h-[420px] md:h-[450px] lg:h-[490px] border border-dashed border-milk/20 hover:border-orange/60 transition-colors duration-500 flex flex-col justify-between p-8 bg-gradient-to-br from-ink via-ink/80 to-milk/[0.02] snap-center">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-orange mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
                <span>(03) — NEXT UP</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-milk uppercase tracking-tight mb-4">
                How We Deliver
              </h3>
              <p className="font-body text-sm text-milk/60 leading-relaxed max-w-[28ch]">
                Every outcome above followed our disciplined 4-step execution framework.
              </p>
            </div>

            <div>
              <a
                href="#process"
                className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.16em] uppercase bg-milk/10 hover:bg-orange text-milk min-h-[44px] px-5 py-3 transition-colors duration-300 border border-milk/15"
              >
                <span>SEE PROCESS</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          4. BOTTOM STATUS BAR
          Subtle editorial metadata grounding the frame
          ============================================================ */}
      <div className="px-6 md:px-12 lg:px-20 py-4 border-t border-milk/10 flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-milk/70">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-milk/40" />
          <span>06 ARCHIVED CASE STUDIES // DELIVERED AT ZERO COMPROMISE</span>
        </div>
        <div className="hidden md:block text-milk/30">
          <span>SPHUR WORK GALLERY</span>
        </div>
      </div>
    </section>
  );
}
