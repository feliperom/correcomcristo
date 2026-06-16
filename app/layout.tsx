import type { Metadata, Viewport } from "next";
import { Archivo_Black, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PaceProvider } from "@/components/providers/pace-provider";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.crew}`,
  description:
    "Mais do que um grupo de corrida — um movimento de pessoas que glorificam a Deus em cada passo. Baixada Santista. Reino em Movimento.",
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.crew}`,
    description: "Reino em Movimento. Aqui a playlist glorifica a Deus.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#052e2b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon//favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon//apple-touch-icon.png" />
        <link rel="manifest" href="/favicon//site.webmanifest" />
      </head>
      <body className="grain">
        <ThemeProvider>
          <PaceProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </PaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
