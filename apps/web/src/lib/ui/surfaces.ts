/** Shared Tailwind surface classes — styling tokens only */
export const surfaces = {
  card: "rounded-xl border border-zinc-200/80 bg-white shadow-sm",
  cardElevated:
    "rounded-xl border border-zinc-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md",
  panel: "rounded-xl border border-zinc-200/70 bg-zinc-50/50",
  table: "overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm",
  inset: "rounded-lg border border-zinc-200/60 bg-zinc-50/80",
} as const;
