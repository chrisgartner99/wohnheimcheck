import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default async function DormPage({
  params,
}: {
  params: Promise<{ city: string; dorm: string }>;
}) {
  const { city: citySlug, dorm: dormSlug } = await params;

  const { data: city } = await supabase
    .from("cities")
    .select("id, name, slug")
    .eq("slug", citySlug)
    .single();

  if (!city) notFound();

  const { data: dorm } = await supabase
    .from("dorms")
    .select("id, name, operator, approx_places")
    .eq("slug", dormSlug)
    .eq("city_id", city.id)
    .single();

  if (!dorm) notFound();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating_overall")
    .eq("dorm_id", dorm.id)
    .eq("status", "approved");

  const reviewCount = reviews?.length ?? 0;
  const avgRating =
    reviewCount > 0
      ? reviews!.reduce((sum, r) => sum + r.rating_overall, 0) / reviewCount
      : null;

  return (
    <div>
      <Link href={`/${citySlug}`} className="text-sm text-blue-600 hover:underline">
        ← {city.name}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">{dorm.name}</h1>

      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
        {dorm.operator && (
          <div className="flex gap-1.5">
            <dt className="font-medium text-slate-400">Betreiber</dt>
            <dd>{dorm.operator}</dd>
          </div>
        )}
        {dorm.approx_places != null && (
          <div className="flex gap-1.5">
            <dt className="font-medium text-slate-400">Plätze ca.</dt>
            <dd>{dorm.approx_places}</dd>
          </div>
        )}
      </dl>

      <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Bewertungen</h2>
        {avgRating === null ? (
          <p className="text-slate-400">Noch keine Bewertungen.</p>
        ) : (
          <div className="flex items-center gap-5">
            <p className="text-5xl font-bold text-amber-500">{avgRating.toFixed(1)}</p>
            <div>
              <Stars rating={avgRating} />
              <p className="text-sm text-slate-400 mt-1">
                {reviewCount} Bewertung{reviewCount !== 1 ? "en" : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href={`/${citySlug}/${dormSlug}/bewerten`}
          className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          Wohnheim bewerten
        </Link>
      </div>
    </div>
  );
}
