import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Stars } from "@/components/Stars";
import ReviewList from "@/components/ReviewList";
import { Badge, BackLink, Button, Card, RatingBar } from "@/components/ui";

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
  created_at: string;
  resident_status: string | null;
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
      "rating_overall, rating_price, rating_location, rating_cleanliness, rating_internet, rating_noise, rating_community, rating_management, rating_safety, would_move_again, comment, created_at, resident_status"
    )
    .eq("dorm_id", dorm.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

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
      <BackLink href={`/${citySlug}`}>{city.name}</BackLink>

      {/* Header */}
      <div className="mt-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 break-words">
          {dorm.name}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          {dorm.operator && <span className="break-words">{dorm.operator}</span>}
          {dorm.address && <span className="break-words">{dorm.address}</span>}
          {dorm.approx_places != null && (
            <span>ca. {dorm.approx_places} Plätze</span>
          )}
        </div>
        {rent && (
          <div className="mt-3">
            <Badge tone="neutral">{rent}</Badge>
          </div>
        )}
      </div>

      {/* Rating summary */}
      <Card className="mt-8 p-6 sm:p-7">
        {overallAvg === null ? (
          <div className="text-center py-6">
            <p className="text-slate-500 text-base">
              Noch keine Bewertungen. Sei der Erste, der dieses Wohnheim bewertet.
            </p>
            <div className="mt-5">
              <Button href={`/${citySlug}/${dormSlug}/bewerten`} size="lg">
                Jetzt bewerten
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Overall */}
            <div className="flex items-center gap-4 shrink-0">
              <p className="text-6xl font-bold text-slate-900 tabular-nums leading-none">
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
                  <div
                    key={key}
                    className="grid grid-cols-[1fr_auto] gap-x-4 items-center sm:grid-cols-[160px_1fr]"
                  >
                    <span className="text-xs text-slate-500 truncate">
                      {label}
                    </span>
                    <RatingBar value={avg} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* CTA button (only when reviews exist) */}
      {overallAvg !== null && (
        <div className="mt-5">
          <Button href={`/${citySlug}/${dormSlug}/bewerten`} size="lg">
            Wohnheim bewerten
          </Button>
        </div>
      )}

      {/* Individual reviews (Sortierung & Sterne-Filter clientseitig) */}
      {reviewCount > 0 && <ReviewList reviews={reviews} />}
    </div>
  );
}
