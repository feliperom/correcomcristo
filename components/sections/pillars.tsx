import { pillars } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function Pillars() {
  return (
    <section id="pilares" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink">
            5 <span className="brand-gradient">pilares</span> do<br />
            corre com Cristo
          </h2>
          <span className="telemetry text-xs uppercase tracking-[0.2em] text-muted">
            corpo · mente · espírito
          </span>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-spring/15 bg-spring/10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={index * 0.07}
              className="group relative flex min-h-56 flex-col justify-between bg-night p-6 transition-colors duration-500 hover:bg-teal-900"
            >
              <span className="telemetry text-xs text-spring">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl uppercase text-ink transition-colors group-hover:brand-gradient">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-snug text-muted">{pillar.line}</p>
              </div>
              <span className="absolute bottom-0 left-0 h-1 w-0 brand-fill transition-all duration-500 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
