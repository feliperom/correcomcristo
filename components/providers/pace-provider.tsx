"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { siteConfig } from "@/lib/site-config";

const CADENCE_BPM = 165; // cadência típica de corrida
const CONTEXT_ERROR = "usePace precisa estar dentro de <PaceProvider>";

/**
 * `--pace` alimenta brilhos decorativos, não leitura de conteúdo. Escrevemos a
 * ~30fps e só quando o valor arredondado muda: cada escrita invalida o estilo
 * do documento inteiro e repinta os `drop-shadow` que dependem dela.
 */
const PACE_FRAME_MS = 1000 / 30;
const REDUCED_MOTION_PACE = "0.20";

type PaceContextValue = {
  soundOn: boolean;
  toggleSound: () => void;
  hasTrack: boolean;
};

const PaceContext = createContext<PaceContextValue | null>(null);

export function usePace(): PaceContextValue {
  const value = useContext(PaceContext);
  if (!value) throw new Error(CONTEXT_ERROR);
  return value;
}

function buildGeneratedCadence(ctx: AudioContext, out: AudioNode): () => void {
  // Pad suave (acorde sustentado) + kick rítmico na cadência da corrida.
  const padGain = ctx.createGain();
  padGain.gain.value = 0.05;
  padGain.connect(out);

  const padFreqs = [110, 164.81, 220]; // A2, E3, A3
  const pads = padFreqs.map((freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(padGain);
    osc.start();
    return osc;
  });

  const beatSeconds = 60 / CADENCE_BPM;
  let nextBeat = ctx.currentTime + 0.1;
  let scheduler: number;

  const schedule = () => {
    while (nextBeat < ctx.currentTime + 0.2) {
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kick.frequency.setValueAtTime(110, nextBeat);
      kick.frequency.exponentialRampToValueAtTime(46, nextBeat + 0.12);
      kickGain.gain.setValueAtTime(0.0001, nextBeat);
      kickGain.gain.exponentialRampToValueAtTime(0.5, nextBeat + 0.01);
      kickGain.gain.exponentialRampToValueAtTime(0.0001, nextBeat + 0.18);
      kick.connect(kickGain).connect(out);
      kick.start(nextBeat);
      kick.stop(nextBeat + 0.2);
      nextBeat += beatSeconds;
    }
    scheduler = window.setTimeout(schedule, 60);
  };
  schedule();

  return () => {
    window.clearTimeout(scheduler);
    pads.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // já parado
      }
    });
  };
}

export function PaceProvider({ children }: { children: React.ReactNode }) {
  const [soundOn, setSoundOn] = useState(false);
  const hasTrack = Boolean(siteConfig.audio.trackUrl);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const soundOnRef = useRef(false);

  // Loop de animação: escreve --pace no documento (sem re-render).
  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const data = new Uint8Array(64);

    let frame = 0;
    let smooth = 0;
    let lastWrite = "";
    let lastFrameAt = 0;

    const write = (pace: string) => {
      if (pace === lastWrite) return;
      lastWrite = pace;
      root.style.setProperty("--pace", pace);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - lastFrameAt < PACE_FRAME_MS) return;
      lastFrameAt = now;

      const analyser = analyserRef.current;
      if (soundOnRef.current && analyser) {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 2; i < 24; i += 1) sum += data[i];
        const level = sum / (22 * 255);
        smooth += (level - smooth) * 0.2;
        write(Math.min(1, smooth * 1.8).toFixed(2));
        return;
      }

      // Respiração de cadência: pulso por batida + base lenta.
      const t = now / 1000;
      const beatLen = 60 / CADENCE_BPM;
      const phase = (t % beatLen) / beatLen;
      const pulse = Math.exp(-phase * 4.5);
      const breath = 0.5 + 0.5 * Math.sin(t * 0.7);
      write((0.18 * breath + 0.32 * pulse).toFixed(2));
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Sem loop quando o movimento não é bem-vindo ou a aba está oculta: o valor
    // fica parado num brilho constante e nada é recalculado.
    const sync = () => {
      const idle = document.hidden || (motionQuery.matches && !soundOnRef.current);
      if (idle) {
        stop();
        if (motionQuery.matches) write(REDUCED_MOTION_PACE);
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, [soundOn]);

  const startSound = useCallback(async () => {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    await ctx.resume();

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.75;
    analyser.connect(ctx.destination);
    analyserRef.current = analyser;

    if (siteConfig.audio.trackUrl) {
      const el = new Audio(siteConfig.audio.trackUrl);
      el.crossOrigin = "anonymous";
      el.loop = true;
      audioElRef.current = el;
      const source = ctx.createMediaElementSource(el);
      source.connect(analyser);
      await el.play();
      cleanupRef.current = () => {
        el.pause();
        el.src = "";
      };
    } else {
      cleanupRef.current = buildGeneratedCadence(ctx, analyser);
    }
  }, []);

  const stopSound = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    audioElRef.current = null;
    analyserRef.current = null;
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      soundOnRef.current = next;
      if (next) {
        void startSound();
      } else {
        stopSound();
      }
      return next;
    });
  }, [startSound, stopSound]);

  return (
    <PaceContext.Provider value={{ soundOn, toggleSound, hasTrack }}>
      {children}
    </PaceContext.Provider>
  );
}
