"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LETTERS = ["S", "P", "H", "U", "R"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hindiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip heavy animation if reduced motion is preferred
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Character stagger mask reveal
        gsap.from(lettersRef.current, {
          clipPath: "inset(0 0 100% 0)",
          y: 40,
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.06,
          delay: 0.2,
        });

        // Hindi calligraphic label reveal
        gsap.from(hindiRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.35,
        });

        // Sub-line reveal
        gsap.from(subRef.current, {
          clipPath: "inset(0 0 100% 0)",
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.7,
        });

        // Parallax: content scrolls together at 0.35×, blob at 0.2×
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const vh = window.innerHeight;
            gsap.set(contentRef.current, {
              y: progress * vh * 0.35,
            });
            gsap.set(blobRef.current, {
              y: progress * vh * 0.2,
            });
          },
        });

        // Fade out scroll indicator on first scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top+=100 top",
          onEnter: () => {
            gsap.to(scrollIndRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      } else {
        // Reduced motion: simple fade in
        gsap.from([lettersRef.current, hindiRef.current, subRef.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-milk noise-overlay"
      aria-label="Hero"
    >
      {/* Animated orange blob */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-drift 8s ease-in-out infinite alternate",
        }}
      />

      {/* Main content: perfectly centered */}
      <div
        ref={contentRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center w-full"
      >
        {/* Headline + Hindi label wrapper */}
        <div
          ref={headlineRef}
          className="relative inline-block"
          style={{ perspective: "1000px" }}
        >
          {/* Hindi label — calligraphic heritage mark placed cleanly above SPHUR */}
          <div
            className="absolute left-1 sm:left-2 top-0 -translate-y-[82%] sm:-translate-y-[86%] z-20 text-left pointer-events-none select-none"
            aria-label="स्फुर — SPHUR in Devanagari"
          >
            <div ref={hindiRef}>
              <span
                className="text-ink leading-none inline-block select-none"
                style={{
                  fontFamily: "'AMS Manthan', serif",
                  fontWeight: "normal",
                  fontSize: "clamp(2.2rem, 5.2vw, 5.2rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  color: "#0e0e0e",
                  filter: "drop-shadow(0 3px 12px rgba(14, 14, 14, 0.12))",
                }}
                aria-hidden="true"
              >
                Sfur
              </span>
            </div>
          </div>

          {/* Semantic H1 Headline */}
          <h1 className="overflow-hidden">
            <span className="sr-only">SPHUR — Creative Agency</span>
            <span
              className="font-display text-orange leading-[0.85] tracking-[-0.03em] uppercase select-none block"
              style={{ fontSize: "var(--fs-hero)" }}
              aria-hidden="true"
            >
              {LETTERS.map((letter, i) => (
                <span
                  key={letter}
                  ref={(el) => {
                    lettersRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ clipPath: "inset(0 0 0% 0)" }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Meaning of Sphur */}
        <div className="mt-5 md:mt-7 overflow-hidden">
          <p
            ref={subRef}
            className="font-space font-medium text-ink text-xs sm:text-sm md:text-base tracking-[0.14em] md:tracking-[0.18em] select-none"
            style={{ clipPath: "inset(0 0 0% 0)" }}
          >
            to flash into consciousness
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink/30 uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-ink/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-orange"
            style={{
              height: "50%",
              animation: "scroll-line 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob-drift {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          100% { transform: translate(-50%, -50%) scale(1.3) rotate(15deg); }
        }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}} />
    </section>
  );
}
