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
  title: "GOBAI - Inteligencia Artificial para la Política | Revolución Digital",
  description: "Transforma tu estrategia política con GOBAI. Análisis de opinión pública, toma de decisiones basada en datos y campañas políticas inteligentes. Más de 120 empresas confían en nuestra tecnología de IA avanzada.",
  keywords: "inteligencia artificial, política, análisis de datos, opinión pública, campañas políticas, IA, estrategia política, automatización, análisis predictivo",
  authors: [{ name: "GOBAI" }],
  creator: "GOBAI",
  publisher: "GOBAI",
  openGraph: {
    title: "GOBAI - Inteligencia Artificial para la Política",
    description: "Revoluciona tu estrategia política con IA avanzada. Análisis de opinión pública, toma de decisiones inteligente and campañas optimizadas.",
    url: "https://gobai.com",
    siteName: "GOBAI",
    images: [
      {
        url: "/img/gobai-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GOBAI - Inteligencia Artificial para la Política",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOBAI - Inteligencia Artificial para la Política",
    description: "Revoluciona tu estrategia política con IA avanzada. Análisis de opinión pública y campañas inteligentes.",
    images: ["/img/gobai-twitter-image.jpg"],
    creator: "@gobai",
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
  verification: {
    google: "your-google-verification-code",
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
