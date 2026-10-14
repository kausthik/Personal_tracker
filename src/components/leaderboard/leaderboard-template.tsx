"use client";

import { useState } from "react";
import { User } from "@/src/lib/user-type";
import { categories, findCategory } from "@/src/config/category-data";
import { LeaderboardHeader } from "./leaderboard-header";
import { LeaderboardPodium } from "./leaderboard-podium";
import { LeaderboardList } from "./leaderboard-list";
import { getScore } from "./leaderboard-utils";

type Props = {
  category: string; // slug
  data: User[];
};

export function Leaderboard({ category: slug, data }: Props) {
  const category = findCategory(slug) ?? categories[0];
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.toLowerCase().trim();

  const sorted = [...(data || [])].sort(
    (a, b) => getScore(b, category.slug) - getScore(a, category.slug)
  );
  const ranked = sorted.map((user, i) => ({
    user,
    rank: i + 1,
    // Points behind the member ranked directly above
    gap: i > 0 ? getScore(sorted[i - 1], category.slug) - getScore(user, category.slug) : 0,
  }));

  // Ranks stay global while searching
  const rows = query ? ranked.filter(({ user }) => user.username.toLowerCase().includes(query)) : ranked;
  const showPodium = !query && ranked.length >= 3;
  const topScore = ranked.length ? getScore(ranked[0].user, category.slug) : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-16 text-foreground">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <LeaderboardHeader
          category={category}
          totalContenders={ranked.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {showPodium && (
          <LeaderboardPodium
            topThree={ranked.slice(0, 3).map((r) => r.user)}
            category={category.slug}
            scoreLabel={category.scoreLabel}
          />
        )}

        <LeaderboardList
          rows={showPodium ? rows.slice(3) : rows}
          category={category.slug}
          scoreLabel={category.scoreLabel}
          topScore={topScore}
        />
      </div>
    </div>
  );
}
