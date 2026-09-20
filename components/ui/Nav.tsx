"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "#work", number: "01" },
  { label: "Services", href: "#services", number: "02" },
  { label: "Team", href: "#team", number: "03" },
  { label: "Process", href: "#process", number: "04" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Monitor scroll position with passive event listener and RAF for 100% reliable detection with Lenis
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(scrollPos > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let rafId: number;
    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Lock background scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Dismiss menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isDarkNav = scrolled || isOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <nav
        className={`w-full max-w-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-3.5 sm:py-5 transition-all duration-300 ${
          isDarkNav
            ? "bg-ink/95 backdrop-blur-md border-b border-milk/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] text-milk"
            : "bg-milk/85 backdrop-blur-md sm:bg-transparent border-b border-ink/5 sm:border-transparent text-ink shadow-[0_2px_12px_rgba(14,14,14,0.03)] sm:shadow-none"
        }`}
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <a
          href="/"
          className="relative z-50 flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.02] select-none"
          aria-label="SPHUR — back to home"
          onClick={handleLinkClick}
        >
          <Image
            src={
              isDarkNav
                ? "/images/sphur-logo-white.png"
                : "/images/sphur-logo-dark.png"
            }
            alt="SPHUR"
            width={130}
            height={26}
            priority
            className="h-5 sm:h-7 w-auto object-contain transition-opacity duration-300"
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`group relative font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300 py-1 select-none ${
                isDarkNav
                  ? "text-milk/70 hover:text-milk"
                  : "text-ink/75 hover:text-ink"
              }`}
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#cta"
            className={`group relative inline-flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase border transition-all duration-300 rounded-full select-none ${
              isDarkNav
                ? "border-milk/25 text-milk hover:border-orange hover:bg-orange hover:text-ink"
                : "border-ink/25 text-ink hover:border-orange hover:bg-orange hover:text-ink"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span className="font-bold">LET&apos;S TALK</span>
          </a>
        </div>

        {/* Mobile Navigation Trigger Button (>= 44x44px touch target) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden relative z-50 flex items-center shrink-0 gap-2 px-3 py-2 min-h-[44px] min-w-[44px] border rounded-full transition-all duration-300 cursor-pointer ${
            isDarkNav
              ? "border-milk/20 bg-milk/5 text-milk hover:border-milk/40"
              : "border-ink/15 bg-ink/5 text-ink hover:border-ink/30"
          }`}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
            {isOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="w-4 h-3 flex flex-col justify-between items-center relative">
            <span
              className={`w-full h-0.5 rounded-full transition-transform duration-300 ${
                isDarkNav ? "bg-milk" : "bg-ink"
              } ${isOpen ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`w-full h-0.5 rounded-full transition-opacity duration-200 ${
                isDarkNav ? "bg-milk" : "bg-ink"
              } ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`w-full h-0.5 rounded-full transition-transform duration-300 ${
                isDarkNav ? "bg-milk" : "bg-ink"
              } ${isOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[65px] bottom-0 z-40 bg-ink/98 backdrop-blur-2xl text-milk flex flex-col justify-between px-6 py-8 overflow-y-auto border-t border-milk/10"
          >
            {/* Links list */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-milk/40 uppercase mb-2">
                Navigation
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="group flex items-center justify-between py-3.5 border-b border-milk/10 text-milk hover:text-orange transition-colors min-h-[44px]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-orange">
                      {link.number}
                    </span>
                    <span className="font-display text-3xl sm:text-4xl tracking-tight uppercase">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-xl text-milk/40 group-hover:text-orange group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Drawer Bottom Section */}
            <div className="flex flex-col gap-6 pt-6 mt-auto border-t border-milk/10">
              <a
                href="#cta"
                onClick={handleLinkClick}
                className="w-full py-4 px-6 bg-orange text-ink font-bold font-mono text-xs tracking-widest uppercase text-center flex items-center justify-center gap-2 hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20 min-h-[48px]"
                style={{ color: "#0e0e0e" }}
              >
                <span>START A PROJECT</span>
                <span>→</span>
              </a>

              <div className="flex items-center justify-between text-xs text-milk/60 font-mono">
                <a
                  href="mailto:hello@sphur.com"
                  className="hover:text-orange transition-colors"
                >
                  hello@sphur.com
                </a>
                <span className="text-milk/30">MUMBAI · GLOBAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
