import { User } from "@/src/lib/user-type";
import { ExternalLink } from "lucide-react";

interface LeaderboardRowProps {
  user: User;
  rank: number;
  score: number;
  scoreLabel: string;
  gapFromPrevious?: number;
}

export function LeaderboardRow({
  user,
  rank,
  score,
  scoreLabel,
  gapFromPrevious,
}: LeaderboardRowProps) {
  const getRankBadgeStyle = (r: number) => {
    switch (r) {
      case 1:
        return "bg-amber-400 text-amber-950 font-black";
      case 2:
        return "bg-slate-300 text-slate-900 font-black";
      case 3:
        return "bg-amber-700 text-white font-black";
      default:
        return "bg-muted text-muted-foreground border border-border/60";
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/40">
      {/* Left: Rank + Avatar + Name */}
      <div className="flex items-center gap-3.5">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${getRankBadgeStyle(
            rank
          )}`}
        >
          {rank}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
            {user.username.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <a
              href={`https://leetcode.com/u/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary transition-colors text-sm"
            >
              <span>{user.username}</span>
              <ExternalLink className="size-3 text-muted-foreground group-hover/link:text-primary transition-colors" />
            </a>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Total: {user.total}</span>
              <span>•</span>
              <span>Rating: {user.rating}</span>
              <span>•</span>
              <span>Streak: {user.daily}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Solved Breakdown Chips & Score */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-11 sm:pl-0">
        {/* Difficulty Pills */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-600 dark:text-emerald-400">
            E: {user.easy}
          </span>
          <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-amber-600 dark:text-amber-400">
            M: {user.medium}
          </span>
          <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-rose-600 dark:text-rose-400">
            H: {user.hard}
          </span>
        </div>

        {/* Gap Tag */}
        {gapFromPrevious !== undefined && gapFromPrevious > 0 && (
          <div className="hidden lg:block text-xs font-semibold text-muted-foreground/80">
            <span className="rounded-full bg-muted/60 border border-border/60 px-2 py-0.5">
              -{gapFromPrevious} behind
            </span>
          </div>
        )}

        {/* Highlighted Score */}
        <div className="text-right min-w-[70px]">
          <div className="text-lg font-black tracking-tight text-primary">
            {score}
          </div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground">
            {scoreLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
