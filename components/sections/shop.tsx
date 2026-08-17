import Image from "next/image";
import { products } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function Shop() {
  return (
    <section id="loja" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="telemetry text-xs uppercase tracking-[0.25em] text-spring">
              Vista o movimento
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink">
              Loja <span className="brand-gradient">Corre com Cristo</span>
            </h2>
          </div>
          <span className="telemetry text-xs uppercase tracking-[0.2em] text-muted">
            cada peça um testemunho
          </span>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product, index) => (
            <Reveal
              key={product.name}
              delay={index * 0.1}
              className="group flex flex-col overflow-hidden rounded-3xl border border-spring/15 bg-deep transition-colors hover:border-spring/50"
            >
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 to-night">
                <Image
                  src={product.image}
                  alt={product.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  className="h-full w-full object-contain"
                />
                <span className="absolute right-4 top-4 telemetry text-[10px] uppercase tracking-wide text-accent">
                  preview
                </span>
              </div>
              <div className="flex flex-1 items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-xl uppercase text-ink">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted">{product.variant}</p>
                </div>
                <div className="text-right">
                  <span className="block font-display text-2xl brand-gradient">
                    {product.price}
                  </span>
                  {/* <a
                    href={siteConfig.whatsapp.urlBuy || "#contato"}
                    className="mt-2 inline-block rounded-full border border-spring/40 px-4 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-spring/15"
                  >
                    Eu quero
                  </a> */}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
