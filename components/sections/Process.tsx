"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by listening. What do you actually need versus what you think you need? We run a focused audit of your business, audience, competitors, and channels. No assumptions. Raw signal only.",
    deliverable: "Strategy Document + Competitor Map",
  },
  {
    number: "02",
    title: "Direction",
    description:
      "From the audit, we craft the creative brief — messaging hierarchy, visual language, content framework. This is where most agencies guess. We validate. You approve every foundational decision before a single pixel moves.",
    deliverable: "Creative Brief + Style Frames",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Execution with zero tolerance for mediocrity. Code is clean, video is graded, content is scheduled and A/B tested. We work in 2-week sprints with async updates — no black box, no surprises.",
    deliverable: "Staged Deliverables + Review Cycles",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Handoff is not the finish line. We deploy, monitor, and optimize. Performance benchmarks set upfront are hit or we keep working. Launch day is a process, not an event.",
    deliverable: "Launch Report + 30-Day Performance Review",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeNumberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        stepRefs.current.forEach((step, i) => {
          gsap.from(step, { opacity: 0, duration: 0.5, delay: i * 0.1 });
        });
        return;
      }

      // On each step entering, update the big number
      stepRefs.current.forEach((step, i) => {
        if (!step) return;

        gsap.from(step, {
          opacity: 0,
          x: 35,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        ScrollTrigger.create({
          trigger: step,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            if (activeNumberRef.current) {
              gsap.to(activeNumberRef.current, {
                opacity: 0,
                y: -15,
                duration: 0.22,
                ease: "power2.in",
                onComplete: () => {
                  if (activeNumberRef.current) {
                    activeNumberRef.current.textContent = STEPS[i].number;
                    gsap.to(activeNumberRef.current, {
                      opacity: 1,
                      y: 0,
                      duration: 0.35,
                      ease: "power4.out",
                    });
                  }
                },
              });
            }
          },
          onEnterBack: () => {
            if (activeNumberRef.current) {
              gsap.to(activeNumberRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.22,
                ease: "power2.in",
                onComplete: () => {
                  if (activeNumberRef.current) {
                    activeNumberRef.current.textContent = STEPS[i].number;
                    gsap.to(activeNumberRef.current, {
                      opacity: 1,
                      y: 0,
                      duration: 0.35,
                      ease: "power4.out",
                    });
                  }
                },
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-milk relative"
      aria-labelledby="process-heading"
    >
      <div className="grid md:grid-cols-[1fr_1fr] min-h-screen">
        {/* Left: sticky step number in optical center */}
        <div
          ref={numberRef}
          className="hidden md:flex flex-col justify-center px-12 lg:px-20 h-screen sticky top-0 select-none"
          aria-hidden="true"
        >
          <div className="font-mono text-ink/20 text-xs tracking-[0.15em] uppercase mb-8">
            (03) — Process
          </div>
          <span
            ref={activeNumberRef}
            className="font-display text-ink leading-none tracking-[-0.03em] select-none"
            style={{ fontSize: "clamp(8rem, 20vw, 22rem)" }}
          >
            01
          </span>
        </div>

        {/* Right: scrolling steps with top paragraph shifted downwards */}
        <div
          className="px-6 md:px-12 pb-24 md:pb-36 space-y-24 md:space-y-36"
          style={{ paddingTop: "174px" }}
        >
          {/* Mobile label */}
          <div className="md:hidden font-mono text-ink/30 text-xs tracking-[0.15em] uppercase mb-3">
            (03) — Process
          </div>

          <div className="md:hidden mb-8">
            <h2
              id="process-heading"
              className="font-display text-ink leading-[0.85] tracking-[-0.03em] uppercase text-4xl"
            >
              How We Work
            </h2>
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="space-y-6"
            >
              {/* Mobile step number */}
              <div className="flex items-center gap-4 md:hidden">
                <span className="font-display text-orange text-5xl leading-none">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display text-ink text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] uppercase">
                {step.title}
              </h3>
              <p className="font-body text-ink/70 text-base md:text-lg leading-[1.65] max-w-[48ch]">
                {step.description}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                <span className="font-mono text-xs tracking-[0.1em] text-ink/40 uppercase">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
