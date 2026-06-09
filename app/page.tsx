import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import DormSearch from "@/components/DormSearch";
import { cardBase, cardInteractive, Card, Badge } from "@/components/ui";

type DormEntry = {
  name: string;
  slug: string;
  cities: { name: string; slug: string } | null;
};

const ADVANTAGES = [
  {
    title: "Echte Erfahrungen",
    text: "Bewertungen von Studierenden, die dort tatsächlich wohnen oder gewohnt haben.",
    icon: <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />,
  },
  {
    title: "Wichtige Kriterien",
    text: "Von Preis-Leistung über Internet bis Lautstärke – die Punkte, die im Alltag zählen.",
    icon: (
      <>
        <path d="M8 6h12" />
        <path d="M8 12h12" />
        <path d="M8 18h12" />
        <path d="M4 6h.01" />
        <path d="M4 12h.01" />
        <path d="M4 18h.01" />
      </>
    ),
  },
  {
    title: "Bessere Entscheidung",
    text: "Vergleiche ehrlich und entscheide sicher, bevor du den Mietvertrag unterschreibst.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

// Die acht Kategorien, nach denen Wohnheime bewertet werden
// (identisch zum Bewertungsformular und den Detailseiten).
const RATING_CRITERIA = [
  "Preis-Leistung",
  "Lage / ÖPNV",
  "Sauberkeit",
  "Internet",
  "Lautstärke",
  "Gemeinschaft",
  "Verwaltung / Hausmeister",
  "Sicherheit",
];

export default async function Home() {
  const [{ data: cities }, { data: rawDorms }] = await Promise.all([
    supabase.from("cities").select("name, slug, dorms(count)"),
    supabase
      .from("dorms")
      .select("name, slug, cities(name, slug)")
      .order("name"),
  ]);

  // Supabase types nested relations as arrays when types aren't generated.
  // Map to the expected shape so no unsafe cast is needed.
  const allDorms: DormEntry[] = (rawDorms ?? []).map((d) => ({
    name: d.name,
    slug: d.slug,
    cities: (Array.isArray(d.cities) ? d.cities[0] : d.cities) ?? null,
  }));

  // Städte mit echter Wohnheimzahl; aktive Städte zuerst, dann alphabetisch.
  const cityCards = (cities ?? [])
    .map((city) => ({
      name: city.name as string,
      slug: city.slug as string,
      dormCount: (city.dorms as { count: number }[])[0]?.count ?? 0,
    }))
    .sort(
      (a, b) =>
        (b.dormCount > 0 ? 1 : 0) - (a.dormCount > 0 ? 1 : 0) ||
        a.name.localeCompare(b.name, "de")
    );

  // Stadt mit den meisten Wohnheimen für die ehrliche Trust-Zeile im Hero
  // und das CTA-Ziel.
  const leadCity = cityCards.reduce<(typeof cityCards)[number] | null>(
    (top, c) => (c.dormCount > (top?.dormCount ?? 0) ? c : top),
    null
  );

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      {/*
        -mt-10 sm:-mt-12 cancels the layout's top padding so the hero
        sits flush under the header. calc(50% - 50vw) expands the
        section to full viewport width from inside the max-w-5xl container.
      */}
      <section
        className="relative -mt-10 sm:-mt-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {/* weiche Lichtflächen für Tiefe – eigener Clip-Layer, damit das
            Such-Dropdown (absolut) nicht vom Hero abgeschnitten wird */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 h-80 w-[36rem] rounded-full bg-blue-400/15 blur-3xl" />
        </div>
        {/* Inhalt: zentriert, gleicher Container + Padding wie der Rest */}
        <div className="relative mx-auto flex max-w-[1140px] flex-col items-center justify-center px-6 py-20 text-center lg:min-h-[500px] lg:py-24">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-sky-100">
              Von Studierenden für Studierende
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] break-words">
              Finde heraus, wie dein Wohnheim{" "}
              <span className="inline-block -skew-x-6 text-sky-300">wirklich</span> ist.
            </h1>
            <p className="mt-6 mx-auto max-w-lg text-base sm:text-lg text-blue-100 leading-relaxed">
              Echte Erfahrungen von Studierenden zu Lage, Internet, Lautstärke,
              Sauberkeit und Verwaltung – bevor du unterschreibst.
            </p>
            <div className="mt-8 flex justify-center">
              <DormSearch dorms={allDorms} />
            </div>
            {leadCity && (
              <p className="mt-7 flex items-center justify-center gap-2.5 text-sm sm:text-[15px] font-medium text-blue-50">
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-400/25 text-sky-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>
                  Bereits {leadCity.dormCount}{" "}
                  {leadCity.dormCount === 1 ? "Wohnheim" : "Wohnheime"} in{" "}
                  {leadCity.name} erfasst · Weitere Städte folgen
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Warum WohnheimCheck ──────────────────────────── */}
      <section className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-center">
          Warum WohnheimCheck?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {ADVANTAGES.map(({ title, text, icon }) => (
            <Card key={title} className="p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden
                >
                  {icon}
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Städte ───────────────────────────────────────── */}
      <section id="staedte" className="mt-24 pt-14 border-t border-slate-200 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-center">
          Städte
        </h2>
        <p className="mt-4 text-slate-500 text-center max-w-xl mx-auto leading-relaxed">
          Wähle deine Stadt und entdecke die Wohnheime vor Ort.
        </p>

        <div className="mt-10">
          {cityCards.length === 0 ? (
            <p className="text-slate-400 text-center">
              Noch keine Städte vorhanden.
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityCards.map((city) => {
                const hasDorms = city.dormCount > 0;
                return (
                  <li key={city.slug}>
                    {hasDorms ? (
                      <Link
                        href={`/${city.slug}`}
                        className={`${cardInteractive} flex items-center justify-between p-6 group`}
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors break-words">
                            {city.name}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            {city.dormCount}{" "}
                            {city.dormCount === 1 ? "Wohnheim" : "Wohnheime"}
                          </p>
                        </div>
                        <span className="ml-3 inline-block text-blue-400 text-xl shrink-0 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                          →
                        </span>
                      </Link>
                    ) : (
                      <div
                        className={`${cardBase} flex items-center justify-between p-6 border-dashed`}
                      >
                        <p className="font-semibold text-slate-500 break-words min-w-0">
                          {city.name}
                        </p>
                        <span className="ml-3 shrink-0">
                          <Badge tone="neutral">Kommt bald</Badge>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── Bewertungskriterien ──────────────────────────── */}
      <section className="mt-24 pt-14 border-t border-slate-200 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Bewertungskriterien
        </h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
          Jedes Wohnheim wird in diesen acht Kategorien bewertet – damit du
          genau siehst, was zählt.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {RATING_CRITERIA.map((criterion) => (
            <li
              key={criterion}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
            >
              {criterion}
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mt-24 mb-4">
        <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-10 sm:px-12 flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Du hast schon in einem Wohnheim gewohnt?
            </h2>
            <p className="mt-3 max-w-xl text-blue-100 leading-relaxed">
              Hilf anderen Studierenden bei der Entscheidung und teile deine
              Erfahrung.
            </p>
          </div>
          <Link
            href={leadCity ? `/${leadCity.slug}` : "/#staedte"}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-white"
          >
            Wohnheim bewerten
          </Link>
        </div>
      </section>
    </div>
  );
}
