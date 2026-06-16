import { siteConfig } from "@/lib/site-config";

export function KMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Kahal Run">
      <defs>
        <linearGradient id="k-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-lime)" />
          <stop offset="100%" stopColor="var(--color-cyan)" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#k-grad)"
        strokeWidth={17}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M26 16 V84" />
        <path d="M26 52 L70 16" />
        <path d="M26 52 L70 84" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <KMark className="h-8 w-8" />
      <div className="leading-none">
        <span className="font-display text-lg brand-gradient">KAHAL</span>
        <span className="block telemetry text-[10px] uppercase tracking-[0.3em] text-muted">
          run
        </span>
      </div>
    </div>
  );
}

export function FullLockup({ className }: { className?: string }) {
  return (
    <div className={`font-display kinetic leading-[0.82] ${className ?? ""}`}>
      <span className="block brand-gradient">{siteConfig.name.split(" ")[0]}</span>
      <span className="block brand-gradient">
        {siteConfig.name.split(" ").slice(1).join(" ")}
      </span>
    </div>
  );
}
