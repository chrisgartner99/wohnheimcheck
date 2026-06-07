import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-[1140px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg tracking-tight text-slate-900 hover:opacity-80 transition-opacity"
        >
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {/* Eine Wortmarke = ein Flex-Item, damit kein Lückenabstand entsteht */}
          <span className="font-bold">
            Wohnheim<span className="text-blue-600">Check</span>
          </span>
        </Link>

        <nav>
          {/* Ankerlink in die Städte-Sektion der Startseite (existiert wirklich) */}
          <Link
            href="/#staedte"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">Entdecken</span>
            <span className="hidden sm:inline">Wohnheime entdecken</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
