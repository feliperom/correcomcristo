"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll } from "motion/react";

const ROUTE =
  "M50 2 C90 80 90 150 50 210 C10 270 10 340 50 410 C90 480 90 555 50 620 C10 690 10 760 50 830 C78 890 62 950 50 998";

export function TrailLine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const wrap = wrapRef.current;
    if (!path || !dot || !wrap) return;

    const total = path.getTotalLength();

    const place = (progress: number) => {
      const point = path.getPointAtLength(progress * total);
      const x = (point.x / 100) * wrap.clientWidth;
      const y = (point.y / 1000) * wrap.clientHeight;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    place(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", place);
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="scroll-telemetry pointer-events-none fixed left-3 top-0 z-30 hidden h-screen w-16 md:block lg:left-6 lg:w-20"
    >
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="route-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--grad-1)" />
            <stop offset="50%" stopColor="var(--grad-2)" />
            <stop offset="100%" stopColor="var(--grad-4)" />
          </linearGradient>
        </defs>

        {/* Rota ainda não percorrida — segue o texto secundário do tema ativo */}
        <path
          d={ROUTE}
          fill="none"
          stroke="var(--color-muted)"
          strokeOpacity={0.35}
          strokeWidth={2}
          strokeDasharray="1 7"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />

        {/* Rota percorrida — desenha com o scroll */}
        <motion.path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          stroke="url(#route-grad)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
          className="pace-glow"
        />
      </svg>

      {/* Ponto-corredor: segue a ponta da rota desenhada */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-3.5 w-3.5 rounded-full"
        style={{ background: "var(--color-accent)" }}
      >
        <span className="pace-glow absolute inset-0 rounded-full bg-accent" />
        <span className="absolute -inset-2 rounded-full border border-accent/40" />
      </div>
    </div>
  );
}
