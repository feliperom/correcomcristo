"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const LOCKUP_SRC = "/hero-lockup.png";
const TEAM_SRC = "/hero-team.jpg";
const EASE = [0.16, 1, 0.3, 1] as const;

const PHRASES = [
  "Aqui a playlist glorifica a Deus",
  "Pace da Fé",
  "Reino em Movimento",
  "Maior que a performance é o propósito",
];

export function Hero() {
  const [lockupError, setLockupError] = useState(false);
  const lockupRef = useRef<HTMLImageElement>(null);

  // O 404 do lockup pode ocorrer antes da hidratação (handler ainda não
  // anexado). Esta checagem no mount garante o fallback de texto.
  useEffect(() => {
    const img = lockupRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLockupError(true);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Atmosfera de fallback (aparece se a foto faltar) */}
      <div aria-hidden className="absolute inset-0 map-grid bg-night" />

      {/* Foto da equipe — full-bleed com zoom lento */}
      <motion.img
        src={TEAM_SRC}
        alt="Equipe Corre com Cristo reunida na orla da Baixada Santista"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="hero-zoom absolute inset-0 h-full w-full object-cover object-center"
      />

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
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:px-16 md:pb-20">
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
          {lockupError ? (
            <span aria-hidden>
              {["CORRE", "COM", "CRISTO"].map((word, index) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block brand-gradient"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.2 + index * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ) : (
            <motion.img
              ref={lockupRef}
              src={LOCKUP_SRC}
              alt=""
              aria-hidden
              onError={() => setLockupError(true)}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              className="w-full max-w-[min(88vw,40rem)] pace-glow"
            />
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-balance text-lg text-white/85">
            Um movimento de pessoas que glorificam a Deus em cada passo.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full brand-fill px-7 py-3.5 font-display text-base uppercase text-night transition-transform hover:scale-[1.03] pace-glow"
            >
              Quero correr
              <span aria-hidden>→</span>
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/30 px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
            >
              {siteConfig.instagram.handle}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ticker das frases */}
      <div className="pointer-events-none relative w-full overflow-hidden border-t border-white/10 py-3">
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
