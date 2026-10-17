import { LeaderboardBoard } from "@/src/components/leaderboard/leaderboard-board";

// Weekly board reads Mongo directly; re-render at most every 5 min
export const revalidate = 300;

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <LeaderboardBoard slug={category} />;
}
