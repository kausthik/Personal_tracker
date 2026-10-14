"use client";

import { useState } from "react";
import { User } from "@/src/lib/user-type";
import { categories } from "@/src/config/category-data";
import { LeaderboardHeader } from "./leaderboard-header";
import { LeaderboardPodium } from "./leaderboard-podium";
import { LeaderboardList } from "./leaderboard-list";
import { getScore, getScoreLabel } from "./leaderboard-utils";

type Props = {
  category: string;
  data: User[];
};

export function Leaderboard({ category, data }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategoryConfig =
    categories.find(
      (c) => c.slug === category || (category === "contest" && c.slug === "rating")
    ) || categories[0];

  const scoreLabel = getScoreLabel(category);

  const sortedData = [...(data || [])].sort(
    (a, b) => getScore(b, category) - getScore(a, category)
  );

  const filteredData = sortedData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const topThree = sortedData.slice(0, 3);
  const showPodium = searchQuery === "" && topThree.length >= 3;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground pb-16">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-blue-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-48 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Controls */}
        <LeaderboardHeader
          category={category}
          totalContenders={sortedData.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentCategoryConfig={currentCategoryConfig}
        />

        {/* Podium for Top 3 */}
        {showPodium && (
          <LeaderboardPodium
            topThree={topThree}
            category={category}
            scoreLabel={scoreLabel}
          />
        )}

        {/* Standings Table / List */}
        <LeaderboardList
          filteredData={filteredData}
          category={category}
          scoreLabel={scoreLabel}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}