import Link from "next/link";
import { categories } from "@/src/config/category-data";
import {
  Trophy,
  Flame,
  CalendarDays,
  Sparkles,
  Layers,
  Skull,
  Crown,
  ArrowRight,
  TrendingUp,
  Zap,
  Swords,
  Users,
  ShieldCheck,
} from "lucide-react";

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "total":
      return <Crown className="size-6" />;
    case "rating":
      return <Trophy className="size-6" />;
    case "daily":
      return <CalendarDays className="size-6" />;
    case "easy":
      return <Sparkles className="size-6" />;
    case "medium":
      return <Layers className="size-6" />;
    case "hard":
      return <Skull className="size-6" />;
    default:
      return <Zap className="size-6" />;
  }
};

export default function LeaderboardHome() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background text-foreground">
      {/* Dynamic ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-blue-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-48 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-48 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="uppercase">LeetCode Arena • Live Sync</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              Leaderboard
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Arena
            </span>
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
            Track competitive standings, measure depth across problem tiers,
            and monitor consistency across your peer cohort in real time.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 backdrop-blur-xs">
              <Users className="size-4 text-blue-500" />
              <span>Peer Cohort Sync</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 backdrop-blur-xs">
              <Swords className="size-4 text-indigo-500" />
              <span>6 Battle Tiers</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 backdrop-blur-xs">
              <TrendingUp className="size-4 text-emerald-500" />
              <span>Live Elo & Streaks</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const icon = getCategoryIcon(cat.slug);

            return (
              <Link
                key={cat.slug}
                href={`/leaderboard/${cat.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${cat.borderColor} bg-card/70 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${cat.glowColor}`}
              >
                {/* Decorative Top Accent Gradient Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.accentBg} transition-all duration-300 group-hover:h-1.5`}
                />

                {/* Subtle Inner Glow Background */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl border border-border/40 shadow-xs transition-all duration-300 ${cat.iconBg}`}
                    >
                      {icon}
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cat.badgeBg} ${cat.badgeBorder} ${cat.badgeText}`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </h2>
                      <span className="text-sm select-none" aria-hidden="true">
                        {cat.icon}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Pill Tag + Interactive Arrow */}
                <div className="relative z-10 mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {cat.metricLabel}
                  </span>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span>Rankings</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Feature Callout */}
        <div className="mt-12 rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8 backdrop-blur-md shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold">Automated Sync Engine</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Standings are parsed through direct GraphQL queries to LeetCode's public user
                profiles. View gaps between contenders, track daily challenge completions, and benchmark your progress.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/leaderboard/total"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Crown className="size-4" />
                <span>Overall Podium</span>
              </Link>

              <Link
                href="/leaderboard/rating"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Trophy className="size-4 text-amber-500" />
                <span>Contest Rating</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
