"use client";

import { useState } from "react";
import Link from "next/link";

type Dorm = {
  name: string;
  slug: string;
  cities: { name: string; slug: string } | null;
};

export default function DormSearch({ dorms }: { dorms: Dorm[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim();

  const results =
    q.length > 1
      ? dorms
          .filter((d) => d.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 8)
      : [];

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wohnheim suchen…"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {q.length > 1 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-400">
              Kein Wohnheim gefunden.
            </p>
          ) : (
            <ul>
              {results.map((dorm) => (
                <li key={`${dorm.cities?.slug}-${dorm.slug}`}>
                  <Link
                    href={`/${dorm.cities?.slug}/${dorm.slug}`}
                    onClick={() => setQuery("")}
                    className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-800">
                      {dorm.name}
                    </span>
                    {dorm.cities && (
                      <span className="text-sm text-slate-400 ml-3 shrink-0">
                        {dorm.cities.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
