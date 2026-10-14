import Link from "next/link";
import { categories, CategoryConfig } from "@/src/config/category-data";
import { ArrowLeft, Users, Search } from "lucide-react";

interface LeaderboardHeaderProps {
  category: string;
  totalContenders: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentCategoryConfig: CategoryConfig;
}

export function LeaderboardHeader({
  category,
  totalContenders,
  searchQuery,
  onSearchChange,
  currentCategoryConfig,
}: LeaderboardHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Top Nav: Back Link + Contenders Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/leaderboard"
          className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-3.5 py-2 text-xs font-semibold text-muted-foreground shadow-xs backdrop-blur-md transition-all hover:bg-card hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Categories</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-xs">
            <Users className="size-3.5 text-primary" />
            <span>{totalContenders} Contenders</span>
          </span>
        </div>
      </div>

      {/* Category Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive =
            cat.slug === category ||
            (category === "contest" && cat.slug === "rating") ||
            (category === "total" && cat.slug === "total");

          return (
            <Link
              key={cat.slug}
              href={`/leaderboard/${cat.slug}`}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border/60 bg-card/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name.replace(" Problems", "")}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Title Banner & Search */}
      <div className="rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <span>{currentCategoryConfig.icon}</span>
              <span>{currentCategoryConfig.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentCategoryConfig.name} Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              {currentCategoryConfig.desc}
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter username..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background/80 pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
