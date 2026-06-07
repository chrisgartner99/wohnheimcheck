import { Card, PageHeader } from "@/components/ui";

export default function BewertungsrichtliniePage() {
  const rules = [
    "Bewerte nur Wohnheime, in denen du selbst gewohnt hast oder aktuell wohnst.",
    "Beschreibe deine eigene Erfahrung und Meinung. Stelle keine unbelegten Tatsachenbehauptungen auf.",
    "Nenne keine Namen von Mitarbeitenden, Hausmeistern oder anderen Bewohnern.",
    "Keine Beleidigungen, Beschimpfungen oder diskriminierenden Aussagen.",
    "Bleib sachlich und fair, auch wenn deine Erfahrung negativ war.",
    "Keine Werbung, kein Spam, keine erfundenen Bewertungen.",
    "Alle Bewertungen werden vor der Veröffentlichung manuell geprüft. Verstöße werden nicht freigegeben oder wieder entfernt.",
    "Wenn dir eine veröffentlichte Bewertung unangemessen erscheint, kontaktiere uns, damit wir sie prüfen können.",
  ];

  return (
    <div className="max-w-prose">
      <PageHeader
        title="Bewertungsrichtlinie"
        subtitle="Damit Bewertungen fair und hilfreich bleiben, gelten diese Regeln."
      />
      <Card className="mt-8 p-6 sm:p-8">
        <ul className="space-y-4">
          {rules.map((rule, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                {i + 1}
              </span>
              <span className="break-words">{rule}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
