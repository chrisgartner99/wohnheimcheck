import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Inter = ruhiger, gut lesbarer Fließtext
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Fraunces = markante, warm-redaktionelle Display-Schrift für Überschriften
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
    <html lang="de" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
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
