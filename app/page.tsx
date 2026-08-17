import { TopBar } from "@/components/ui/top-bar";
import { TrailLine } from "@/components/trail/trail-line";
import { KmHud } from "@/components/ui/km-hud";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Pillars } from "@/components/sections/pillars";
import { Verse } from "@/components/sections/verse";
import { Schedule } from "@/components/sections/schedule";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Shop } from "@/components/sections/shop";
import { Finish } from "@/components/sections/finish";

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="top" tabIndex={-1} className="relative outline-none">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-30 h-24 bg-gradient-to-b from-night/90 to-transparent"
        />
        <TrailLine />
        <KmHud />
        <Hero />
        <Manifesto />
        <Pillars />
        <Verse />
        {/* Percurso (components/sections/course.tsx) fora do ar até o trajeto ser confirmado. */}
        <Schedule />
        <Gallery />
        <Testimonials />
        <Shop />
        <Finish />
      </main>
    </>
  );
}
