import { gallery, galleryDriveUrl } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

const SPAN_CLASS: Record<string, string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  normal: "",
};

function thumbUrl(id: string): string {
  return `https://lh3.googleusercontent.com/d/${id}=w1200`;
}

function viewUrl(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`;
}

export function Gallery() {
  return (
    <section id="galeria" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="telemetry text-xs uppercase tracking-[0.25em] text-spring">
              Reino em Movimento
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,5vw,2.5rem)] leading-none text-ink">
              1ª Edição em <span className="brand-gradient">algumas imagens</span>
            </h2>
          </div>
          <a
            href={galleryDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-spring/40 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-spring/10"
          >
            <DownloadIcon />
            Baixar todas as fotos
          </a>
        </Reveal>

        <div className="grid auto-rows-[200px] grid-flow-row-dense grid-cols-2 gap-3 md:auto-rows-[230px] lg:grid-cols-3">
          {gallery.map((photo, index) => (
            <Reveal
              key={photo.id}
              delay={(index % 3) * 0.08}
              className={`group relative overflow-hidden rounded-2xl border border-spring/15 ${
                SPAN_CLASS[photo.span] ?? ""
              }`}
            >
              <a href={viewUrl(photo.id)} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl(photo.id)}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full bg-teal-900 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  <DownloadIcon />
                  Baixar
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 telemetry text-xs text-muted">
          Fotos por Paloma Costa · clique em qualquer foto para abrir e baixar no Google Drive.
        </p>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M5 21h14" />
    </svg>
  );
}
