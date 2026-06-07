import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Inter = ruhiger, gut lesbarer Fließtext
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Space Grotesk = markante Überschriften
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
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
