"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";

import { DETAILED_SERVICES as SERVICES_DATA } from "@/data";

type ModalType = "talent" | "event" | "audit" | null;

export default function ServicesPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [submittedModal, setSubmittedModal] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    email: "",
    phone: "",
    details: "",
    type: "",
  });

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSubmittedModal(null);
    setFormData({
      name: "",
      brand: "",
      email: "",
      phone: "",
      details: "",
      type: "",
    });
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, closeModal]);

  const handleFormSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    // Simulate brief submission
    setSubmittedModal(type);
  };

  return (
    <div className="min-h-screen bg-ink text-milk flex flex-col justify-between selection:bg-orange selection:text-milk noise-overlay relative overflow-x-hidden w-full max-w-full">
      <Nav />

      {/* Ambient glowing atmosphere */}
      <div
        aria-hidden="true"
        className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[750px] h-[450px] sm:h-[550px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 pt-32 sm:pt-40 md:pt-44 pb-24 max-w-7xl mx-auto w-full">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange/25 bg-orange/10 text-orange font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span>02 // SERVICES & CAPABILITIES</span>
          </div>
          <span className="font-mono text-xs text-milk/30 tracking-widest hidden sm:inline">
            •
          </span>
          <span className="font-mono text-xs text-milk/50 tracking-widest uppercase hidden sm:inline">
            END-TO-END EXECUTION
          </span>
        </div>

        {/* Hero Section */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase tracking-tight text-milk mb-6 select-none max-w-5xl text-[1.65rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.2rem]"
          >
            <span className="block leading-[1.05]">
              One Team.{" "}
              <span className="text-orange">Every Piece of Your</span>
            </span>
            <span className="block leading-[1.05] mt-[20px]">
              Growth Puzzle.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space font-light text-milk/75 text-base sm:text-xl md:text-2xl max-w-3xl leading-relaxed mb-10"
          >
            From the first sketch of your logo to the last click on your ad,
            Sphur handles it end to end.
          </motion.p>

          {/* Quick value indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-milk/10">
            <div>
              <p className="font-mono text-orange text-lg sm:text-xl font-bold">
                8
              </p>
              <p className="font-mono text-[11px] sm:text-xs text-milk/50 uppercase tracking-wider">
                Full-Service Disciplines
              </p>
            </div>
            <div>
              <p className="font-mono text-orange text-lg sm:text-xl font-bold">
                100%
              </p>
              <p className="font-mono text-[11px] sm:text-xs text-milk/50 uppercase tracking-wider">
                In-House Team Synergy
              </p>
            </div>
            <div>
              <p className="font-mono text-orange text-lg sm:text-xl font-bold">
                0
              </p>
              <p className="font-mono text-[11px] sm:text-xs text-milk/50 uppercase tracking-wider">
                Vendor Handoff Friction
              </p>
            </div>
            <div>
              <p className="font-mono text-orange text-lg sm:text-xl font-bold">
                Global
              </p>
              <p className="font-mono text-[11px] sm:text-xs text-milk/50 uppercase tracking-wider">
                Digital & On-Ground Reach
              </p>
            </div>
          </div>
        </section>

        {/* 8 Services Grid */}
        <section aria-label="All Sphur Services" className="mb-20 sm:mb-28">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-milk/10">
            <h2 className="font-mono text-xs tracking-[0.2em] text-milk/50 uppercase">
              {"//"} All 8 Core Practices
            </h2>
            <span className="font-mono text-xs text-orange">
              01 — 08
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {SERVICES_DATA.map((service, index) => {
              const hasCta = Boolean(service.ctaLabel && service.ctaModalType);
              const isHighlight = hasCta;

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
                  className={`group relative flex flex-col justify-between rounded-2xl p-5 sm:p-7 md:p-9 transition-all duration-300 ${
                    isHighlight
                      ? "border border-orange/30 bg-gradient-to-br from-milk/[0.04] to-orange/[0.04] hover:border-orange hover:shadow-[0_0_30px_rgba(236,94,39,0.12)]"
                      : "border border-milk/10 bg-milk/[0.02] hover:border-milk/25 hover:bg-milk/[0.04]"
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="font-mono text-base sm:text-lg font-bold text-orange tracking-wider shrink-0">
                        {service.number}.
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-milk/50 border border-milk/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-milk uppercase tracking-tight mb-3 group-hover:text-orange transition-colors">
                      {service.title}
                    </h3>

                    <p className="font-space text-milk/75 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Footer / Pills & Action */}
                  <div className="pt-6 border-t border-milk/10">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.pills.map((pill) => (
                        <span
                          key={pill}
                          className="font-mono text-[11px] text-milk/70 bg-milk/5 border border-milk/10 px-2.5 py-1 rounded-md"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>

                    {hasCta ? (
                      <button
                        type="button"
                        onClick={() => setActiveModal(service.ctaModalType!)}
                        className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl border border-orange/40 bg-orange/10 text-orange font-mono text-xs font-bold uppercase tracking-wider hover:bg-orange hover:text-ink transition-all duration-200 group/btn select-none"
                      >
                        <span>{service.ctaLabel}</span>
                        <span className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1">
                          →
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between text-milk/30 font-mono text-xs pt-1">
                        <span>Fully Integrated Practice</span>
                        <span className="text-orange/60">●</span>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA: Free Brand Audit (as requested in screenshot) */}
        <section aria-label="Brand Audit CTA" className="relative">
          <div className="relative rounded-3xl border border-orange/40 bg-gradient-to-b from-milk/[0.05] to-orange/[0.08] p-8 sm:p-12 md:p-16 overflow-hidden">
            {/* Background decorative glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(236,94,39,0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-orange tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Complimentary Consultation
              </span>

              <h2
                className="font-display uppercase tracking-tight text-milk mb-4 leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Not sure what you need?
              </h2>

              <p className="font-space text-milk/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                Let our senior team audit your identity, web presence, and paid
                campaigns. We’ll uncover your biggest growth bottlenecks and map
                the exact levers to pull.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("audit")}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange text-ink font-mono font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl hover:bg-orange/90 hover:scale-[1.01] transition-all shadow-lg shadow-orange/20 select-none"
                  style={{ color: "#0E0E0E" }}
                >
                  <span>Get a Free Brand Audit</span>
                  <span className="text-base font-bold">→</span>
                </button>

                <Link
                  href="/#cta"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-milk/20 text-milk font-mono text-xs sm:text-sm tracking-widest uppercase rounded-xl hover:bg-milk/10 transition-colors"
                >
                  <span>Or Start A Direct Project</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS FOR TALENT, EVENT, AND BRAND AUDIT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#141414] border border-milk/15 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-milk"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-5 right-5 text-milk/40 hover:text-milk text-xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-milk/10 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Success Confirmation State */}
              {submittedModal ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange/20 border border-orange flex items-center justify-center text-orange text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl text-milk uppercase mb-2">
                    Brief Received!
                  </h3>
                  <p className="font-space text-milk/75 text-sm leading-relaxed mb-6">
                    {submittedModal === "talent" &&
                      "Our Talent & Casting director has received your requirements and will contact you with curated portfolio options within 24 hours."}
                    {submittedModal === "event" &&
                      "Our Event Planning and Production team has received your brief. We'll connect shortly to schedule an initial concept and logistics walkthrough."}
                    {submittedModal === "audit" &&
                      "Your Brand Audit request is confirmed. Our senior strategists will analyze your touchpoints and deliver actionable insights."}
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-orange text-ink font-mono font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-orange/90 transition-colors"
                    style={{ color: "#0E0E0E" }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Brief Forms */
                <>
                  {/* Modal Header */}
                  <div className="mb-6 pr-8">
                    <span className="font-mono text-orange text-[10px] tracking-[0.2em] uppercase block mb-1">
                      {activeModal === "talent" && "// SHORT BRIEF FORM"}
                      {activeModal === "event" && "// EVENT BRIEF FORM"}
                      {activeModal === "audit" && "// COMPLIMENTARY REVIEW"}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-milk uppercase tracking-tight">
                      {activeModal === "talent" && "Request Talent"}
                      {activeModal === "event" && "Plan Your Event"}
                      {activeModal === "audit" && "Request Free Brand Audit"}
                    </h3>
                    <p className="font-space text-xs sm:text-sm text-milk/60 mt-1">
                      {activeModal === "talent" &&
                        "Tell us what faces, presenters, or creators your campaign requires."}
                      {activeModal === "event" &&
                        "From domestic brand activations to overseas launches, tell us your vision."}
                      {activeModal === "audit" &&
                        "Receive an objective analysis of your brand identity, website, and ad performance."}
                    </p>
                  </div>

                  {/* The Form */}
                  <form
                    onSubmit={(e) => handleFormSubmit(e, activeModal!)}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full bg-milk/5 border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk placeholder:text-milk/30 font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                          Brand / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.brand}
                          onChange={(e) =>
                            setFormData({ ...formData, brand: e.target.value })
                          }
                          placeholder="Your Brand"
                          className="w-full bg-milk/5 border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk placeholder:text-milk/30 font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="you@company.com"
                          className="w-full bg-milk/5 border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk placeholder:text-milk/30 font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Dynamic Field Depending on Modal */}
                    {activeModal === "talent" && (
                      <div>
                        <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                          Talent Category Required
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="w-full bg-[#1c1c1c] border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                        >
                          <option value="">Select Talent Category</option>
                          <option value="presenter">On-Camera Presenter / Host</option>
                          <option value="model">Commercial / Fashion Model</option>
                          <option value="actor">Actor / Voiceover Talent</option>
                          <option value="creator">Digital Creator / UGC Specialist</option>
                          <option value="custom">Multiple / Custom Brief</option>
                        </select>
                      </div>
                    )}

                    {activeModal === "event" && (
                      <div>
                        <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                          Event Scope
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="w-full bg-[#1c1c1c] border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                        >
                          <option value="">Select Event Type</option>
                          <option value="activation">Brand Activation / Pop-Up</option>
                          <option value="launch">Product Launch Premiere</option>
                          <option value="corporate">Corporate Gala / Experience</option>
                          <option value="overseas">Overseas / International Production</option>
                        </select>
                      </div>
                    )}

                    {activeModal === "audit" && (
                      <div>
                        <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                          Website URL or Instagram Handle *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          placeholder="https://yourbrand.com or @brand"
                          className="w-full bg-milk/5 border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk placeholder:text-milk/30 font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-mono text-[11px] text-milk/60 uppercase tracking-wider mb-1.5">
                        {activeModal === "audit"
                          ? "What is your main growth bottleneck?"
                          : "Project Notes / Brief Summary *"}
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder={
                          activeModal === "talent"
                            ? "Tell us about the shoot, dates, location, and desired profile..."
                            : activeModal === "event"
                            ? "Share expected guest count, location, target dates, and key goals..."
                            : "E.g. low website conversion, unclear identity, or declining ROAS..."
                        }
                        className="w-full bg-milk/5 border border-milk/15 focus:border-orange focus:ring-1 focus:ring-orange text-milk placeholder:text-milk/30 font-space text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-orange text-ink font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-orange/90 transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange/20"
                      style={{ color: "#0E0E0E" }}
                    >
                      <span>
                        {activeModal === "talent" && "Send Talent Brief →"}
                        {activeModal === "event" && "Submit Event Brief →"}
                        {activeModal === "audit" && "Request Audit Review →"}
                      </span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
