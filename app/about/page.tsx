"use client";

import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";

import {
  ABOUT_NUMBERS as NUMBERS,
  ABOUT_PRINCIPLES as PRINCIPLES,
  NOTABLE_CLIENTS as CLIENTS,
  FOCUS_SECTORS as SECTORS,
} from "@/data";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink text-milk flex flex-col justify-between selection:bg-orange selection:text-milk noise-overlay relative">
      <Nav />

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="fixed top-24 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 pt-32 sm:pt-40 md:pt-44 pb-20 max-w-7xl mx-auto w-full">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange/25 bg-orange/10 text-orange font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span>04 // ABOUT SPHUR</span>
          </div>
          <span className="font-mono text-xs text-milk/30 tracking-widest hidden sm:inline">
            •
          </span>
          <span className="font-mono text-xs text-milk/50 tracking-widest uppercase hidden sm:inline">
            ORIGIN & PHILOSOPHY
          </span>
        </div>

        {/* Hero Headline */}
        <section className="mb-16 md:mb-24">
          <h1
            className="font-display uppercase tracking-[-0.03em] text-milk leading-[0.9] mb-8 select-none max-w-5xl"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.8rem)" }}
          >
            We started Sphur because most marketing felt{" "}
            <span className="text-milk/40 line-through decoration-orange decoration-2">
              loud
            </span>
            , <span className="text-orange">not smart.</span>
          </h1>
          <p className="font-space font-light text-milk/75 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed">
            Too many agencies chase trends. We chase results — with a creative edge that makes brands feel alive.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase font-bold">
              01 // OUR STORY
            </span>
            <div className="h-px bg-milk/10 flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 font-body text-milk/80 text-base sm:text-lg leading-relaxed">
              <p>
                Sphur started in an apartment, not a boardroom. Seven of us, sitting around asking one simple question — <span className="text-milk font-semibold">why work for someone else&apos;s agency when we were each already the best at what we did?</span>
              </p>
              <p>
                So we stopped asking and started building. Everyone picked the role they were strongest in — creative, content, video, strategy, operations — and Sphur became the agency we always wished we could work at.
              </p>
              <p>
                What started as a conversation has grown into a working agency based in Delhi NCR, handling everything from branding to performance marketing to event production — end to end, built by people doing exactly what they&apos;re best at.
              </p>
            </div>

            {/* Brand Origin Callout Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-milk/[0.03] border border-milk/15 relative overflow-hidden group hover:border-orange/50 transition-colors duration-300">
              <div className="font-mono text-[10px] tracking-[0.25em] text-orange uppercase font-bold mb-4">
                THE SANSKRIT ROOT
              </div>

              {/* Devanagari Calligraphy */}
              <div className="mb-4">
                <span
                  className="text-milk text-4xl sm:text-5xl block select-none"
                  style={{ fontFamily: "'AMS Manthan', serif" }}
                  aria-hidden="true"
                >
                  Sfur
                </span>
                <span className="font-mono text-xs text-orange tracking-[0.15em] uppercase block mt-2">
                  [ स्फुर · SPHUR ]
                </span>
              </div>

              <blockquote className="font-space italic text-milk/80 text-lg mb-3">
                &ldquo;to flash into consciousness.&rdquo;
              </blockquote>

              <p className="font-space text-xs text-milk/60 leading-relaxed">
                That&apos;s the exact feeling we were chasing in that apartment: the moment an idea stops being a &quot;what if&quot; and becomes real.
              </p>
            </div>
          </div>
        </section>

        {/* By The Numbers Section */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase font-bold">
              02 // BY THE NUMBERS
            </span>
            <div className="h-px bg-milk/10 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {NUMBERS.map((item, idx) => (
              <div
                key={item.label}
                className="p-6 sm:p-8 rounded-2xl bg-orange text-milk shadow-lg shadow-orange/15 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-milk/70 mb-2">
                    0{idx + 1} {"//"} METRIC
                  </div>
                  <div
                    className="font-display text-milk leading-none tracking-[-0.03em] mb-3 select-none"
                    style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
                  >
                    {item.value}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-milk mb-1">
                    {item.label}
                  </div>
                  <p className="font-mono text-[11px] text-milk/80 tracking-wide">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Drives Us Section */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase font-bold">
              03 {"//"} WHAT DRIVES US
            </span>
            <div className="h-px bg-milk/10 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.number}
                className="group relative bg-milk/[0.02] hover:bg-milk/[0.04] border border-milk/10 hover:border-orange/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(236,94,39,0.1)]"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  <div className="font-mono text-xs tracking-[0.2em] text-orange font-bold mb-4">
                    {principle.number} {"//"} PRINCIPLE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-milk group-hover:text-orange transition-colors duration-300 mb-2 leading-tight uppercase">
                    {principle.title}
                  </h3>
                  <p className="font-space italic text-orange/90 text-sm mb-4">
                    {principle.tagline}
                  </p>
                  <p className="font-body text-milk/70 text-sm leading-relaxed">
                    {principle.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase font-bold">
              04 // WHO WE WORK WITH
            </span>
            <div className="h-px bg-milk/10 flex-1" />
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-milk/[0.02] border border-milk/15 mb-8">
            <h2 className="font-display text-2xl sm:text-4xl text-milk uppercase tracking-tight mb-4 max-w-3xl leading-tight">
              Businesses ready to stop blending in and start standing out.
            </h2>
            <p className="font-space font-light text-milk/70 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              From category-defining D2C creators to fintech institutions and lifestyle icons — we partner with operators who value substance and speed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {SECTORS.map((sector) => (
                <div
                  key={sector.title}
                  className="p-5 rounded-xl bg-milk/[0.03] border border-milk/10 hover:border-orange/40 transition-colors"
                >
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-orange mb-2">
                    {sector.title}
                  </div>
                  <p className="font-space text-xs text-milk/60 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Cross-Nav CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-milk/10">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-ink font-mono text-xs font-bold tracking-widest uppercase hover:bg-orange/90 transition-all shadow-md shadow-orange/20"
                style={{ color: "#0e0e0e" }}
              >
                <span>MEET THE TEAM</span>
                <span>→</span>
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-milk/20 text-milk hover:border-orange hover:text-orange font-mono text-xs tracking-widest uppercase transition-colors"
              >
                <span>SEE OUR WORK</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase font-bold">
              05 {"//"} TRUSTED BY
            </span>
            <div className="h-px bg-milk/10 flex-1" />
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-milk/[0.02] border border-milk/10">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-milk/40 mb-6 text-center">
              BRANDS & PARTNERS WE&apos;VE BUILT WITH
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {CLIENTS.map((client) => (
                <div
                  key={client}
                  className="px-5 py-3 rounded-xl bg-milk/[0.03] border border-milk/10 hover:border-orange/50 hover:bg-orange/10 hover:text-milk text-milk/85 font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 select-none cursor-default"
                >
                  <span className="text-orange mr-2">•</span>
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-milk/[0.04] to-milk/[0.01] border border-milk/15 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
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
              [ START A CONVERSATION ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-milk uppercase tracking-tight mb-3 leading-tight">
              Ready To Flash Into Consciousness?
            </h2>
            <p className="font-space font-light text-milk/70 text-sm sm:text-base leading-relaxed">
              Let&apos;s build a digital experience people actually remember.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/#cta"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-orange text-ink font-mono text-xs font-bold tracking-widest uppercase hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:scale-[1.02]"
              style={{ color: "#0e0e0e" }}
            >
              <span>INITIATE PROJECT</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
