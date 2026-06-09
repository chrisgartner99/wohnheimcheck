import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Inter = ruhiger, gut lesbarer Fließtext
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Instrument Sans = clean-moderne Sans-Serif-Display-Schrift für Überschriften.
// Variable-Font inkl. Gewicht 600/700 (die Headlines nutzen font-semibold/bold).
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WohnheimCheck",
  description: "Ehrliche Bewertungen von Studentenwohnheimen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${instrumentSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 overflow-x-hidden">
        <SiteHeader />

        <main className="flex-1 max-w-[1140px] mx-auto w-full px-6 py-10 sm:py-12">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
