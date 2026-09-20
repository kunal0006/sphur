"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Process", href: "#process" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top+=80 top",
        onToggle: (self) => setScrolled(self.isActive),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        ref={navRef}
        className={`flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 sm:py-6 transition-all duration-500 ${
          scrolled
            ? "bg-milk/90 backdrop-blur-md border-b border-ink/10 shadow-[0_4px_24px_rgba(14,14,14,0.04)]"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* Top Left: Official SPHUR Logo */}
        <a
          href="/"
          className="relative z-10 flex items-center transition-transform duration-300 hover:scale-[1.03] select-none"
          aria-label="SPHUR — back to home"
        >
          <Image
            src="/images/sphur-logo-dark.png"
            alt="SPHUR"
            width={156}
            height={30}
            priority
            className="h-5 sm:h-7 w-auto object-contain"
          />
        </a>

        {/* Top Center: Nav bar links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-mono text-xs tracking-[0.16em] text-ink/70 uppercase hover:text-ink transition-colors duration-300 py-1 select-none"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
