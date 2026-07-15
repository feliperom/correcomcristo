import { schedule } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function Schedule() {
  return (
    <section id="agenda" className="relative bg-deep py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink">
            Próximos <span className="brand-gradient">encontros</span>
          </h2>
          <span className="telemetry text-xs uppercase tracking-[0.2em] text-muted">
            todos os ritmos · todas as idades
          </span>
        </Reveal>

        {schedule.length === 0 && (
          <Reveal className="flex flex-col items-start gap-4 rounded-3xl border border-spring/20 bg-night p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <span className="font-display text-2xl uppercase text-ink md:text-3xl">
                18/07-<span className="brand-gradient">Emissário Submarino</span>
              </span>
              <p className="mt-2 max-w-md text-sm text-muted">
                Entre no grupo para receber mais detalhes.
              </p>
            </div>
            <a
              href="https://chat.whatsapp.com/DyLulSTgpqm1VVE96naMQp?mode=gi_t"
              className="inline-flex shrink-0 items-center gap-2 rounded-full brand-fill px-6 py-3 font-display text-sm uppercase text-night transition-transform hover:scale-[1.03]"
            >
              Quero participar →
            </a>
          </Reveal>
        )}

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <Reveal
              key={`${item.day}-${item.time}`}
              delay={index * 0.06}
              className="group grid grid-cols-2 items-center gap-4 rounded-2xl border border-spring/15 bg-night p-5 transition-colors hover:border-spring/50 md:grid-cols-[1fr_auto_2fr_auto] md:p-6"
            >
              <span className="font-display text-2xl uppercase text-ink md:text-3xl">
                {item.day}
              </span>
              <span className="telemetry text-lg text-spring md:text-xl">{item.time}</span>
              <span className="col-span-2 text-sm text-muted md:col-span-1">
                <span className="block text-ink">{item.kind}</span>
                {item.place}
              </span>
              {item.isPlaceholder && (
                <span className="justify-self-start rounded-full border border-accent/40 px-3 py-1 telemetry text-[10px] uppercase tracking-wide text-accent md:justify-self-end">
                  definir
                </span>
              )}
            </Reveal>
          ))}
        </div>

        {schedule.length > 0 && (
          <p className="mt-6 telemetry text-xs text-muted">
            * Locais e horários a confirmar — atualize em <code>lib/site-config.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
