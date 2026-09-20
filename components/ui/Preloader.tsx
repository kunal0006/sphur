"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Skip on reduced motion or previous visit in session
    if (
      sessionStorage.getItem("sphur-preloaded") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(false);
      return;
    }

    const DURATION = 500; // ~0.5s snappy countdown
    const STEPS = 50;
    const STEP_TIME = DURATION / STEPS;

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 2;
      setCount(Math.min(100, current));
      if (current >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("sphur-preloaded", "1");
          }, 450);
        }, 100);
      }
    }, STEP_TIME);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader-overlay">
      <AnimatePresence>
        {!done ? (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-orange"
            initial={{ opacity: 1 }}
          >
            {/* SPHUR wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-milk uppercase tracking-[-0.03em] text-[clamp(3rem,12vw,8rem)] leading-none"
            >
              SPHUR
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-10 right-10 font-mono text-milk/75 text-sm tracking-widest"
            >
              {String(count).padStart(3, "0")}
            </motion.div>
          </motion.div>
        ) : (
          /* Vertical curtain wipe exit */
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[9999] bg-orange origin-top"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
