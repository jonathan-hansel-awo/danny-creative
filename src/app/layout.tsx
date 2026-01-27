import type { Metadata, Viewport } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import { ClientWrapper } from "@/components/providers/ClientWrapper";
import "./globals.css";

const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tenor",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Danny Creative | Branding Agency",
    template: "%s | Danny Creative",
  },
  description:
    "We make brands people remember. Strategy, identity, and digital experiences for businesses that refuse to blend in.",
  keywords: [
    "branding agency",
    "brand strategy",
    "visual identity",
    "web design",
    "creative agency",
    "brand design",
    "digital experience",
  ],
  authors: [{ name: "Danny Creative" }],
  creator: "Danny Creative",
  publisher: "Danny Creative",
  metadataBase: new URL("https://dannycreative.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dannycreative.com",
    siteName: "Danny Creative",
    title: "Danny Creative | Branding Agency",
    description:
      "We make brands people remember. Strategy, identity, and digital experiences for businesses that refuse to blend in.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Danny Creative - Branding Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Creative | Branding Agency",
    description:
      "We make brands people remember. Strategy, identity, and digital experiences for businesses that refuse to blend in.",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${tenorSans.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Danny Creative",
              description: "Branding agency helping businesses stand out",
              url: "https://dannycreative.com",
              logo: "https://dannycreative.com/logo.png",
              sameAs: [
                "https://instagram.com/dannycreative",
                "https://linkedin.com/company/dannycreative",
                "https://twitter.com/dannycreative",
                "https://dribbble.com/dannycreative",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@dannycreative.com",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-tenor), Georgia, serif",
          backgroundColor: "var(--color-cream)",
        }}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
