import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anjana P — Software Engineer",
  description:
    "Software engineer building thoughtful, robust web products with React, Next.js, Node.js and PostgreSQL. Based in Dubai, UAE.",
  openGraph: {
    title: "Anjana P — Software Engineer",
    description: "Selected work, experience and contact.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}
