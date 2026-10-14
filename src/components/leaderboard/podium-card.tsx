import { User } from "@/src/lib/user-type";
import { ExternalLink } from "lucide-react";

interface PodiumCardProps {
  rank: number;
  user: User;
  medal: string;
  color: string;
  border: string;
  glow: string;
  title: string;
  diffText?: string;
  score: number;
  scoreLabel: string;
}

export function PodiumCard({
  rank,
  user,
  medal,
  color,
  border,
  glow,
  title,
  diffText,
  score,
  scoreLabel,
}: PodiumCardProps) {
  const isLeader = rank === 1;

  return (
    <div
      className={`relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border ${border} bg-card/80 p-6 backdrop-blur-xl transition-all duration-300 ${glow} ${
        isLeader
          ? "md:-order-none order-first md:py-8 bg-gradient-to-b from-amber-500/10 via-card/90 to-card"
          : "py-6"
      }`}
    >
      {/* Header: Title & Medal */}
      <div className="flex w-full items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <span className="text-2xl" aria-hidden="true">
          {medal}
        </span>
      </div>

      {/* Contender Details */}
      <div className="my-4 flex flex-col items-center text-center space-y-2">
        {/* Avatar Initials Badge */}
        <div
          className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white font-black text-lg shadow-md ring-4 ring-background`}
        >
          {user.username.slice(0, 2).toUpperCase()}
        </div>

        <div className="space-y-0.5">
          <a
            href={`https://leetcode.com/u/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-base font-bold text-foreground hover:text-primary transition-colors"
          >
            <span>{user.username}</span>
            <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <p className="text-xs text-muted-foreground">Rank #{rank}</p>
        </div>

        {/* Main Score Display */}
        <div className="pt-1">
          <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {score}
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            {scoreLabel}
          </p>
        </div>

        {/* Gap Tag */}
        {diffText && (
          <span className="inline-flex items-center rounded-full bg-muted/60 border border-border/60 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {diffText}
          </span>
        )}
      </div>

      {/* Breakdown Chips */}
      <div className="w-full pt-3 border-t border-border/50 grid grid-cols-3 gap-1.5 text-center text-xs">
        <div className="rounded-lg bg-emerald-500/10 p-1 font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="text-[10px] block opacity-75">Easy</span>
          {user.easy}
        </div>
        <div className="rounded-lg bg-amber-500/10 p-1 font-semibold text-amber-600 dark:text-amber-400">
          <span className="text-[10px] block opacity-75">Med</span>
          {user.medium}
        </div>
        <div className="rounded-lg bg-rose-500/10 p-1 font-semibold text-rose-600 dark:text-rose-400">
          <span className="text-[10px] block opacity-75">Hard</span>
          {user.hard}
        </div>
      </div>
    </div>
  );
}
