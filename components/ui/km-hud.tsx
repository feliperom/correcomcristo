"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const TOTAL_KM = 12;

export function KmHud() {
  const { scrollYProgress } = useScroll();
  const [km, setKm] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setKm(value * TOTAL_KM);
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-40 hidden flex-col items-start gap-1 md:flex"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl tabular-nums brand-gradient pace-glow">
          {km.toFixed(1)}
        </span>
        <span className="telemetry text-xs text-muted">km</span>
      </div>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-teal-900">
        <div
          className="h-full brand-fill"
          style={{ width: `${(km / TOTAL_KM) * 100}%` }}
        />
      </div>
      <span className="telemetry text-[9px] uppercase tracking-[0.2em] text-muted">
        perseverança
      </span>
    </div>
  );
}
