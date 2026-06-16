"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { verses } from "@/lib/site-config";

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function Verse() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(dayOfYear(new Date()) % verses.length);
  }, []);

  const verse = verses[index];

  return (
    <section id="versiculo" className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px] pace-scale"
        style={{ background: "radial-gradient(circle, var(--color-spring), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
        {/* <span className="telemetry text-xs uppercase tracking-[0.3em] text-spring">
          Versículo do dia
        </span> */}

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <p className="font-display text-balance text-[clamp(1.8rem,5vw,3.5rem)] leading-[1.04] text-ink">
              <span className="brand-gradient">“</span>
              {verse.text}
              <span className="brand-gradient">”</span>
            </p>
            <cite className="mt-6 block telemetry text-sm not-italic uppercase tracking-[0.2em] text-spring">
              {verse.ref}
            </cite>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-2">
          {verses.map((item, dot) => (
            <button
              key={item.ref}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={`Ver ${item.ref}`}
              className={`h-1.5 rounded-full transition-all ${
                dot === index ? "w-8 brand-fill" : "w-1.5 bg-spring/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
