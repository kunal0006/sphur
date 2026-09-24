"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { TESTIMONIALS } from "@/data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Relaxed auto-advance (8.5 seconds) that pauses when hovered or interacted with
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[active];

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="bg-ink py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden relative border-t border-milk/5 select-none"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 font-mono text-orange text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span>(05) // CLIENT WORDS</span>
          </div>

          <h2
            className="font-display uppercase tracking-[-0.02em] text-milk leading-[0.95]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)" }}
          >
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* Company Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-milk/10">
          {TESTIMONIALS.map((item, idx) => {
            const isCurrent = idx === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  isCurrent
                    ? "bg-orange text-ink font-bold shadow-md shadow-orange/20"
                    : "bg-milk/5 text-milk/60 hover:text-milk hover:bg-milk/10 border border-milk/10"
                }`}
                style={isCurrent ? { color: "#0E0E0E" } : undefined}
                aria-pressed={isCurrent}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        {/* Testimonial Quote Display Box */}
        <div className="min-h-[220px] sm:min-h-[200px] flex flex-col justify-between mb-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <blockquote className="font-space font-light text-milk/95 text-lg sm:text-2xl md:text-3xl lg:text-[2rem] leading-relaxed tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                <span className="font-mono text-xs sm:text-sm text-milk/60 uppercase tracking-wider">
                  — {current.author}, {current.role}
                </span>
                <span className="font-mono text-xs sm:text-sm text-milk/30 hidden sm:inline">
                  •
                </span>
                <span className="font-mono text-xs sm:text-sm text-orange font-bold uppercase tracking-wider">
                  {current.company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Controls: Pagination Counter + Prev/Next Controls + CTA */}
        <div className="pt-6 border-t border-milk/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Number indicator */}
            <div className="font-mono text-xs text-milk/40 tracking-widest uppercase">
              <span className="text-orange font-bold">0{active + 1}</span>
              {" / "}
              <span>0{TESTIMONIALS.length}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-milk/15 flex items-center justify-center text-milk/70 hover:text-milk hover:border-orange hover:bg-orange/10 transition-colors"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-milk/15 flex items-center justify-center text-milk/70 hover:text-milk hover:border-orange hover:bg-orange/10 transition-colors"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>

            {/* Reading Status Pill */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-milk/30 hidden md:inline">
              {isPaused ? "[ PAUSED ]" : "[ AUTO-CYCLE ]"}
            </span>
          </div>

          {/* CTA: Start Your Project (links to contact/onboarding form) */}
          <div>
            <Link
              href="/#cta"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-orange text-ink font-mono font-bold text-xs uppercase tracking-widest hover:bg-orange/90 hover:scale-[1.02] transition-all shadow-lg shadow-orange/20"
              style={{ color: "#0E0E0E" }}
            >
              <span>Start Your Project</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
