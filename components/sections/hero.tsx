"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import lockupImage from "@/public/hero-lockup.png";
import teamImage from "@/public/hero-team.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const PHRASES = [
  "Aqui a playlist glorifica a Deus",
  "Pace da Fé",
  "Reino em Movimento",
  "Maior que a performance é o propósito",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Atmosfera de fallback (aparece enquanto a foto carrega) */}
      <div aria-hidden className="absolute inset-0 map-grid bg-night" />

      {/* Foto da equipe — full-bleed com zoom lento */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src={teamImage}
          alt="Equipe Corre com Cristo reunida na orla da Baixada Santista"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="hero-zoom object-cover object-center"
        />
      </motion.div>

      {/* Scrim teal constante (mantém o hero como "pôster" nos dois temas) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,26,24,0.94) 4%, rgba(4,26,24,0.55) 34%, rgba(4,26,24,0.2) 60%, rgba(4,26,24,0.5) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,26,24,0.75) 0%, rgba(4,26,24,0.2) 45%, transparent 70%)",
        }}
      />

      {/* Conteúdo ancorado embaixo à esquerda */}
      <div className="hero-content relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:px-16 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="telemetry mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-lime"
        >
          <span className="h-2 w-2 rounded-full bg-lime pace-glow" />
          {siteConfig.crew} · {siteConfig.region}
        </motion.span>

        <h1 className="font-display kinetic text-[clamp(3rem,12vw,9rem)] leading-[0.8]">
          <span className="sr-only">Corre com Cristo</span>
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="hero-lockup block w-full max-w-[min(88vw,40rem)] pace-glow-static"
          >
            <Image
              src={lockupImage}
              alt=""
              priority
              sizes="(max-width: 768px) 88vw, 40rem"
              className="h-auto w-full"
            />
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="hero-intro mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-balance text-lg text-white/85">
            Um movimento de pessoas que glorificam a Deus em cada passo.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center gap-2 rounded-full brand-fill px-7 py-3.5 font-display text-base uppercase text-on-brand transition-transform hover:scale-[1.03] pace-glow"
            >
              Quero correr
              <span aria-hidden>→</span>
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
            >
              {siteConfig.instagram.handle}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ticker das frases */}
      <div className="hero-ticker pointer-events-none relative w-full overflow-hidden border-t border-white/10 py-3">
        <div className="ticker-track">
          {[0, 1].map((loop) => (
            <span key={loop} className="flex items-center">
              {PHRASES.map((phrase) => (
                <span key={`${loop}-${phrase}`} className="flex items-center">
                  <span className="font-display text-sm uppercase tracking-wide text-white/70">
                    {phrase}
                  </span>
                  <span className="mx-5 h-1.5 w-1.5 rounded-full bg-lime" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
