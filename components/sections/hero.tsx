"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { useTheme } from "@/components/providers/theme-provider";

const LOCKUP_SRC = "/hero-lockup.png";
const EASE = [0.16, 1, 0.3, 1] as const;

const PHRASES = [
  "Aqui a playlist glorifica a Deus",
  "Pace da Fé",
  "Reino em Movimento",
  "Maior que a performance é o propósito",
];

export function Hero() {
  const { theme } = useTheme();
  const [lockupError, setLockupError] = useState(false);
  const lockupRef = useRef<HTMLImageElement>(null);

  // O erro de 404 pode ocorrer antes da hidratação (handler onError ainda não
  // anexado). Esta checagem no mount garante o fallback nesse caso.
  useEffect(() => {
    const img = lockupRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLockupError(true);
  }, []);

  // No tema claro o lockup brilhante lava no branco — usamos o texto cinético
  // com o gradiente verde-fechado, que tem contraste.
  const showImage = theme === "dark" && !lockupError;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden map-grid px-6 pb-24 pt-28 md:px-16">
      {/* Atmosfera: brilhos do gradiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[110px] pace-scale"
        style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="telemetry mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-spring"
        >
          <span className="h-2 w-2 rounded-full bg-accent pace-glow" />
          {siteConfig.crew} · {siteConfig.region}
        </motion.span>

        <h1 className="font-display kinetic text-[clamp(3.4rem,15vw,11rem)] leading-[0.8]">
          <span className="sr-only">Corre com Cristo</span>
          {showImage ? (
            <motion.img
              ref={lockupRef}
              src={LOCKUP_SRC}
              alt=""
              aria-hidden
              onError={() => setLockupError(true)}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="w-full max-w-[min(92vw,54rem)] pace-glow"
            />
          ) : (
            <span aria-hidden>
              {["CORRE", "COM", "CRISTO"].map((word, index) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block brand-gradient"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <p className=" text-balance text-lg text-ink/85 xs:max-w-md">
            Um movimento de pessoas que glorificam a Deus em cada passo.{" "}
            {/* <span className="text-muted">{siteConfig.verseLong}</span>{" "}
            <span className="telemetry text-sm text-spring">— {siteConfig.verseRef}</span> */}
          </p>
        </motion.div>
      </div>

      {/* Ticker das frases */}
      <div className="pointer-events-none absolute bottom-6 left-0 w-full overflow-hidden border-y border-spring/15 py-3">
        <div className="ticker-track">
          {[0, 1].map((loop) => (
            <span key={loop} className="flex items-center">
              {PHRASES.map((phrase) => (
                <span key={`${loop}-${phrase}`} className="flex items-center">
                  <span className="font-display text-sm uppercase tracking-wide text-muted">
                    {phrase}
                  </span>
                  <span className="mx-5 h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
