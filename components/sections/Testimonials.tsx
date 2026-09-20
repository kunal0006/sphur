"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const TESTIMONIALS = [
  {
    quote:
      "SPHUR didn't hand us a website. They handed us a competitive advantage. Within 60 days of launch, inbound leads tripled.",
    author: "Mia Chen",
    title: "CEO, Vanta Studio",
  },
  {
    quote:
      "The video team understood our brand better than we did. First cut was 90% there. That doesn't happen.",
    author: "James Okafor",
    title: "Creative Director, Parallax Films",
  },
  {
    quote:
      "Social used to be an afterthought. SPHUR built us a content engine. We went from 2K to 34K followers in a quarter.",
    author: "Priya Nair",
    title: "Founder, Oaks & Co.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const AUTO_ADVANCE = 5000;

  const goTo = useCallback(
    (index: number) => {
      const next = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
      if (!quoteRef.current || !progressRef.current) return;

      gsap.to(quoteRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActive(next);
          if (quoteRef.current) {
            gsap.fromTo(
              quoteRef.current,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.5, ease: "power4.out" }
            );
          }
        },
      });

      // Reset progress bar
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTO_ADVANCE / 1000,
          ease: "none",
          transformOrigin: "left center",
        }
      );
    },
    []
  );

  // Auto-advance
  useEffect(() => {
    const tick = () => {
      goTo(active + 1);
    };

    timerRef.current = setTimeout(tick, AUTO_ADVANCE);

    // Initial progress bar
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTO_ADVANCE / 1000,
          ease: "none",
          transformOrigin: "left center",
        }
      );
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, goTo]);

  // Drag to slide
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStart.current;
    if (Math.abs(delta) > 50) {
      if (timerRef.current) clearTimeout(timerRef.current);
      goTo(delta < 0 ? active + 1 : active - 1);
    }
  };

  return (
    <section
      className="bg-ink py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="font-mono text-milk/20 text-xs tracking-[0.15em] uppercase mb-16">
        (04) — What They Say
      </div>

      <div
        className="cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <blockquote
          ref={quoteRef}
          className="font-display text-milk leading-[1.05] tracking-[-0.02em] uppercase mb-12"
          style={{ fontSize: "clamp(1.8rem, 4vw, 4.5rem)" }}
        >
          &ldquo;{TESTIMONIALS[active].quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-orange" />
          <div>
            <p className="font-body text-milk text-sm font-medium">
              {TESTIMONIALS[active].author}
            </p>
            <p className="font-mono text-milk/70 text-xs tracking-[0.1em]">
              {TESTIMONIALS[active].title}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation dots + progress bar */}
      <div className="mt-12 flex items-center gap-6">
        <div className="flex items-center -ml-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                goTo(i);
              }}
              className="p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-full"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 block ${
                  i === active ? "bg-orange scale-110" : "bg-milk/30 hover:bg-milk/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex-1 h-px bg-milk/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full bg-orange"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
