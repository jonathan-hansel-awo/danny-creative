import type { Metadata } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import { ClientWrapper } from "@/components/providers/ClientWrapper";
import "./globals.css";

const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tenor",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danny Creative — Branding Agency",
  description: "We make brands that win hearts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${tenorSans.variable} ${inter.variable}`}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
