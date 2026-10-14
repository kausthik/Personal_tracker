import Link from "next/link";
import { categories, CategoryConfig } from "@/src/config/category-data";
import { Search, Users } from "lucide-react";

interface LeaderboardHeaderProps {
  category: CategoryConfig;
  totalContenders: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function LeaderboardHeader({
  category,
  totalContenders,
  searchQuery,
  onSearchChange,
}: LeaderboardHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Users className="size-3.5" />
            LeetCode cohort · {totalContenders}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Leaderboard</h1>
          <p className="max-w-xl text-sm text-muted-foreground">{category.desc}</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Find a username"
            aria-label="Filter by username"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-border/80 bg-background pr-4 pl-9 text-sm transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/50 focus:outline-none"
          />
        </div>
      </div>

      <nav
        aria-label="Leaderboard categories"
        className="flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2.5 sm:px-6"
      >
        {categories.map((cat) => {
          const isActive = cat.slug === category.slug;
          const Icon = cat.icon;

          return (
            <Link
              key={cat.slug}
              href={`/leaderboard/${cat.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              {cat.tab}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
