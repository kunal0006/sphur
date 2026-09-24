"use client";

import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";

import { DEPARTMENTS, SITE_CONFIG } from "@/data";

const CATEGORIES = [
  { id: "all", label: "All Disciplines", count: 10 },
  { id: "creative", label: "Creative & Design", count: 4 },
  { id: "production", label: "Production & Talent", count: 2 },
  { id: "strategy", label: "Strategy & Operations", count: 3 },
  { id: "technical", label: "Web Engineering", count: 1 },
];

export default function TeamPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDepts =
    selectedCategory === "all"
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.category === selectedCategory);

  const totalMembers = DEPARTMENTS.reduce(
    (acc, dept) => acc + dept.members.length,
    0
  );

  return (
    <div className="min-h-screen bg-ink text-milk flex flex-col justify-between selection:bg-orange selection:text-milk noise-overlay relative">
      <Nav />

      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="fixed top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 pt-32 sm:pt-40 md:pt-44 pb-20 max-w-7xl mx-auto w-full">
        {/* Breadcrumb / Top Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange/25 bg-orange/10 text-orange font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span>03 // THE SPHUR COLLECTIVE</span>
          </div>
          <span className="font-mono text-xs text-milk/30 tracking-widest hidden sm:inline">
            •
          </span>
          <span className="font-mono text-xs text-milk/50 tracking-widest uppercase hidden sm:inline">
            ROSTER DIRECTORY
          </span>
        </div>

        {/* Hero Headline */}
        <div className="mb-10 md:mb-14">
          <h1
            className="font-display uppercase tracking-[-0.03em] text-milk leading-[0.88] mb-6 select-none"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
          >
            The People Behind <span className="text-orange">The Flash</span>
          </h1>
          <p className="font-space font-light text-milk/75 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed">
            30+ people, one obsession: making brands impossible to ignore.
          </p>
        </div>

        {/* Live Metrics Pill Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-milk/[0.03] border border-milk/10 mb-12 sm:mb-16">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 mb-1">
              Roster Strength
            </div>
            <div className="font-display text-2xl sm:text-3xl text-milk">
              {totalMembers} <span className="text-orange text-lg">Specialists</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 mb-1">
              Disciplines
            </div>
            <div className="font-display text-2xl sm:text-3xl text-milk">
              10 <span className="text-orange text-lg">Wings</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 mb-1">
              Headquarters
            </div>
            <div className="font-display text-2xl sm:text-3xl text-milk">
              DELHI <span className="text-orange text-lg">NCR</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 mb-1">
              Execution
            </div>
            <div className="font-display text-2xl sm:text-3xl text-milk">
              100% <span className="text-orange text-lg">In-House</span>
            </div>
          </div>
        </div>

        {/* Interactive Discipline Filter */}
        <div className="mb-10 sm:mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-200 border flex items-center gap-2 ${
                    isActive
                      ? "bg-orange text-ink border-orange font-bold shadow-md shadow-orange/20"
                      : "bg-milk/[0.02] text-milk/70 border-milk/10 hover:border-milk/30 hover:text-milk"
                  }`}
                  style={isActive ? { color: "#0e0e0e" } : {}}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-ink/20 text-ink" : "bg-milk/10 text-milk/50"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Departments Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDepts.map((dept) => (
              <motion.article
                layout
                key={dept.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-milk/[0.02] hover:bg-milk/[0.04] border border-milk/10 hover:border-orange/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(236,94,39,0.12)]"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  {/* Top card metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-orange font-bold">
                      {dept.number} {"//"} {dept.categoryLabel.toUpperCase()}
                    </span>
                    <span className="font-mono text-[11px] tracking-wider text-milk/60 px-2.5 py-1 rounded-full border border-milk/10 bg-milk/[0.03]">
                      {dept.members.length} CREATIVES
                    </span>
                  </div>

                  {/* Department Name */}
                  <h2 className="font-display text-2xl sm:text-3xl text-milk group-hover:text-orange transition-colors duration-300 mb-2 leading-tight">
                    {dept.name}
                  </h2>

                  {/* Department Mission / Subtitle */}
                  <p className="font-space italic text-milk/65 text-sm sm:text-base leading-relaxed mb-6">
                    {dept.tagline}
                  </p>
                </div>

                {/* Team Members List */}
                <div className="pt-5 border-t border-milk/10">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/40 mb-3">
                    Active Contributors
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {dept.members.map((member) => (
                      <div
                        key={member}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-milk/[0.03] border border-milk/10 text-milk/90 font-mono text-xs sm:text-sm tracking-wide group-hover:border-milk/20 hover:!border-orange/60 hover:!bg-orange/15 hover:!text-milk transition-all duration-200 select-none cursor-default"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Careers & Invitation Banner */}
        <section className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-milk/[0.04] to-milk/[0.01] border border-milk/15 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(236,94,39,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 max-w-xl">
            <span className="font-mono text-xs tracking-[0.2em] text-orange uppercase font-bold block mb-3">
              [ GROW WITH US ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-milk uppercase tracking-tight mb-3 leading-tight">
              Want To Flash Into Consciousness?
            </h2>
            <p className="font-space font-light text-milk/70 text-sm sm:text-base leading-relaxed">
              We are constantly looking for exceptional video editors, visual identity designers, web developers, and on-camera presenters to join the SPHUR roster.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Joining%20SPHUR%20Roster`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-orange text-ink font-mono text-xs font-bold tracking-widest uppercase hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:scale-[1.02]"
              style={{ color: "#0e0e0e" }}
            >
              <span>SEND YOUR REEL / PORTFOLIO</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
