"use client";

import { useState } from "react";
import Link from "next/link";
import { Stars } from "@/components/Stars";
import { Badge, cardInteractive } from "@/components/ui";

export type DormItem = {
  id: string;
  name: string;
  slug: string;
  operator: string | null;
  address: string | null;
  rent_from: number | null;
  rent_to: number | null;
  avgRating: number | null;
  reviewCount: number;
};

type SortKey = "name-asc" | "name-desc" | "best" | "worst";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name-asc", label: "Name (A–Z)" },
  { key: "name-desc", label: "Name (Z–A)" },
  { key: "best", label: "Beste Bewertung" },
  { key: "worst", label: "Schlechteste Bewertung" },
];

function rentLabel(from: number | null, to: number | null): string | null {
  if (from && to) return `ca. ${from}–${to} € / Monat`;
  if (from) return `ab ${from} € / Monat`;
  return null;
}

export default function DormList({
  dorms,
  citySlug,
}: {
  dorms: DormItem[];
  citySlug: string;
}) {
  const [sort, setSort] = useState<SortKey>("name-asc");

  const sorted = [...dorms].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name, "de");
    if (sort === "name-desc") return b.name.localeCompare(a.name, "de");
    // best / worst: Wohnheime ohne Bewertung immer ans Ende
    if (a.avgRating === null && b.avgRating === null) return 0;
    if (a.avgRating === null) return 1;
    if (b.avgRating === null) return -1;
    return sort === "best"
      ? b.avgRating - a.avgRating
      : a.avgRating - b.avgRating;
  });

  return (
    <div>
      {/* Sort controls */}
      <div className="mb-6 flex">
        <label className="flex items-center gap-2 text-sm text-slate-500">
          <span className="text-xs font-medium text-slate-400">
            Sortieren:
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {sorted.map((dorm) => {
          const rent = rentLabel(dorm.rent_from, dorm.rent_to);
          return (
            <li key={dorm.slug}>
              <Link
                href={`/${citySlug}/${dorm.slug}`}
                className={`${cardInteractive} block p-5 group`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors break-words">
                      {dorm.name}
                    </p>
                    {dorm.operator && (
                      <p className="text-sm text-slate-400 mt-0.5 break-words">
                        {dorm.operator}
                      </p>
                    )}
                    {dorm.address && (
                      <p className="text-sm text-slate-400 mt-0.5 break-words">
                        {dorm.address}
                      </p>
                    )}
                  </div>
                  <span className="text-blue-400 text-xl shrink-0 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {dorm.avgRating !== null ? (
                    <div className="flex items-center gap-1.5">
                      <Stars rating={dorm.avgRating} size="sm" />
                      <span className="text-sm font-medium text-slate-700">
                        {dorm.avgRating.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-400">
                        ({dorm.reviewCount})
                      </span>
                    </div>
                  ) : (
                    <Badge tone="neutral">Noch keine Bewertung</Badge>
                  )}

                  {rent && <Badge tone="brand">{rent}</Badge>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
