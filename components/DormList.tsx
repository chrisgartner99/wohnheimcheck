"use client";

import { useState } from "react";
import Link from "next/link";
import { Stars } from "@/components/Stars";

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

type SortKey = "name" | "rating";

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
  const [sort, setSort] = useState<SortKey>("name");

  const sorted = [...dorms].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "de");
    if (a.avgRating === null && b.avgRating === null) return 0;
    if (a.avgRating === null) return 1;
    if (b.avgRating === null) return -1;
    return b.avgRating - a.avgRating;
  });

  return (
    <div>
      {/* Sort controls */}
      <div className="flex gap-2 mb-6">
        {(
          [
            ["name", "Name (A–Z)"],
            ["rating", "Beste Bewertung"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSort(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              sort === key
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-4">
        {sorted.map((dorm) => {
          const rent = rentLabel(dorm.rent_from, dorm.rent_to);
          return (
            <li key={dorm.slug}>
              <Link
                href={`/${citySlug}/${dorm.slug}`}
                className="block p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {dorm.name}
                    </p>
                    {dorm.operator && (
                      <p className="text-sm text-slate-400 mt-0.5">
                        {dorm.operator}
                      </p>
                    )}
                    {dorm.address && (
                      <p className="text-sm text-slate-400 mt-0.5">
                        {dorm.address}
                      </p>
                    )}
                  </div>
                  <span className="text-blue-500 text-xl shrink-0">→</span>
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
                    <span className="text-sm text-slate-400">
                      Noch keine Bewertung
                    </span>
                  )}

                  {rent && (
                    <span className="text-sm text-slate-500 bg-slate-100 rounded-full px-3 py-0.5">
                      {rent}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
