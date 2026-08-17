import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // AVIF primeiro: o hero cai de ~230 KB (WebP) para ~150 KB sem perda visível.
    formats: ["image/avif", "image/webp"],
    // O master mais largo do projeto tem 2560px. Pedir 3840 só faria o
    // otimizador reprocessar a mesma imagem num arquivo maior.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
