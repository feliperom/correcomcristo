import { Reveal, KineticWords } from "@/components/ui/reveal";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative mx-auto max-w-5xl px-6 py-28 md:px-16 md:py-40">
      <Reveal className="telemetry mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-spring">
        <span className="route-dash h-[3px] w-12" />
        Largada · o porquê
      </Reveal>

      <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.04]">
        <KineticWords
          text="Não importa seu ritmo, sua idade ou experiência."
          className="block text-ink"
        />
        <KineticWords
          text="O que nos une não é a performance, é a presença de Jesus."
          className="mt-3 block brand-gradient"
          delay={0.12}
        />
      </h2>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {[
          {
            n: "01",
            t: "Movimento, não clube",
            d: "Unimos louvor, comunhão, fé, saúde e propósito. Caminhamos e corremos juntos, fortalecendo corpo, mente e espírito.",
          },
          {
            n: "02",
            t: "Irmãos na fé",
            d: "Crescemos juntos, encorajando uns aos outros e vivendo a alegria de servir a Deus com todo o nosso ser.",
          },
          {
            n: "03",
            t: "Propósito acima do pace",
            d: "Celebramos a presença de Deus e testemunhamos o amor de Cristo ao mundo. Maior que a performance é o propósito.",
          },
        ].map((item, index) => (
          <Reveal key={item.n} delay={index * 0.1} className="border-t border-spring/20 pt-5">
            <span className="telemetry text-sm text-spring">{item.n}</span>
            <h3 className="mt-3 font-display text-xl text-ink">{item.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
