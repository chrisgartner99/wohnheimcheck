import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 overflow-x-hidden">
        <header className="bg-white">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="text-blue-600 font-bold text-lg tracking-tight hover:text-blue-700 transition-colors">
              WohnheimCheck
            </Link>
            {/* right-side nav placeholder */}
          </div>
        </header>

        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
          {children}
        </div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
            <Link href="/impressum" className="hover:text-slate-600 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-slate-600 transition-colors">Datenschutz</Link>
            <Link href="/bewertungsrichtlinie" className="hover:text-slate-600 transition-colors">Bewertungsrichtlinie</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
