"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Hide on prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;

    const LERP = 0.15;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Ring follows immediately
      ring.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
    };

    const onMouseEnterInteractive = () => {
      ring.classList.add("scale-[2.5]", "border-orange", "bg-transparent");
      ring.classList.remove("bg-orange");
      dot.classList.add("opacity-0");
    };

    const onMouseLeaveInteractive = () => {
      ring.classList.remove("scale-[2.5]", "border-orange", "bg-transparent");
      ring.classList.add("bg-orange");
      dot.classList.remove("opacity-0");
    };

    // Lerp loop for dot
    let rafId: number;
    const tick = () => {
      dotX += (mouseX - dotX) * LERP;
      dotY += (mouseY - dotY) * LERP;
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [data-cursor='pointer'], input, textarea, [role='button']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Lagging orange dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange pointer-events-none z-[9999] transition-opacity duration-200 hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Ring that follows immediately */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-orange bg-orange pointer-events-none z-[9998] transition-all duration-300 ease-entrance opacity-80 hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
