import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ReviewForm from "@/components/ReviewForm";
import { Card, PageHeader } from "@/components/ui";

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
      <PageHeader
        back={{ href: `/${citySlug}/${dormSlug}`, label: dorm.name }}
        title="Wohnheim bewerten"
        subtitle={dorm.name}
      />

      <Card className="mt-8 p-6 sm:p-8">
        <ReviewForm dormId={dorm.id} />
      </Card>
    </div>
  );
}
