import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TurisAcess — Conectando acessibilidade ao turismo em Pernambuco",
    template: "%s · TurisAcess",
  },
  description:
    "Plataforma que conecta intérpretes de Libras e profissionais de acessibilidade a estabelecimentos turísticos, criando experiências verdadeiramente inclusivas.",
  metadataBase: new URL("https://turisacess.vercel.app"),
  openGraph: {
    title: "TurisAcess",
    description:
      "Conectando acessibilidade ao turismo em Pernambuco. Intérpretes de Libras, roteiros acessíveis e consultoria para estabelecimentos.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <ScrollProgress />
        <SiteHeader />
        <PageTransition>
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </PageTransition>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
