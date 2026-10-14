import { User } from "@/src/lib/user-type";
import { PodiumCard } from "./podium-card";
import { getScore } from "./leaderboard-utils";

interface LeaderboardPodiumProps {
  topThree: User[];
  category: string;
  scoreLabel: string;
}

export function LeaderboardPodium({ topThree, category, scoreLabel }: LeaderboardPodiumProps) {
  if (topThree.length < 3) return null;

  const scores = topThree.map((u) => getScore(u, category));

  // Display order on wide screens: 2nd, 1st, 3rd
  const places = [
    { rank: 2, user: topThree[1], score: scores[1], gap: scores[0] - scores[1] },
    { rank: 1, user: topThree[0], score: scores[0], gap: 0 },
    { rank: 3, user: topThree[2], score: scores[2], gap: scores[1] - scores[2] },
  ];

  return (
    <section aria-label="Top three" className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
      {places.map((place) => (
        <PodiumCard key={place.user.username} {...place} scoreLabel={scoreLabel} />
      ))}
    </section>
  );
}
