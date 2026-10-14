import { LeaderboardBoard } from "@/src/components/leaderboard/leaderboard-board";

// The overall board doubles as the leaderboard landing page
export default function LeaderboardHome() {
  return <LeaderboardBoard slug="total" />;
}
