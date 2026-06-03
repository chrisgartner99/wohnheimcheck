import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import DormSearch from "@/components/DormSearch";

type DormEntry = {
  name: string;
  slug: string;
  cities: { name: string; slug: string } | null;
};

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Stadt und Wohnheim finden",
    description:
      "Wähle deine Stadt aus der Liste oder suche direkt nach dem Namen deines Wohnheims.",
  },
  {
    step: 2,
    title: "Echte Erfahrungen lesen",
    description:
      "Sieh dir Bewertungen von Studierenden an, die dort tatsächlich gewohnt haben oder noch wohnen.",
  },
  {
    step: 3,
    title: "Selbst anonym bewerten",
    description:
      "Teile deine eigene Erfahrung. Kein Account nötig – alle Bewertungen werden vor der Veröffentlichung geprüft.",
  },
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

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      {/*
        -mt-10 cancels the layout's py-10 top padding so the hero sits
        flush under the header. calc(50% - 50vw) expands the section to
        full viewport width from inside the max-w-5xl container.
      */}
      <section
        className="relative -mt-10 py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-center px-6"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {/* animated decorative circles */}
        <div className="animate-hero-float pointer-events-none absolute -top-28 -left-28 h-96 w-96 rounded-full bg-white/5" />
        <div className="animate-hero-drift pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-white/5" />

        <p className="relative text-sm font-semibold uppercase tracking-widest text-blue-200 mb-4">
          Von Studierenden für Studierende
        </p>
        <h1 className="relative text-5xl sm:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto">
          Ehrliche Bewertungen von Studentenwohnheimen
        </h1>
        <p className="relative mt-6 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
          Finde heraus, wie es sich in den Wohnheimen deiner Stadt wirklich
          lebt – bevor du unterschreibst.
        </p>
        <div className="relative mt-10">
          <DormSearch dorms={allDorms} />
        </div>
      </section>

      {/* ── Städte ───────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
          Städte
        </h2>

        {!cities || cities.length === 0 ? (
          <p className="text-slate-400">Noch keine Städte vorhanden.</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => {
              const dormCount =
                (city.dorms as { count: number }[])[0]?.count ?? 0;
              return (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-200 shadow-sm
                               hover:border-blue-400 hover:shadow-lg hover:-translate-y-1
                               transition-all duration-200 group"
                  >
                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                        {city.name}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        {dormCount}{" "}
                        {dormCount === 1 ? "Wohnheim" : "Wohnheime"}
                      </p>
                    </div>
                    <span className="inline-block text-blue-400 text-xl group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ── So funktioniert's ────────────────────────────── */}
      <section className="mt-24 pt-14 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          So funktioniert's
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map(({ step, title, description }) => (
            <div
              key={step}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-7"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold mb-5">
                {step}
              </div>
              <h3 className="font-semibold text-slate-800">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Worum geht's ─────────────────────────────────── */}
      <section className="mt-24 pt-14 border-t border-slate-200 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Worum geht's?</h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
          WohnheimCheck sammelt neutrale, ehrliche Bewertungen von Studierenden
          – unabhängig von Betreibern oder Hochschulen. Unser Ziel: mehr
          Transparenz auf dem Wohnheimmarkt, damit du eine fundierte
          Entscheidung treffen kannst.
        </p>
      </section>

      {/* ── Bundesweite Ausrichtung ───────────────────────── */}
      <section className="mt-16 mb-8">
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-8 py-8 text-center">
          <p className="font-semibold text-blue-900">
            Wir starten in Baden-Württemberg und wachsen Schritt für Schritt
            bundesweit.
          </p>
          <p className="mt-2 text-sm text-blue-700">
            Deine Stadt fehlt noch? Bald kannst du sie vorschlagen.
          </p>
        </div>
      </section>
    </div>
  );
}
