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

const DESCRIPTION =
  "Mais do que um grupo de corrida — um movimento de pessoas que glorificam a Deus em cada passo. Baixada Santista. Reino em Movimento.";

/**
 * A Vercel expõe o domínio de produção em tempo de build. Sem ele (dev, ou
 * outro host), cai em localhost — o importante é que as URLs de Open Graph
 * sejam absolutas, senão o preview do link no WhatsApp vem sem imagem.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * O conteúdo entra na página com opacity:0 e só aparece quando o Motion anima.
 * Sem JavaScript nada disso roda e a página fica em branco, então devolvemos a
 * visibilidade no CSS. `!important` numa folha de estilo vence o style inline.
 */
const NO_SCRIPT_FALLBACK = `<style>
  [style*="opacity:0"] { opacity: 1 !important; transform: none !important; }
</style>`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.name} · ${siteConfig.crew}`,
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.crew}`,
    description: "Reino em Movimento. Aqui a playlist glorifica a Deus.",
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-corre-com-cristo.jpg",
        width: 1200,
        height: 630,
        alt: "Equipe Corre com Cristo reunida na orla da Baixada Santista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.crew}`,
    description: "Reino em Movimento. Aqui a playlist glorifica a Deus.",
    images: ["/og-corre-com-cristo.jpg"],
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
        <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT_FALLBACK }} />
      </head>
      <body className="grain">
        <a href="#top" className="skip-link">
          Pular para o conteúdo
        </a>
        <ThemeProvider>
          <PaceProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </PaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
