"use client";

import { usePace } from "@/components/providers/pace-provider";

const BARS = [0, 1, 2, 3, 4];

export function SoundToggle() {
  const { soundOn, toggleSound, hasTrack } = usePace();

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={soundOn}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-spring/30 bg-deep/80 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-spring/70"
    >
      <span className="flex h-5 items-end gap-[3px]" aria-hidden>
        {BARS.map((bar) => (
          <span
            key={bar}
            className="h-full w-[3px] origin-bottom rounded-full brand-fill"
            style={{
              transform: soundOn
                ? `scaleY(calc(0.2 + var(--pace) * 0.8 * ${0.5 + (bar % 3) * 0.25}))`
                : "scaleY(0.3)",
              transition: "transform 90ms linear",
            }}
          />
        ))}
      </span>
      <span className="text-left leading-tight">
        <span className="block font-display text-xs uppercase tracking-wide text-ink">
          Pace da Fé
        </span>
        <span className="block telemetry text-[9px] uppercase tracking-[0.15em] text-muted">
          {soundOn ? (hasTrack ? "louvor · no ar" : "cadência · no ar") : "tocar"}
        </span>
      </span>
    </button>
  );
}
