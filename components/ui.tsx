import Link from "next/link";
import type { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Shared design system
   Royal Blue (blue-600) = Primärfarbe · Sky Blue (blue-400) = Akzent
   Slate-50 = Hintergrund · Slate-900 = Navy-Text · Amber = Sterne
   Diese Bausteine werden auf allen Seiten verwendet, damit das
   gesamte Produkt einheitlich wirkt.
   ────────────────────────────────────────────────────────────── */

/* Card-Klassen als wiederverwendbare Strings, damit auch <Link>-
   Karten exakt denselben Look bekommen wie statische Cards. */
export const cardBase =
  "bg-white rounded-2xl border border-slate-200 shadow-sm";
export const cardInteractive =
  `${cardBase} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300`;

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`${cardBase} ${className}`}>{children}</div>;
}

/* Button – primär / sekundär, optional als Link gerendert. */
export function Button({
  href,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  className = "",
  children,
}: {
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm sm:text-base",
  };
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:border-blue-400 hover:text-blue-700",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* Badge / Tag – semantische Farbtöne (neutral, Marke, positiv, negativ). */
export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "brand" | "positive" | "negative";
  children: ReactNode;
}) {
  const tones = {
    neutral: "bg-slate-100 text-slate-600",
    brand: "bg-blue-50 text-blue-700",
    positive: "bg-emerald-50 text-emerald-700",
    negative: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* Bewertungsbalken für eine einzelne Kategorie (0–5). */
export function RatingBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-600 w-7 text-right tabular-nums">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

/* Kleines Großbuchstaben-Label für Abschnittsüberschriften. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
      {children}
    </p>
  );
}

/* Dezenter Zurück-Link (Pfeil + Text). */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
    >
      <span aria-hidden>←</span>
      <span className="break-words">{children}</span>
    </Link>
  );
}

/* Einheitlicher Seitenkopf (Zurück-Link + Titel + optionale Subline). */
export function PageHeader({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div>
      {back && <BackLink href={back.href}>{back.label}</BackLink>}
      <h1
        className={`text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 break-words ${
          back ? "mt-5" : ""
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-slate-500 break-words">{subtitle}</p>
      )}
    </div>
  );
}
