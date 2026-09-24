import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data";

export const metadata: Metadata = {
  title: "Privacy Policy — SPHUR Creative Agency",
  description: "Privacy policy and client data handling practices for SPHUR Creative Agency.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink text-milk flex flex-col justify-between selection:bg-orange selection:text-milk">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 py-8 border-b border-milk/10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-block transition-transform duration-300 hover:scale-[1.03]"
          aria-label="SPHUR — back to home"
        >
          <Image
            src="/images/sphur-logo-orange.png"
            alt="SPHUR"
            width={130}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </Link>
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.16em] uppercase text-milk/70 hover:text-orange transition-colors"
        >
          ← Back to Overview
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-orange mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-orange" />
          <span>LEGAL & COMPLIANCE</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-milk mb-6 leading-none">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-milk/60 mb-12">
          Effective Date: January 1, 2026 // Last Updated: {new Date().getFullYear()}
        </p>

        <div className="space-y-12 font-body text-milk/80 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              01 // Overview & Scope
            </h2>
            <p>
              SPHUR (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a digital creative agency delivering website development, video editing, and social growth architecture. This policy details how we treat information received through sphur.com and direct communication channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              02 // Information We Collect
            </h2>
            <p>
              We operate on a data-minimalist ethos. We only gather information deliberately submitted by prospective clients and partners:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-milk/70">
              <li>Contact coordinates: full name, business email address, brand name.</li>
              <li>Project scope specifications: discipline requirements, deliverables, budget brackets, and timelines.</li>
              <li>Voluntary correspondence transmitted through direct email or inquiry interactions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              03 // How We Use Your Data
            </h2>
            <p>
              Information received is used exclusively to evaluate creative feasibility, formulate bespoke proposals, establish project agreements, and communicate directly with project sponsors. We never sell, lease, or monetize your contact information with third-party brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              04 // Confidentiality & Non-Disclosure
            </h2>
            <p>
              All proprietary brand materials, creative assets, unreleased IP, and financial scope parameters shared during discovery are treated as strictly confidential under industry-standard non-disclosure protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              05 // Cookies & Anonymous Telemetry
            </h2>
            <p>
              Our website utilizes local session storage strictly for interface states (e.g. preloader presentation). We do not deploy invasive third-party ad retargeting trackers or cross-site tracking beacons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-orange font-bold">
              06 // Rights & Inquiries
            </h2>
            <p>
              You have the full right to inspect, correct, or request total expungement of any correspondence or contact details stored in our communications database. To exercise your rights, email us directly at:
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-mono text-orange text-sm tracking-[0.15em] uppercase hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-milk/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-[0.16em] uppercase text-milk/60">
        <span>SPHUR CREATIVE AGENCY // WORLDWIDE</span>
        <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
      </footer>
    </div>
  );
}
