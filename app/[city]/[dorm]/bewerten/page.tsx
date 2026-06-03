import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ReviewForm from "@/components/ReviewForm";

export default async function BewertenPage({
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
    .select("id, name")
    .eq("slug", dormSlug)
    .eq("city_id", city.id)
    .single();

  if (!dorm) notFound();

  return (
    <div>
      <Link
        href={`/${citySlug}/${dormSlug}`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← {dorm.name}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">Wohnheim bewerten</h1>
      <p className="mt-1 text-slate-500">{dorm.name}</p>

      <div className="mt-10 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <ReviewForm dormId={dorm.id} />
      </div>
    </div>
  );
}
