import type { Metadata } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import "./globals.css";

const tenorSans = Tenor_Sans({
  weight: "400",
  style: "normal",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danny Cre8tive",
  description: "Welcome to Danny Cre8tive's website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tenorSans.style} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
