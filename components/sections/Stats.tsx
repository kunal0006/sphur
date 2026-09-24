"use client";

import { useEffect, useRef, useState } from "react";

import { AGENCY_STATS as STATS } from "@/data";

function CountUp({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [displayVal, setDisplayVal] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const rafId = requestAnimationFrame(() => {
        setDisplayVal(target);
      });
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            observer.disconnect();

            const startTime = performance.now();
            const duration = 1600; // ms

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out expo curve for snappy start and smooth deceleration
              const ease =
                progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = Math.round(ease * target);
              setDisplayVal(current);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setDisplayVal(target);
              }
            };

            requestAnimationFrame(update);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <span ref={containerRef}>
      {displayVal}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="bg-orange py-20 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden selection:bg-ink selection:text-orange"
      aria-label="Agency statistics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 max-w-7xl mx-auto w-full">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="text-center md:text-left"
          >
            <div
              className="font-display text-milk leading-[0.85] tracking-[-0.03em] mb-4 select-none"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)" }}
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
              />
            </div>
            <p className="font-mono text-milk/80 text-xs tracking-[0.12em] uppercase font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
