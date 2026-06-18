import { TopBar } from "@/components/ui/top-bar";
import { TrailLine } from "@/components/trail/trail-line";
import { KmHud } from "@/components/ui/km-hud";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Pillars } from "@/components/sections/pillars";
import { Verse } from "@/components/sections/verse";
import { Course } from "@/components/sections/course";
import { Schedule } from "@/components/sections/schedule";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Shop } from "@/components/sections/shop";
import { Finish } from "@/components/sections/finish";

export default function Home() {
  return (
    <main id="top" className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-24 bg-gradient-to-b from-night/90 to-transparent"
      />
      <TrailLine />
      <TopBar />
      <KmHud />
      <Hero />
      <Manifesto />
      <Pillars />
      <Verse />
      {/* <Course /> */}
      <Schedule />
      <Gallery />
      <Testimonials />
      <Shop />
      <Finish />
    </main>
  );
}
