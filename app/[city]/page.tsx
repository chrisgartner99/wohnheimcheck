import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;

  const { data: city } = await supabase
    .from("cities")
    .select("id, name, slug")
    .eq("slug", citySlug)
    .single();

  if (!city) notFound();

  const { data: dorms } = await supabase
    .from("dorms")
    .select("name, slug, operator")
    .eq("city_id", city.id);

  return (
    <div>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Alle Städte
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">{city.name}</h1>
      <p className="mt-1 text-slate-500">Studentenwohnheime</p>

      <div className="mt-8">
        {!dorms || dorms.length === 0 ? (
          <p className="text-slate-400">Noch keine Wohnheime eingetragen.</p>
        ) : (
          <ul className="space-y-3">
            {dorms.map((dorm) => (
              <li key={dorm.slug}>
                <Link
                  href={`/${city.slug}/${dorm.slug}`}
                  className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{dorm.name}</p>
                    {dorm.operator && (
                      <p className="text-sm text-slate-400 mt-0.5">{dorm.operator}</p>
                    )}
                  </div>
                  <span className="text-blue-600 text-lg shrink-0 ml-4">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
