import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/#staedte", label: "Städte" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/bewertungsrichtlinie", label: "Bewertungsrichtlinie" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 py-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Link
            href="/"
            className="font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors"
          >
            Wohnheim<span className="text-blue-600">Check</span>
          </Link>
          <p className="mt-1 text-xs text-slate-500">
            Ehrliche Bewertungen von Studentenwohnheimen.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
