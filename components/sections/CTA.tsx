"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Discipline {
  id: string;
  label: string;
  badge: string;
  subject: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: "all",
    label: "Full Ecosystem",
    badge: "00",
    subject: "Full Ecosystem Inquiry (Web + Video + Social)",
  },
  {
    id: "web",
    label: "Web Development",
    badge: "01",
    subject: "Website Development Inquiry",
  },
  {
    id: "video",
    label: "Video Production",
    badge: "02",
    subject: "Video Editing & Production Inquiry",
  },
  {
    id: "social",
    label: "Social Growth",
    badge: "03",
    subject: "Social Media Marketing & Strategy Inquiry",
  },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  // Interaction states
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pointer drag tracking refs
  const dragStartX = useRef(0);
  const maxDistanceRef = useRef(300);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    email: "",
    brand: "",
    timeline: "Q3 / Q4",
    budget: "$10k – $25k",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const getMailtoUrl = useCallback((disciplineId: string) => {
    const item = DISCIPLINES.find((d) => d.id === disciplineId) || DISCIPLINES[0];
    const subject = encodeURIComponent(`SPHUR Project Inquiry — ${item.subject}`);
    const body = encodeURIComponent(
      `Hi SPHUR Team,\n\nI want to discuss a new project with you.\n\n` +
      `Discipline: ${item.label}\n` +
      `Brand / Company:\n` +
      `Estimated Timeline:\n` +
      `Budget Range:\n\n` +
      `Project Overview & Objectives:\n`
    );
    return `mailto:hello@sphur.com?subject=${subject}&body=${body}`;
  }, []);

  const triggerCompletion = useCallback(() => {
    setIsComplete(true);
    setDragProgress(1);

    // Provide haptic feedback if supported on mobile
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {}
    }

    // Launch mail client after a brief visual confirmation animation
    setTimeout(() => {
      window.location.href = getMailtoUrl(selectedDiscipline);
      // Also open modal fallback so user has an immediate direct form if mail client doesn't open
      setIsModalOpen(true);
    }, 450);

    // Auto reset after 8 seconds so user can reuse slider
    setTimeout(() => {
      setIsComplete(false);
      setDragProgress(0);
    }, 8000);
  }, [getMailtoUrl, selectedDiscipline]);

  // Handle pointer drag (mouse & touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isComplete) return;
    if (!trackRef.current || !knobRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const knobRect = knobRef.current.getBoundingClientRect();
    maxDistanceRef.current = Math.max(100, trackRect.width - knobRect.width - 8);

    dragStartX.current = e.clientX - dragProgress * maxDistanceRef.current;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isComplete) return;

    const deltaX = e.clientX - dragStartX.current;
    const currentProgress = Math.max(0, Math.min(1, deltaX / maxDistanceRef.current));
    setDragProgress(currentProgress);

    if (currentProgress >= 0.92) {
      setIsDragging(false);
      triggerCompletion();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isComplete) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (dragProgress >= 0.82) {
      triggerCompletion();
    } else {
      // Spring back to 0
      setDragProgress(0);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      triggerCompletion();
    }
  };

  // One-click copy email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@sphur.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:hello@sphur.com";
    }
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Headline scale on scroll
      if (!prefersReduced) {
        gsap.fromTo(
          headlineRef.current,
          { scale: 0.94 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }

      // Staggered Entrance
      gsap.from([headlineRef.current, subRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-ink min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-24 md:py-32 text-center relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Ambient SPHUR orange glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236,94,39,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
        <p
          ref={subRef}
          className="font-mono text-milk/40 text-xs tracking-[0.2em] uppercase"
        >
          (04) — INITIATE COLLABORATION
        </p>
      </div>

      {/* Main Headline */}
      <h2
        ref={headlineRef}
        id="cta-heading"
        className="font-display text-milk leading-[0.85] tracking-[-0.03em] uppercase select-none"
        style={{ fontSize: "var(--fs-hero)", marginBottom: "32px" }}
      >
        Let&apos;s
        <br />
        <span className="text-orange">Build.</span>
      </h2>

      {/* Streamlined Interactive Project Launchpad */}
      <div
        className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 relative z-10"
        style={{ marginTop: "20px" }}
      >
        {/* Step 1: Square, Prominent Discipline Buttons in One Single Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          {DISCIPLINES.map((item) => {
            const active = selectedDiscipline === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedDiscipline(item.id)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className={`relative overflow-hidden px-5 md:px-6 py-3 md:py-3.5 font-mono text-xs md:text-sm tracking-[0.08em] uppercase cursor-pointer rounded-none border whitespace-nowrap transition-colors duration-200 group ${
                  active
                    ? "bg-orange text-milk border-orange font-bold shadow-[0_0_25px_rgba(236,94,39,0.4)]"
                    : "border-milk/20 bg-milk/[0.03] text-milk/70 hover:text-milk hover:border-orange/80 hover:shadow-[0_8px_20px_rgba(236,94,39,0.2)]"
                }`}
              >
                {/* Smooth upward sweep background effect on hover */}
                {!active && (
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-orange/20 via-orange/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Step 2: Clean Tactile "Slide to Initiate" Track (Compact width) */}
        <div className="w-full max-w-[380px] mx-auto">
          <div
            ref={trackRef}
            onClick={(e) => {
              // Clicking the track directly initiates
              if (!isDragging && !isComplete) {
                const rect = trackRef.current?.getBoundingClientRect();
                if (rect && e.clientX > rect.left + 80) {
                  triggerCompletion();
                }
              }
            }}
            className={`relative w-full h-16 rounded-full border transition-colors duration-300 bg-milk/[0.03] backdrop-blur-md p-1.5 flex items-center select-none overflow-hidden cursor-pointer ${
              isComplete
                ? "border-orange bg-orange/15 shadow-[0_0_30px_rgba(236,94,39,0.3)]"
                : isDragging
                ? "border-orange/60 bg-milk/[0.05]"
                : "border-milk/15 hover:border-milk/30"
            }`}
          >
            {/* Dynamic Progress Fill Bar */}
            <div
              className={`absolute left-1 top-1 bottom-1 rounded-full pointer-events-none transition-all ${
                isDragging ? "duration-0" : "duration-500 ease-out"
              }`}
              style={{
                width: isComplete
                  ? "calc(100% - 8px)"
                  : `calc(${dragProgress * 100}% + 28px)`,
                background:
                  "linear-gradient(90deg, rgba(236,94,39,0.2) 0%, rgba(236,94,39,0.85) 100%)",
                opacity: dragProgress > 0.05 || isComplete ? 1 : 0,
              }}
            />

            {/* Clean Track Label Text (Arrows removed) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
              <span
                className={`font-mono text-xs md:text-sm tracking-[0.18em] uppercase font-bold transition-all duration-300 ${
                  isComplete
                    ? "text-milk scale-105"
                    : isDragging
                    ? "text-milk/90"
                    : "text-milk/60"
                }`}
              >
                {isComplete
                  ? "PROJECT INITIATED ✓"
                  : dragProgress > 0.65
                  ? "RELEASE TO CONNECT ⚡"
                  : "SLIDE TO INITIATE"}
              </span>
            </div>

            {/* Draggable Knob */}
            <div
              ref={knobRef}
              role="slider"
              tabIndex={0}
              aria-label="Slide to initiate project inquiry"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(dragProgress * 100)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleKeyDown}
              className={`relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center font-mono font-bold text-milk shadow-lg transition-transform focus-visible:ring-2 focus-visible:ring-orange focus-visible:outline-none touch-none select-none cursor-grab active:cursor-grabbing ${
                isComplete
                  ? "bg-milk text-ink scale-105 shadow-[0_0_20px_rgba(251,250,239,0.5)]"
                  : "bg-orange hover:bg-orange-pressed active:scale-95 shadow-[0_0_15px_rgba(236,94,39,0.5)]"
              } ${isDragging ? "scale-105" : ""}`}
              style={{
                transform: `translateX(${
                  isComplete
                    ? (trackRef.current?.offsetWidth || 400) - 64
                    : dragProgress * (maxDistanceRef.current || 300)
                }px)`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {isComplete ? (
                <svg
                  className="w-5 h-5 text-ink animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className={`w-4 h-4 text-milk transition-transform duration-200 ${
                    isDragging ? "translate-x-0.5" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Direct Brief Button + Minimal Email & Status Row */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-milk/70">
            <motion.button
              type="button"
              onClick={handleCopyEmail}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="hover:text-orange transition-all cursor-pointer flex items-center gap-2 py-1.5 px-3 rounded-none border border-milk/15 hover:border-orange/60 bg-milk/[0.02] hover:bg-orange/5 hover:shadow-[0_4px_16px_rgba(236,94,39,0.2)]"
              title="Click to copy email address"
            >
              <span>hello@sphur.com</span>
              <span className="text-orange text-[10px] font-bold">
                {copied ? "✓ COPIED" : "[COPY]"}
              </span>
            </motion.button>

            <span className="text-milk/20 hidden sm:inline">/</span>

            <span className="flex items-center gap-2 text-milk/70 text-[11px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              ACCEPTING Q3/Q4 PROJECTS
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="font-mono text-xs tracking-[0.14em] uppercase text-milk/70 hover:text-orange underline underline-offset-4 cursor-pointer transition-colors duration-200"
          >
            Or fill project brief online →
          </button>
        </div>
      </div>

      {/* Direct Project Brief Modal Fallback */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="brief-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-ink border border-milk/20 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-milk/60 hover:text-orange font-mono text-lg transition-colors p-2 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-orange mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                <span>DIRECT INQUIRY</span>
              </div>
              <h2
                id="brief-modal-title"
                className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-milk mb-2"
              >
                Initiate Project Brief
              </h2>
              <p className="font-mono text-xs text-milk/60 tracking-[0.1em] uppercase mb-6">
                Tell us about your brand. We review every brief within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-orange/20 border border-orange text-orange rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl uppercase text-milk">
                    Brief Dispatched
                  </h3>
                  <p className="font-mono text-xs text-milk/70 max-w-md mx-auto leading-relaxed">
                    Thank you, {modalForm.name || "partner"}. We have received your parameters and will reach out to {modalForm.email} shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setIsModalOpen(false);
                    }}
                    className="mt-4 inline-block font-mono text-xs tracking-[0.16em] uppercase bg-milk/10 hover:bg-orange hover:text-ink text-milk px-6 py-3 transition-colors border border-milk/20"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitting(true);
                    setTimeout(() => {
                      setFormSubmitting(false);
                      setFormSubmitted(true);
                    }, 600);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        placeholder="Mia Chen"
                        className="w-full bg-milk/5 border border-milk/15 px-3.5 py-2.5 text-sm text-milk placeholder:text-milk/30 focus:border-orange focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={modalForm.email}
                        onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                        placeholder="mia@vantastudio.com"
                        className="w-full bg-milk/5 border border-milk/15 px-3.5 py-2.5 text-sm text-milk placeholder:text-milk/30 focus:border-orange focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                      Brand / Company
                    </label>
                    <input
                      type="text"
                      value={modalForm.brand}
                      onChange={(e) => setModalForm({ ...modalForm, brand: e.target.value })}
                      placeholder="Vanta Studio"
                      className="w-full bg-milk/5 border border-milk/15 px-3.5 py-2.5 text-sm text-milk placeholder:text-milk/30 focus:border-orange focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                      Target Discipline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {DISCIPLINES.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDiscipline(d.id)}
                          className={`py-2 px-2 text-[10px] font-mono tracking-wider uppercase border text-center transition-colors cursor-pointer ${
                            selectedDiscipline === d.id
                              ? "bg-orange border-orange text-ink font-bold"
                              : "bg-milk/5 border-milk/15 text-milk/70 hover:border-milk/40"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                      Estimated Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["< $10k", "$10k – $25k", "$25k – $50k", "$50k+"].map((bracket) => (
                        <button
                          key={bracket}
                          type="button"
                          onClick={() => setModalForm({ ...modalForm, budget: bracket })}
                          className={`py-2 px-2 text-[10px] font-mono tracking-wider uppercase border text-center transition-colors cursor-pointer ${
                            modalForm.budget === bracket
                              ? "bg-milk border-milk text-ink font-bold"
                              : "bg-milk/5 border-milk/15 text-milk/70 hover:border-milk/40"
                          }`}
                        >
                          {bracket}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-milk/70 mb-1.5">
                      Project Goals & Scope
                    </label>
                    <textarea
                      rows={3}
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      placeholder="Give us a 2-line summary of what you need to build or transform..."
                      className="w-full bg-milk/5 border border-milk/15 p-3 text-sm text-milk placeholder:text-milk/30 focus:border-orange focus:outline-none font-mono"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 bg-orange text-ink font-mono text-xs tracking-[0.16em] uppercase font-bold py-3.5 px-6 hover:bg-milk transition-colors cursor-pointer text-center"
                    >
                      {formSubmitting ? "TRANSMITTING..." : "SUBMIT PROJECT BRIEF →"}
                    </button>
                    <a
                      href={getMailtoUrl(selectedDiscipline)}
                      className="sm:w-auto bg-milk/10 border border-milk/20 text-milk font-mono text-xs tracking-[0.16em] uppercase py-3.5 px-5 hover:bg-milk/20 transition-colors text-center"
                    >
                      Open Email App
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

