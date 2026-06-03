import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DormList, { type DormItem } from "@/components/DormList";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;

  const { data: city } = await supabase
    .from("cities")
    .select("id, name, slug")
    .eq("slug", citySlug)
    .single();

  if (!city) notFound();

  const { data: rawDorms } = await supabase
    .from("dorms")
    .select(
      "id, name, slug, operator, address, rent_from, rent_to, reviews(rating_overall, status)"
    )
    .eq("city_id", city.id);

  const dorms: DormItem[] = (rawDorms ?? []).map((d) => {
    const reviews = (
      d.reviews as { rating_overall: number; status: string }[]
    ) ?? [];
    const approved = reviews.filter((r) => r.status === "approved");
    const avgRating =
      approved.length > 0
        ? approved.reduce((s, r) => s + r.rating_overall, 0) / approved.length
        : null;
    return {
      id: d.id,
      name: d.name,
      slug: d.slug,
      operator: d.operator as string | null,
      address: d.address as string | null,
      rent_from: d.rent_from as number | null,
      rent_to: d.rent_to as number | null,
      avgRating,
      reviewCount: approved.length,
    };
  });

  return (
    <div>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Alle Städte
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">{city.name}</h1>
      <p className="mt-1 text-slate-500">
        {dorms.length} {dorms.length === 1 ? "Wohnheim" : "Wohnheime"}
      </p>

      <div className="mt-8">
        {dorms.length === 0 ? (
          <p className="text-slate-400">Noch keine Wohnheime eingetragen.</p>
        ) : (
          <DormList dorms={dorms} citySlug={city.slug} />
        )}
      </div>
    </div>
  );
}
