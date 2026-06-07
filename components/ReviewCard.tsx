import { Stars } from "./Stars";
import { Badge, cardBase } from "./ui";

export type ReviewCardData = {
  rating_overall: number;
  would_move_again: boolean | null;
  comment: string | null;
  created_at: string;
  resident_status: string | null;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <article className={`${cardBase} p-5`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Stars rating={review.rating_overall} size="sm" />
          {review.resident_status && (
            <Badge tone="brand">
              {review.resident_status === "current"
                ? "Wohnt aktuell hier"
                : "Hat hier gewohnt"}
            </Badge>
          )}
          {review.would_move_again !== null && (
            <Badge tone={review.would_move_again ? "positive" : "negative"}>
              Würde {review.would_move_again ? "" : "nicht "}wieder einziehen
            </Badge>
          )}
        </div>
        <span className="text-xs text-slate-400 shrink-0">
          {formatDate(review.created_at)}
        </span>
      </div>

      {review.comment && (
        <p className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line break-words">
          {review.comment}
        </p>
      )}
    </article>
  );
}
