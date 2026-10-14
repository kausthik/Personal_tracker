import { User } from "@/src/lib/user-type";
import { Crown } from "lucide-react";
import { PodiumCard } from "./podium-card";
import { getScore } from "./leaderboard-utils";

interface LeaderboardPodiumProps {
  topThree: User[];
  category: string;
  scoreLabel: string;
}

export function LeaderboardPodium({
  topThree,
  category,
  scoreLabel,
}: LeaderboardPodiumProps) {
  if (topThree.length < 3) return null;

  const podiumConfig = [
    {
      rank: 2,
      user: topThree[1],
      medal: "🥈",
      color: "from-slate-400 to-zinc-500",
      border: "border-slate-300 dark:border-slate-700",
      glow: "hover:shadow-[0_0_25px_rgba(148,163,184,0.3)]",
      title: "Runner Up",
      diffText: `-${getScore(topThree[0], category) - getScore(topThree[1], category)} behind leader`,
    },
    {
      rank: 1,
      user: topThree[0],
      medal: "🥇",
      color: "from-amber-400 to-yellow-500",
      border: "border-amber-400/80 dark:border-amber-500/60 ring-2 ring-amber-400/30",
      glow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] shadow-md",
      title: "Cohort Leader",
      diffText: undefined,
    },
    {
      rank: 3,
      user: topThree[2],
      medal: "🥉",
      color: "from-amber-700 to-amber-800",
      border: "border-amber-800/40 dark:border-amber-900/60",
      glow: "hover:shadow-[0_0_25px_rgba(180,83,9,0.25)]",
      title: "3rd Place",
      diffText: `-${getScore(topThree[1], category) - getScore(topThree[2], category)} behind 2nd`,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Crown className="size-4 text-amber-500" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Official Podium
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {podiumConfig.map((item) => (
          <PodiumCard
            key={item.user.username}
            rank={item.rank}
            user={item.user}
            medal={item.medal}
            color={item.color}
            border={item.border}
            glow={item.glow}
            title={item.title}
            diffText={item.diffText}
            score={getScore(item.user, category)}
            scoreLabel={scoreLabel}
          />
        ))}
      </div>
    </div>
  );
}
