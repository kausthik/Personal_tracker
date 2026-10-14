import { User } from "@/src/lib/user-type";
import { ArrowUpRight } from "lucide-react";
import { DifficultyBar } from "./difficulty-bar";
import { initials, profileUrl } from "./leaderboard-utils";

interface LeaderboardRowProps {
  user: User;
  rank: number;
  score: number;
  topScore: number;
  scoreLabel: string;
  gapFromPrevious?: number;
}

const rankStyles: Record<number, string> = {
  1: "bg-amber-400 text-amber-950",
  2: "bg-zinc-300 text-zinc-900",
  3: "bg-orange-700 text-white",
};

export function LeaderboardRow({
  user,
  rank,
  score,
  topScore,
  scoreLabel,
  gapFromPrevious,
}: LeaderboardRowProps) {
  const share = topScore > 0 ? (score / topScore) * 100 : 0;

  return (
    <li className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:grid-cols-[2rem_1fr_9rem_5rem] sm:gap-4 sm:px-6">
      <span
        className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
          rankStyles[rank] ?? "text-muted-foreground"
        }`}
      >
        {rank}
      </span>

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
          {initials(user.username)}
        </div>
        <div className="min-w-0 flex-1">
          <a
            href={profileUrl(user.username)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-1 text-sm font-medium hover:underline"
          >
            <span className="truncate">{user.username}</span>
            <ArrowUpRight className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          {/* Distance to the leader */}
          <div className="mt-1.5 h-1 max-w-48 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground/70" style={{ width: `${share}%` }} />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <DifficultyBar user={user} showCounts />
      </div>

      <div className="text-right">
        <p className="text-base font-bold tabular-nums">{score}</p>
        <p className="text-[11px] text-muted-foreground">
          {gapFromPrevious ? `−${gapFromPrevious}` : scoreLabel}
        </p>
      </div>
    </li>
  );
}
