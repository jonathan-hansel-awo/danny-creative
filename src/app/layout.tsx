import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { RoomProvider } from "@/context/RoomContext";
import { MotionProvider } from "@/context/MotionContext";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { siteCopy } from "@/data/copy";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tenorSans = localFont({
  src: "../../public/fonts/Tenor_Sans/TenorSans-Regular.ttf",
  variable: "--font-tenor",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dannycreative.com"),
  title: {
    default: siteCopy.meta.title,
    template: "%s | Danny Creative",
  },
  description: siteCopy.meta.description,
  keywords: siteCopy.meta.keywords,
  authors: [{ name: "Danny Creative" }],
  creator: "Danny Creative",
  publisher: "Danny Creative",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://dannycreative.com",
    siteName: "Danny Creative",
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Danny Creative - Creative Branding Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
    images: ["/og-image.jpg"],
    creator: "@dannycreative",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${tenorSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-dark-bg text-dark-text antialiased">
        <MotionProvider>
          <RoomProvider>
            <SmoothScroll>
              <ClientWrapper>
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
