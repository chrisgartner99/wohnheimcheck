"use client";

import { useMemo, useState } from "react";
import ReviewCard, { type ReviewCardData } from "@/components/ReviewCard";

type SortKey = "newest" | "oldest" | "best" | "worst";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Neueste zuerst" },
  { key: "oldest", label: "Älteste zuerst" },
  { key: "best", label: "Beste zuerst" },
  { key: "worst", label: "Schlechteste zuerst" },
];

// Ab wie vielen Bewertungen die Steuerelemente sinnvoll sind.
const CONTROLS_THRESHOLD = 3;

export default function ReviewList({ reviews }: { reviews: ReviewCardData[] }) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [starFilter, setStarFilter] = useState<number | null>(null); // null = Alle

  const showControls = reviews.length >= CONTROLS_THRESHOLD;

  const visible = useMemo(() => {
    const filtered =
      starFilter === null
        ? reviews
        : reviews.filter((r) => Math.round(r.rating_overall) === starFilter);

    const byDateDesc = (a: ReviewCardData, b: ReviewCardData) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

    const sorted = [...filtered];
    switch (sort) {
      case "newest":
        sorted.sort(byDateDesc);
        break;
      case "oldest":
        sorted.sort((a, b) => -byDateDesc(a, b));
        break;
      case "best":
        sorted.sort(
          (a, b) => b.rating_overall - a.rating_overall || byDateDesc(a, b)
        );
        break;
      case "worst":
        sorted.sort(
          (a, b) => a.rating_overall - b.rating_overall || byDateDesc(a, b)
        );
        break;
    }
    return sorted;
  }, [reviews, sort, starFilter]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-slate-900">Bewertungen</h2>

      {showControls && (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Sterne-Filter als Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400 mr-1">
              Sterne:
            </span>
            {[null, 5, 4, 3, 2, 1].map((star) => {
              const active = starFilter === star;
              return (
                <button
                  key={star ?? "all"}
                  type="button"
                  onClick={() => setStarFilter(star)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {star === null ? (
                    "Alle"
                  ) : (
                    <span className="inline-flex items-center gap-0.5">
                      {star}
                      <span
                        aria-hidden
                        className={active ? "text-white" : "text-amber-400"}
                      >
                        ★
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sortierung als Dropdown */}
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
      )}

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">
          Keine Bewertungen mit dieser Sternezahl.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {visible.map((review, i) => (
            <li key={i}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
