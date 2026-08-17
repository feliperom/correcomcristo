import { testimonials } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testemunhos" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Reveal className="mb-12">
          <span className="telemetry text-xs uppercase tracking-[0.25em] text-spring">
            Testemunhos
          </span>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink">
            Cada passo tem uma <span className="brand-gradient">história</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.quote}
              delay={index * 0.1}
              className="flex flex-col justify-between rounded-3xl border border-spring/15 bg-night p-7 transition-colors hover:border-spring/40"
            >
              <span className="font-display text-5xl leading-none brand-gradient">“</span>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink/90">
                {item.quote}
              </p>
              <footer className="mt-6 flex items-center gap-2 telemetry text-xs uppercase tracking-wide text-muted">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {item.author}
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
