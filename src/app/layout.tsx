import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import ScrollManager from "@/components/layout/ScrollManager";
import Preloader from "@/components/layout/Preloader";
import Curtain from "@/components/layout/Curtain";
import Cursor from "@/components/layout/Cursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Grain from "@/components/layout/Grain";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

/**
 * Runs before first paint: marks JS as available (enables intro states), skips the
 * preloader for returning visitors in this session / reduced motion, and holds the
 * scroll while the preloader is up (released by the preloader, or after 9s at worst).
 */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('intro-seen'))d.setAttribute('data-seen','')}catch(e){}if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-seen','');if(!d.hasAttribute('data-seen')){d.classList.add('scroll-locked');setTimeout(function(){if(!d.hasAttribute('data-seen'))d.classList.remove('scroll-locked')},9000)}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <ScrollManager />
        <Preloader name={site.name} role={site.role} />
        <Curtain />
        <Nav />
        <main
          id="content"
          className="relative z-10 rounded-b-[clamp(1.75rem,4vw,4rem)] bg-ink shadow-[0_50px_100px_-20px_rgb(0_0_0/0.8)]"
        >
          {children}
        </main>
        <Footer />
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
