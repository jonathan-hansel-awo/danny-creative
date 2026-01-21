import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { RoomProvider } from "@/context/RoomContext";
import { MotionProvider } from "@/context/MotionContext";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ParticleField from "@/components/effects/ParticleField";
import FluidDistortion from "@/components/effects/FluidDistortion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/layout/ClientWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tenorSans = localFont({
  src: "../../public/fonts/TenorSans-Regular.ttf",
  variable: "--font-tenor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danny Creative | Creative Branding Agency",
  description:
    "We create brands that win hearts. Bold strategies, stunning visuals, and experiences that leave a lasting impression.",
  keywords: [
    "branding agency",
    "creative agency",
    "brand strategy",
    "visual identity",
    "digital experience",
    "motion design",
  ],
  authors: [{ name: "Hansel Jonathan" }],
  openGraph: {
    title: "Danny Creative | Creative Branding Agency",
    description: "We create brands that win hearts.",
    url: "https://dannycreative.com",
    siteName: "Danny Creative",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Danny Creative",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Creative | Creative Branding Agency",
    description: "We create brands that win hearts.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${tenorSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          href="/fonts/TenorSans-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-dark-bg text-dark-text antialiased">
        <MotionProvider>
          <RoomProvider>
            <SmoothScroll>
              <ClientWrapper>
                <ParticleField />
                <FluidDistortion />
                <Navigation />
                <main>{children}</main>
                <Footer />
              </ClientWrapper>
            </SmoothScroll>
          </RoomProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
