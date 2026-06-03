"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const RATING_CATEGORIES = [
  { key: "rating_overall", label: "Gesamt", required: true },
  { key: "rating_price", label: "Preis-Leistung", required: false },
  { key: "rating_location", label: "Lage und ÖPNV", required: false },
  { key: "rating_cleanliness", label: "Sauberkeit", required: false },
  { key: "rating_internet", label: "Internet", required: false },
  { key: "rating_noise", label: "Lautstärke", required: false },
  { key: "rating_community", label: "Gemeinschaft", required: false },
  { key: "rating_management", label: "Verwaltung / Hausmeister", required: false },
  { key: "rating_safety", label: "Sicherheit", required: false },
] as const;

type RatingKey = (typeof RATING_CATEGORIES)[number]["key"];

function RatingButtons({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
            value === n
              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
              : "border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 bg-white"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ dormId }: { dormId: string }) {
  const [ratings, setRatings] = useState<Record<RatingKey, number | null>>({
    rating_overall: null,
    rating_price: null,
    rating_location: null,
    rating_cleanliness: null,
    rating_internet: null,
    rating_noise: null,
    rating_community: null,
    rating_management: null,
    rating_safety: null,
  });
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

    if (ratings.rating_overall === null) {
      setError("Bitte gib mindestens eine Gesamtbewertung ab.");
      return;
    }
    if (!confirmed) {
      setError("Bitte bestätige, dass die Bewertung auf deiner eigenen Erfahrung beruht.");
      return;
    }

    setLoading(true);

    const { error: supabaseError } = await supabase.from("reviews").insert({
      dorm_id: dormId,
      rating_overall: ratings.rating_overall,
      rating_price: ratings.rating_price,
      rating_location: ratings.rating_location,
      rating_cleanliness: ratings.rating_cleanliness,
      rating_internet: ratings.rating_internet,
      rating_noise: ratings.rating_noise,
      rating_community: ratings.rating_community,
      rating_management: ratings.rating_management,
      rating_safety: ratings.rating_safety,
      would_move_again: wouldMoveAgain,
      comment: comment.trim() || null,
    });

    setLoading(false);

    if (supabaseError) {
      setError("Beim Speichern ist ein Fehler aufgetreten. Bitte versuche es erneut.");
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
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Rating categories */}
      <div className="space-y-5">
        {RATING_CATEGORIES.map(({ key, label, required }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-slate-700 shrink-0 w-44">
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <RatingButtons value={ratings[key]} onChange={(v) => setRating(key, v)} />
          </div>
        ))}
      </div>

      {/* Would move again */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-slate-700 w-44 shrink-0">
          Nochmal einziehen?
        </p>
        <div className="flex gap-3">
          {(["Ja", "Nein"] as const).map((label) => {
            const val = label === "Ja";
            return (
              <button
                key={label}
                type="button"
                onClick={() => setWouldMoveAgain(val)}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
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
      <div>
        <p className="text-xs text-slate-400 mb-2">
          Bitte beschreibe deine eigene Erfahrung. Keine Namen von Mitarbeitenden oder
          Bewohnern, keine Beleidigungen.
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Dein Kommentar (optional)"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-slate-600">
          Ich bestätige, dass diese Bewertung auf meiner eigenen Erfahrung beruht.
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
