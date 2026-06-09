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
    <div className="relative w-full max-w-[520px]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Stadt oder Wohnheim suchen…"
        className="h-14 w-full rounded-[14px] border border-slate-200 bg-white pl-12 pr-4 text-slate-800 placeholder-slate-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {q.length > 1 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">
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
                      <span className="text-sm text-slate-500 ml-3 shrink-0">
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
