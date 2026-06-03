import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data: cities, error } = await supabase.from("cities").select("name, slug");

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Städte</h1>
      <p className="mt-2 text-slate-500">Wähle eine Stadt, um Wohnheime zu entdecken.</p>

      <div className="mt-8">
        {error || !cities || cities.length === 0 ? (
          <p className="text-slate-400">Noch keine Städte vorhanden.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${city.slug}`}
                  className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-slate-800">{city.name}</span>
                  <span className="text-blue-600 text-lg">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
