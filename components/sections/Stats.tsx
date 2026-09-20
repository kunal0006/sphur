"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 4, suffix: "+", label: "Years of Craft" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "Disciplines, One Team" },
  { value: 0, suffix: "", label: "Templates Used. Ever." },
];

function CountUp({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix: string;
  trigger: Element | null;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el || !trigger) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger,
      start: "top 70%",
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });
  }, [target, suffix, trigger]);

  return (
    <span ref={numRef}>
      0{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      ref={sectionRef}
      className="bg-orange py-20 md:py-32 px-6 md:px-12 lg:px-20"
      aria-label="Agency statistics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => {
              statRefs.current[i] = el;
            }}
            className="text-center md:text-left"
          >
            <div
              className="font-display text-milk leading-[0.85] tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                trigger={statRefs.current[i]}
              />
            </div>
            <p className="font-mono text-milk/60 text-xs tracking-[0.1em] uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
