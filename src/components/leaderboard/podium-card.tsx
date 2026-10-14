import { User } from "@/src/lib/user-type";
import { Crown } from "lucide-react";
import { DifficultyBar } from "./difficulty-bar";
import { initials, profileUrl } from "./leaderboard-utils";

interface PodiumCardProps {
  rank: number;
  user: User;
  score: number;
  gap: number; // behind the place above
  scoreLabel: string;
}

const medals: Record<number, { ring: string; badge: string; accent: string; label: string }> = {
  1: {
    ring: "ring-amber-400",
    badge: "bg-amber-400 text-amber-950",
    accent: "bg-amber-400",
    label: "1st",
  },
  2: {
    ring: "ring-zinc-300 dark:ring-zinc-500",
    badge: "bg-zinc-300 text-zinc-900",
    accent: "bg-zinc-300 dark:bg-zinc-500",
    label: "2nd",
  },
  3: {
    ring: "ring-orange-700/70",
    badge: "bg-orange-700 text-white",
    accent: "bg-orange-700/70",
    label: "3rd",
  },
};

export function PodiumCard({ rank, user, score, gap, scoreLabel }: PodiumCardProps) {
  const medal = medals[rank];
  const isLeader = rank === 1;

  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/70 bg-card px-5 text-center shadow-xs ${
        isLeader ? "order-first pt-8 pb-6 md:order-none md:pt-10 md:pb-8" : "pt-6 pb-5"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${medal.accent}`} />
      {isLeader && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-amber-400/10 to-transparent" />
      )}

      <div className="relative">
        {isLeader && (
          <Crown className="absolute -top-5 left-1/2 size-5 -translate-x-1/2 fill-amber-400 text-amber-500" />
        )}
        <div
          className={`flex items-center justify-center rounded-full bg-muted font-bold ring-4 ring-offset-2 ring-offset-card ${medal.ring} ${
            isLeader ? "size-16 text-lg" : "size-14 text-base"
          }`}
        >
          {initials(user.username)}
        </div>
        <span
          className={`absolute -right-1 -bottom-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${medal.badge}`}
        >
          {medal.label}
        </span>
      </div>

      <a
        href={profileUrl(user.username)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 max-w-full truncate text-sm font-semibold hover:underline"
      >
        {user.username}
      </a>

      <p className={`mt-2 font-bold tabular-nums tracking-tight ${isLeader ? "text-4xl" : "text-3xl"}`}>
        {score}
      </p>
      <p className="text-xs text-muted-foreground">
        {scoreLabel}
        {gap > 0 && <span> · {gap} behind</span>}
      </p>

      <div className="mt-5 w-full">
        <DifficultyBar user={user} showCounts />
      </div>
    </div>
  );
}
