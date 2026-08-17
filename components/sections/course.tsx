"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { course, type CourseStageType } from "@/lib/site-config";

const EASE = [0.16, 1, 0.3, 1] as const;
const SAMPLES = 64;
const VIEW_W = 100;
const VIEW_H = 44;

// Perfil suave da rota (mesma função usada para a linha e para os pontos,
// garantindo que os checkpoints fiquem exatamente sobre o traçado).
function waveY(fraction: number): number {
  return 25 - 9 * Math.sin(fraction * Math.PI) - 3.4 * Math.sin(fraction * Math.PI * 3 + 0.6);
}

function buildLinePath(): string {
  let path = `M 0 ${waveY(0).toFixed(2)}`;
  for (let i = 1; i <= SAMPLES; i += 1) {
    const f = i / SAMPLES;
    path += ` L ${((f * VIEW_W).toFixed(2))} ${waveY(f).toFixed(2)}`;
  }
  return path;
}

const LINE_PATH = buildLinePath();
const AREA_PATH = `${LINE_PATH} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`;

export function Course() {
  const stages = course.stages;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  const activeStage = stages[active];
  const activeFraction = activeStage.km / course.totalKm;

  const select = (index: number) => {
    setActive(Math.max(0, Math.min(stages.length - 1, index)));
  };

  const onKeyNav = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(active + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(stages.length - 1);
    }
  };

  return (
    <section id="percurso" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="telemetry text-xs uppercase tracking-[0.25em] text-spring">
              O percurso
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink">
              Cada km tem um <span className="brand-gradient">propósito</span>
            </h2>
          </div>
          <span className="telemetry text-xs uppercase tracking-[0.2em] text-muted">
            {course.totalKm} km · {stages.length} etapas
          </span>
        </div>

        {/* Trilho interativo */}
        <div
          ref={containerRef}
          className="relative h-52 w-full select-none md:h-64"
          role="tablist"
          aria-label="Etapas do percurso"
          onKeyDown={onKeyNav}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="course-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--grad-1)" />
                <stop offset="50%" stopColor="var(--grad-2)" />
                <stop offset="100%" stopColor="var(--grad-4)" />
              </linearGradient>
              <linearGradient id="course-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--grad-2)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--grad-2)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d={AREA_PATH}
              fill="url(#course-area)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.3 }}
            />

            {/* Rota completa (fraca) */}
            <path
              d={LINE_PATH}
              fill="none"
              stroke="var(--color-muted)"
              strokeOpacity="0.3"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Rota percorrida até a etapa ativa */}
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
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
            />
          </svg>

          {/* Checkpoints */}
          {stages.map((stage, index) => {
            const left = (stage.km / course.totalKm) * 100;
            const top = (waveY(stage.km / course.totalKm) / VIEW_H) * 100;
            const isActive = index === active;
            const isDone = index <= active;
            return (
              <button
                key={stage.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="course-panel"
                tabIndex={isActive ? 0 : -1}
                aria-label={`Etapa ${index + 1}: ${stage.title}, km ${stage.km}`}
                onClick={() => select(index)}
                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span
                  className={`absolute rounded-full transition-all duration-300 ${
                    isActive ? "h-5 w-5" : "h-3.5 w-3.5 group-hover:h-4 group-hover:w-4"
                  } ${isDone ? "brand-fill pace-glow" : "bg-deep ring-2 ring-muted/40"}`}
                />
                {isActive && (
                  <span className="absolute h-9 w-9 rounded-full border border-spring/50" />
                )}
                <span
                  className={`absolute top-7 whitespace-nowrap telemetry text-[10px] uppercase tracking-wide transition-colors ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {stage.km} km
                </span>
              </button>
            );
          })}
        </div>

        {/* Painel de detalhe da etapa */}
        <div
          id="course-panel"
          role="tabpanel"
          className="mt-16 grid items-stretch gap-4 md:grid-cols-[1fr_auto]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-spring/15 bg-night p-7 md:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                className="flex flex-col gap-4 sm:flex-row sm:items-start"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl brand-fill text-on-brand">
                  <StageIcon type={activeStage.type} />
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl uppercase text-ink">
                      {activeStage.title}
                    </h3>
                    <span className="telemetry text-sm text-spring">
                      km {activeStage.km}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted">
                    {activeStage.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação da etapa */}
          <div className="flex items-center justify-between gap-3 rounded-3xl border border-spring/15 bg-night px-6 py-5 md:flex-col md:items-stretch md:justify-center">
            <span className="telemetry text-xs uppercase tracking-[0.2em] text-muted">
              Etapa <span className="text-ink">{active + 1}</span> / {stages.length}
            </span>
            <div className="flex gap-2">
              <NavButton
                label="Etapa anterior"
                onClick={() => select(active - 1)}
                disabled={active === 0}
                dir="prev"
              />
              <NavButton
                label="Próxima etapa"
                onClick={() => select(active + 1)}
                disabled={active === stages.length - 1}
                dir="next"
              />
            </div>
          </div>
        </div>

        {course.isPlaceholder && (
          <p className="mt-6 telemetry text-xs text-muted">
            * Percurso ilustrativo — ajuste distâncias e pontos em <code>lib/site-config.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  dir,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-spring/30 text-ink transition-colors hover:border-spring/70 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-spring/30"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={dir === "prev" ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function StageIcon({ type }: { type: CourseStageType }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (type === "start")
    return (
      <svg {...common}>
        <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
      </svg>
    );
  if (type === "praise")
    return (
      <svg {...common}>
        <path d="M9 18V5l11-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="17" cy="16" r="3" />
      </svg>
    );
  if (type === "water")
    return (
      <svg {...common}>
        <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
      </svg>
    );
  if (type === "prayer")
    return (
      <svg {...common}>
        <path d="M12 21s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 3.5C19 16.5 12 21 12 21Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M5 21V4M5 4h13l-2.5 4L18 12H5" />
      <path d="M5 12h13" strokeDasharray="2 2" />
    </svg>
  );
}
