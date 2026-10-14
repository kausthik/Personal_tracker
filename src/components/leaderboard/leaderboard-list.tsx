import { User } from "@/src/lib/user-type";
import { Search } from "lucide-react";
import { LeaderboardRow } from "./leaderboard-row";
import { getScore } from "./leaderboard-utils";

interface LeaderboardListProps {
  rows: { user: User; rank: number; gap: number }[];
  category: string;
  scoreLabel: string;
  topScore: number;
}

export function LeaderboardList({ rows, category, scoreLabel, topScore }: LeaderboardListProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="grid grid-cols-[2rem_1fr_auto] gap-3 border-b border-border/60 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:grid-cols-[2rem_1fr_9rem_5rem] sm:gap-4 sm:px-6">
        <span>#</span>
        <span>Member</span>
        <span className="hidden sm:block">Easy · Med · Hard</span>
        <span className="text-right">{scoreLabel}</span>
      </div>

      {rows.length === 0 ? (
        <div className="space-y-2 py-12 text-center">
          <Search className="mx-auto size-7 text-muted-foreground/60" />
          <p className="text-sm font-semibold">No one matches that name</p>
          <p className="text-xs text-muted-foreground">Try a different LeetCode username.</p>
        </div>
      ) : (
        <ol className="divide-y divide-border/50">
          {rows.map(({ user, rank, gap }) => (
            <LeaderboardRow
              key={user.username}
              user={user}
              rank={rank}
              score={getScore(user, category)}
              topScore={topScore}
              scoreLabel={scoreLabel}
              gapFromPrevious={gap}
            />
          ))}
        </ol>
      )}
    </section>
  );
}
