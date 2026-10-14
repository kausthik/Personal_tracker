import { LeaderboardBoard } from "@/src/components/leaderboard/leaderboard-board";

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <LeaderboardBoard slug={category} />;
}
