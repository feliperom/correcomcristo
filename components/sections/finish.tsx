import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";
import { Wordmark } from "@/components/ui/logo";

export function Finish() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-deep py-28 map-grid md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 brand-fill"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px] pace-scale"
        style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
        <Reveal className="telemetry text-xs uppercase tracking-[0.3em] text-spring">
          Linha de chegada — e a sua largada
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display kinetic text-[clamp(2.6rem,9vw,6rem)] leading-[0.85]">
            <span className="block brand-gradient">Corra com Cristo</span>
            <span className="block text-ink">e com a gente</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-balance text-lg text-muted">
            Não importa seu ritmo. Venha glorificar a Deus em cada passo. O próximo
            treino já tem o seu nome.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full brand-fill px-8 py-4 font-display text-lg uppercase text-night transition-transform hover:scale-[1.03] pace-glow"
          >
            Quero correr
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-spring/40 px-8 py-4 font-medium text-ink transition-colors hover:bg-spring/10"
          >
            {siteConfig.instagram.handle}
          </a>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-spring/15 px-6 pt-10 md:flex-row md:px-16">
        <Wordmark />
        <p className="text-center font-display text-sm uppercase tracking-wide text-muted md:text-right">
          {siteConfig.tagline} · {siteConfig.region}
        </p>
      </footer>
    </section>
  );
}
