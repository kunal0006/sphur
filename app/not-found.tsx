import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink text-milk flex flex-col justify-between p-6 sm:p-12 md:p-20 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236,94,39,0.18) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between">
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
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-milk/60">
          ERROR // 404
        </span>
      </header>

      {/* Center Message */}
      <div className="relative z-10 max-w-3xl my-auto py-16">
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-orange mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          <span>SIGNAL DISRUPTED</span>
        </div>
        <h1 className="font-display text-[clamp(4.5rem,14vw,12rem)] leading-[0.82] tracking-[-0.04em] uppercase text-milk mb-6">
          404.
        </h1>
        <p className="font-body text-base sm:text-lg md:text-xl text-milk/80 max-w-xl leading-relaxed mb-10">
          The requested coordinate does not exist in our index. It may have moved, expired, or never launched.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.16em] uppercase font-bold bg-orange text-ink px-8 py-4 hover:bg-milk hover:text-ink transition-colors duration-300 shadow-[0_0_30px_rgba(236,94,39,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-milk"
        >
          <span>RETURN TO HOME</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Bottom Metadata */}
      <footer className="relative z-10 pt-6 border-t border-milk/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-[0.16em] uppercase text-milk/60">
        <span>SPHUR CREATIVE AGENCY // WORLDWIDE</span>
        <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
      </footer>
    </main>
  );
}
