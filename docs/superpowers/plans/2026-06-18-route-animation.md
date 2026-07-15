# Route Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the route animations (in both `TrailLine` and `Course` sections) to continuously loop back and forth (ida e volta) along the same path, improving visual feedback.

**Architecture:** The current scroll-driven animation in `trail-line.tsx` will be replaced by a continuous `useMotionValue` animated with `repeat: Infinity, repeatType: "reverse"`. For `course.tsx`, we will add the same repeat options to the existing `motion.path` transition, achieving a smooth, infinite "ida e volta" effect without changing the underlying architecture.

**Tech Stack:** React, Tailwind CSS, Framer Motion

---

### Task 1: Update Trail Line Animation (trail-line.tsx)

**Files:**
- Modify: `components/trail/trail-line.tsx`

- [ ] **Step 1: Replace scroll-driven animation with continuous loop**

```tsx
import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";

const ROUTE =
  "M50 2 C90 80 90 150 50 210 C10 270 10 340 50 410 C90 480 90 555 50 620 C10 690 10 760 50 830 C78 890 62 950 50 998";

export function TrailLine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    // Animação contínua de "ida e volta" (reverse)
    const controls = animate(progress, 1, {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    });
    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const wrap = wrapRef.current;
    if (!path || !dot || !wrap) return;

    const total = path.getTotalLength();

    const place = (v: number) => {
      const point = path.getPointAtLength(v * total);
      const x = (point.x / 100) * wrap.clientWidth;
      const y = (point.y / 1000) * wrap.clientHeight;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    place(progress.get());
    const unsubscribe = progress.on("change", place);
    return () => unsubscribe();
  }, [progress]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-3 top-0 z-30 hidden h-screen w-16 md:block lg:left-6 lg:w-20"
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

        {/* Rota ainda não percorrida */}
        <path
          d={ROUTE}
          fill="none"
          stroke="rgba(143, 196, 186, 0.18)"
          strokeWidth={2}
          strokeDasharray="1 7"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />

        {/* Rota percorrida — animada com progresso */}
        <motion.path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          stroke="url(#route-grad)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
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
```

- [ ] **Step 2: Run linter/build to check types**

Run: `npm run typecheck` or `npm run build`
Expected: Passes without new errors.

- [ ] **Step 3: Commit**

```bash
git add components/trail/trail-line.tsx
git commit -m "feat: animate trail line continuously back and forth"
```

### Task 2: Update Course Section Animation (course.tsx)

**Files:**
- Modify: `components/sections/course.tsx`

- [ ] **Step 1: Apply continuous looping animation to the course line**

```tsx
            <motion.path
              d={LINE_PATH}
              fill="none"
              stroke="url(#course-line)"
              strokeWidth={3.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="pace-glow"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? activeFraction : 0 }}
              transition={{
                duration: reduce ? 0 : 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
```

- [ ] **Step 2: Run linter/build to check types**

Run: `npm run typecheck` or `npm run build`
Expected: Passes without new errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/course.tsx
git commit -m "feat: add reverse looping animation to course path"
```
