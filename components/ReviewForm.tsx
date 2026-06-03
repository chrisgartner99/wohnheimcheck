"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const RATING_CATEGORIES = [
  {
    key: "rating_price",
    label: "Preis-Leistung",
    description: "Stimmt der Preis für das Gebotene?",
    required: false,
  },
  {
    key: "rating_location",
    label: "Lage / ÖPNV",
    description: "Anbindung, Wege zur Uni und in die Stadt",
    required: false,
  },
  {
    key: "rating_cleanliness",
    label: "Sauberkeit",
    description: "Zustand von Zimmer und Gemeinschaftsräumen",
    required: false,
  },
  {
    key: "rating_internet",
    label: "Internet",
    description: "Geschwindigkeit und Stabilität",
    required: false,
  },
  {
    key: "rating_noise",
    label: "Lautstärke",
    description: "Lärm im Haus und von außen",
    required: false,
  },
  {
    key: "rating_community",
    label: "Gemeinschaft",
    description: "Kontakt zu Mitbewohnenden, Atmosphäre",
    required: false,
  },
  {
    key: "rating_management",
    label: "Verwaltung / Hausmeister",
    description: "Erreichbarkeit und Hilfsbereitschaft",
    required: false,
  },
  {
    key: "rating_safety",
    label: "Sicherheit",
    description: "Sicheres Gefühl im und ums Gebäude",
    required: false,
  },
] as const;

type RatingKey = (typeof RATING_CATEGORIES)[number]["key"];

function StarRating({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
          aria-label={`${n} Stern${n !== 1 ? "e" : ""}`}
          className="text-3xl leading-none transition-transform hover:scale-110 focus:outline-none"
        >
          <span className={display >= n ? "text-amber-400" : "text-slate-200"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ dormId }: { dormId: string }) {
  const [ratings, setRatings] = useState<Record<RatingKey, number | null>>({
    rating_price: null,
    rating_location: null,
    rating_cleanliness: null,
    rating_internet: null,
    rating_noise: null,
    rating_community: null,
    rating_management: null,
    rating_safety: null,
  });
  const [residentStatus, setResidentStatus] = useState<"current" | "former" | null>(null);
  const [wouldMoveAgain, setWouldMoveAgain] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setRating(key: RatingKey, value: number) {
    setRatings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (residentStatus === null) {
      setError("Bitte gib an, ob du aktuell hier wohnst oder früher gewohnt hast.");
      return;
    }
    const filledVals = (Object.values(ratings) as (number | null)[]).filter(
      (v): v is number => v !== null
    );
    if (filledVals.length === 0) {
      setError("Bitte bewerte mindestens eine Kategorie.");
      return;
    }
    const rating_overall =
      filledVals.reduce((a, b) => a + b, 0) / filledVals.length;

    if (!confirmed) {
      setError(
        "Bitte bestätige, dass die Bewertung auf deiner eigenen Erfahrung beruht."
      );
      return;
    }

    setLoading(true);

    const { error: supabaseError } = await supabase.from("reviews").insert({
      dorm_id: dormId,
      rating_overall,
      rating_price: ratings.rating_price,
      rating_location: ratings.rating_location,
      rating_cleanliness: ratings.rating_cleanliness,
      rating_internet: ratings.rating_internet,
      rating_noise: ratings.rating_noise,
      rating_community: ratings.rating_community,
      rating_management: ratings.rating_management,
      rating_safety: ratings.rating_safety,
      resident_status: residentStatus,
      would_move_again: wouldMoveAgain,
      comment: comment.trim() || null,
    });

    setLoading(false);

    if (supabaseError) {
      setError(
        "Beim Speichern ist ein Fehler aufgetreten. Bitte versuche es erneut."
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-green-800 text-sm">
        Danke. Deine Bewertung wird nach einer kurzen Prüfung freigeschaltet.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* Resident status */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Wohnst du aktuell in diesem Wohnheim?
          <span className="text-red-500 ml-0.5">*</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {(
            [
              ["current", "Ich wohne aktuell hier"],
              ["former", "Ich habe früher hier gewohnt"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setResidentStatus(val)}
              className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors text-left ${
                residentStatus === val
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating categories */}
      <div>
        <p className="text-xs text-slate-400 mb-6">
          1 Stern = schlecht &nbsp;·&nbsp; 5 Sterne = sehr gut
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {RATING_CATEGORIES.map(({ key, label, description, required }) => (
            <div key={key} className="space-y-2">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {label}
                  {required && (
                    <span className="text-red-500 ml-0.5">*</span>
                  )}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{description}</p>
              </div>
              <StarRating
                value={ratings[key]}
                onChange={(v) => setRating(key, v)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Would move again */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Würdest du nochmal hier einziehen?
        </p>
        <div className="flex gap-3">
          {(["Ja", "Nein"] as const).map((label) => {
            const val = label === "Ja";
            return (
              <button
                key={label}
                type="button"
                onClick={() => setWouldMoveAgain(val)}
                className={`px-6 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  wouldMoveAgain === val
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 bg-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Kommentar{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </p>
        <p className="text-xs text-slate-400">
          Bitte beschreibe deine eigene Erfahrung. Keine Namen von
          Mitarbeitenden oder Bewohnern, keine Beleidigungen.
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Dein Kommentar…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirmation */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-slate-600">
          Ich bestätige, dass diese Bewertung auf meiner eigenen Erfahrung
          beruht.
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
      >
        {loading ? "Wird gespeichert…" : "Bewertung abschicken"}
      </button>
    </form>
  );
}
