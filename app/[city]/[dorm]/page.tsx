import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Stars } from "@/components/Stars";

const CATEGORIES = [
  { key: "rating_price", label: "Preis-Leistung" },
  { key: "rating_location", label: "Lage / ÖPNV" },
  { key: "rating_cleanliness", label: "Sauberkeit" },
  { key: "rating_internet", label: "Internet" },
  { key: "rating_noise", label: "Lautstärke" },
  { key: "rating_community", label: "Gemeinschaft" },
  { key: "rating_management", label: "Verwaltung / Hausmeister" },
  { key: "rating_safety", label: "Sicherheit" },
] as const;

type Review = {
  rating_overall: number;
  rating_price: number | null;
  rating_location: number | null;
  rating_cleanliness: number | null;
  rating_internet: number | null;
  rating_noise: number | null;
  rating_community: number | null;
  rating_management: number | null;
  rating_safety: number | null;
  would_move_again: boolean | null;
  comment: string | null;
};

function categoryAvg(reviews: Review[], key: keyof Review): number | null {
  const vals = reviews
    .map((r) => r[key] as number | null)
    .filter((v): v is number => v != null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function rentLabel(from: number | null, to: number | null): string | null {
  if (from && to) return `ca. ${from}–${to} € / Monat`;
  if (from) return `ab ${from} € / Monat`;
  return null;
}

function RatingBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-400 rounded-full transition-all"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-600 w-7 text-right tabular-nums">
        {value.toFixed(1)}
      </span>
    </div>
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
    .select("id, name, operator, address, approx_places, rent_from, rent_to")
    .eq("slug", dormSlug)
    .eq("city_id", city.id)
    .single();

  if (!dorm) notFound();

  const { data: rawReviews } = await supabase
    .from("reviews")
    .select(
      "rating_overall, rating_price, rating_location, rating_cleanliness, rating_internet, rating_noise, rating_community, rating_management, rating_safety, would_move_again, comment"
    )
    .eq("dorm_id", dorm.id)
    .eq("status", "approved")
    .order("id", { ascending: false });

  const reviews: Review[] = rawReviews ?? [];
  const reviewCount = reviews.length;
  const overallAvg =
    reviewCount > 0
      ? reviews.reduce((s, r) => s + r.rating_overall, 0) / reviewCount
      : null;
  const rent = rentLabel(
    dorm.rent_from as number | null,
    dorm.rent_to as number | null
  );

  return (
    <div>
      <Link href={`/${citySlug}`} className="text-sm text-blue-600 hover:underline">
        ← {city.name}
      </Link>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-slate-900">{dorm.name}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          {dorm.operator && <span>{dorm.operator}</span>}
          {dorm.address && <span>{dorm.address}</span>}
          {dorm.approx_places != null && (
            <span>ca. {dorm.approx_places} Plätze</span>
          )}
        </div>
        {rent && (
          <span className="mt-3 inline-block text-sm bg-slate-100 text-slate-600 rounded-full px-3 py-1">
            {rent}
          </span>
        )}
      </div>

      {/* Rating summary */}
      <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        {overallAvg === null ? (
          <div className="text-center py-6">
            <p className="text-slate-500 text-base">
              Noch keine Bewertungen. Sei der Erste, der dieses Wohnheim bewertet.
            </p>
            <Link
              href={`/${citySlug}/${dormSlug}/bewerten`}
              className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Jetzt bewerten
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Overall */}
            <div className="flex items-center gap-4 shrink-0">
              <p className="text-6xl font-bold text-amber-500 tabular-nums">
                {overallAvg.toFixed(1)}
              </p>
              <div>
                <Stars rating={overallAvg} size="lg" />
                <p className="text-sm text-slate-400 mt-1">
                  {reviewCount} Bewertung{reviewCount !== 1 ? "en" : ""}
                </p>
              </div>
            </div>

            {/* Category bars */}
            <div className="flex-1 space-y-3">
              {CATEGORIES.map(({ key, label }) => {
                const avg = categoryAvg(reviews, key as keyof Review);
                if (avg === null) return null;
                return (
                  <div key={key} className="grid grid-cols-[1fr_auto] gap-x-4 items-center sm:grid-cols-[160px_1fr]">
                    <span className="text-xs text-slate-500 truncate">{label}</span>
                    <RatingBar value={avg} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA button (only when reviews exist) */}
      {overallAvg !== null && (
        <div className="mt-5">
          <Link
            href={`/${citySlug}/${dormSlug}/bewerten`}
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Wohnheim bewerten
          </Link>
        </div>
      )}

      {/* Individual reviews */}
      {reviewCount > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Alle Bewertungen
          </h2>
          <ul className="space-y-4">
            {reviews.map((review, i) => (
              <li
                key={i}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <Stars rating={review.rating_overall} size="sm" />
                  {review.would_move_again !== null && (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        review.would_move_again
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      Würde {review.would_move_again ? "" : "nicht "}wieder
                      einziehen
                    </span>
                  )}
                </div>
                {review.comment && (
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
