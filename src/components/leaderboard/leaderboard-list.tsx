import { User } from "@/src/lib/user-type";
import { Search } from "lucide-react";
import { LeaderboardRow } from "./leaderboard-row";
import { getScore } from "./leaderboard-utils";

interface LeaderboardListProps {
  filteredData: User[];
  category: string;
  scoreLabel: string;
  searchQuery: string;
}

export function LeaderboardList({
  filteredData,
  category,
  scoreLabel,
  searchQuery,
}: LeaderboardListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {searchQuery ? "Search Results" : "All Standings"}
        </h2>
        <span className="text-xs text-muted-foreground">
          Showing {filteredData.length} Contenders
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        {filteredData.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Search className="size-8 mx-auto text-muted-foreground/60" />
            <p className="font-semibold text-foreground">No contender found</p>
            <p className="text-xs text-muted-foreground">
              Try searching for a different LeetCode handle.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filteredData.map((user, index) => {
              const score = getScore(user, category);
              const previousUser = index > 0 ? filteredData[index - 1] : null;
              const gapFromPrevious = previousUser
                ? getScore(previousUser, category) - score
                : undefined;

              return (
                <LeaderboardRow
                  key={user.username}
                  user={user}
                  rank={index + 1}
                  score={score}
                  scoreLabel={scoreLabel}
                  gapFromPrevious={gapFromPrevious}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
