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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
            <Link href="/" className="text-blue-600 font-bold text-lg tracking-tight hover:text-blue-700 transition-colors">
              WohnheimCheck
            </Link>
          </div>
        </header>

        <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
