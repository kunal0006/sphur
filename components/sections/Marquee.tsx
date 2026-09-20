"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "WEB DEVELOPMENT",
  "•",
  "BRANDING",
  "•",
  "CONTENT",
  "•",
  "PERFORMANCE MARKETING",
  "•",
  "TALENT",
  "•",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let velocity = 0;
    let currentSpeed = 1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          velocity = self.getVelocity();
          currentSpeed = 1 + Math.min(Math.abs(velocity) * 0.0003, 4);
          if (trackRef.current) {
            trackRef.current.style.animationDuration = `${24 / currentSpeed}s`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const repeated = [...WORDS, ...WORDS];

  return (
    <div
      ref={wrapperRef}
      className="w-full bg-ink overflow-hidden py-4 border-y border-milk/10 select-none"
      aria-label="Services ticker"
    >
      <div ref={trackRef} className="marquee-track flex items-center whitespace-nowrap">
        {repeated.map((word, i) => (
          <span
            key={i}
            className={`font-mono text-xs md:text-sm tracking-[0.2em] uppercase pr-8 md:pr-12 ${
              word === "•" ? "text-orange font-bold text-base" : "text-milk/60 font-medium"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
