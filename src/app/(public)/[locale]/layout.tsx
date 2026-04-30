import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import NavigationBar from '@/components/navigation/NavigationBar';
import Footer from '@/components/Footer';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { Toaster } from "@/components/ui/sonner"

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
  description: "Líderes en Inteligencia Artificial para la Política.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            <Toaster position="top-center" richColors />
            <NavigationBar />
            {/* <SmoothScroll> */}
              {children}
              <Footer />
            {/* </SmoothScroll> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
