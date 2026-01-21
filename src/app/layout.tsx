import type { Metadata, Viewport } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import { ClientWrapper } from "@/components/layout/ClientWrapper";
import "./globals.css";

// Load Tenor Sans - Display & Body font
const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tenor",
});

// Load Inter - UI font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Danny Creative | Creative Branding Agency",
  description:
    "Bold strategies. Stunning visuals. Experiences that leave a lasting impression. We transform visions into movements.",
  keywords: [
    "branding agency",
    "creative agency",
    "brand identity",
    "web design",
    "visual design",
    "brand strategy",
  ],
  authors: [{ name: "Danny Creative" }],
  openGraph: {
    title: "Danny Creative | Creative Branding Agency",
    description:
      "Bold strategies. Stunning visuals. Experiences that leave a lasting impression.",
    url: "https://dannycreative.com",
    siteName: "Danny Creative",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Creative | Creative Branding Agency",
    description:
      "Bold strategies. Stunning visuals. Experiences that leave a lasting impression.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tenorSans.variable} ${inter.variable}`}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
