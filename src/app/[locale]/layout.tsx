import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavigationBar from '@/components/navigation/NavigationBar';
import Footer from '@/components/Footer';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gobai.la'),
  title: "GOBAI | Inteligencia Artificial para la Política y Estrategia Digital",
  description: "Líderes en Inteligencia Artificial para la Política. Análisis de opinión pública, toma de decisiones basada en datos, campañas electorales inteligentes y monitoreo digital avanzado. Potenciamos tu estrategia con tecnología de vanguardia.",
  keywords: "GOBAI, Inteligencia Artificial, IA Política, Análisis Electoral, Estrategia Digital, Opinión Pública, Big Data Política, Campañas Inteligentes, Data Science Política, Honduras, Latinoamérica",
  authors: [{ name: "GOBAI Team" }],
  creator: "GOBAI",
  publisher: "GOBAI",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GOBAI | Inteligencia Artificial para la Política",
    description: "Transforma tu estrategia política con el poder de la IA. Análisis en tiempo real y decisiones informadas para el éxito electoral.",
    url: "https://gobai.com",
    siteName: "GOBAI",
    images: [
      {
        url: "/img/gobai-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GOBAI - IA para la Política",
      },
    ],
    locale: "es_HN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOBAI | Inteligencia Artificial para la Política",
    description: "Revolucionando la política con Inteligencia Artificial. Decisiones basadas en datos y estrategia digital avanzada.",
    images: ["/img/gobai-twitter-image.jpg"],
    creator: "@gobai_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SmoothScroll from '@/components/layout/SmoothScroll';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Obtaining messages for the client provider
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <NavigationBar />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
