"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [
            headlineRef.current,
            bodyRef.current,
            ctaRef.current,
            metaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      // Smooth cinematic entrance on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: "power4.out",
      })
        .from(
          bodyRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          metaRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] md:min-h-screen bg-ink text-milk flex flex-col justify-between py-16 md:py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-labelledby="brand-statement-heading"
    >
      {/* Ambient warm orange radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.16) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Subtle architectural crosshair line (from screenshot) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px pointer-events-none bg-gradient-to-r from-transparent via-milk/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-96 pointer-events-none bg-gradient-to-b from-transparent via-milk/10 to-transparent"
      />

      {/* Section index tracker */}
      <div className="relative z-10 font-mono text-xs tracking-[0.2em] uppercase text-milk/30 mb-8 md:mb-12 select-none">
        (01) — STATEMENT
      </div>

      {/* Main Content Area (Clean, Uncluttered, CTA-Driven) */}
      <div className="relative z-10 max-w-4xl space-y-8 md:space-y-10 my-auto">
        {/* Headline with serif italic impossible in orange */}
        <h2
          ref={headlineRef}
          id="brand-statement-heading"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-milk tracking-tight leading-[1.08] select-none"
        >
          We make brands{" "}
          <span className="italic text-orange font-normal">impossible</span>{" "}
          to ignore.
        </h2>

        {/* Agency Positioning Paragraph */}
        <p
          ref={bodyRef}
          className="font-body text-milk/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.65] max-w-2xl font-light"
        >
          Sphur is a creative and digital marketing agency in Delhi NCR. Web,
          branding, content, performance marketing and talent, under one roof.
        </p>

        {/* Action CTAs: High-impact, Focused, Uncluttered */}
        <div
          ref={ctaRef}
          className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md sm:max-w-none"
        >
          {/* Primary CTA Button with WCAG 2.2 AA compliant contrast */}
          <MagneticButton>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center h-[58px] px-9 sm:px-11 bg-orange text-ink font-mono text-xs sm:text-sm tracking-[0.16em] uppercase font-bold overflow-hidden transition-all duration-300 hover:bg-milk hover:text-ink shadow-[0_0_35px_rgba(236,94,39,0.35)] hover:shadow-[0_0_55px_rgba(236,94,39,0.6)] focus-visible:ring-2 focus-visible:ring-milk w-full sm:w-auto text-center"
            >
              <span className="text-ink font-bold" style={{ color: "#0e0e0e" }}>
                START A PROJECT
              </span>
              <span
                aria-hidden="true"
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </a>
          </MagneticButton>

          {/* Secondary CTA Button */}
          <MagneticButton>
            <a
              href="#work"
              className="group inline-flex items-center justify-center h-[58px] px-9 sm:px-11 border border-milk/25 text-milk font-mono text-xs sm:text-sm tracking-[0.16em] uppercase font-semibold transition-all duration-300 hover:border-milk hover:bg-milk/10 hover:text-milk focus-visible:ring-2 focus-visible:ring-orange w-full sm:w-auto text-center"
            >
              <span>SEE OUR WORK</span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Location / Coordinates Footer */}
      <div
        ref={metaRef}
        className="relative z-10 pt-10 mt-12 md:mt-16 border-t border-milk/10 flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-milk/70 select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          <span className="text-milk/60 font-medium">DELHI NCR / HQ</span>
        </div>
        <div>
          <span>28.6139° N, 77.2090° E</span>
        </div>
      </div>
    </section>
  );
}
