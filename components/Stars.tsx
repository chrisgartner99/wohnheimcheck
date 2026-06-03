type Fill = "full" | "half" | "empty";

function StarSymbol({ fill }: { fill: Fill }) {
  // All three variants use identical box model: inline-block, leading-none.
  // This ensures equal height so the flex container aligns them on a clean baseline.
  if (fill === "full") {
    return (
      <span className="inline-block leading-none text-amber-400">★</span>
    );
  }
  if (fill === "empty") {
    return (
      <span className="inline-block leading-none text-slate-200">★</span>
    );
  }
  // Half: gray base + amber overlay clipped to 50% width
  return (
    <span className="relative inline-block leading-none">
      <span className="leading-none text-slate-200">★</span>
      <span
        className="absolute inset-0 overflow-hidden leading-none text-amber-400"
        style={{ width: "50%" }}
      >
        ★
      </span>
    </span>
  );
}

export function Stars({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = { sm: "text-sm", md: "text-base", lg: "text-2xl" }[size];
  return (
    <span
      className={`inline-flex items-center gap-px leading-none ${sizeClass}`}
      aria-label={`${rating.toFixed(1)} von 5 Sternen`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const remaining = rating - (i - 1);
        const fill: Fill =
          remaining >= 0.75 ? "full" : remaining >= 0.25 ? "half" : "empty";
        return <StarSymbol key={i} fill={fill} />;
      })}
    </span>
  );
}
