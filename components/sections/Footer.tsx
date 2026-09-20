"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/sphur" },
  { label: "Twitter", href: "https://twitter.com/sphur" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sphur" },
  { label: "Behance", href: "https://behance.net/sphur" },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!";

function ScrambleLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const [displayed, setDisplayed] = useState(label);
  const rafRef = useRef<number | null>(null);

  const scramble = () => {
    let iterations = 0;
    const originalChars = label.split("");
    const totalIterations = label.length * 3;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const result = originalChars.map((char, i) => {
        if (char === " ") return " ";
        if (i < iterations / 3) return originalChars[i];
        return SCRAMBLE_CHARS[
          Math.floor(Math.random() * SCRAMBLE_CHARS.length)
        ];
      });
      setDisplayed(result.join(""));
      iterations++;
      if (iterations < totalIterations) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(label);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-milk/75 text-xs tracking-[0.15em] uppercase hover:text-orange transition-colors duration-200"
      onMouseEnter={scramble}
      aria-label={label}
    >
      {displayed}
    </a>
  );
}

function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="font-mono text-milk/30 text-xs tracking-[0.15em] uppercase hover:text-orange transition-colors duration-300 flex items-center gap-2"
      aria-label="Scroll back to top"
    >
      <span aria-hidden="true">↑</span>
      Back to Top
    </button>
  );
}

export default function Footer() {
  return (
    <footer
      className="bg-ink border-t border-milk/5 py-16 md:py-20 px-6 md:px-12 lg:px-20"
      role="contentinfo"
    >
      {/* Big email */}
      <div className="mb-16 md:mb-20">
        <a
          href="mailto:hello@sphur.com"
          className="font-display text-milk leading-[0.85] tracking-[-0.03em] uppercase hover:text-orange transition-colors duration-300 block"
          style={{ fontSize: "clamp(2rem, 7vw, 8rem)" }}
          aria-label="Email SPHUR at hello@sphur.com"
        >
          hello@sphur.com
        </a>
      </div>

      {/* Footer bottom row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        {/* Left: brand logo + location */}
        <div className="space-y-3">
          <a
            href="/"
            className="inline-block transition-transform duration-300 hover:scale-[1.03] select-none"
            aria-label="SPHUR — back to top"
          >
            <Image
              src="/images/sphur-logo-orange.png"
              alt="SPHUR"
              width={140}
              height={26}
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </a>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-milk/70 text-xs tracking-[0.1em] uppercase">
            <span>Creative Agency — Worldwide — © {new Date().getFullYear()}</span>
            <span className="text-milk/30">•</span>
            <a href="/privacy" className="hover:text-orange transition-colors duration-200 underline underline-offset-4">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Center: social links */}
        <nav aria-label="Social media links">
          <div className="flex flex-wrap gap-6">
            {SOCIAL_LINKS.map((link) => (
              <ScrambleLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>
        </nav>

        {/* Right: back to top */}
        <BackToTop />
      </div>
    </footer>
  );
}
